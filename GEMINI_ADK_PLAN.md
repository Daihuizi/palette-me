# Gemini And ADK Integration Plan

## Current Step

PaletteMe now has a Gemini-ready agent layer. The app still works without any API key, but when `GEMINI_API_KEY` is available the local agent can ask Gemini to refine the recommendation copy while keeping the local skill results as the source of truth.

## How The Hybrid Agent Works

1. Local skills analyze the profile and makeup shelf.
2. The local agent builds a structured recommendation.
3. If `GEMINI_API_KEY` is configured, Gemini refines the recommendation text through Google's official `@google/genai` SDK.
4. If Gemini is unavailable, the app falls back to the local result.

This keeps the demo stable for judging while proving that the architecture is ready for real AI reasoning.

## Environment Variables

Create a local `.env` file:

```bash
cp .env.example .env
```

Then edit `.env`:

```text
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.5-flash
```

Run:

```bash
npm start
```

Then open:

```text
http://127.0.0.1:8787
```

If Gemini is active, the recommendation panel mode changes from:

```text
local-simulated
```

to:

```text
gemini-assisted:<model>
```

## ADK Upgrade Path

When ready to make this a formal ADK project:

1. Preserve the existing web demo and local skills.
2. Use `agents-cli scaffold enhance .` after confirming deployment target.
3. Convert local skill functions into ADK tools.
4. Define an ADK root agent that uses the same tool boundaries:
   - undertone analysis
   - shade matching
   - look building
   - shopping guard
5. Add ADK eval cases from `EVALUATION.md`.
6. Deploy with Cloud Run or Agent Runtime after the local version is stable.

## Why Not Skip Straight To Cloud

The local-first architecture keeps the competition demo reliable. Cloud deployment can fail because of billing, authentication, quota, or region setup. PaletteMe should first be judged as a working product idea, then upgraded into a cloud-hosted agent.
