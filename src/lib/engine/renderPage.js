import Hero from "@/components/website-builder/Hero";
import Features from "@/components/website-builder/Features";
import Footer from "@/components/website-builder/Footer";

const componentMap = {
  hero: Hero,
  features: Features,
  footer: Footer,
};

export function renderPage(sections) {
  return sections.map((section, i) => {
    const Component = componentMap[section.type];

    if (!Component) return null;

    return <Component key={i} {...section.props} />;
  });
}