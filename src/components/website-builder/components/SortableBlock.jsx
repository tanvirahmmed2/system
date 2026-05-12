"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import BlockRenderer from "./BlockRenderer";

export default function SortableBlock({
  block,
  selectedId,
  setSelectedId,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedId === block.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setSelectedId(block.id)}
      className={`
        border
        p-3
        mb-3
        bg-white
        rounded
        cursor-pointer
        ${isSelected ? "border-blue-500" : ""}
      `}
    >
      <div {...attributes} {...listeners}>
        <BlockRenderer block={block} />
      </div>
    </div>
  );
}