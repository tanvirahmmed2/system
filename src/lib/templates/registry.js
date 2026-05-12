export const templates = {
  ecommerce: {
    pages: [
      {
        name: "Home",
        slug: "",
        is_homepage: true,
        sections: [
          { type: "hero", props: { title: "Welcome" } },
          { type: "features", props: {} },
        ],
      },
      {
        name: "Shop",
        slug: "shop",
        sections: [{ type: "product-grid", props: {} }],
      },
    ],
    theme: "ecommerce-modern",
  },

  school: {
    pages: [
      {
        name: "Home",
        slug: "",
        is_homepage: true,
        sections: [{ type: "hero", props: {} }],
      },
    ],
    theme: "education-light",
  },
};