
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const ActionButtons: React.FC = () => {
  return (
    <div className="flex gap-3">
      <Button variant="outline" className="text-brand-secondary">
        Directory
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" className="text-brand-secondary">
        Org Chat
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline" className="text-brand-secondary">
        Insights
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
