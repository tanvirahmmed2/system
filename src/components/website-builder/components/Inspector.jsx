"use client";

import blockRegistry from "@/lib/builder/blockRegistry";

export default function Inspector({
  selectedBlock,
  sections,
  setSections,
}) {
  if (!selectedBlock) {
    return (
      <div className="w-80 border-l p-4">
        Select a block
      </div>
    );
  }

  const config =
    blockRegistry[selectedBlock.type];

  function updateProps(key, value) {
    const updated = sections.map((block) =>
      block.id === selectedBlock.id
        ? {
            ...block,
            props: {
              ...block.props,
              [key]: value,
            },
          }
        : block
    );

    setSections(updated);
  }

  return (
    <div className="w-80 border-l p-4 space-y-4">
      <h2 className="font-bold">
        Inspector
      </h2>

      {config.schema.map((field) => (
        <div key={field.key}>
          <label className="block mb-1">
            {field.label}
          </label>

          {field.type === "text" && (
            <input
              className="border p-2 w-full"
              value={
                selectedBlock.props[field.key]
              }
              onChange={(e) =>
                updateProps(
                  field.key,
                  e.target.value
                )
              }
            />
          )}

          {field.type === "textarea" && (
            <textarea
              className="border p-2 w-full"
              value={
                selectedBlock.props[field.key]
              }
              onChange={(e) =>
                updateProps(
                  field.key,
                  e.target.value
                )
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}