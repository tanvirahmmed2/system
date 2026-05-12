import HeroBlock from "@/components/blocks/HeroBlock";
import TextBlock from "@/components/blocks/TextBlock";

const blockRegistry = {
  hero: {
    component: HeroBlock,

    defaultProps: {
      title: "Hero Title",
      subtitle: "Hero Subtitle",
    },

    schema: [
      {
        key: "title",
        label: "Title",
        type: "text",
      },
      {
        key: "subtitle",
        label: "Subtitle",
        type: "textarea",
      },
    ],
  },

  text: {
    component: TextBlock,

    defaultProps: {
      content: "Text content",
    },

    schema: [
      {
        key: "content",
        label: "Content",
        type: "textarea",
      },
    ],
  },
};

export default blockRegistry;