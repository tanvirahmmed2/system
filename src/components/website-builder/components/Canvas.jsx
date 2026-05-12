"use client";

import BlockRenderer from "./BlockRenderer";

export default function Canvas({
  sections,
  setSections,
  selectedId,
  setSelectedId,
}) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {sections.map((block, index) => {
        const isSelected = selectedId === block.id;

        return (
          <div
            key={block.id}
            onClick={() => setSelectedId(block.id)}
            className={`
              border
              p-4
              mb-4
              cursor-pointer
              rounded
              ${isSelected ? "border-blue-500" : "border-gray-300"}
            `}
          >
            <BlockRenderer block={block} />

            <button
              className="mt-2 text-red-500"
              onClick={(e) => {
                e.stopPropagation();

                const updated = sections.filter(
                  (_, i) => i !== index
                );

                setSections(updated);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}