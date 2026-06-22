const storageKey = "palette-me-demo";

const defaultState = {
  profile: {
    undertone: "neutral",
    depth: "medium",
    skinType: "combination",
    style: "soft",
    occasion: "school, work, and casual weekends",
  },
  products: [
    {
      id: crypto.randomUUID(),
      category: "Eye shadow",
      name: "Everyday Rose Palette",
      shade: "rose brown",
      finish: "matte",
    },
    {
      id: crypto.randomUUID(),
      category: "Blush",
      name: "Soft Petal Blush",
      shade: "dusty pink",
      finish: "satin",
    },
    {
      id: crypto.randomUUID(),
      category: "Lipstick",
      name: "MLBB Lip Tint",
      shade: "muted rose",
      finish: "glossy",
    },
  ],
};

let state = loadState();

const profileIds = ["undertone", "depth", "skinType", "style", "occasion"];
const inventoryList = document.querySelector("#inventoryList");
const recommendation = document.querySelector("#recommendation");
const matchScore = document.querySelector("#matchScore");
const buyAdvice = document.querySelector("#buyAdvice");
const agentOnline = location.protocol.startsWith("http");

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(defaultState);
  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function hydrateProfile() {
  profileIds.forEach((id) => {
    document.querySelector(`#${id}`).value = state.profile[id];
  });
}

function shadeColor(shade) {
  const text = shade.toLowerCase();
  if (text.includes("rose") || text.includes("pink")) return "#c98591";
  if (text.includes("coral") || text.includes("peach")) return "#d98b66";
  if (text.includes("brown") || text.includes("nude")) return "#9a6959";
  if (text.includes("berry") || text.includes("plum")) return "#8c4465";
  if (text.includes("red")) return "#b64242";
  if (text.includes("mauve")) return "#a9788d";
  return "#b58a43";
}

