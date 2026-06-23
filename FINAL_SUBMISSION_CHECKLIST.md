# PaletteMe Final Submission Checklist

## Required Links

- Kaggle competition: `https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google`
- Kaggle writeups page: `https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/writeups`
- GitHub repository: `https://github.com/Daihuizi/palette-me`
- Local demo: `http://127.0.0.1:8787`
- GitHub Pages live demo: `https://daihuizi.github.io/palette-me/`
- Video submission: https://youtu.be/dmeHJhktWMM

## Kaggle Submission Deadline

Official competition page says:

- Submission deadline: Monday, July 6, 2026 at 11:59 PM PT
- Submission format: Kaggle writeup documenting the agent
- Required writeup contents: video explaining the agent, brief rationale for building it, and link to the code used to build the agent

Use `KAGGLE_WRITEUP.md` as the copy/paste draft.

## Before Recording

- Run `npm start`.
- Open `http://127.0.0.1:8787`.
- Click `Reset demo`.
- Confirm the default shelf appears:
  - Soft Taupe Eye Quad
  - Dusty Rose Cream Blush
  - Rose Nude Lip Tint
  - Soft Focus Cushion
- Confirm `Before I buy` contains:
  - `Viral Coral Lipstick`
  - `bright orange coral`

## Video Must Show

- The product problem: generic makeup advice leads to wrong shades and returns.
- The user's beauty profile and saved makeup shelf.
- `Generate look`.
- Changing undertone updates the AI look plan.
- `Before I buy` checks the viral coral lipstick.
- Safer alternative shades appear.
- `Pending human review` appears.
- Click `Revise` to show human-in-the-loop.
- End with privacy and safety footer.

## What To Say Clearly

- PaletteMe is an AI personal makeup palette assistant.
- It uses reusable agent skills for undertone analysis, shade matching, look building, and shopping checks.
- Gemini can refine recommendations when configured, and local skills keep the demo reliable.
- Risky recommendations use human-in-the-loop instead of automatic decisions.
- The repository includes ADK prototype code, safety rules, and eval-ready tests.

## Technical Checks

- `node -c app.js`
- `node -c agent/skills/shopping-guard.mjs`
- `uv run pytest tests/unit/test_dummy.py tests/integration/test_agent.py`
- `git status --short` should be clean before final submission.

## GitHub Pages Setup

The public static demo is live at:

```text
https://daihuizi.github.io/palette-me/
```

If Pages ever needs to be re-enabled:

1. Open the GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Set `Build and deployment` source to `GitHub Actions`.
4. Go to `Actions`.
5. Run or wait for `Deploy static demo to GitHub Pages`.
6. Use the generated Pages URL in the submission form.

## Final Confidence Check

- README explains the project in the first screen.
- Demo video is under 90 seconds.
- No API key is shown in video, code, README, or commit history.
- The project page looks like a product, not a course notes page.
- The technical details are in GitHub docs, not cluttering the app UI.
