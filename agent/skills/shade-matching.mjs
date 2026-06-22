export function matchOwnedProducts(products, shadeFamilies) {
  const familyWords = shadeFamilies.flatMap((family) => family.toLowerCase().split(" "));

  return products.map((product) => {
    const shade = String(product.shade || "").toLowerCase();
    const matchedWords = familyWords.filter((word) => shade.includes(word));
    return {
      ...product,
      fitScore: Math.min(100, 58 + matchedWords.length * 18),
      matchedWords,
    };
  });
}

export function findSimilarProduct(products, shade) {
  const shadeLower = String(shade || "").toLowerCase();
  return products.find((item) => {
    const itemShade = String(item.shade || "").toLowerCase();
    const firstWord = itemShade.split(" ")[0];
    return firstWord && (shadeLower.includes(firstWord) || itemShade.includes(shadeLower));
  });
}
