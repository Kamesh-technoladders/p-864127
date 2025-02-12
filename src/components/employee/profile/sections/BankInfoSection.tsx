
import React from "react";
import { CreditCard, Download } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { Button } from "@/components/ui/button";

interface BankInfoSectionProps {
  onEdit: () => void;
}

export const BankInfoSection: React.FC<BankInfoSectionProps> = ({
  onEdit,
}) => {
  return (
    <InfoCard 
      title="Bank Information" 
      icon={CreditCard}
      onEdit={onEdit}
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
  );
};
