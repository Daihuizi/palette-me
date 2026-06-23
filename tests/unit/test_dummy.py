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
"""Unit tests for PaletteMe's deterministic ADK tool logic."""

from adk_app.agent import (
    analyze_undertone_profile,
    build_makeup_look,
    check_purchase_fit,
    match_owned_products,
)


def test_analyze_undertone_profile_returns_palette_families() -> None:
    result = analyze_undertone_profile(
        undertone="cool",
        depth="light",
        contrast="soft",
        style_goal="daily clean makeup",
    )

    assert result["status"] == "success"
    assert "mauve" in result["recommended_families"]["eyeshadow"]
    assert "soft berry" in result["recommended_families"]["lip"]


def test_match_owned_products_reports_keyword_matches() -> None:
    result = match_owned_products(
        owned_products="rose nude lipstick, taupe eyeshadow, peach blush",
        desired_color_family="rose nude",
    )

    assert result["status"] == "success"
    assert result["confidence"] == "medium"
    assert "rose" in result["matched_keywords"]


def test_build_makeup_look_uses_profile_direction() -> None:
    result = build_makeup_look(
        occasion="work",
        undertone="warm",
        owned_products="warm brown palette, peach blush, brick rose lip",
    )

    assert result["status"] == "success"
    assert "eyes" in result["look"]
    assert "blush" in result["look"]
    assert "lip" in result["look"]


def test_check_purchase_fit_flags_risky_shade() -> None:
    result = check_purchase_fit(
        undertone="cool",
        current_collection="rose nude lipstick, mauve blush",
        product_name="Example Lip Tint",
        shade_description="strong orange coral",
    )

    assert result["status"] == "success"
    assert result["decision"] == "test first"
