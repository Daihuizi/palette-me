# PaletteMe Submission Guide

## Project Name

PaletteMe

## Short Description

PaletteMe is an AI personal makeup palette assistant that helps users track owned makeup products, discover their best shade families, build cohesive looks, and avoid duplicate or unsuitable purchases.

## Problem

Many makeup users buy products that look beautiful online but do not fit their own undertone, style, or existing collection. This leads to wasted money, returns, cluttered makeup drawers, and confusion about what actually works.

## Solution

PaletteMe creates a personal palette memory:

- user beauty profile
- owned eye shadow, blush, lipstick, and base products
- AI-generated look plans
- before-buying shade checks
- duplicate and fit warnings

## How To Run

```bash
cd /Users/daihuizizhu/Documents/Codex/Projects/PaletteMe
npm start
```

Open:

```text
http://127.0.0.1:8787
```

Run the local agent sample:

```bash
npm run agent:sample
```

Run the ADK prototype:

```bash
agents-cli run "I have cool undertone, light skin, soft contrast, and I own taupe eyeshadow plus rose nude lipstick. Build me a daily PaletteMe look."
```

Live demo script:

```text
DEMO_SCRIPT.md
VIDEO_SUBMISSION_SCRIPT.md
```

## Demo Flow

1. Show the hero section and explain the pain point: makeup users need a personal color memory.
2. Fill or adjust the beauty profile.
3. Add an owned product to the makeup shelf.
4. Generate the AI look plan.
5. Use "Before I buy" to check a shade and show duplicate protection.
6. Scroll to the Agent, Human-in-the-loop, and Safety sections to explain how the project applies agent skills, review checkpoints, and privacy boundaries inside the product.

## Agent Skills Used

- Undertone Analysis Skill
- Shade Matching Skill
- Look Builder Skill
- Shopping Guard Skill
- Safety Guard Skill
- Human Review Skill

## Training Camp Concepts Used

- Unit 1: Vibe coding from a personal pain point into a working prototype.
- Unit 2: Agent tools and interoperability across Web UI, Node local API, Gemini SDK, and ADK.
- Unit 3: Reusable agent skills instead of one large prompt.
- Unit 4: Safety guards, human-in-the-loop checkpoints, and eval cases.
- Unit 5: Spec-driven project structure with docs, tests, GitHub commits, and deployment path.

## Architecture Summary

```text
User -> Web UI -> Local Node Agent API -> Local Skills -> Gemini refinement
                         |
                         +-> ADK prototype tools -> Safety Guard -> Human Review
                         |
                         +-> Eval dataset and scoring config
```

## Current Technical State

- Static web UI
- Local browser storage
- Local simulated Agent API
- Optional Gemini-assisted recommendation refinement
- Node.js server with no external dependencies
- Google ADK / Agents CLI prototype in `adk_app/`
- ADK tools for undertone analysis, product matching, look building, purchase checks, safety screening, and human review
- Structured documents: `README.md`, `SPEC.md`, `PITCH.md`, `EVALUATION.md`
- Live demo guide: `DEMO_SCRIPT.md`
- Video recording guide: `VIDEO_SUBMISSION_SCRIPT.md`
- Technical mapping document: `TECHNICAL_MAPPING.md`

## Verification

- `npm run agent:sample` confirms the web agent layer can use Gemini when `.env` is configured.
- `uv run pytest tests/unit/test_dummy.py` passes deterministic ADK tool tests.
- `uv run pytest tests/integration/test_agent.py` keeps live ADK streaming tests opt-in to avoid quota and model-availability flakes.
- `RUN_LIVE_ADK_TESTS=1 uv run pytest tests/integration/test_agent.py` can be used for a live streaming check.
- `agents-cli run ...` was used to confirm the ADK agent calls PaletteMe tools and returns a full makeup look.

## Future Roadmap

1. Add product shade metadata and optional photo-based analysis.
2. Add ADK eval cases for personalization, duplicate detection, and safety.
3. Connect the web UI directly to the ADK service.
4. Deploy the web app and agent to Google Cloud / Cloud Run.

## Safety And Privacy

PaletteMe should not diagnose skin conditions or make medical claims. Future photo-based analysis must require explicit user permission and should avoid storing face images unless the user opts in.

## Human-In-The-Loop

Sensitive cases should not be decided automatically. PaletteMe can create a pending review checkpoint when the user asks about medical-like symptoms, face-photo analysis or storage, or a risky product decision. The human review options are approve, revise, or reject.
