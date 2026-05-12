import { coreRegistry } from "./coreRegistry";
import { themeRegistry } from "./themeRegistry";

export async function resolveBlock(type, theme = "default") {
  // 1. Check theme override
  const themeBlock = themeRegistry?.[theme]?.[type];

  if (themeBlock) {
    const mod = await themeBlock();
    return mod.default;
  }

  // 2. Fallback to core
  return coreRegistry[type] || null;
}