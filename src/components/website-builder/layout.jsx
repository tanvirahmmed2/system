"use client";

import { useState } from "react";
import Canvas from "./Canvas";
import Inspector from "./Inspector";

export default function Builder({ initialSections }) {
  const [sections, setSections] = useState(initialSections);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="flex w-full min-h-screen">
      
      {/* LEFT: CANVAS */}
      <div className="w-3/4 border-r">
        <Canvas
          sections={sections}
          setSections={setSections}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>

      {/* RIGHT: INSPECTOR */}
      <div className="w-1/4 p-4">
        <Inspector
          sections={sections}
          setSections={setSections}
          selectedId={selectedId}
        />
      </div>

    </div>
  );
}