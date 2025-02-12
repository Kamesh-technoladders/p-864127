
import React, { useState } from "react";
import { ProgressBar } from "@/components/employee/ProgressBar";
import { TabNavigation } from "@/components/employee/TabNavigation";
import { EducationForm } from "@/components/employee/EducationForm";
import { ExperienceForm } from "@/components/employee/ExperienceForm";
import { PersonalDetailsForm } from "@/components/employee/PersonalDetailsForm";
import { BankAccountForm } from "@/components/employee/BankAccountForm";
import { FormProgress, FormData, calculateProgress, getProgressMessage } from "@/utils/progressCalculator";
import { toast } from "sonner";
import { LayoutDashboard } from "lucide-react";
import { Experience } from "@/components/employee/types";

const Index = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formProgress, setFormProgress] = useState<FormProgress>({
    personal: false,
    education: false,
    experience: false,
    bank: false,
  });

  const [formData, setFormData] = useState<FormData>({
    personal: null,
    education: null,
    experience: [],
    bank: null,
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
            onComplete={(completed: boolean, data?: any) => {
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
              onComplete={(completed: boolean, data?: any) => {
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
            onComplete={(completed: boolean, data?: any) => {
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
    <div className="min-h-screen bg-gradient-main p-8">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => toast.info("Redirecting to dashboard...")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <LayoutDashboard className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
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
              onClick={handleSaveAndNext}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {activeTab === "bank" ? "Submit" : "Save & Next"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
