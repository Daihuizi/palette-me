# PaletteMe

PaletteMe is an AI personal makeup palette assistant. It helps users record the makeup they already own, understand their best shade families, build coordinated looks, and check new products before buying another shade that does not fit.

![PaletteMe hero image](assets/vanity-palette-hero.png)

## Why This Project

Many makeup users buy products that look beautiful online but do not work with their own undertone, skin depth, style, or existing collection. The result is wasted money, returns, cluttered drawers, and repeated searching for shade advice.

PaletteMe turns that messy makeup shelf into a personal color system.

## What The Demo Shows

- A beauty profile with undertone, skin depth, skin type, style, and occasion.
- A saved makeup shelf for eye shadow, blush, lipstick, and base products.
- An AI look plan that updates when the user changes their profile.
- A before-buying guard that checks a new product against the user's palette.
- Safer alternative shades when a product looks risky.
- A human-in-the-loop checkpoint for approve, revise, or reject decisions.
- A small privacy and safety boundary: local-first memory, consent before future photo analysis, and no skin diagnosis.

## Live Demo

Local demo:

```text
http://127.0.0.1:8787
```

GitHub Pages target after enabling Pages:

```text
https://daihuizi.github.io/palette-me/
```

The GitHub Pages version runs as a static demo with local browser logic. The local Node server adds the Agent API and optional Gemini refinement.

## 60-Second Demo Flow

1. Open PaletteMe and explain the pain point: makeup recommendations are personal, but most advice is generic.
2. Show the default profile and makeup shelf.
3. Click `Generate look`.
4. Change `Undertone` from `Cool` to `Warm`, then back to `Cool`, to show live personalization.
5. Use `Before I buy` with the default viral coral lipstick.
6. Point to the safer alternative shades.
7. Show the `Pending human review` panel and click `Revise`.
8. End on the privacy and safety footer.

## Agent Architecture

```text
Web UI
  -> Local browser state
  -> Node Agent API
      -> Undertone Analysis Skill
      -> Shade Matching Skill
      -> Look Builder Skill
      -> Shopping Guard Skill
      -> Safety Guard / Human Review concepts
      -> Optional Gemini refinement
  -> ADK prototype and eval-ready tests
```

## Training Camp Concepts Applied

- Unit 1: Vibe coding from a real personal pain point into a working product demo.
- Unit 2: Agent tools and interoperability across Web UI, Node API, Gemini SDK, and ADK.
- Unit 3: Reusable skills for undertone analysis, shade matching, look building, and shopping checks.
- Unit 4: Safety boundaries, human-in-the-loop checkpoints, and evaluation cases.
- Unit 5: Spec-driven development with docs, tests, GitHub history, and deployment path.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Local server: Node.js
- AI refinement: Google Gemini via `@google/genai`
- Agent prototype: Google ADK / Agents CLI
- Storage: local browser storage for the prototype
- Tests: Python `pytest` for deterministic ADK tool tests
- Deployment path: GitHub Pages for static demo, Cloud Run path documented for agent service

## Run Locally

```bash
npm start
```

Open:

```text
http://127.0.0.1:8787
```

Run a sample local agent request:

```bash
npm run agent:sample
```

## Optional Gemini Mode

PaletteMe works without an API key. To let Gemini refine recommendations, create a local `.env` file:

```bash
cp .env.example .env
```

Then add:

```text
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.5-flash
```

`.env` is ignored by Git and should not be committed.

## Run ADK And Tests

Run the ADK prototype:

```bash
agents-cli run "I have cool undertone, light skin, soft contrast, and I own taupe eyeshadow plus rose nude lipstick. Build me a daily PaletteMe look."
```

Run deterministic tests:

```bash
uv run pytest tests/unit/test_dummy.py tests/integration/test_agent.py
```

The live ADK streaming test is opt-in:

```bash
RUN_LIVE_ADK_TESTS=1 uv run pytest tests/integration/test_agent.py
```

## Competition Materials

- `SUBMISSION.md`: project summary for judges
- `VIDEO_SUBMISSION_SCRIPT.md`: final recording script and click path
- `DEMO_SCRIPT.md`: live demo practice script
- `SPEC.md`: product requirements and agent design
- `TECHNICAL_MAPPING.md`: training-camp concept mapping
- `EVALUATION.md`: safety and evaluation plan
- `GEMINI_ADK_PLAN.md`: Gemini and ADK upgrade path
- `FINAL_SUBMISSION_CHECKLIST.md`: final before-submit checklist

## Safety And Privacy

PaletteMe gives color and shopping guidance only. It does not diagnose skin conditions, should request explicit consent before any future face-photo analysis, and uses human review checkpoints when advice could affect sensitive decisions.
