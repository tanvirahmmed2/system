"use client";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableBlock from "./SortableBlock";

export default function DndCanvas({
  sections,
  setSections,
  selectedId,
  setSelectedId,
}){

  // 👇 HERE
  function createBlock(type) {
    const map = {
      hero: {
        id: crypto.randomUUID(),
        type: "hero",
        props: {
          title: "New Hero",
          subtitle: "Hero subtitle",
        },
      },

      text: {
        id: crypto.randomUUID(),
        type: "text",
        props: {
          content: "New text block",
        },
      },
    };

    return map[type];
  }

  // 👇 HERE
  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    // ADD BLOCK FROM SIDEBAR
    if (active.data.current?.fromSidebar) {
      const type = active.data.current.type;

      const newBlock = createBlock(type);

      setSections((prev) => [...prev, newBlock]);

      return;
    }

    // REORDER BLOCKS
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = sections.findIndex(
        (item) => item.id === over.id
      );

      setSections((items) =>
        arrayMove(items, oldIndex, newIndex)
      );
    }
  }

  return (
    <div className="flex-1 p-4 bg-gray-50 min-h-screen">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((block) => (
            <SortableBlock
  key={block.id}
  block={block}
  selectedId={selectedId}
  setSelectedId={setSelectedId}
/>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}