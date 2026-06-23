# PaletteMe Video Submission Script

## Video Target

Length: 60 to 90 seconds.

Goal: Show that PaletteMe is a working AI agent prototype, not only a static webpage. The video should demonstrate the product flow, dynamic personalization, agent skills, safety, human-in-the-loop, and eval readiness.

## Recording Setup

Before recording:

```bash
cd /Users/daihuizizhu/Documents/Codex/Projects/PaletteMe
npm start
```

Open:

```text
http://127.0.0.1:8787
```

Click `Reset demo` before recording so the default story is clean.

Recommended recording window:

- Browser only, no terminal needed.
- Zoom level: 100%.
- Keep the mouse movement slow and intentional.
- Do one full practice run before recording.

## 75-Second Timeline

### 0-8s: Opening

Screen:

- Start at the hero section.

Say:

PaletteMe is an AI personal makeup palette assistant. It helps users track the makeup they already own, find their best shade families, and avoid buying colors that do not fit them.

Action:

- Move the cursor briefly over the title and `Open demo`.

### 8-20s: Beauty Profile And Shelf

Screen:

- Scroll or click to the demo area.
- Show `Beauty profile` and `My makeup shelf`.

Say:

Here the demo user has a cool undertone, light skin depth, and a soft everyday style. PaletteMe also remembers the user's existing shelf: cool taupe eyeshadow, dusty rose blush, rose nude lip tint, and a soft base product.

Action:

- Point to the profile fields.
- Point to the product cards.

### 20-35s: Generate AI Look Plan

Screen:

- Show `AI look plan`.

Say:

When I click Generate look, the agent creates a coordinated eye, cheek, and lip plan from the user's own profile and products. It is not just a generic beauty chatbot; it uses reusable agent skills.

For the video, I am using prepared demo data so the flow is easy to follow. Watch what happens when I change undertone: the profile signal, best shade families, and avoid list update immediately, then the agent recommendation can refine the same flow.

Action:

- Click `Generate look`.
- Pause briefly on the recommendation cards.
- Change `Undertone` from `Cool` to `Warm`, then back to `Cool`.
- Point to the updated `Live profile signal` / shade family text.
- Point to the `Local Agent API` / `gemini-assisted` status if visible.

If the status shows `local-simulated:gemini-fallback`, say:

This shows the local agent fallback mode. If Gemini is available, the same flow can be refined by Gemini, but the demo still works reliably without network dependency.

### 35-48s: Before I Buy

Screen:

- Show `Before I buy`.

Say:

Next, I check a viral bright orange coral lipstick before buying it. Because this user has a cool palette, PaletteMe can warn that the color may be risky or unnecessary before the user wastes money.

Action:

- Keep the default:
  - `Viral Coral Lipstick`
  - `bright orange coral`
- Click `Check`.
- Pause on the result and the `Pending human review` panel.
- Click `Revise` to show that the human can change the next step.

Say:

This is the human-in-the-loop moment. The AI can suggest that this purchase is risky, but the final action is not automatic. A person can approve, revise, or reject the recommendation.

### 48-62s: Agent Skills, HITL, Safety

Screen:

- Scroll to `Agent design`.
- Continue to `Human-in-the-loop`.
- Continue to `Safety and privacy rules`.

Say:

Under the demo, the project shows its agent architecture: undertone analysis, shade matching, look building, shopping guard, safety guard, and human review. Sensitive cases can become approve, revise, or reject checkpoints instead of automatic AI decisions.

Action:

- Scroll steadily.
- Do not stop too long on each card.

### 62-75s: Close

Screen:

- End around `Safety and privacy rules`, or return briefly to the demo panel.

Say:

The training camp concepts are built into the product behavior: reusable skills power the look plan, safety guards shape the boundaries, human-in-the-loop controls risky decisions, and eval-ready cases help test the agent. PaletteMe is a product prototype with a path to deployment, not just a static page.

Action:

- Pause on the safety cards or the live demo.

## Shorter 60-Second Version

Use this if the video limit is strict:

PaletteMe is an AI personal makeup palette assistant. It helps users track owned products, discover fitting shade families, and avoid duplicate or unsuitable purchases.

This demo user has a cool, light, soft everyday profile and a shelf with cool taupe eyeshadow, dusty rose blush, rose nude lip tint, and a soft base product.

When I click Generate look, PaletteMe creates a coordinated eye, cheek, and lip plan using agent skills like undertone analysis, shade matching, look building, and shopping guard. If I change undertone, the analysis updates immediately.

Then I check a viral bright orange coral lipstick before buying it. The agent compares it with the user's cool palette and helps prevent a risky purchase.

The lower sections show the product's agent design, human-in-the-loop behavior, and safety and privacy rules. The project includes Gemini refinement, an ADK prototype, safety guards, human review checkpoints, and eval-ready cases.

## What To Show If Gemini Is Working

Point to:

```text
Local Agent API · gemini-assisted:gemini-3.5-flash
```

Say:

When Gemini is available, PaletteMe uses Gemini to refine the recommendation while keeping local skills as the structured source of truth.

## What To Say If Gemini Is Not Working

Say:

The demo is designed to be reliable. If Gemini or network access is unavailable, PaletteMe falls back to local deterministic skills so the product flow still works.

## Final Submission Links To Mention

- GitHub repository: `https://github.com/Daihuizi/palette-me`
- Local demo path: `http://127.0.0.1:8787`
- Main docs: `README.md`, `SUBMISSION.md`, `TECHNICAL_MAPPING.md`, `EVALUATION.md`

## Recording Checklist

- `npm start` is running.
- Browser is on `http://127.0.0.1:8787`.
- Click `Reset demo`.
- Product defaults are visible.
- `Generate look` works.
- Changing `Undertone` updates the AI look analysis.
- `Before I buy` has default viral coral example.
- Scroll sections are visible:
  - Agent design
  - Human-in-the-loop
  - Safety and privacy rules
- Video is under 90 seconds.
