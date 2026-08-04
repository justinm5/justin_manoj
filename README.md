# Justin's Personal Portfolio

React 19 + Vite + TypeScript. Plain CSS, no UI framework.

Pages: **Home** (bio + experience), **Projects**, **Books**, **Ask** (a
context-aware chatbot that answers questions about me).

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:8080`.

## Editing content

Everything lives in one file: `src/data/context.ts`.

| Export          | Drives                                            |
| --------------- | ------------------------------------------------- |
| `experience`    | Experience list on Home                           |
| `projects`      | Projects page                                     |
| `books`         | Books page                                        |
| `socials`       | Sidebar links                                     |
| `askUi`         | Static terminal lines on the Ask page             |
| `systemContext` | The only facts the chatbot is allowed to state    |

### Company logos

Each experience entry resolves its logo through a three-step fallback:

1. `logo: "/logos/dell.jpeg"` — a local file in `public/logos/`. **Preferred.**
2. `domain: "dell.com"` — fetched from Clearbit.
3. The company's first initial.

Local files look noticeably sleeker because they are square, full-bleed, and
brand-colored. Clearbit returns inconsistent transparent-padded PNGs that end up
different sizes inside the rounded square.

To add one: open the company's LinkedIn page, save the square profile logo, crop
it to a square with no transparent margin, and save it as
`public/logos/<name>.jpeg` at 200x200 or larger. The expected filenames are
already referenced in `src/data/context.ts` (`ibm.jpeg`, `dell.jpeg`,
`gbcs.jpeg`, `umass.jpeg`, `buildumass.jpeg`). Until you add them, Clearbit fills
in automatically, so nothing looks broken.

## The Ask chatbot

Two layers, so it always answers:

1. **`/api/chat`** — a serverless function that calls
   [Groq](https://console.groq.com) (free tier, no credit card, OpenAI-compatible).
   It injects `systemContext` as the system prompt and instructs the model never
   to invent facts.
2. **Local fallback** — `src/lib/local-answer.ts` scores the same fact lines
   against your question with IDF-weighted token overlap and returns the best
   matches. This runs entirely in the browser, so the chatbot still works with
   `npm run dev`, on static hosting, or if the API key is missing.

### Enabling real LLM inference (free)

1. Create a key at <https://console.groq.com/keys>.
2. Add it as an environment variable named `GROQ_API_KEY` in your host
   (Vercel: Project → Settings → Environment Variables).
3. Redeploy.

Never commit the key or put it in `src/` — anything under `src/` ships to the
browser. Only `api/` can read it.

Optional overrides: `GROQ_MODEL` (default `llama-3.3-70b-versatile`) and
`GROQ_BASE_URL` / `OPENAI_API_KEY` to use any other OpenAI-compatible provider.

The endpoint is rate-limited to 15 requests per IP per minute by default (configurable
with `RATE_LIMIT_PER_MINUTE`). This is a hot-instance guard; for higher-traffic
sites, swap `api/rate-limit.ts` for Redis or Vercel KV.

To test the function locally you need a serverless runtime:

```bash
npx vercel dev
```

## Deploying

Built for Vercel — `vercel.json` routes `/api/*` to the function and everything
else to `index.html` for client-side routing. On a static-only host the site
works fine; the chatbot just uses the local fallback.

## Scripts

| Command           | Purpose                        |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server on port 8080        |
| `npm run build`   | Production build to `dist/`    |
| `npm run preview` | Serve the production build     |
| `npm run lint`    | ESLint                         |
