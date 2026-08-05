/**
 * One-time helper: turns your Spotify app credentials into a refresh token.
 *
 *   node scripts/get-spotify-token.mjs
 *
 * Nothing to copy or paste. The script starts a tiny server on the loopback
 * address, opens your browser, and catches the authorization code the moment
 * Spotify redirects back. You only click "Agree".
 *
 * Why 127.0.0.1 and not localhost: Spotify requires redirect URIs to be HTTPS,
 * and the one documented exception is the loopback IP literal over plain HTTP.
 * `http://localhost` is rejected outright ("insecure redirect URI"), and
 * `https://localhost` needs a certificate this script has no way to provide.
 *
 * Everything stays on your machine. The only outbound calls are to
 * accounts.spotify.com, the server binds to loopback so nothing on your
 * network can reach it, and the token is written to .env.local, which is
 * already gitignored.
 */

import { createInterface } from "node:readline/promises";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { stdin, stdout } from "node:process";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { resolve } from "node:path";

const ENV_PATH = resolve(process.cwd(), ".env.local");
const SCOPES = "user-read-currently-playing user-read-recently-played";
const CALLBACK_PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${CALLBACK_PORT}/callback`;

const readEnvFile = () => {
  if (!existsSync(ENV_PATH)) return {};
  const entries = {};
  for (const line of readFileSync(ENV_PATH, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match) entries[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return entries;
};

/** Rewrites the key in place if present, appends it otherwise. */
const upsertEnv = (key, value) => {
  const line = `${key}=${value}`;
  if (!existsSync(ENV_PATH)) {
    writeFileSync(ENV_PATH, `${line}\n`, "utf8");
    return;
  }
  const contents = readFileSync(ENV_PATH, "utf8");
  const pattern = new RegExp(`^\\s*${key}\\s*=.*$`, "m");
  const next = pattern.test(contents)
    ? contents.replace(pattern, line)
    : `${contents.replace(/\n*$/, "\n")}${line}\n`;
  writeFileSync(ENV_PATH, next, "utf8");
};

const fail = (message) => {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
};

const basicAuth = (id, secret) =>
  `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;

/** Catches a bad ID/secret before we bother opening a browser. */
const verifyCredentials = async (clientId, clientSecret) => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuth(clientId, clientSecret),
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    fail(
      `Spotify rejected those credentials (${res.status}): ${
        data.error_description || data.error || "unknown error"
      }\n    Copy the Client ID and Client Secret straight from your app's Settings page.`,
    );
  }
};

const openBrowser = (url) => {
  const platform = process.platform;
  try {
    if (platform === "win32") {
      // PowerShell's Start-Process treats the argument as a literal string,
      // which avoids the `cmd` shell eating `&`, `%`, and `?` in URLs.
      const safe = url.replace(/'/g, "''");
      const child = spawn(
        "powershell",
        ["-NoProfile", "-Command", `Start-Process '${safe}'`],
        { detached: true, stdio: "ignore" },
      );
      child.unref();
      return true;
    }
    const command = platform === "darwin" ? "open" : "xdg-open";
    const child = spawn(command, [url], { detached: true, stdio: "ignore" });
    child.unref();
    return true;
  } catch {
    return false;
  }
};

const respond = (res, title, message) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(
    `<!doctype html><meta charset="utf-8"><title>${title}</title>` +
      `<body style="font-family:system-ui,sans-serif;background:#0b1020;color:#f4f4f5;` +
      `display:grid;place-items:center;height:100vh;margin:0;text-align:center">` +
      `<div><h1 style="font-size:1.25rem;margin:0 0 .5rem">${title}</h1>` +
      `<p style="color:#9aa4bf;margin:0">${message}</p></div>`,
  );
};

