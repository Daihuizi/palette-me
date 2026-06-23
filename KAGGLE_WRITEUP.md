# PaletteMe - Kaggle Capstone Writeup Draft

## Project Title

PaletteMe: An AI Personal Makeup Palette Assistant

## Short Description

PaletteMe is an AI personal makeup palette assistant that helps users track owned makeup, generate personalized looks, and check new shades before buying. It uses reusable agent-style skills for undertone analysis, shade matching, look building, shopping checks, safety boundaries, and human-in-the-loop review.

## Why I Built This

Many makeup users buy products that look beautiful online but do not fit their undertone, style, or existing collection. This leads to wasted money, returns, cluttered makeup drawers, and confusion about what actually works.

I built PaletteMe because I personally experience this problem: I often need to search for which eye shadow, blush, and lipstick colors suit me, and it is frustrating to buy shades that do not fit. PaletteMe turns that problem into a personal color memory system.

## What The Agent Does

PaletteMe allows a user to:

- create a beauty profile with undertone, skin depth, skin type, style, and occasion
- record makeup products they already own
- generate an AI look plan from their profile and shelf
- change undertone and see the look plan update dynamically
- check a new product before buying
- receive safer alternative shade suggestions
- trigger a human-in-the-loop review checkpoint for risky purchase advice

## Agent Skills And Course Concepts Used

PaletteMe applies the key concepts from the 5-Day AI Agents Intensive Vibe Coding Course:

- Vibe coding from a real user pain point into a working product demo
- Tool-style agent architecture through local skills and API endpoints
- Reusable skills for undertone analysis, shade matching, look building, and shopping checks
- Safety guardrails for privacy, medical-like skin concerns, and purchase advice
- Human-in-the-loop review with approve, revise, or reject outcomes
- Eval-ready tests and structured documentation
- Deployment path through GitHub Pages, with a future Cloud Run backend path

## Technical Architecture

```text
User
  -> Web UI
  -> Local browser state
  -> Node Agent API
      -> Undertone Analysis Skill
      -> Shade Matching Skill
      -> Look Builder Skill
      -> Shopping Guard Skill
      -> Optional Gemini refinement
  -> ADK prototype and eval-ready tests
```

## Links

- Live demo: https://daihuizi.github.io/palette-me/
- GitHub repository: https://github.com/Daihuizi/palette-me
- Video demo: add video link here after recording

## Demo Walkthrough

In the demo, I show a user with a cool undertone, light skin depth, and a soft everyday style. PaletteMe remembers the user's existing shelf, including cool taupe eyeshadow, dusty rose blush, rose nude lip tint, and a soft base product.

When I click `Generate look`, PaletteMe creates a coordinated eye, cheek, and lip plan. When I change the undertone from cool to warm, the profile analysis and shade families update immediately, showing that the recommendation is personalized rather than fixed.

Then I use `Before I buy` to check a viral bright orange coral lipstick. PaletteMe compares it with the user's cool palette, warns that it may be risky, suggests safer alternatives, and opens a pending human review panel. The user can approve, revise, or reject the recommendation.

## Safety And Privacy

PaletteMe is designed to give color and shopping guidance only. It does not diagnose skin conditions or make medical claims. Future photo analysis would require explicit consent. The prototype uses local browser storage and keeps sensitive configuration such as API keys out of the public repository.

## What I Learned

This project helped me turn the course concepts into a working product:

- how to structure agent behavior as reusable skills
- how to combine deterministic local logic with optional LLM refinement
- how to design human-in-the-loop checkpoints
- how to think about safety and privacy in a consumer AI product
- how to document and deploy an AI agent prototype for evaluation

## Future Work

- Connect the public web demo to a hosted Cloud Run agent backend
- Add a richer product shade database
- Add optional photo-based color analysis with consent
- Improve evaluation cases for personalization and safety
- Add user accounts and saved palette history
