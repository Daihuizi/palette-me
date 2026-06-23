# Gemini And ADK Integration Plan

## Current Step

PaletteMe now has both a Gemini-ready web agent layer and an ADK / Agents CLI prototype. The app still works without any API key, but when `GEMINI_API_KEY` is available the local agent can ask Gemini to refine the recommendation copy while keeping the local skill results as the source of truth.

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

## ADK Prototype

The formal ADK structure now lives in:

```text
adk_app/agent.py
```

The ADK root agent uses these tools:

- `analyze_undertone_profile`
- `match_owned_products`
- `build_makeup_look`
- `check_purchase_fit`

Run it locally:

```bash
agents-cli run "I have cool undertone, light skin, soft contrast, and I own taupe eyeshadow plus rose nude lipstick. Build me a daily PaletteMe look."
```

The local ADK prototype uses `.env` for the Gemini API key and defaults to `gemini-3.5-flash` for the ADK agent unless `PALETTEME_ADK_MODEL` is set.

## Next ADK Steps

1. Add ADK eval cases from `EVALUATION.md`.
2. Connect the web UI directly to the ADK local service.
3. Add memory for saved user palette preferences.
4. Deploy with Cloud Run after the local version is stable.

## Why Not Skip Straight To Cloud

The local-first architecture keeps the competition demo reliable. Cloud deployment can fail because of billing, authentication, quota, or region setup. PaletteMe should first be judged as a working product idea, then upgraded into a cloud-hosted agent.