/** Waits for Spotify to redirect back, then resolves with the auth code. */
const waitForCode = (expectedState) =>
  new Promise((resolvePromise, rejectPromise) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      if (url.pathname !== "/callback") {
        res.writeHead(404).end();
        return;
      }

      const error = url.searchParams.get("error");
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      if (error) {
        respond(res, "Authorization declined", "You can close this tab.");
        server.close();
        rejectPromise(new Error(`Spotify returned "${error}".`));
        return;
      }
      // Guards against another local page firing a request at this server.
      if (state !== expectedState) {
        respond(res, "State mismatch", "Run the script again.");
        server.close();
        rejectPromise(new Error("State did not match. Nothing was saved."));
        return;
      }
      if (!code) {
        respond(res, "No code returned", "Run the script again.");
        server.close();
        rejectPromise(new Error("Spotify redirected without a code."));
        return;
      }

      respond(res, "Connected", "You can close this tab and return to the terminal.");
      server.close();
      resolvePromise(code);
    });

    server.on("error", (error) =>
      rejectPromise(
        error.code === "EADDRINUSE"
          ? new Error(`Port ${CALLBACK_PORT} is already in use. Close whatever is on it and retry.`)
          : error,
      ),
    );

    // Loopback only — nothing else on the network can reach this.
    server.listen(CALLBACK_PORT, "127.0.0.1");

    setTimeout(
      () => {
        server.close();
        rejectPromise(new Error("Timed out after 5 minutes."));
      },
      5 * 60 * 1000,
    ).unref();
  });

const main = async () => {
  const env = { ...readEnvFile(), ...process.env };
  const rl = createInterface({ input: stdin, output: stdout });

  const ask = async (label) => (await rl.question(`  ${label}: `)).trim();

  console.log("\n  Spotify refresh token setup");
  console.log("  ───────────────────────────\n");
  console.log("  First, in your Spotify app settings, make sure this exact redirect URI");
  console.log("  is saved (add it if it is not there, then click Save):\n");
  console.log(`      ${REDIRECT_URI}\n`);
  console.log("  https://localhost:8888/callback will not work — Spotify only accepts");
  console.log("  the 127.0.0.1 loopback address for local development.\n");

  await rl.question("  Press Enter once that URI is saved... ");

  const clientId = env.SPOTIFY_CLIENT_ID || (await ask("Client ID"));
  if (!clientId) fail("A client ID is required.");

  const clientSecret = env.SPOTIFY_CLIENT_SECRET || (await ask("Client secret"));
  if (!clientSecret) fail("A client secret is required.");

  rl.close();

  console.log("\n  Checking credentials...");
  await verifyCredentials(clientId, clientSecret);
  console.log("  ✓ Credentials look good.\n");

  const state = randomBytes(16).toString("hex");
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("state", state);
  // Force the consent screen so an already-approved app still issues a token.
  authUrl.searchParams.set("show_dialog", "true");

  const pending = waitForCode(state);

  console.log("  Open this URL if the browser does not load it:\n");
  console.log(`  ${authUrl}\n`);

  const opened = openBrowser(authUrl.toString());
  console.log(
    opened
      ? "  Opened your browser. Click Agree.\n"
      : "  Could not open a browser — use the URL above.\n",
  );
  console.log("  Waiting for Spotify to redirect back...");

  const code = await pending;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuth(clientId, clientSecret),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    fail(
      `Token exchange failed (${res.status}): ${data.error_description || data.error}\n` +
        `    The redirect URI in your app settings must be exactly ${REDIRECT_URI}`,
    );
  }
  if (!data.refresh_token) fail("Spotify did not return a refresh token.");

  upsertEnv("SPOTIFY_CLIENT_ID", clientId);
  upsertEnv("SPOTIFY_CLIENT_SECRET", clientSecret);
  upsertEnv("SPOTIFY_REDIRECT_URI", REDIRECT_URI);
  upsertEnv("SPOTIFY_REFRESH_TOKEN", data.refresh_token);

  console.log("\n  ✓ Saved all four variables to .env.local\n");
  console.log("  Last step: copy those same four into Vercel > Settings >");
  console.log("  Environment Variables, then redeploy. The footer widget goes live.\n");
};

main().catch((error) => fail(error.message || String(error)));
