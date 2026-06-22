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

## Demo Flow

1. Show the hero section and explain the pain point: makeup users need a personal color memory.
2. Fill or adjust the beauty profile.
3. Add an owned product to the makeup shelf.
4. Generate the AI look plan.
5. Use "Before I buy" to check a shade and show duplicate protection.
6. Scroll to the Agent and Judge Demo sections to explain how the project maps to agent skills and evaluation.

## Agent Skills Used

- Undertone Analysis Skill
- Shade Matching Skill
- Look Builder Skill
- Shopping Guard Skill

## Current Technical State

- Static web UI
- Local browser storage
- Local simulated Agent API
- Node.js server with no external dependencies
- Structured documents: `README.md`, `SPEC.md`, `PITCH.md`, `EVALUATION.md`

## Future Roadmap

1. Replace the local simulated agent with Gemini-powered reasoning.
2. Convert the local skill modules into ADK tools or an ADK agent.
3. Add product shade metadata and optional photo-based analysis.
4. Deploy the web app and agent to Google Cloud / Cloud Run.
5. Add evaluation cases for personalization, duplicate detection, and safety.

## Safety And Privacy

PaletteMe should not diagnose skin conditions or make medical claims. Future photo-based analysis must require explicit user permission and should avoid storing face images unless the user opts in.
