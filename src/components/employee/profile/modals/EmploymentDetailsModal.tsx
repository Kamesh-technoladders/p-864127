
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Briefcase, Calendar, ChevronRight, X } from "lucide-react";
import { TimelineEvent } from "./components/TimelineEvent";
import { EmploymentForm } from "./components/EmploymentForm";
import { EmploymentModalActions } from "./components/EmploymentModalActions";

interface TimelineEventType {
  title: string;
  date: string;
  description: string;
  type: 'promotion' | 'join' | 'role-change';
}

interface EmploymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
  initialData: {
    employeeId: string;
    department: string;
    position: string;
    joinedDate: string;
    employmentHistory: TimelineEventType[];
  };
  onUpdate: (data: any) => Promise<void>;
}

export const EmploymentDetailsModal: React.FC<EmploymentDetailsModalProps> = ({
  isOpen,
  onClose,
  employeeId,
  initialData,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await onUpdate(formData);
      setIsEditing(false);
      toast.success("Employment details updated successfully");
    } catch (error) {
      toast.error("Failed to update employment details");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border border-gray-200 shadow-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="p-3 bg-gradient-to-r from-[#30409F] to-[#4B5FBD] sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-white" />
              <DialogTitle className="text-sm font-semibold text-white tracking-tight">
                Edit Employment Details
              </DialogTitle>
            </div>
            <div className="flex items-center gap-1">
              <EmploymentModalActions
                isEditing={isEditing}
                loading={loading}
                onEdit={() => setIsEditing(true)}
                onCancel={() => setIsEditing(false)}
                onSave={handleSave}
                onClose={onClose}
              />
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3">
            {/* Left Panel - Main Information */}
            <div className="space-y-3">
              <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-sm font-semibold mb-2 text-gray-800">Basic Information</h3>
                <EmploymentForm
                  formData={formData}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-sm font-semibold mb-2 text-gray-800">Documents</h3>
                <div className="space-y-1.5">
                  <Button variant="outline" className="w-full h-6 text-[11px] justify-start">
                    <Calendar className="w-3 h-3 mr-1" />
                    Offer Letter
                    <ChevronRight className="w-3 h-3 ml-auto" />
                  </Button>
                  <Button variant="outline" className="w-full h-6 text-[11px] justify-start">
                    <Calendar className="w-3 h-3 mr-1" />
                    Contract Document
                    <ChevronRight className="w-3 h-3 ml-auto" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel - Timeline */}
            <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <h3 className="text-sm font-semibold mb-3 text-gray-800">Career Timeline</h3>
              <div className="space-y-4">
                {formData.employmentHistory.map((event, index) => (
                  <TimelineEvent
                    key={index}
                    {...event}
                    isLast={index === formData.employmentHistory.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
