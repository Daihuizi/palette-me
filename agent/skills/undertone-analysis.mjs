const familiesByUndertone = {
  warm: ["peach", "coral", "warm brown", "terracotta"],
  cool: ["mauve", "rose", "berry", "cool taupe"],
  neutral: ["rose brown", "soft nude", "dusty pink", "champagne"],
  olive: ["muted peach", "bronze", "khaki brown", "warm rose"],
  muted: ["dusty rose", "soft mauve", "milk tea brown", "blurred berry"],
};

export function getShadeFamilies(profile) {
  return familiesByUndertone[profile.undertone] || familiesByUndertone.neutral;
}
