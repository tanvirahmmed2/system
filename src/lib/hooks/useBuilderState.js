"use client";

import { useState } from "react";

export default function useBuilderState(initial = []) {
  const [sections, setSections] = useState(initial);

  return {
    sections,
    setSections
  };
}