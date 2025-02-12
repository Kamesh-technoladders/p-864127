
import React from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2, Save, X } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  icon: LucideIcon;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  loading?: boolean;
  gradientFrom: string;
  gradientTo: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  icon: Icon,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  loading,
  gradientFrom,
  gradientTo,
}) => {
  return (
    <DialogHeader className={`p-6 bg-gradient-to-r from-[${gradientFrom}] to-[${gradientTo}]`}>
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2 ml-auto mr-10">
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="hover:bg-white/20 text-white"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSave}
                disabled={loading}
                className="hover:bg-white/20 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </DialogHeader>
  );
};
