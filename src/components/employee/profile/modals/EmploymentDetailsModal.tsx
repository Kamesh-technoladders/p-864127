
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Edit2,
  Save,
  X,
  Briefcase,
  Building2,
  BadgeCheck,
  Clock,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
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
    employmentHistory: TimelineEvent[];
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

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'promotion':
        return <BadgeCheck className="w-5 h-5 text-green-500" />;
      case 'join':
        return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'role-change':
        return <Building2 className="w-5 h-5 text-purple-500" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/90 backdrop-blur-lg border border-white/20 shadow-2xl">
        <DialogHeader className="p-6 bg-gradient-to-r from-[#ee9ca7] to-[#ffdde1]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Employment Details
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
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
                    onClick={() => setIsEditing(false)}
                    className="hover:bg-white/20 text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Panel - Main Information */}
          <div className="space-y-6">
            <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Employee ID</label>
                  <Input
                    value={formData.employeeId}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Department</label>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    readOnly={!isEditing}
                    className={cn(
                      "transition-colors duration-200",
                      !isEditing && "bg-gray-50"
                    )}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Position</label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    readOnly={!isEditing}
                    className={cn(
                      "transition-colors duration-200",
                      !isEditing && "bg-gray-50"
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Documents</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Offer Letter
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Contract Document
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Timeline */}
          <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-white/20">
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Career Timeline</h3>
            <div className="space-y-8">
              {formData.employmentHistory.map((event, index) => (
                <div key={index} className="relative">
                  {index !== formData.employmentHistory.length - 1 && (
                    <div className="absolute left-[17px] top-[30px] w-0.5 h-[calc(100%+10px)] bg-gradient-to-b from-purple-500 to-purple-100" />
                  )}
                  <div className="flex gap-4">
                    <div className="relative z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md">
                      {getTimelineIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
