export function buildLookPlan({ profile, products, shadeFamilies, matchedProducts }) {
  const recommended = pickRecommendedProducts(products, matchedProducts);
  const duplicateCount = matchedProducts.filter((product) => product.matchedWords.length > 0).length;
  const score = Math.min(96, 70 + products.length * 4 + duplicateCount * 3);
  const styleTone = styleToneFor(profile.style);

  const eye = recommended.eye
    ? `Start with ${recommended.eye.name} as the eye anchor`
    : `Use a ${shadeFamilies[0]} eye base`;
  const cheek = recommended.cheek
    ? `pair it with ${recommended.cheek.name} on the cheeks`
    : `add a ${shadeFamilies[1]} blush`;
  const lip = recommended.lip
    ? `finish with ${recommended.lip.name} for the lip`
    : `finish with a ${shadeFamilies[2]} lip`;

  return {
    score,
    recipe: `${eye}, ${cheek}, then ${lip}. Keep the finish ${styleTone} for ${profile.occasion}.`,
    recommended,
  };
}

function pickRecommendedProducts(products, matchedProducts) {
  const bestByCategory = (category) => {
    const categoryMatches = matchedProducts
      .filter((product) => product.category === category)
      .sort((a, b) => b.fitScore - a.fitScore);
    return categoryMatches[0] || products.find((product) => product.category === category);
  };

  return {
    eye: bestByCategory("Eye shadow"),
    cheek: bestByCategory("Blush"),
    lip: bestByCategory("Lipstick"),
  };
}

function styleToneFor(style) {
  return {
    soft: "soft, blended, low contrast",
    clean: "fresh, glossy, and lightweight",
    romantic: "rosy, diffused, and feminine",
    bold: "defined, higher contrast, camera-ready",
    professional: "polished, neutral, and long-wearing",
  }[style] || "balanced and wearable";
}
