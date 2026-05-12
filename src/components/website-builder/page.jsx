"use client";

import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import EditorPanel from "./components/EditorPanel";

export default function BuilderPage() {
  const [sections, setSections] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar
        sections={sections}
        setSections={setSections}
      />

      <Canvas
        sections={sections}
        setSections={setSections}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      <EditorPanel
        sections={sections}
        setSections={setSections}
        selectedId={selectedId}
      />
    </div>
  );
}