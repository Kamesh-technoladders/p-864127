
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coffee, UtensilsCrossed } from "lucide-react";

interface PauseReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReason: (reason: string) => void;
}

export const PauseReasonModal: React.FC<PauseReasonModalProps> = ({
  isOpen,
  onClose,
  onSelectReason,
}) => {
  const handleSelectReason = (reason: string) => {
    onSelectReason(reason);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select Pause Reason</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 p-6"
            onClick={() => handleSelectReason("Lunch Break")}
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span>Lunch Break</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 p-6"
            onClick={() => handleSelectReason("Coffee Break")}
          >
            <Coffee className="h-6 w-6" />
            <span>Coffee Break</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
