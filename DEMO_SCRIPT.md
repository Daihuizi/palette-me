# PaletteMe Demo Script

## Demo Goal

Show PaletteMe as a working AI personal makeup palette assistant that applies agent skills, Gemini integration, ADK structure, safety guards, human-in-the-loop, and eval thinking.

## Before Demo

Start the local app:

```bash
cd /Users/daihuizizhu/Documents/Codex/Projects/PaletteMe
npm start
```

Open:

```text
http://127.0.0.1:8787
```

If the page already has old demo data, click `Reset demo`.

## 60-Second Script

PaletteMe is an AI personal makeup palette assistant. The problem is that many makeup users buy shades that look good online, but do not fit their undertone, style, or existing products.

Here the user has a cool, light, soft everyday profile. PaletteMe records the products she already owns: a cool taupe eye palette, dusty rose blush, rose nude lip tint, and a soft base product.

When I click `Generate look`, the agent creates a coordinated eye, cheek, and lip direction. It is not just recommending random products; it reasons over undertone, skin depth, style, occasion, and the user's own shelf.

Then I use `Before I buy` to check a viral orange coral lipstick. PaletteMe warns that this shade may not fit the cool palette and helps the user avoid another return.

The lower sections show the agent design: reusable skills, human-in-the-loop review, safety and privacy rules, and a training camp map. The project also includes Gemini refinement, an ADK prototype, safety guards, and eval cases.

## 90-Second Script

PaletteMe is an AI personal makeup palette assistant for people who struggle to know which shades actually fit them. A lot of makeup advice online is generic, but color is personal: undertone, skin depth, contrast, style, and existing products all matter.

In the demo, the user starts with a cool undertone, light skin depth, combination skin, and a soft everyday style. The shelf already has a cool taupe eye quad, dusty rose blush, rose nude lip tint, and a soft focus cushion.

When I click `Generate look`, PaletteMe builds a look plan from the user's own palette. It recommends color families, a daily recipe, shopping guardrails, and what to avoid. If Gemini is available in `.env`, the recommendation is refined through Gemini; otherwise the app falls back to local deterministic skills.

Next, I check a possible purchase: a viral bright orange coral lipstick. PaletteMe compares it with the user's profile and existing shelf. The goal is not to push more buying; the goal is to reduce waste, duplicates, and returns.

Below the demo, the Agent section shows the reusable skills: undertone analysis, shade matching, look building, shopping guard, safety guard, and human review. The Human-in-the-loop section shows that sensitive decisions can become approve, revise, or reject checkpoints. The Safety section explains privacy, consent, and no-medical-diagnosis rules.

Finally, the Training Camp Map connects the project to the five units: vibe coding, agent tools, skills, safety/eval, and spec-driven production development. This is why PaletteMe is more than a static webpage: it is a product prototype with an agent architecture and a path to deployment.

## Click Path

1. Click `Reset demo`.
2. Point to `Beauty profile`.
3. Point to `My makeup shelf`.
4. Click `Generate look`.
5. Point to `Local Agent API` mode in the recommendation panel.
6. In `Before I buy`, keep the default:
   - Product: `Viral Coral Lipstick`
   - Shade: `bright orange coral`
7. Click `Check`.
8. Scroll to `Agent design`.
9. Scroll to `Human-in-the-loop`.
10. Scroll to `Safety and privacy rules`.
11. Scroll to `Training camp map`.
12. End at `Judge demo`.

## If The Network Or Gemini Fails

Say:

PaletteMe is designed to degrade gracefully. If Gemini or network access is unavailable, the local skill pipeline still produces a recommendation, and the interface remains demo-ready.

## One-Sentence Close

PaletteMe turns a messy makeup shelf into a personal color system, using agent skills, safety guardrails, human review, and eval-ready structure.
