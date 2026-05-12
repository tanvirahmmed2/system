"use client";

export default function PropertiesPanel({
  selectedBlock,
  sections,
  setSections
}) {
  if (!selectedBlock) {
    return <div className="p-4">Select a block</div>;
  }

  const updateProp = (key, value) => {
    const updated = sections.map((block) => {
      if (block.id === selectedBlock.id) {
        return {
          ...block,
          props: {
            ...block.props,
            [key]: value
          }
        };
      }
      return block;
    });

    setSections(updated);
  };

  return (
    <div className="p-4 border">
      <h3>Edit Block</h3>

      {/* Example: Hero block */}
      {selectedBlock.type === "hero" && (
        <>
          <input
            value={selectedBlock.props.title}
            onChange={(e) => updateProp("title", e.target.value)}
            placeholder="Title"
          />

          <input
            value={selectedBlock.props.subtitle}
            onChange={(e) => updateProp("subtitle", e.target.value)}
            placeholder="Subtitle"
          />
        </>
      )}
    </div>
  );
}