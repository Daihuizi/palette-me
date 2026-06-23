# PaletteMe Competition Pitch

## One-Sentence Pitch

PaletteMe is an AI personal makeup palette assistant that helps users track owned products, discover their best shade families, build cohesive looks, and avoid buying duplicate or unsuitable makeup.

## The Problem

Buying makeup is personal, but most recommendations are generic. A shade can look beautiful on social media and still look wrong on the user. Many users end up with products that do not match their undertone, do not work together, or repeat colors they already own.

## The Solution

PaletteMe gives each user a personal palette memory:

- what products they already own
- what color families suit their undertone and style
- which eye, cheek, and lip products work together
- whether a future product is worth buying

Instead of only recommending more products, PaletteMe first understands the user's existing shelf.

## Demo Script

1. Open PaletteMe and show the hero: "This is an AI assistant for personal makeup color matching."
2. Scroll to the beauty profile and choose undertone, skin depth, skin type, style, and occasion.
3. Add a product to the makeup shelf, such as "Velvet Peach Blush" with shade "peach coral."
4. Generate the AI look plan and show the coordinated eye, cheek, and lip recommendation.
5. Use "Before I buy" to check a similar shade and show how PaletteMe warns about duplicate purchases.
6. Scroll to Agent, Human-in-the-loop, Safety, and Training Camp Map to show how the project applies the course concepts.
7. Explain that the current demo has a local agent API, optional Gemini refinement, ADK tools, eval cases, and a Cloud Run deployment path.

## Why This Uses Agent Thinking

PaletteMe is not just a chatbot. It is a task-focused assistant with reusable skills:

- shade matching
- look building
- shopping guardrails
- product research
- safety and evaluation
- human review checkpoints

The agent's job is to reason over the user's own makeup inventory, not only answer generic beauty questions.

## Training Camp Concepts

- Unit 1: Vibe coding and product framing from a real user pain point.
- Unit 2: Tool interoperability between the web app, local API, Gemini SDK, and ADK.
- Unit 3: Reusable agent skills for analysis, matching, look building, and shopping checks.
- Unit 4: Safety guards, human-in-the-loop checkpoints, and eval cases.
- Unit 5: Spec-driven project materials, tests, GitHub history, and deployment plan.

## Impact

PaletteMe can help users save money, reduce product waste, and feel more confident choosing colors that fit their real face, lifestyle, and existing collection.
