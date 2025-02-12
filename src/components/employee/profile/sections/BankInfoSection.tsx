
import React from "react";
import { CreditCard } from "lucide-react";
import { InfoCard } from "../InfoCard";

interface BankInfoSectionProps {
  onEdit: () => void;
  data: any;
}

export const BankInfoSection: React.FC<BankInfoSectionProps> = ({
  onEdit,
  data,
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
            <span>{data?.bank_name || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Account No.</span>
            <span>{data?.account_number ? `●●●● ${data.account_number.slice(-4)}` : 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">IFSC Code</span>
            <span>{data?.ifsc_code || 'Not provided'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Account Type</span>
            <span>{data?.account_type ? data.account_type.charAt(0).toUpperCase() + data.account_type.slice(1) : 'Not provided'}</span>
          </div>
        </div>
      </div>
    </InfoCard>
  );
};
