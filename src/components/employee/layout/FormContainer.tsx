
import React from "react";
import { TabNavigation } from "../TabNavigation";
import { LoaderCircle } from "lucide-react";

interface FormContainerProps {
  children: React.ReactNode;
  tabs: Array<{
    id: string;
    label: string;
    isActive?: boolean;
  }>;
  onTabChange: (tabId: string) => void;
  onSaveAndNext: () => void;
  activeTab: string;
  isSubmitting?: boolean;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  tabs,
  onTabChange,
  onSaveAndNext,
  activeTab,
  isSubmitting = false
}) => {
  return (
    <section className="bg-white shadow-sm rounded-lg mt-6 p-6">
      <TabNavigation tabs={tabs} onTabChange={onTabChange} />
      {children}
      <div className="h-px my-6 bg-gray-200" />
      <div className="flex justify-end space-x-4">
        <button 
          onClick={onSaveAndNext}
          disabled={isSubmitting}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <LoaderCircle className="animate-spin h-4 w-4" />}
          {activeTab === "bank" ? "Submit" : "Save & Next"}
        </button>
      </div>
    </section>
  );
};
