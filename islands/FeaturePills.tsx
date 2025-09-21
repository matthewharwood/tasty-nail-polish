import { useState } from "preact/hooks";

interface Pill {
  text: string;
  colorClass: string;
}

const pills: Pill[] = [
  { text: "💅 Food-Safe", colorClass: "feature-pill--pink" },
  { text: "🍒 Real Cherry", colorClass: "feature-pill--mint" },
  { text: "✨ Non-Toxic", colorClass: "feature-pill--pink" },
  { text: "🌱 Vegan", colorClass: "feature-pill--mint" },
];

export default function FeaturePills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (index: number, e: MouseEvent) => {
    setHoveredIndex(index);
    updateMousePosition(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    updateMousePosition(e);
  };

  const updateMousePosition = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div class="feature-pills">
      {pills.map((pill, index) => (
        <div
          key={index}
          class="feature-pill-wrapper"
          onMouseEnter={(e) => handleMouseEnter(index, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span class={`feature-pill ${pill.colorClass}`}>
            {pill.text}
          </span>
          {hoveredIndex === index && (
            <div
              class="feature-pill-tooltip"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y - 20}px`,
              }}
            >
              <div class="tooltip-content">
                <img
                  src="/cherries_foot.png"
                  alt="Product preview"
                  class="tooltip-image"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}