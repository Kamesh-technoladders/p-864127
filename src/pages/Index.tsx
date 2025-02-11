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
    <div className="min-h-screen bg-[#F8F9FC]">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold">Crextio</span>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-8">
                  <a href="#" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                  <a href="#" className="text-black font-medium">People</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Hiring</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Devices</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Apps</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Salary</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Calendar</a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Reviews</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/32"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <div className="text-sm">
                <span className="text-gray-500">Interviews</span>
                <div className="mt-1 h-1 w-24 bg-gray-200 rounded">
                  <div className="h-full w-1/4 bg-blue-500 rounded" />
                </div>
                <span className="text-xs text-gray-600">25%</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Hired</span>
                <div className="mt-1 h-1 w-24 bg-gray-200 rounded">
                  <div className="h-full w-1/2 bg-green-500 rounded" />
                </div>
                <span className="text-xs text-gray-600">51%</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Project time</span>
                <div className="mt-1 h-1 w-24 bg-gray-200 rounded">
                  <div className="h-full w-[13%] bg-yellow-500 rounded" />
                </div>
                <span className="text-xs text-gray-600">13%</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Output</span>
                <div className="mt-1 h-1 w-24 bg-gray-200 rounded">
                  <div className="h-full w-[14%] bg-purple-500 rounded" />
                </div>
                <span className="text-xs text-gray-600">14%</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <span>Directory</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <span>Org Chat</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <span>Insights</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <MenuSquare className="h-4 w-4" />
                <span>Columns</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Department</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Site</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <Workflow className="h-4 w-4" />
                <span>Lifecycle</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Status</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Entity</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Plus className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <MenuSquare className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-stretch gap-5 flex-wrap">
          <div className="bg-[rgba(252,252,252,1)] pb-[252px] max-md:hidden max-md:pb-[100px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/3f433517a2315f748d1b527306e9afb991ddb621ebbb2f14937e0042769f6d35?placeholderIfAbsent=true"
              className="aspect-[0.1] object-contain w-20 max-md:hidden"
              alt="Sidebar"
            />
          </div>

          <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit my-auto max-md:max-w-full">
            <div className="flex items-stretch gap-1 text-lg text-[rgba(48,48,48,1)] font-bold">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/b439b40db39a58c4c7586cb38a5436c42834081d8a0d027b6398156028932de9?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-6 shrink-0"
                alt="Edit icon"
              />
              <h1 className="grow">Edit Employee / Mark Abshire</h1>
            </div>

            <ProgressBar
              percentage={progress}
              title={`${progress}% Completed`}
              subtitle={progressMessage}
            />

            <section className="bg-white border flex w-full flex-col items-stretch mt-5 pb-6 rounded-lg border-[rgba(238,238,238,1)] border-solid">
              <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
              {renderActiveTabContent()}
              <div className="shrink-0 h-px mt-[29px] border-[rgba(239,242,255,1)] border-solid border-2" />
              <div className="flex w-[211px] max-w-full items-stretch gap-4 text-base mr-6 mt-6 max-md:mr-2.5">
                <button 
                  onClick={handleBack}
                  disabled={activeTab === "personal"}
                  className="self-stretch bg-[rgba(221,1,1,0.1)] gap-2 text-[rgba(221,1,1,1)] font-semibold whitespace-nowrap px-4 py-3 rounded-lg disabled:opacity-50"
                >
                  Back
                </button>
                <button 
                  onClick={handleSaveAndNext}
                  className="self-stretch bg-[rgba(221,1,1,1)] gap-2 text-white font-bold px-4 py-3 rounded-lg"
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
