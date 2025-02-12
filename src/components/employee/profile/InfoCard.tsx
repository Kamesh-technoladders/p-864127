
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Edit } from "lucide-react";

interface InfoCardProps {
  title: string;
  icon: any;
  children: React.ReactNode;
  onEdit?: () => void;
  expandable?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  onEdit,
  expandable = false 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card className={`
      p-6 
      bg-white/80 
      backdrop-blur-sm 
      hover:shadow-lg 
      transition-all 
      duration-300 
      transform 
      hover:-translate-y-1 
      relative 
      group
      border border-gray-100
      ${expandable ? 'cursor-pointer' : ''}
      before:absolute 
      before:inset-0 
      before:z-0 
      before:bg-gradient-to-r 
      before:from-white/50 
      before:to-transparent 
      before:opacity-0 
      before:transition-opacity 
      hover:before:opacity-100
    `}>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-brand-primary" />
            <h3 className="font-medium text-lg">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {expandable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-gray-100/50"
              >
                <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <div className={`
          transition-all 
          duration-300 
          ${expandable ? (isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden') : ''}
        `}>
          {children}
        </div>
        {!expandable && children}
      </div>
    </Card>
  );
};