function renderInventory() {
  inventoryList.innerHTML = "";
  if (state.products.length === 0) {
    inventoryList.innerHTML = '<div class="buy-advice">Add your first product to start building your palette.</div>';
    return;
  }

  state.products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div>
        <strong>${escapeHtml(product.name)}</strong>
        <p>${product.category} · ${escapeHtml(product.shade)} · ${product.finish}</p>
      </div>
      <div class="swatch" title="${escapeHtml(product.shade)}" style="background:${shadeColor(product.shade)}"></div>
    `;
    inventoryList.appendChild(card);
  });
}

function colorFamilies(profile) {
  const map = {
    warm: ["peach", "coral", "warm brown", "terracotta"],
    cool: ["mauve", "rose", "berry", "cool taupe"],
    neutral: ["rose brown", "soft nude", "dusty pink", "champagne"],
    olive: ["muted peach", "bronze", "khaki brown", "warm rose"],
    muted: ["dusty rose", "soft mauve", "milk tea brown", "blurred berry"],
  };
  return map[profile.undertone] || map.neutral;
}

async function requestAgentRecommendation() {
  if (!agentOnline) return null;
  try {
    const response = await fetch("/api/recommendation", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(state),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function requestPurchaseCheck(product, shade) {
  if (!agentOnline) return null;
  try {
    const response = await fetch("/api/purchase-check", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...state, product, shade }),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function buildLook() {
  const agentResult = await requestAgentRecommendation();
  if (agentResult) {
    renderAgentRecommendation(agentResult);
    return;
  }

  const profile = state.profile;
  const families = colorFamilies(profile);
  const recommended = pickRecommendedProducts(families);
  const productText = state.products.map((product) => product.shade.toLowerCase()).join(" ");
  const duplicates = families.filter((family) => productText.includes(family.split(" ")[0]));
  const score = Math.min(96, 70 + state.products.length * 4 + duplicates.length * 5);
  matchScore.textContent = score;

  const styleTone = {
    soft: "soft, blended, low contrast",
    clean: "fresh, glossy, and lightweight",
    romantic: "rosy, diffused, and feminine",
    bold: "defined, higher contrast, camera-ready",
    professional: "polished, neutral, and long-wearing",
  }[profile.style];

  recommendation.innerHTML = `
    <div class="advice-block">
      <h3>Best shade families</h3>
      <p>${families.join(", ")}. These colors should make your ${profile.depth} skin depth and ${profile.undertone} undertone feel more harmonious.</p>
    </div>
    <div class="advice-block">
      <h3>Today's look recipe</h3>
      <p>${recommended.eye ? `Start with ${escapeHtml(recommended.eye.name)} as the eye anchor.` : `Use a ${families[0]} eye base.`} ${recommended.cheek ? `Pair it with ${escapeHtml(recommended.cheek.name)} on the cheeks.` : `Add a ${families[1]} blush.`} ${recommended.lip ? `Finish with ${escapeHtml(recommended.lip.name)} for the lip.` : `Finish with a ${families[2]} lip.`} Keep the finish ${styleTone} for ${escapeHtml(profile.occasion)}.</p>
    </div>
    <div class="advice-block">
      <h3>Shopping guard</h3>
      <p>${duplicates.length ? `You already own similar tones around ${duplicates.join(" and ")}. Buy only if the texture or purpose is clearly different.` : "Your shelf has room for one more core shade, especially a product that fills a missing eye-cheek-lip connection."}</p>
    </div>
    <div class="advice-block">
      <h3>What to avoid</h3>
      <p>Avoid shades that look isolated from the rest of your palette. If the eye, cheek, and lip colors do not share warmth, depth, or softness, the final makeup can feel harder to style.</p>
    </div>
  `;
}

function renderAgentRecommendation(result) {
  matchScore.textContent = result.score;
  recommendation.innerHTML = `
    <div class="agent-status">Local Agent API · ${escapeHtml(result.mode)}</div>
    ${result.sections
      .map(
        (section) => `
          <div class="advice-block">
            <h3>${escapeHtml(section.title)}</h3>
            <p>${escapeHtml(section.body)}</p>
          </div>
        `,
      )
      .join("")}
    <div class="skill-trace">
      ${result.skillTrace.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}
    </div>
  `;
}

function pickRecommendedProducts(families) {
  const familyWords = families.flatMap((family) => family.toLowerCase().split(" "));
  const byCategory = (category) =>
    state.products.find((product) => {
      const shade = product.shade.toLowerCase();
      return product.category === category && familyWords.some((word) => shade.includes(word));
    }) || state.products.find((product) => product.category === category);

  return {
    eye: byCategory("Eye shadow"),
    cheek: byCategory("Blush"),
    lip: byCategory("Lipstick"),
  };
}

function checkPurchase(product, shade) {
  const profile = state.profile;
  const families = colorFamilies(profile);
  const shadeLower = shade.toLowerCase();
  const ownedSimilar = state.products.find((item) => {
    const firstWord = item.shade.toLowerCase().split(" ")[0];
    return shadeLower.includes(firstWord) || item.shade.toLowerCase().includes(shadeLower);
  });
  const matches = families.some((family) => shadeLower.includes(family.split(" ")[0]));

  if (ownedSimilar) {
    return `<strong>Maybe skip.</strong> ${escapeHtml(product)} sounds close to your existing ${escapeHtml(ownedSimilar.name)} in ${escapeHtml(ownedSimilar.shade)}. If you buy it, make sure the finish or use case is different.`;
  }

  if (matches) {
    return `<strong>Good candidate.</strong> ${escapeHtml(shade)} fits your ${profile.undertone} direction. It could help connect your eye, cheek, and lip palette.`;
  }

  return `<strong>Think twice.</strong> ${escapeHtml(shade)} does not strongly match your current best shade families: ${families.join(", ")}. Try it in store or look for a mini size first.`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

profileIds.forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", (event) => {
    state.profile[id] = event.target.value;
    saveState();
    buildLook();
  });
});

document.querySelector("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#productName").value.trim();
  const shade = document.querySelector("#shadeFamily").value.trim();
  if (!name || !shade) return;

  state.products.unshift({
    id: crypto.randomUUID(),
    category: document.querySelector("#category").value,
    name,
    shade,
    finish: document.querySelector("#finish").value,
  });

  event.target.reset();
  saveState();
  renderInventory();
  buildLook();
});

document.querySelector("#checkerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const product = document.querySelector("#wishProduct").value.trim() || "This product";
  const shade = document.querySelector("#wishShade").value.trim();
  if (!shade) return;
  buyAdvice.textContent = "Checking with PaletteMe Agent...";
  requestPurchaseCheck(product, shade).then((agentResult) => {
    if (agentResult) {
      buyAdvice.innerHTML = `<strong>${escapeHtml(agentResult.label)}.</strong> ${escapeHtml(agentResult.advice)}`;
      return;
    }
    buyAdvice.innerHTML = checkPurchase(product, shade);
  });
});

document.querySelector("#generateLook").addEventListener("click", buildLook);

document.querySelector("#resetDemo").addEventListener("click", () => {
  state = structuredClone(defaultState);
  saveState();
  hydrateProfile();
  renderInventory();
  buildLook();
  buyAdvice.textContent = "Enter a product and shade to get a buy, maybe, or skip recommendation.";
});

hydrateProfile();
renderInventory();
buildLook();
buyAdvice.textContent = "Enter a product and shade to get a buy, maybe, or skip recommendation.";
