# Justin's Personal Portfolio

## Development

```bash
npm install
npm run dev
```

Then open `http://localhost:8080`
## Ask

Ask answers from the portfolio content in `src/data/context.ts`. It supports
follow-up questions in both the server-backed model and the local fallback.
The local Vite preview uses the fallback; deployed model answers use the existing
`GROQ_API_KEY` (or `OPENAI_API_KEY`) server environment variable. Never put an API
key in a `VITE_` variable or client source.

Run the conversation and API checks with:

```bash
npm run test:ask
```

The checks mock model calls and do not use API credits. To type-check the
serverless endpoints as well as the frontend, run:

```bash
npx tsc -b
npx tsc --project api/tsconfig.json
```
