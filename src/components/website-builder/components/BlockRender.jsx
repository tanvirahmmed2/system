import blockRegistry from "../registry/blockRegistry";

export default function BlockRenderer({ block }) {
  const blockData = blockRegistry[block.type];

  if (!blockData) return null;

  const Component = blockData.component;

  return <Component {...block.props} />;
}