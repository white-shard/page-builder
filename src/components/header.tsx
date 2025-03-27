"use client";

import { Laptop, Smartphone, Tablet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  resolution: string;
  setResolution: (value: string) => void;
}

export function Header({ resolution, setResolution }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-center border-b px-6">
      <Tabs
        defaultValue="desktop"
        value={resolution}
        onValueChange={setResolution}
        className="w-fit"
      >
        <TabsList>
          <TabsTrigger value="mobile">
            <Smartphone className="mr-2 h-4 w-4" />
            Mobile
          </TabsTrigger>
          <TabsTrigger value="tablet">
            <Tablet className="mr-2 h-4 w-4" />
            Tablet
          </TabsTrigger>
          <TabsTrigger value="desktop">
            <Laptop className="mr-2 h-4 w-4" />
            Desktop
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}
