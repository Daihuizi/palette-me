import { getShadeFamilies } from "./undertone-analysis.mjs";
import { findSimilarProduct } from "./shade-matching.mjs";

export function evaluatePurchase({ profile, products, product, shade }) {
  const shadeFamilies = getShadeFamilies(profile);
  const shadeLower = String(shade || "").toLowerCase();
  const ownedSimilar = findSimilarProduct(products, shadeLower);
  const matchesProfile = shadeFamilies.some((family) => shadeLower.includes(family.split(" ")[0]));

  if (ownedSimilar) {
    return {
      decision: "maybe_skip",
      label: "Maybe skip",
      ownedSimilar,
      matchesProfile,
      advice: `${product || "This product"} sounds close to your existing ${ownedSimilar.name} in ${ownedSimilar.shade}. Buy only if the finish or use case is clearly different.`,
    };
  }

  if (matchesProfile) {
    return {
      decision: "good_candidate",
      label: "Good candidate",
      ownedSimilar: null,
      matchesProfile,
      advice: `${shade} fits your ${profile.undertone} direction and could connect your eye, cheek, and lip palette.`,
    };
  }

  return {
    decision: "think_twice",
    label: "Think twice",
    ownedSimilar: null,
    matchesProfile,
    advice: `${shade || "This shade"} does not strongly match your current best shade families: ${shadeFamilies.join(", ")}. Try it in store or look for a mini size first.`,
  };
}
