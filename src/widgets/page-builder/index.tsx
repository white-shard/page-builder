"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Canvas } from "@/components/canvas";
import { ComponentLibrary } from "@/components/component-library";
import { Settings } from "@/components/settings";
import { Sidebar } from "@/components/sidebar";

export function PageBuilder() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [resolution, setResolution] = useState("desktop");
  const [zoom, setZoom] = useState(100);
  const [sidebarSelection, setSidebarSelection] = useState("Components");

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header resolution={resolution} setResolution={setResolution} />

      <div className="flex flex-1 overflow-hidden">
        <Canvas
          selectedComponent={selectedComponent}
          resolution={resolution}
          zoom={zoom}
          setZoom={setZoom}
        />

        <div className="flex border-l">
          <Card className="w-72 rounded-none border-0 shadow-none">
            {sidebarSelection === "Components" ? (
              <ComponentLibrary
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
              />
            ) : (
              <Settings />
            )}
          </Card>

          <Sidebar
            sidebarSelection={sidebarSelection}
            setSidebarSelection={setSidebarSelection}
          />
        </div>
      </div>
    </div>
  );
}
