import { getShadeFamilies } from "./skills/undertone-analysis.mjs";
import { matchOwnedProducts } from "./skills/shade-matching.mjs";
import { buildLookPlan } from "./skills/look-builder.mjs";
import { evaluatePurchase } from "./skills/shopping-guard.mjs";

export function analyzePalette(input) {
  const profile = normalizeProfile(input.profile);
  const products = Array.isArray(input.products) ? input.products : [];
  const shadeFamilies = getShadeFamilies(profile);
  const matchedProducts = matchOwnedProducts(products, shadeFamilies);
  const lookPlan = buildLookPlan({ profile, products, shadeFamilies, matchedProducts });
  const duplicateSignals = evaluatePurchase({
    profile,
    products,
    product: "",
    shade: shadeFamilies[0],
  });

  return {
    agent: "PaletteMe local agent",
    mode: "local-simulated",
    score: lookPlan.score,
    shadeFamilies,
    sections: [
      {
        title: "Best shade families",
        body: `${shadeFamilies.join(", ")}. These colors fit a ${profile.depth} depth and ${profile.undertone} undertone direction.`,
      },
      {
        title: "Today's look recipe",
        body: lookPlan.recipe,
      },
      {
        title: "Shopping guard",
        body: duplicateSignals.ownedSimilar
          ? `Your shelf already has related tones. Buy only if texture, finish, or occasion is clearly different.`
          : "Your shelf has room for one more core shade that connects eye, cheek, and lip products.",
      },
      {
        title: "What to avoid",
        body: "Avoid shades that do not share warmth, depth, or softness with the rest of your palette.",
      },
    ],
    skillTrace: [
      "Undertone Analysis Skill",
      "Shade Matching Skill",
      "Look Builder Skill",
      "Shopping Guard Skill",
    ],
  };
}

export function checkPurchase(input) {
  const profile = normalizeProfile(input.profile);
  const products = Array.isArray(input.products) ? input.products : [];
  const result = evaluatePurchase({
    profile,
    products,
    product: input.product || "This product",
    shade: input.shade || "",
  });

  return {
    agent: "PaletteMe local agent",
    mode: "local-simulated",
    ...result,
  };
}

function normalizeProfile(profile = {}) {
  return {
    undertone: profile.undertone || "neutral",
    depth: profile.depth || "medium",
    skinType: profile.skinType || "combination",
    style: profile.style || "soft",
    occasion: profile.occasion || "everyday wear",
  };
}
