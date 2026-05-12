import Hero from "../blocks/hero/component";
import heroConfig from "../blocks/hero/config";
import heroDefaults from "../blocks/hero/defaultProps";

const blockRegistry = {
  hero: {
    component: Hero,
    config: heroConfig,
    defaultProps: heroDefaults,
  },
};

export default blockRegistry;