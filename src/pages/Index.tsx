
import React, { useState } from "react";
import { NavigationHeader } from "@/components/employee/NavigationHeader";
import { ProgressBar } from "@/components/employee/ProgressBar";
import { TabNavigation } from "@/components/employee/TabNavigation";
import { EducationForm } from "@/components/employee/EducationForm";
import { ExperienceForm } from "@/components/employee/ExperienceForm";
import { PersonalDetailsForm } from "@/components/employee/PersonalDetailsForm";
import { DocumentsForm } from "@/components/employee/DocumentsForm";

const Index = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Details", isActive: activeTab === "personal" },
    { id: "education", label: "Education & Experience", isActive: activeTab === "education" },
    { id: "documents", label: "Documents", isActive: activeTab === "documents" },
    { id: "bank", label: "Bank Account Details", isActive: activeTab === "bank" },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetailsForm />;
      case "education":
        return (
          <>
            <EducationForm />
            <div className="shrink-0 h-px mt-[29px] border-[rgba(239,242,255,1)] border-solid border-2" />
            <ExperienceForm />
          </>
        );
      case "documents":
        return <DocumentsForm />;
      default:
        return null;
    }
  };

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
            percentage={25}
            title="25% Completed"
            subtitle="Update your profile information to release offer letter."
          />

          <section className="bg-white border flex w-full flex-col items-stretch mt-5 pb-6 rounded-lg border-[rgba(238,238,238,1)] border-solid">
            <TabNavigation tabs={tabs} onTabChange={setActiveTab} />

            {renderActiveTabContent()}

            <div className="shrink-0 h-px mt-[29px] border-[rgba(239,242,255,1)] border-solid border-2" />

            <div className="flex w-[211px] max-w-full items-stretch gap-4 text-base mr-6 mt-6 max-md:mr-2.5">
              <button className="self-stretch bg-[rgba(221,1,1,0.1)] gap-2 text-[rgba(221,1,1,1)] font-semibold whitespace-nowrap px-4 py-3 rounded-lg">
                Back
              </button>
              <button className="self-stretch bg-[rgba(221,1,1,1)] gap-2 text-white font-bold px-4 py-3 rounded-lg">
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
