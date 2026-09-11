const STORAGE_KEY = "uwpath:experiment:plan-health";
const QUERY_PARAMETER = "planHealth";

const ENABLED_VALUES = ["1", "on", "true"];
const DISABLED_VALUES = ["0", "off", "false"];

function persistOverride(enabled) {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Local storage can be unavailable in private or restricted browser modes.
  }
}

function storedOverride() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function isPlanHealthExperimentEnabled() {
  if (typeof window === "undefined") return false;

  const queryValue = new URLSearchParams(window.location.search).get(
    QUERY_PARAMETER
  );
  const normalizedQueryValue = queryValue ? queryValue.toLowerCase() : null;

  if (ENABLED_VALUES.includes(normalizedQueryValue)) {
    persistOverride(true);
    return true;
  }
  if (DISABLED_VALUES.includes(normalizedQueryValue)) {
    persistOverride(false);
    return false;
  }

  const override = storedOverride();
  if (override) return override === "on";

  return process.env.VUE_APP_PLAN_HEALTH_EXPERIMENT === "on";
}
