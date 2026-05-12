"use client";

export default function EditorPanel({
  sections,
  setSections,
  selectedId,
}) {
  const selectedBlock = sections.find(
    (item) => item.id === selectedId
  );

  if (!selectedBlock) {
    return (
      <div className="w-80 border-l p-4">
        Select a block
      </div>
    );
  }

  function updateField(field, value) {
    const updated = sections.map((item) => {
      if (item.id === selectedId) {
        return {
          ...item,
          props: {
            ...item.props,
            [field]: value,
          },
        };
      }

      return item;
    });

    setSections(updated);
  }

  return (
    <div className="w-80 border-l p-4">
      <h2 className="text-xl font-bold mb-4">
        Edit Block
      </h2>

      {selectedBlock.type === "hero" && (
        <>
          <input
            className="border p-2 w-full mb-3"
            value={selectedBlock.props.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            placeholder="Title"
          />

          <textarea
            className="border p-2 w-full"
            value={selectedBlock.props.subtitle}
            onChange={(e) =>
              updateField("subtitle", e.target.value)
            }
            placeholder="Subtitle"
          />
        </>
      )}
    </div>
  );
}