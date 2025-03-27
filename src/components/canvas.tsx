"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut } from "lucide-react";

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
        className="bg-background border shadow-sm transition-all duration-200"
        style={{
          width: getCanvasWidth(),
          height: "100%",
          transform: `scale(${zoom / 100})`,
          transformOrigin: "center center",
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

      {/* Zoom control in bottom left */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-md bg-background p-2 shadow-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setZoom(Math.max(50, zoom - 10))}
          disabled={zoom <= 50}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <Slider
          value={[zoom]}
          min={50}
          max={200}
          step={10}
          className="w-24"
          onValueChange={(value) => setZoom(value[0])}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setZoom(Math.min(200, zoom + 10))}
          disabled={zoom >= 200}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <span className="ml-1 text-xs font-medium">{zoom}%</span>
      </div>
    </main>
  );
}
