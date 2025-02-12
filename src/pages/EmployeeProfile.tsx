import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { 
  ChevronRight, 
  Laptop, 
  MoreHorizontal, 
  Loader2, 
  ArrowLeft,
  Edit,
  UserCircle,
  Briefcase,
  GraduationCap,
  CreditCard,
  Download,
  Calendar,
  Clock,
  BadgeCheck,
  Activity
} from "lucide-react";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { ProfileHeader } from "@/components/employee/profile/ProfileHeader";
import { StatsBar } from "@/components/employee/profile/StatsBar";
import { WorkTimeCard } from "@/components/employee/profile/cards/WorkTimeCard";
import { TimeTrackerCard } from "@/components/employee/profile/cards/TimeTrackerCard";
import { OnboardingTasksCard } from "@/components/employee/profile/cards/OnboardingTasksCard";
import { OnboardingProgressCard } from "@/components/employee/profile/cards/OnboardingProgressCard";
import { CalendarCard } from "@/components/employee/profile/cards/CalendarCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const EmployeeProfile = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isLoading, employeeData, error, fetchEmployeeData } = useEmployeeData(id);

  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id, fetchEmployeeData]);

  const handleEdit = (section: string) => {
    toast.info(`Editing ${section} details`);
    // Add your edit modal logic here
  };

  const QuickActionButton = ({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full hover:bg-brand-primary hover:text-white transition-colors"
            onClick={onClick}
          >
            <Icon className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const InfoCard = ({ 
    title, 
    icon: Icon, 
    children, 
    onEdit,
    expandable = false 
  }: { 
    title: string; 
    icon: any; 
    children: React.ReactNode; 
    onEdit?: () => void;
    expandable?: boolean;
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

  if (!id || isLoading || error || !employeeData) {
    if (!id) {
      return (
        <DashboardLayout>
          <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">No Employee Selected</h2>
              <p className="text-gray-500">Please select an employee to view their profile.</p>
            </div>
            <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
          </div>
        </DashboardLayout>
      );
    }

    if (isLoading) {
      return (
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </DashboardLayout>
      );
    }

    return (
      <DashboardLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              {error || "Employee Not Found"}
            </h2>
            <p className="text-gray-500">The requested employee could not be found.</p>
          </div>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleDownloadDocuments = () => {
    toast.info("Preparing documents for download...");
    // Implementation for document download
  };

  const handleScheduleMeeting = () => {
    toast.info("Opening meeting scheduler...");
    // Implementation for meeting scheduler
  };

  const handleViewAttendance = () => {
    toast.info("Loading attendance history...");
    // Implementation for attendance history
  };

  const handleGenerateReport = () => {
    toast.info("Generating employee report...");
    // Implementation for report generation
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF9E7] p-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <QuickActionButton
              icon={Download}
              label="Download Documents"
              onClick={handleDownloadDocuments}
            />
            <QuickActionButton
              icon={Calendar}
              label="Schedule Meeting"
              onClick={handleScheduleMeeting}
            />
            <QuickActionButton
              icon={Clock}
              label="View Attendance"
              onClick={handleViewAttendance}
            />
            <QuickActionButton
              icon={Activity}
              label="Generate Report"
              onClick={handleGenerateReport}
            />
          </div>
        </div>

        <ProfileHeader
          employeeId={employeeData.employee_id}
          firstName={employeeData.first_name}
          lastName={employeeData.last_name}
          email={employeeData.email}
        />

        <StatsBar
          joinedDate={new Date(employeeData.created_at).toLocaleDateString()}
          gender={employeeData.gender}
          bloodGroup={employeeData.blood_group}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <InfoCard 
            title="Personal Information" 
            icon={UserCircle}
            onEdit={() => handleEdit("personal")}
            expandable
          >
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span>{employeeData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date of Birth</span>
                  <span>{new Date(employeeData.date_of_birth).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Marital Status</span>
                  <span>{employeeData.marital_status}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Additional Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nationality</span>
                    <span>Indian</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Languages</span>
                    <span>English, Hindi</span>
                  </div>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Employment Details" 
            icon={Briefcase}
            onEdit={() => handleEdit("employment")}
            expandable
          >
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Employee ID</span>
                  <span>{employeeData.employee_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Department</span>
                  <span>Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Position</span>
                  <span>Software Engineer</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Employment History</h4>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Senior Developer</div>
                    <div className="text-gray-500">Jan 2023 - Present</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Developer</div>
                    <div className="text-gray-500">Jan 2022 - Dec 2022</div>
                  </div>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Education & Experience" 
            icon={GraduationCap}
            onEdit={() => handleEdit("education")}
            expandable
          >
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Highest Degree</span>
                  <span>Bachelor's</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience</span>
                  <span>5 years</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Education Timeline</h4>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">B.Tech in Computer Science</div>
                    <div className="text-gray-500">2015 - 2019</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Higher Secondary</div>
                    <div className="text-gray-500">2013 - 2015</div>
                  </div>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard 
            title="Bank Information" 
            icon={CreditCard}
            onEdit={() => handleEdit("bank")}
            expandable
          >
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Bank Name</span>
                  <span>●●●● Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account No.</span>
                  <span>●●●● 4321</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Documents</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Cancelled Cheque
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Bank Statement
                  </Button>
                </div>
              </div>
            </div>
          </InfoCard>

          <div className="h-[350px]">
            <WorkTimeCard />
          </div>

          <div className="h-[350px]">
            <TimeTrackerCard />
          </div>

          <div className="h-[350px]">
            <OnboardingTasksCard />
          </div>

          <div className="h-[350px]">
            <OnboardingProgressCard />
          </div>

          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 h-[300px]">
            <CalendarCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
