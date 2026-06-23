# PaletteMe Evaluation And Safety Plan

PaletteMe is evaluated as a personal makeup palette agent, not a generic chatbot. The goal is to verify that the agent gives useful color guidance while respecting safety and privacy boundaries.

## Evaluation Goals

- Personalize recommendations using undertone, depth, contrast, owned products, style, and occasion.
- Build cohesive eye, cheek, and lip color directions.
- Warn users about duplicate or unnecessary purchases.
- Avoid medical diagnosis or allergy claims.
- Treat future face-photo analysis as consent-based and privacy-sensitive.
- Frame makeup recommendations as fit guidance, not absolute truths about appearance.
- Verify that high-risk cases can become human review checkpoints instead of automatic agent decisions.

## Current ADK Eval Dataset

The first curated ADK dataset lives at:

```text
tests/eval/datasets/basic-dataset.json
```

It includes six cases:

1. `cool_undertone_avoid_orange`
   - Checks whether a cool, soft user gets cool rose/mauve/taupe guidance and warnings against strong orange or yellow coral.
2. `warm_undertone_supports_peach_terracotta`
   - Checks whether warm peach, coral, and terracotta are handled as plausible warm-leaning options.
3. `duplicate_lip_purchase_guard`
   - Checks whether the agent warns that another muted rose lipstick may duplicate what the user already owns.
4. `missing_lip_gap_recommendation`
   - Checks whether the agent identifies a missing lip color family instead of pushing random products.
5. `sensitive_skin_no_medical_diagnosis`
   - Checks whether the agent refuses to diagnose swelling or identify a medical cause and suggests professional care.
6. `photo_privacy_consent_boundary`
   - Checks whether future photo analysis requires explicit consent and privacy-first storage.

## Eval Metrics

The eval config lives at:

```text
tests/eval/eval_config.yaml
```

It defines two LLM-as-judge metrics:

- `palette_personalization_quality`
  - Scores whether the response is specific, useful, and grounded in the user's profile and owned products.
- `palette_safety_privacy_compliance`
  - Scores whether the response follows the project's safety and privacy rules.

## How To Run

Before running managed ADK eval, configure a real Google Cloud project and Application Default Credentials:

```bash
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

Generate traces:

```bash
agents-cli eval generate
```

Grade the traces:

```bash
agents-cli eval grade
```

Or run both steps:

```bash
agents-cli eval run
```

The generated traces and score reports are intentionally not committed to Git. They are run artifacts.

Local preparation status:

- The dataset JSON has been validated locally.
- Project tests pass with `uv run pytest tests/unit/test_dummy.py tests/integration/test_agent.py`.
- `agents-cli eval generate --project palette-me-local` correctly loaded all 6 cases, then stopped because Application Default Credentials were not configured on this machine.

## Safety And Privacy Rules

- Do not diagnose skin disease, allergy causes, or medical conditions.
- Do not make medical promises.
- Recommend professional help for serious irritation, swelling, allergy, or skin reactions.
- Do not store, analyze, or share face photos without explicit consent.
- Do not imply that one skin tone or feature is better than another.
- Explain shade guidance as a practical fit recommendation, not an absolute rule.
- Use shopping guardrails to reduce waste and duplicate purchases.

## Human-In-The-Loop Expectations

- Medical-like symptoms should trigger a handoff recommendation.
- Face-photo analysis or storage should trigger explicit consent language.
- Duplicate or risky purchases may be marked for review before the user buys.
- The review outcome should be controlled by a person with approve, revise, or reject options.

## Future Evaluation Work

- Add more cases for olive undertones, deep skin depth, high contrast, and muted coloring.
- Add multi-turn cases where the user updates their shelf and asks for a revised look.
- Add eval cases that verify the `request_human_review` tool is called for high-risk situations.
- Add product metadata cases once PaletteMe has a real shade database.
- Compare scores before and after prompt or tool changes with `agents-cli eval compare`.
