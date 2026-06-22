import { readFile } from "node:fs/promises";
import { analyzePalette, checkPurchase } from "./palette-agent.mjs";

const sample = JSON.parse(await readFile(new URL("./sample-request.json", import.meta.url), "utf8"));

console.log("Recommendation");
console.log(JSON.stringify(analyzePalette(sample), null, 2));
console.log("\nPurchase check");
console.log(JSON.stringify(checkPurchase({ ...sample, product: "New Rose Lipstick", shade: "muted rose" }), null, 2));
