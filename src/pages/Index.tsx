
import React, { useState } from "react";
import { NavigationHeader } from "@/components/employee/NavigationHeader";
import { ProgressBar } from "@/components/employee/ProgressBar";
import { TabNavigation } from "@/components/employee/TabNavigation";
import { EducationForm } from "@/components/employee/EducationForm";
import { ExperienceForm } from "@/components/employee/ExperienceForm";
import { PersonalDetailsForm } from "@/components/employee/PersonalDetailsForm";
import { BankAccountForm } from "@/components/employee/BankAccountForm";
import { FormProgress, FormData, calculateProgress, getProgressMessage } from "@/utils/progressCalculator";
import { toast } from "sonner";
import { 
  Search,
  Settings,
  Bell,
  ChevronDown,
  Plus,
  Download,
  MenuSquare,
  Building2,
  MapPin,
  Workflow,
  Activity,
  Briefcase
} from "lucide-react";
import { 
  Experience, 
  PersonalDetailsFormProps, 
  EducationFormProps, 
  BankAccountFormProps,
  PersonalDetailsData,
  EducationData,
  BankAccountData
} from "@/components/employee/types";

const Index = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formProgress, setFormProgress] = useState<FormProgress>({
    personal: false,
    education: false,
    experience: false,
    bank: false,
  });

  const [formData, setFormData] = useState<FormData>({
    personal: null as PersonalDetailsData | null,
    education: null as EducationData | null,
    experience: [] as Experience[],
    bank: null as BankAccountData | null,
  });

  const updateSectionProgress = (section: keyof FormProgress, completed: boolean) => {
    setFormProgress((prev) => ({
      ...prev,
      [section]: completed,
    }));
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSaveAndNext = () => {
    if (!formProgress[activeTab as keyof FormProgress]) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }

    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else {
      console.log("Submitting form data:", formData);
      toast.success("All forms completed successfully!");
    }
  };

  const handleBack = () => {
    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Details", isActive: activeTab === "personal" },
    { id: "education", label: "Education & Experience", isActive: activeTab === "education" },
    { id: "bank", label: "Bank Account Details", isActive: activeTab === "bank" },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalDetailsForm
            onComplete={(completed: boolean, data?: PersonalDetailsData) => {
              updateSectionProgress("personal", completed);
              if (completed && data) {
                updateFormData("personal", data);
              }
            }}
            initialData={formData.personal}
          />
        );
      case "education":
        return (
          <>
            <EducationForm
              onComplete={(completed: boolean, data?: EducationData) => {
                updateSectionProgress("education", completed);
                if (completed && data) {
                  updateFormData("education", data);
                }
              }}
              initialData={formData.education}
            />
            <div className="shrink-0 h-px mt-[29px] border-[rgba(239,242,255,1)] border-solid border-2" />
            <ExperienceForm
              onComplete={(completed: boolean, data?: Experience[]) => {
                updateSectionProgress("experience", completed);
                if (completed && data) {
                  updateFormData("experience", data);
                }
              }}
              experiences={formData.experience}
            />
          </>
        );
      case "bank":
        return (
          <BankAccountForm
            onComplete={(completed: boolean, data?: BankAccountData) => {
              updateSectionProgress("bank", completed);
              if (completed && data) {
                updateFormData("bank", data);
              }
            }}
            initialData={formData.bank}
          />
        );
      default:
        return null;
    }
  };

  const progress = calculateProgress(formProgress);
  const progressMessage = getProgressMessage(formProgress);

  return (
    <div className="min-h-screen bg-gradient-main">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-brand-primary">Crextio</span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-8">
                  <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">Dashboard</a>
                  <a href="#" className="text-brand-primary font-medium bg-gray-100 px-3 py-1.5 rounded-lg">People</a>
                  <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">Hiring</a>
                  <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">Devices</a>
                  <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">Apps</a>
                  <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">Salary</a>
                  <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">Calendar</a>
                  <a href="#" className="text-brand-secondary hover:text-brand-primary transition-colors">Reviews</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-brand-secondary hover:text-brand-primary transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button className="text-brand-secondary hover:text-brand-primary transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/32"
                  alt="Profile"
                  className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                />
                <ChevronDown className="h-4 w-4 text-brand-secondary" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <div className="text-sm">
                <span className="text-brand-secondary">Interviews</span>
                <div className="mt-1 progress-bar w-24">
                  <div className="progress-bar-fill bg-blue-500" style={{ width: '25%' }} />
                </div>
                <span className="text-xs text-brand-secondary">25%</span>
              </div>
              <div className="text-sm">
                <span className="text-brand-secondary">Hired</span>
                <div className="mt-1 progress-bar w-24">
                  <div className="progress-bar-fill bg-status-invited" style={{ width: '51%' }} />
                </div>
                <span className="text-xs text-brand-secondary">51%</span>
              </div>
              <div className="text-sm">
                <span className="text-brand-secondary">Project time</span>
                <div className="mt-1 progress-bar w-24">
                  <div className="progress-bar-fill bg-brand-accent" style={{ width: '13%' }} />
                </div>
                <span className="text-xs text-brand-secondary">13%</span>
              </div>
              <div className="text-sm">
                <span className="text-brand-secondary">Output</span>
                <div className="mt-1 progress-bar w-24">
                  <div className="progress-bar-fill bg-purple-500" style={{ width: '14%' }} />
                </div>
                <span className="text-xs text-brand-secondary">14%</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="button-modern button-secondary">
                <span>Directory</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="button-modern button-secondary">
                <span>Org Chat</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="button-modern button-secondary">
                <span>Insights</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="button-modern button-secondary inline-flex items-center">
                <MenuSquare className="h-4 w-4 mr-2" />
                <span>Columns</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="button-modern button-secondary inline-flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                <span>Department</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="button-modern button-secondary inline-flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Site</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="button-modern button-secondary inline-flex items-center">
                <Workflow className="h-4 w-4 mr-2" />
                <span>Lifecycle</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="button-modern button-secondary inline-flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                <span>Status</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              <button className="button-modern button-secondary inline-flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>Entity</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-modern pl-10 pr-4"
                />
                <Search className="h-4 w-4 text-brand-secondary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="p-2 text-brand-secondary hover:text-brand-primary rounded-lg hover:bg-gray-100 transition-colors">
                <Plus className="h-5 w-5" />
              </button>
              <button className="p-2 text-brand-secondary hover:text-brand-primary rounded-lg hover:bg-gray-100 transition-colors">
                <MenuSquare className="h-5 w-5" />
              </button>
              <button className="p-2 text-brand-secondary hover:text-brand-primary rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-stretch gap-5 flex-wrap">
          <div className="bg-white shadow-sm rounded-lg pb-[252px] max-md:hidden max-md:pb-[100px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/3f433517a2315f748d1b527306e9afb991ddb621ebbb2f14937e0042769f6d35?placeholderIfAbsent=true"
              className="aspect-[0.1] object-contain w-20 max-md:hidden"
              alt="Sidebar"
            />
          </div>

          <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit my-auto max-md:max-w-full">
            <div className="flex items-center gap-3 mb-6">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/b439b40db39a58c4c7586cb38a5436c42834081d8a0d027b6398156028932de9?placeholderIfAbsent=true"
                className="w-6 h-6"
                alt="Edit icon"
              />
              <h1 className="text-xl font-semibold text-brand-primary">Edit Employee / Mark Abshire</h1>
            </div>

            <ProgressBar
              percentage={progress}
              title={`${progress}% Completed`}
              subtitle={progressMessage}
            />

            <section className="bg-white shadow-sm rounded-lg mt-6 p-6">
              <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
              {renderActiveTabContent()}
              <div className="h-px my-6 bg-gray-200" />
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={handleBack}
                  disabled={activeTab === "personal"}
                  className="button-modern bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  Back
                </button>
                <button 
                  onClick={handleSaveAndNext}
                  className="button-modern bg-red-600 text-white hover:bg-red-700"
                >
                  Save & Next
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
