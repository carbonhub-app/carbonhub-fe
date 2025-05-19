"use client";

import { useEffect, useRef } from "react";
import { fadeIn, staggerFadeIn } from "@/utils/animations";

export default function GsapTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      fadeIn(containerRef.current, 1, 0.2);
    }

    if (boxesRef.current.length > 0) {
      staggerFadeIn(boxesRef.current, 0.5, 0.1);
    }
  }, []);

  const addToBoxesRef = (el: HTMLDivElement) => {
    if (el && !boxesRef.current.includes(el)) {
      boxesRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="p-8">
      <h1 className="text-3xl font-bold mb-6">GSAP Animation Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            ref={addToBoxesRef}
            className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">Box {item}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This box is animated with GSAP stagger animation.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
