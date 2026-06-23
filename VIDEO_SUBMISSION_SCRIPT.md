# PaletteMe Final Video Submission Script

Target length: 60 to 90 seconds.

Recording page:

```text
http://127.0.0.1:8787
```

Before recording, run `npm start`, open the page, and click `Reset demo`.

## Exact Recording Flow

### 0-8s: Open On Hero

Action:

- Start at the top of the page.
- Move the cursor over `PaletteMe`, then the three small product tags.

Say:

PaletteMe is an AI personal makeup palette assistant. It helps users track what they already own, find their best shade families, and avoid buying colors that do not fit.

### 8-18s: Scroll To Demo

Action:

- Click `Open demo` or scroll to `Live product demo`.
- Pause over `Beauty profile`.
- Pause over `My makeup shelf`.

Say:

This demo user has a cool undertone, light skin depth, and a soft everyday style. PaletteMe also remembers her makeup shelf, including cool taupe eyeshadow, dusty rose blush, and rose nude lip tint.

### 18-34s: Generate Look

Action:

- Click `Generate look`.
- Pause on `AI look plan`.
- Point to `Live profile signal` or `Live local skills`.

Say:

When I generate a look, the agent creates a coordinated eye, cheek, and lip plan from the user's own profile and products. It uses reusable skills for undertone analysis, shade matching, look building, and shopping checks.

### 34-46s: Show Dynamic Personalization

Action:

- Change `Undertone` from `Cool` to `Warm`.
- Pause on the changed shade families.
- Change it back to `Cool`.

Say:

This is not a fixed page. When I change the undertone, the live profile analysis and shade families update immediately, so the recommendation follows the user.

### 46-63s: Before I Buy

Action:

- Move to `Before I buy`.
- Keep the default `Viral Coral Lipstick` and `bright orange coral`.
- Click `Check`.
- Pause on the result and safer alternatives.

Say:

Before buying a viral bright orange coral lipstick, PaletteMe checks whether it fits this cool palette. Instead of only saying no, it suggests safer alternatives like muted rose, berry rose, or cool mauve.

### 63-78s: Human-In-The-Loop

Action:

- Pause on `Pending human review`.
- Click `Revise`.
- Pause on the review outcome.

Say:

For risky recommendations, PaletteMe uses human-in-the-loop. The AI can suggest, but a person can approve, revise, or reject before acting.

### 78-90s: Close

Action:

- Scroll just enough to show the privacy and safety footer, or stay on the demo if time is short.

Say:

The repository includes the Gemini refinement layer, ADK prototype, safety rules, and eval-ready tests. PaletteMe is a product-first AI agent demo with a clear path to deployment.

## If Gemini Status Shows Fallback

Say:

This shows the reliable local fallback. When Gemini is configured, it can refine the recommendation, but the core product flow still works without depending on a live model call.

## Final Links To Mention In Submission

- GitHub: `https://github.com/Daihuizi/palette-me`
- GitHub Pages target: `https://daihuizi.github.io/palette-me/`
- Local demo: `http://127.0.0.1:8787`
- Main docs: `README.md`, `SUBMISSION.md`, `TECHNICAL_MAPPING.md`, `EVALUATION.md`
