
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
        return <BadgeCheck className="w-3 h-3 text-green-500" />;
      case 'join':
        return <Briefcase className="w-3 h-3 text-blue-500" />;
      case 'role-change':
        return <Building2 className="w-3 h-3 text-purple-500" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border border-gray-200 shadow-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="p-3 bg-gradient-to-r from-[#30409F] to-[#4B5FBD] sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-white" />
              <h2 className="text-sm font-semibold text-white tracking-tight">
                Employment Details
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {!isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-6 px-2 hover:bg-white/20 text-white"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={onClose}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    className="h-6 px-2 hover:bg-white/20 text-white"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    disabled={loading}
                    className="h-6 px-2 hover:bg-white/20 text-white"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3">
            {/* Left Panel - Main Information */}
            <div className="space-y-3">
              <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-sm font-semibold mb-2 text-gray-800">Basic Information</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-gray-600 mb-0.5 block">Employee ID</label>
                    <Input
                      value={formData.employeeId}
                      readOnly
                      className="h-6 text-[11px] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-600 mb-0.5 block">Department</label>
                    <Input
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      readOnly={!isEditing}
                      className={cn(
                        "h-6 text-[11px] transition-colors duration-200",
                        !isEditing && "bg-gray-50"
                      )}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-600 mb-0.5 block">Position</label>
                    <Input
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      readOnly={!isEditing}
                      className={cn(
                        "h-6 text-[11px] transition-colors duration-200",
                        !isEditing && "bg-gray-50"
                      )}
                    />
                  </div>
                </div>
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
                  <div key={index} className="relative">
                    {index !== formData.employmentHistory.length - 1 && (
                      <div className="absolute left-[11px] top-[20px] w-0.5 h-[calc(100%+4px)] bg-gradient-to-b from-purple-500 to-purple-100" />
                    )}
                    <div className="flex gap-2">
                      <div className="relative z-10 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-[11px] font-medium text-gray-900">{event.title}</h4>
                            <p className="text-[10px] text-gray-600">{event.description}</p>
                          </div>
                          <span className="text-[10px] text-gray-500">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
