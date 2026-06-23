# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from __future__ import annotations

import os
from pathlib import Path

from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types


def _load_local_env() -> None:
    """Load local .env values for prototype runs without adding a dependency."""

    env_path = Path(__file__).resolve().parents[1] / ".env"
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key:
            os.environ[key] = value


_load_local_env()
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "False"
os.environ["GOOGLE_GENAI_USE_ENTERPRISE"] = "False"
if os.environ.get("GEMINI_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.environ["GEMINI_API_KEY"]


def analyze_undertone_profile(
    undertone: str,
    depth: str,
    contrast: str,
    style_goal: str,
) -> dict:
    """Analyze a user's makeup color direction from profile traits.

    Args:
        undertone: User undertone, such as cool, warm, neutral, olive, or unknown.
        depth: User depth, such as fair, light, medium, tan, deep, or unknown.
        contrast: User contrast level, such as soft, medium, high, or unknown.
        style_goal: Desired makeup feeling, such as daily, romantic, clean, or bold.

    Returns:
        A palette direction with color families and avoid notes.
    """

    undertone_key = undertone.lower()
    depth_key = depth.lower()
    contrast_key = contrast.lower()

    if "cool" in undertone_key:
        eyes = ["taupe", "rose brown", "mauve", "soft plum"]
        blush = ["dusty rose", "cool pink", "berry milk"]
        lips = ["rose beige", "mauve pink", "soft berry"]
        avoid = ["strong orange", "yellow coral", "neon peach"]
    elif "warm" in undertone_key:
        eyes = ["camel beige", "warm brown", "copper", "terracotta"]
        blush = ["apricot", "warm peach", "ginger rose"]
        lips = ["peach nude", "brick rose", "warm tea"]
        avoid = ["icy pink", "blue-based fuchsia", "gray mauve"]
    elif "olive" in undertone_key:
        eyes = ["khaki taupe", "moss brown", "antique gold", "muted bronze"]
        blush = ["neutral peach", "soft terracotta", "muted rose"]
        lips = ["brown rose", "cinnamon nude", "muted red bean"]
        avoid = ["chalky pastel", "too-gray mauve", "white-based pink"]
    else:
        eyes = ["neutral beige", "soft brown", "rose taupe", "champagne"]
        blush = ["neutral rose", "peach rose", "soft pink beige"]
        lips = ["rose nude", "milk tea", "neutral berry"]
        avoid = ["very gray shades", "very neon shades"]

    if "deep" in depth_key or "tan" in depth_key:
        lips = [*lips, "brown red", "deep rose"]
        blush = [*blush, "warm berry"]
    if "high" in contrast_key:
        eyes = [*eyes, "defined espresso liner"]
        lips = [*lips, "clear rose red"]

    return {
        "status": "success",
        "profile": {
            "undertone": undertone or "unknown",
            "depth": depth or "unknown",
            "contrast": contrast or "unknown",
            "style_goal": style_goal or "daily wearable",
        },
        "recommended_families": {
            "eyeshadow": eyes,
            "blush": blush,
            "lip": lips,
        },
        "avoid_or_test_first": avoid,
    }


def match_owned_products(owned_products: str, desired_color_family: str) -> dict:
    """Classify the user's existing products against a desired color family.

    Args:
        owned_products: Plain-text list of products, shades, or palette notes.
        desired_color_family: Target family such as rose nude, warm peach, or mauve.

    Returns:
        A simple keep/test/skip sorting plan for the user's vanity.
    """

    text = owned_products.lower()
    target = desired_color_family.lower()
    keep_markers = [word for word in target.replace(",", " ").split() if len(word) > 3]

    matched = [marker for marker in keep_markers if marker in text]
    confidence = "medium" if matched else "low"

    return {
        "status": "success",
        "target_family": desired_color_family,
        "confidence": confidence,
        "matched_keywords": matched,
        "vanity_plan": {
            "keep": "Products that share the matched keywords or sit close to the target family.",
            "test_in_daylight": "Shades that look close but may shift too orange, gray, or bright on skin.",
            "pause_buying": "Near-duplicates until the user confirms gaps in eyeshadow, blush, and lip.",
        },
    }


def build_makeup_look(
    occasion: str,
    undertone: str,
    owned_products: str,
) -> dict:
    """Build a cohesive makeup look using profile and owned product context.

    Args:
        occasion: Scenario such as work, school, date, interview, or weekend.
        undertone: User undertone.
        owned_products: Plain-text list of products available to use.

    Returns:
        A practical look plan for eyes, blush, lips, and checks.
    """

    profile = analyze_undertone_profile(
        undertone=undertone,
        depth="unknown",
        contrast="unknown",
        style_goal=occasion,
    )
    families = profile["recommended_families"]

    return {
        "status": "success",
        "occasion": occasion or "daily",
        "look": {
            "eyes": f"Use {families['eyeshadow'][0]} as the base and {families['eyeshadow'][1]} near the lash line.",
            "blush": f"Keep cheeks in the {families['blush'][0]} family for harmony.",
            "lip": f"Choose {families['lip'][0]} or {families['lip'][1]} so the face reads as one palette.",
        },
        "owned_product_note": "Use the user's listed products first before suggesting shopping.",
        "input_products": owned_products,
    }


def check_purchase_fit(
    undertone: str,
    current_collection: str,
    product_name: str,
    shade_description: str,
) -> dict:
    """Give a buy/test/skip recommendation for a makeup product.

    Args:
        undertone: User undertone.
        current_collection: Existing products or color families the user already owns.
        product_name: Product name the user is considering.
        shade_description: Shade name or color description.

    Returns:
        A shopping guard result with a recommendation and reason.
    """

    shade = shade_description.lower()
    profile = analyze_undertone_profile(
        undertone=undertone,
        depth="unknown",
        contrast="unknown",
        style_goal="shopping",
    )
    avoid_words = " ".join(profile["avoid_or_test_first"]).lower().split()
    should_test = any(word in shade for word in avoid_words if len(word) > 3)
    duplicate_hint = any(
        word in current_collection.lower()
        for word in shade.replace(",", " ").split()
        if len(word) > 4
    )

    if should_test:
        decision = "test first"
        reason = "The shade may sit outside the user's most reliable color direction."
    elif duplicate_hint:
        decision = "pause"
        reason = "It may duplicate a color already in the user's collection."
    else:
        decision = "consider"
        reason = "It appears compatible enough to swatch or compare with the current palette."

    return {
        "status": "success",
        "product": product_name,
        "shade": shade_description,
        "decision": decision,
        "reason": reason,
        "human_review_required": decision in {"pause", "test first"},
        "safety_note": "This is beauty guidance, not medical, dermatology, or allergy advice.",
    }


def safety_guard_check(user_message: str) -> dict:
    """Check whether a user request needs a safety boundary or human review.

    Args:
        user_message: The user's message or request to screen.

    Returns:
        A guardrail result that says whether the agent can answer normally,
        should add a safety boundary, or should request human review.
    """

    text = user_message.lower()
    medical_terms = [
        "allergy",
        "allergic",
        "swollen",
        "swelling",
        "itchy",
        "rash",
        "infection",
        "eczema",
        "dermatitis",
        "skin disease",
        "diagnose",
    ]
    photo_terms = ["photo", "face image", "selfie", "upload my face", "face photo"]
    appearance_terms = ["ugly", "fix my face", "bad skin tone", "look worse"]

    triggered = []
    if any(term in text for term in medical_terms):
        triggered.append("medical_boundary")
    if any(term in text for term in photo_terms):
        triggered.append("photo_privacy_consent")
    if any(term in text for term in appearance_terms):
        triggered.append("appearance_sensitivity")

    if "medical_boundary" in triggered:
        action = "handoff_recommended"
        response_boundary = (
            "Do not diagnose or identify a medical cause. Encourage the user to "
            "stop using the product and consult a qualified professional for "
            "swelling, allergy, or serious irritation."
        )
    elif "photo_privacy_consent" in triggered:
        action = "consent_required"
        response_boundary = (
            "Explain that photo analysis requires explicit consent, clear purpose, "
            "minimal storage, and an option to delete images."
        )
    elif "appearance_sensitivity" in triggered:
        action = "answer_with_care"
        response_boundary = (
            "Avoid appearance judgment. Reframe advice around user preference, "
            "comfort, color harmony, and confidence."
        )
    else:
        action = "proceed"
        response_boundary = "No special safety boundary detected."

    return {
        "status": "success",
        "action": action,
        "triggered_rules": triggered,
        "response_boundary": response_boundary,
    }


def request_human_review(
    situation: str,
    proposed_action: str,
    risk_level: str,
) -> dict:
    """Create a human-in-the-loop review checkpoint for sensitive decisions.

    Args:
        situation: The user situation that needs review.
        proposed_action: What the agent would do if approved.
        risk_level: Low, medium, or high risk.

    Returns:
        A pending review record that the UI or operator can approve, revise, or reject.
    """

    normalized_risk = risk_level.lower()
    if normalized_risk not in {"low", "medium", "high"}:
        normalized_risk = "medium"

    next_steps = {
        "low": "User can confirm the recommendation before saving or buying.",
        "medium": "Ask the user to confirm context, preferences, and comfort before proceeding.",
        "high": "Pause the agent action and route the user to a qualified person or explicit consent step.",
    }

    return {
        "status": "pending_human_review",
        "situation": situation,
        "proposed_action": proposed_action,
        "risk_level": normalized_risk,
        "review_options": ["approve", "revise", "reject"],
        "recommended_next_step": next_steps[normalized_risk],
    }


PALETTEME_INSTRUCTION = """
You are PaletteMe, a personal makeup palette agent for a competition prototype.

Your job:
- Help users record their existing makeup palette.
- Analyze undertone, depth, contrast, style goals, and owned products.
- Recommend coordinated eyeshadow, blush, and lip color families.
- Help users avoid buying duplicate or mismatched products.
- Use safety guardrails and human review checkpoints for sensitive requests.

How to work:
- First consider whether the request needs safety_guard_check.
- Use the available tools when the user asks for shade analysis, product sorting,
  look building, or purchase decisions.
- Use request_human_review when the user asks for medical-like guidance, photo
  analysis/storage, or a high-impact purchase decision that should not be made
  automatically.
- Prefer practical, wearable recommendations over vague beauty language.
- Explain uncertainty clearly when undertone, lighting, skin depth, or product
  details are missing.
- Do not invent exact retail availability, prices, or product claims.
- Do not give medical, dermatology, allergy, or skin diagnosis advice.
- Keep the tone warm, concise, and confidence-building.
"""

ADK_MODEL = os.environ.get("PALETTEME_ADK_MODEL", "gemini-3.5-flash")


root_agent = Agent(
    name="palette_me_agent",
    model=Gemini(
        model=ADK_MODEL,
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=PALETTEME_INSTRUCTION,
    description="Analyzes personal makeup palettes and recommends cohesive color families.",
    tools=[
        analyze_undertone_profile,
        match_owned_products,
        build_makeup_look,
        check_purchase_fit,
        safety_guard_check,
        request_human_review,
    ],
)

app = App(
    root_agent=root_agent,
    name="adk_app",
)
