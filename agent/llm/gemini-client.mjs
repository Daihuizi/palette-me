const defaultModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const endpointBase = "https://generativelanguage.googleapis.com/v1beta";

export function isGeminiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function refineRecommendationWithGemini({ profile, products, localResult }) {
  if (!isGeminiConfigured()) return null;

  const prompt = [
    "You are PaletteMe, a practical and inclusive AI makeup palette assistant.",
    "Use the local agent result as the source of truth. Do not invent owned products.",
    "Return only valid JSON matching this shape:",
    '{"sections":[{"title":"Best shade families","body":"..."},{"title":"Today\'s look recipe","body":"..."},{"title":"Shopping guard","body":"..."},{"title":"What to avoid","body":"..."}],"oneLineSummary":"..."}',
    "Keep advice non-medical. If sensitive skin is mentioned, suggest patch testing without diagnosis.",
    "",
    `Profile: ${JSON.stringify(profile)}`,
    `Owned products: ${JSON.stringify(products)}`,
    `Local agent result: ${JSON.stringify(localResult)}`,
  ].join("\n");

  const text = await generateText(prompt);
  const parsed = parseJsonFromText(text);
  if (!parsed?.sections?.length) return null;

  return {
    ...localResult,
    agent: "PaletteMe Gemini-assisted agent",
    mode: `gemini-assisted:${defaultModel}`,
    sections: parsed.sections.slice(0, 4),
    oneLineSummary: parsed.oneLineSummary || "Personalized palette recommendation generated with Gemini assistance.",
  };
}

async function generateText(prompt) {
  const url = `${endpointBase}/models/${defaultModel}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.45,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${detail.slice(0, 180)}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
}

function parseJsonFromText(text) {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}
