export const themeRegistry = {
  ecommerce: {
    hero: () => import("@/themes/ecommerce/Hero"),
    pricing: () => import("@/themes/ecommerce/Pricing"),
  },

  portfolio: {
    hero: () => import("@/themes/portfolio/Hero"),
  },
};