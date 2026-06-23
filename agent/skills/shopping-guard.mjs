import { getShadeFamilies } from "./undertone-analysis.mjs";
import { findSimilarProduct } from "./shade-matching.mjs";

export function evaluatePurchase({ profile, products, product, shade }) {
  const shadeFamilies = getShadeFamilies(profile);
  const shadeLower = String(shade || "").toLowerCase();
  const ownedSimilar = findSimilarProduct(products, shadeLower);
  const matchesProfile = shadeFamilies.some((family) => shadeLower.includes(family.split(" ")[0]));
  const alternatives = getAlternativeShades(profile);

  if (ownedSimilar) {
    return {
      decision: "maybe_skip",
      label: "Maybe skip",
      ownedSimilar,
      matchesProfile,
      alternatives,
      advice: `${product || "This product"} sounds close to your existing ${ownedSimilar.name} in ${ownedSimilar.shade}. Buy only if the finish or use case is clearly different. Safer alternatives: ${alternatives.join(", ")}.`,
    };
  }

  if (matchesProfile) {
    return {
      decision: "good_candidate",
      label: "Good candidate",
      ownedSimilar: null,
      matchesProfile,
      alternatives,
      advice: `${shade} fits your ${profile.undertone} direction and could connect your eye, cheek, and lip palette. Nearby safe shades: ${alternatives.join(", ")}.`,
    };
  }

  return {
    decision: "think_twice",
    label: "Think twice",
    ownedSimilar: null,
    matchesProfile,
    alternatives,
    advice: `${shade || "This shade"} does not strongly match your current best shade families: ${shadeFamilies.join(", ")}. Try it in store or look for a mini size first. Better options: ${alternatives.join(", ")}.`,
  };
}

function getAlternativeShades(profile) {
  const map = {
    warm: ["soft peach blush", "warm rose lipstick", "terracotta nude lip"],
    cool: ["muted rose lipstick", "berry rose tint", "cool mauve blush"],
    neutral: ["rose brown lipstick", "soft nude blush", "dusty pink tint"],
    olive: ["warm rose lipstick", "bronze cream shadow", "muted peach blush"],
    muted: ["soft mauve tint", "milk tea brown shadow", "blurred berry lip"],
  };
  return map[profile.undertone] || map.neutral;
}
