"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Library, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Sidebar options
const sidebarOptions = [
  { name: "Components", icon: Library },
  { name: "Settings", icon: SettingsIcon },
];

interface SidebarProps {
  sidebarSelection: string;
  setSidebarSelection: (selection: string) => void;
}

export function Sidebar({
  sidebarSelection,
  setSidebarSelection,
}: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex w-14 flex-col items-center border-l bg-sidebar py-4">
        {sidebarOptions.map((option) => (
          <Tooltip key={option.name}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mb-2 h-10 w-10 rounded-md",
                  sidebarSelection === option.name &&
                    "bg-primary text-primary-foreground"
                )}
                onClick={() => setSidebarSelection(option.name)}
              >
                <option.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{option.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
