# PaletteMe Spec

## Overview
PaletteMe is a personal makeup palette assistant. It helps users record the makeup products they already own, understand which shades fit their complexion and style, and make better future purchase decisions.

The first version is a web prototype for a competition demo. It focuses on the user problem: many makeup buyers own many products, but still struggle to know which colors suit them, how to combine products, and whether a new shade is worth buying.

## Target Users
- Makeup beginners who do not know which eye shadow, blush, and lipstick colors suit them.
- Beauty shoppers who often buy shades that look good online but not on their own face.
- Users who want to avoid duplicate purchases and build a more coherent personal palette.

## Core User Flow
1. User enters a personal beauty profile: undertone, skin depth, skin type, daily style, and occasion.
2. User records products they already own, including category, shade family, finish, and notes.
3. PaletteMe analyzes the user's profile and owned products.
4. PaletteMe recommends a cohesive look: eye shadow, blush, lip shade, and styling notes.
5. User enters a new product or shade they want to buy.
6. PaletteMe gives a buy / maybe / skip recommendation based on fit and duplicates.

## MVP Features
- Personal color profile form.
- Makeup inventory cards for eye shadow, blush, lipstick, and complexion products.
- AI-style recommendation panel with:
  - Best color families.
  - Today's look recipe.
  - What to avoid.
  - Duplicate purchase warning.
- New product checker for future purchases.
- Local browser storage so demo data remains after refresh.
- Local simulated Agent API so the recommendation flow has a backend-shaped structure before cloud deployment.

## Agent Skills For Future Version
- Undertone analysis skill: infer warm, cool, neutral, olive, or muted direction from user profile and optional photo.
- Shade matching skill: map product names and descriptions to color families.
- Look building skill: combine eye, cheek, and lip colors into a cohesive makeup look.
- Shopping guard skill: detect duplicates and warn when a product is unlikely to fit the user.
- Safety guard skill: screen for medical-like symptoms, face-photo privacy, and appearance-sensitive requests.
- Human review skill: pause sensitive decisions for approve, revise, or reject.
- New launch research skill: compare new products against the user's existing palette.

## Safety And Privacy Rules
- Do not claim medical or dermatological diagnosis.
- Do not store uploaded face photos without clear user permission.
- Make recommendations probabilistic, not absolute.
- Avoid implying that one skin tone or feature is better than another.
- If the user mentions allergy, irritation, or skin disease, recommend patch testing and professional advice.

## Human-In-The-Loop Rules
- The agent may suggest a beauty direction, but the user controls whether to save, buy, upload, or share.
- Medical-like symptoms should create a handoff recommendation rather than an automated diagnosis.
- Face-photo analysis should require explicit consent before analysis or storage.
- High-impact purchase advice should be phrased as a reviewable recommendation, not an automatic decision.

## Success Criteria
- A first-time visitor can understand the product within 30 seconds.
- User can add at least one product and generate a personalized look.
- The recommendation visibly changes when the user's undertone, style, or products change.
- The app communicates the competition idea clearly without needing a live backend.

## Future Production Version
- Gemini-powered agent backend.
- Product database and shade metadata.
- Optional photo-based color analysis.
- Google Cloud deployment.
- User accounts and private palette history.
- Evaluation set for recommendation quality and safety guard behavior.

## Local Agent Prototype
- `server.mjs`: local HTTP server and static web server.
- `agent/palette-agent.mjs`: orchestrates PaletteMe's local agent flow.
- `agent/llm/gemini-client.mjs`: optional Gemini refinement adapter with local fallback.
- `agent/skills/undertone-analysis.mjs`: maps profile signals to shade families.
- `agent/skills/shade-matching.mjs`: matches owned products against target shade families.
- `agent/skills/look-builder.mjs`: turns profile and shelf data into a look recipe.
- `agent/skills/shopping-guard.mjs`: checks duplicate and unsuitable product purchases.
- `adk_app/agent.py`: includes ADK tools for safety guard checks and human review checkpoints.
