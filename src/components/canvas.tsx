"use client";

import { ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CanvasProps {
  selectedComponent: string | null;
  resolution: string;
  zoom: number;
  setZoom: (value: number) => void;
}

export function Canvas({
  selectedComponent,
  resolution,
  zoom,
  setZoom,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        setZoom(Math.min(200, Math.max(50, zoom + delta)));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1) {
        // Middle mouse button
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 1) {
        setIsDragging(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [zoom, setZoom, isDragging, position, dragStart]);

  // Get canvas width based on selected resolution
  const getCanvasWidth = () => {
    switch (resolution) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
        return "1280px";
      default:
        return "100%";
    }
  };

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-auto bg-muted/30 p-6">
      <div
        ref={canvasRef}
        className="bg-background border shadow-sm"
        style={{
          width: getCanvasWidth(),
          height: "100%",
          transform: `scale(${zoom / 100}) translate(${position.x}px, ${
            position.y
          }px)`,
          transformOrigin: "center center",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {selectedComponent ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p>Drag and drop {selectedComponent} elements here</p>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p>Select a component from the library to start building</p>
          </div>
        )}
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-6 left-6 flex items-center gap-1 rounded-md bg-background px-2 py-1 shadow-md">
        <ZoomIn className="h-4 w-4" />
        <span className="text-xs font-medium">{zoom}%</span>
      </div>
    </main>
  );
}
