"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Components for the library
const components = [
  { name: "Text", icon: "T", description: "Add text element" },
  { name: "Image", icon: "🖼️", description: "Add image element" },
  { name: "Button", icon: "⬜", description: "Add button element" },
  { name: "Container", icon: "⬛", description: "Add container element" },
  { name: "Divider", icon: "—", description: "Add divider element" },
];

interface ComponentLibraryProps {
  selectedComponent: string | null;
  setSelectedComponent: (component: string) => void;
}

export function ComponentLibrary({
  selectedComponent,
  setSelectedComponent,
}: ComponentLibraryProps) {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">Component Library</h2>
      <div className="grid grid-cols-2 gap-2">
        {components.map((component) => (
          <Button
            key={component.name}
            variant="outline"
            className={cn(
              "flex h-20 w-full flex-col items-center justify-center gap-1",
              selectedComponent === component.name && "border-primary"
            )}
            onClick={() => setSelectedComponent(component.name)}
          >
            <span className="text-xl">{component.icon}</span>
            <span className="text-xs">{component.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
