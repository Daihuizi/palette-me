const storageKey = "palette-me-demo";

const defaultState = {
  profile: {
    undertone: "cool",
    depth: "light",
    skinType: "combination",
    style: "soft",
    occasion: "daily school, work, and weekend coffee dates",
  },
  products: [
    {
      id: crypto.randomUUID(),
      category: "Eye shadow",
      name: "Soft Taupe Eye Quad",
      shade: "cool taupe",
      finish: "matte",
    },
    {
      id: crypto.randomUUID(),
      category: "Blush",
      name: "Dusty Rose Cream Blush",
      shade: "dusty rose",
      finish: "satin",
    },
    {
      id: crypto.randomUUID(),
      category: "Lipstick",
      name: "Rose Nude Lip Tint",
      shade: "muted rose",
      finish: "glossy",
    },
    {
      id: crypto.randomUUID(),
      category: "Base",
      name: "Soft Focus Cushion",
      shade: "neutral ivory",
      finish: "satin",
    },
  ],
  wish: {
    product: "Viral Coral Lipstick",
    shade: "bright orange coral",
  },
};

let state = loadState();

const profileIds = ["undertone", "depth", "skinType", "style", "occasion"];
const inventoryList = document.querySelector("#inventoryList");
const recommendation = document.querySelector("#recommendation");
const matchScore = document.querySelector("#matchScore");
const buyAdvice = document.querySelector("#buyAdvice");
const humanReviewPanel = document.querySelector("#humanReviewPanel");
const humanReviewReason = document.querySelector("#humanReviewReason");
const humanReviewOutcome = document.querySelector("#humanReviewOutcome");
const agentOnline = location.protocol.startsWith("http");
let recommendationRequestId = 0;

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
  document.querySelector("#wishProduct").value = state.wish?.product || defaultState.wish.product;
  document.querySelector("#wishShade").value = state.wish?.shade || defaultState.wish.shade;
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

function profileInsight(profile) {
  const map = {
    warm: {
      families: ["peach", "coral", "warm brown", "terracotta"],
      direction: "golden, peachy, sun-warmed color harmony",
      avoid: "icy pink, blue mauve, and very gray taupe can look separated from a warm undertone.",
    },
    cool: {
      families: ["mauve", "rose", "berry", "cool taupe"],
      direction: "rosy, berry, and soft taupe color harmony",
      avoid: "bright orange coral and yellow-brown shades can become too warm against a cool undertone.",
    },
    neutral: {
      families: ["rose brown", "soft nude", "dusty pink", "champagne"],
      direction: "balanced nude, rose-brown, and softly polished color harmony",
      avoid: "extreme neon, very gray, or very orange shades may overpower a neutral palette.",
    },
    olive: {
      families: ["muted peach", "bronze", "khaki brown", "warm rose"],
      direction: "muted warmth with bronze, khaki brown, and soft rose balance",
      avoid: "white-based pastels and ashy mauves can turn flat or gray on olive undertones.",
    },
    muted: {
      families: ["dusty rose", "soft mauve", "milk tea brown", "blurred berry"],
      direction: "soft, blurred, low-contrast color harmony",
      avoid: "neon, very saturated red, and high-contrast colors can feel disconnected from a muted palette.",
    },
  };
  return map[profile.undertone] || map.neutral;
}

function colorFamilies(profile) {
  return profileInsight(profile).families;
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
  const requestId = ++recommendationRequestId;
  renderLocalRecommendation("Live local skills");

  const agentResult = await requestAgentRecommendation();
  if (requestId !== recommendationRequestId) return;
  if (agentResult) {
    renderAgentRecommendation(agentResult);
  }
}

function renderProfileAnalysis(profile, mode) {
  const insight = profileInsight(profile);
  return `
    <div class="profile-analysis">
      <div>
        <span class="analysis-kicker">${escapeHtml(mode)}</span>
        <strong>${escapeHtml(profile.depth)} depth · ${escapeHtml(profile.undertone)} undertone</strong>
      </div>
      <p><b>Best direction:</b> ${escapeHtml(insight.direction)}.</p>
      <p><b>Test first:</b> ${escapeHtml(insight.avoid)}</p>
    </div>
  `;
}

function renderLocalRecommendation(mode = "Live local skills") {
  const profile = state.profile;
  const insight = profileInsight(profile);
  const families = insight.families;
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
    ${renderProfileAnalysis(profile, mode)}
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
      <p>${escapeHtml(insight.avoid)} Also avoid shades that look isolated from the rest of your palette. If the eye, cheek, and lip colors do not share warmth, depth, or softness, the final makeup can feel harder to style.</p>
    </div>
  `;
}

function renderAgentRecommendation(result) {
  matchScore.textContent = result.score;
  recommendation.innerHTML = `
    <div class="agent-status">Local Agent API · ${escapeHtml(result.mode)}</div>
    ${renderProfileAnalysis(state.profile, "Live profile signal")}
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

function showHumanReview(reason) {
  humanReviewReason.textContent = reason;
  humanReviewOutcome.textContent = "";
  humanReviewPanel.hidden = false;
}

function hideHumanReview() {
  humanReviewPanel.hidden = true;
  humanReviewOutcome.textContent = "";
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
  state.wish = { product, shade };
  saveState();
  buyAdvice.textContent = "Checking with PaletteMe Agent...";
  hideHumanReview();
  requestPurchaseCheck(product, shade).then((agentResult) => {
    if (agentResult) {
      buyAdvice.innerHTML = `<strong>${escapeHtml(agentResult.label)}.</strong> ${escapeHtml(agentResult.advice)}`;
      if (agentResult.decision !== "buy") {
        showHumanReview(
          "PaletteMe found a risky or duplicate purchase signal. A person should approve, revise, or reject this recommendation before acting.",
        );
      }
      return;
    }
    buyAdvice.innerHTML = checkPurchase(product, shade);
    showHumanReview(
      "This shade may not fit the current palette. A human checkpoint is required before turning the suggestion into a purchase decision.",
    );
  });
});

document.querySelectorAll("[data-review-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.reviewAction;
    const messages = {
      approve: "Approved: the user accepts the agent's recommendation and can proceed carefully.",
      revise: "Revise: the user wants a safer alternative shade before deciding.",
      reject: "Rejected: the user stops this purchase and keeps the current palette unchanged.",
    };
    humanReviewOutcome.textContent = messages[action];
  });
});

document.querySelector("#generateLook").addEventListener("click", buildLook);

document.querySelector("#resetDemo").addEventListener("click", () => {
  state = structuredClone(defaultState);
  saveState();
  hydrateProfile();
  renderInventory();
  buildLook();
  hideHumanReview();
  buyAdvice.textContent = "Enter a product and shade to get a buy, maybe, or skip recommendation.";
});

hydrateProfile();
renderInventory();
buildLook();
hideHumanReview();
buyAdvice.textContent = "Enter a product and shade to get a buy, maybe, or skip recommendation.";
