
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
import { Experience, PersonalDetailsFormProps, EducationFormProps, BankAccountFormProps } from "@/components/employee/types";

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
    experience: [] as Experience[],
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
    <div className="bg-[rgba(242,242,245,1)] flex flex-col overflow-hidden items-stretch min-h-screen">
      <NavigationHeader />

      <div className="flex items-stretch gap-5 flex-wrap">
        <div className="bg-[rgba(252,252,252,1)] pb-[252px] max-md:hidden max-md:pb-[100px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/3f433517a2315f748d1b527306e9afb991ddb621ebbb2f14937e0042769f6d35?placeholderIfAbsent=true"
            className="aspect-[0.1] object-contain w-20 max-md:hidden"
            alt="Sidebar"
          />
        </div>

        <main className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit my-auto max-md:max-w-full">
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
        </main>
      </div>
    </div>
  );
};

export default Index;
