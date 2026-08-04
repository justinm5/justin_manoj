/**
 * Serverless chat endpoint for the Ask page.
 *
 * Uses Groq's free API (OpenAI-compatible, no billing required). Set GROQ_API_KEY
 * in your host's environment variables — never in frontend code.
 *
 * Optional overrides:
 *   GROQ_MODEL   defaults to llama-3.3-70b-versatile
 *   GROQ_BASE_URL / OPENAI_API_KEY to point at any OpenAI-compatible provider.
 */

import { systemContext } from "../src/data/context";
import { checkRateLimit } from "./rate-limit";

const DEFAULT_BASE_URL = "https://api.groq.com/openai/v1";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 12;
const MAX_CHARS = 1500;

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the personal assistant on Justin Manoj's portfolio website.

Rules:
- Answer in first person as Justin ("I", "me", "my").
- Only use the facts provided below. Never invent employers, dates, metrics, or projects.
- If something is not in the facts, say you do not have it on the site and offer email or LinkedIn.
- Be concise: two to four sentences unless asked for more detail.
- Plain text only. No markdown, no bullet lists, no headings.
- Keep a calm, direct, professional tone. Do not use exclamation marks.

`;

export default async function handler(request: Request): Promise<Response> {
  const json = (body: unknown, status = 200, extraHeaders?: Record<string, string>) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        "Content-Type": "application/json",
        ...extraHeaders,
      },
    });

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const limit = checkRateLimit(request);
  if (!limit.allowed) {
    return json(
      {
        error: "Rate limit exceeded",
        detail: `Try again after ${new Date(limit.resetAt).toISOString()}.`,
        remaining: limit.remaining,
        resetAt: limit.resetAt,
      },
      429,
      {
        "X-RateLimit-Limit": "15",
        "X-RateLimit-Remaining": String(limit.remaining),
        "X-RateLimit-Reset": String(limit.resetAt),
      },
    );
  }

  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json(
      {
        error: "Chat is not configured",
        detail: "Set GROQ_API_KEY in your environment variables.",
      },
      503,
    );
  }

  let messages: ChatMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages)) throw new Error("messages must be an array");

    messages = body.messages
      .filter(
        (item): item is ChatMessage =>
          !!item &&
          typeof item === "object" &&
          (item as ChatMessage).role !== undefined &&
          typeof (item as ChatMessage).content === "string",
      )
      .filter((item) => item.role === "user" || item.role === "assistant")
      .slice(-MAX_MESSAGES)
      .map((item) => ({
        role: item.role,
        content: item.content.slice(0, MAX_CHARS),
      }));

    if (messages.length === 0) throw new Error("no usable messages");
  } catch (error) {
    return json({ error: "Invalid request body", detail: String(error) }, 400);
  }

  const baseUrl = process.env.GROQ_BASE_URL || DEFAULT_BASE_URL;
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT + systemContext },
          ...messages,
        ],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return json(
        { error: `Upstream error (${upstream.status})`, detail: detail.slice(0, 500) },
        502,
      );
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) return json({ error: "Empty reply from model" }, 502);

    return json({ reply });
  } catch (error) {
    return json({ error: "Request failed", detail: String(error) }, 500);
  }
}
