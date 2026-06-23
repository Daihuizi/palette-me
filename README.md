# PaletteMe

PaletteMe is an AI-powered personal makeup palette assistant. It helps users record the beauty products they already own, understand which shades fit their personal color profile, build cohesive looks, and avoid buying duplicate or unsuitable shades.

## Problem

Many makeup users have the same frustration: a product looks beautiful online, but it does not look right on their own face. Over time, they collect palettes, blushes, and lipsticks that do not work together, then spend more time searching for shade advice or returning products.

PaletteMe turns a scattered makeup shelf into a personal color system.

## Solution

Users create a beauty profile, log their existing products, and ask PaletteMe for:

- best shade families for their undertone and style
- a coordinated eye, cheek, and lip look
- duplicate warnings before buying a new product
- shade-fit explanations that help the user learn their own palette

## AI Agent Concept

The production version would use an AI agent with reusable skills:

- Undertone Analysis Skill: understands warm, cool, neutral, olive, and muted directions.
- Shade Matching Skill: maps product descriptions to color families.
- Look Builder Skill: creates cohesive eye, cheek, and lip combinations.
- Shopping Guard Skill: checks whether a new product overlaps with the user's current palette.
- Safety Guard Skill: detects medical-like, photo-privacy, and appearance-sensitive requests.
- Human Review Skill: creates approve / revise / reject checkpoints for sensitive decisions.
- New Launch Research Skill: compares upcoming products with the user's saved preferences.

## Why It Matters

PaletteMe is designed for a real everyday beauty problem: buying makeup is emotional, visual, and personal, but most recommendation tools are generic. A personal palette memory can reduce waste, save money, and help users feel more confident in their own style.

## Tech Direction

Current prototype:

- Static HTML, CSS, and JavaScript
- Local browser storage
- Local simulated agent API with reusable skills
- Gemini-ready refinement layer with local fallback
- ADK / Agents CLI prototype with PaletteMe tools
- Human-in-the-loop review checkpoints and safety guard tools
- Competition-ready product story and clickable demo

Training camp mapping:

- Unit 1: Agents and vibe coding through product spec and working demo.
- Unit 2: Agent tools and interoperability through web UI, local API, Gemini SDK, and ADK prototype.
- Unit 3: Agent skills through reusable shade, look, shopping, safety, and human-review tools.
- Unit 4: Security and evaluation through safety rules, HITL checkpoints, and eval cases.
- Unit 5: Spec-driven development through docs, tests, GitHub structure, and deployment-ready scaffold.

Future version:

- Google Cloud deployment
- Optional photo-based color analysis
- Product database and shade metadata
- Local evaluations for recommendation quality and safety

## Demo Flow

1. Fill out or reset the beauty profile.
2. Review the default demo shelf.
3. Generate a look plan.
4. Change undertone to show the AI look plan updating live.
5. Check the default viral coral lipstick before buying it.
6. Show safer alternative shades and the human review checkpoint.
7. End on the small privacy and safety footer.

For a spoken walkthrough, see `DEMO_SCRIPT.md`. For a timed recording plan, see `VIDEO_SUBMISSION_SCRIPT.md`.

## Run Locally

Open the static file directly for the basic demo, or run the local agent server:

```bash
npm start
```

Then open:

```text
http://127.0.0.1:8787
```

The local server exposes:

```text
POST /api/recommendation
POST /api/purchase-check
```

You can also run a sample agent request:

```bash
npm run agent:sample
```

## Run The ADK Prototype

Install the Python ADK environment:

```bash
agents-cli install
```

Run a PaletteMe ADK prompt:

```bash
agents-cli run "I have cool undertone, light skin, soft contrast, and I own taupe eyeshadow plus rose nude lipstick. Build me a daily PaletteMe look."
```

Run the deterministic ADK tool tests:

```bash
uv run pytest tests/unit/test_dummy.py
```

Run the ADK streaming integration test:

```bash
uv run pytest tests/integration/test_agent.py
```

The streaming integration test is skipped by default because it makes a live
model call. To run it manually:

```bash
RUN_LIVE_ADK_TESTS=1 uv run pytest tests/integration/test_agent.py
```

## Optional Gemini Mode

PaletteMe works without an API key. To let Gemini refine the local agent recommendations, set:

```bash
cp .env.example .env
```

Then edit `.env`:

```text
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.5-flash
```

Then run `npm start`. PaletteMe uses Google's official `@google/genai` SDK. The app will show `gemini-assisted:<model>` when Gemini is active and will fall back to local mode if the request fails. The `.env` file is ignored by Git and should not be committed.

## Competition Materials

- `SPEC.md`: product requirements and agent design
- `PITCH.md`: one-minute project story and demo script
- `DEMO_SCRIPT.md`: 60- and 90-second live demo scripts
- `VIDEO_SUBMISSION_SCRIPT.md`: timed video submission recording script
- `EVALUATION.md`: safety and evaluation plan
- `GEMINI_ADK_PLAN.md`: Gemini and ADK upgrade path
- `TECHNICAL_MAPPING.md`: training-camp concept mapping and architecture
- `adk_app/agent.py`: ADK root agent with PaletteMe tools

## Safety Notes

PaletteMe should not diagnose skin conditions or make medical claims. Sensitive data such as face photos, allergies, and skin concerns should be handled with explicit permission and privacy-first storage rules.

## Human-In-The-Loop Notes

PaletteMe does not let the agent automatically make sensitive decisions. Medical-like symptoms, face-photo analysis, storage consent, and high-impact purchase advice can trigger a pending human review checkpoint with three outcomes: approve, revise, or reject.
