
import React, { useState } from "react";
import { CreditCard, Download } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { Button } from "@/components/ui/button";
import { BankDetailsEditModal } from "../../modals/BankDetailsEditModal";
import { bankDetailsService } from "@/services/employee/bankDetails.service";
import { BankDetails } from "@/services/types/employee.types";

interface BankInfoSectionProps {
  employeeId: string;
}

export const BankInfoSection: React.FC<BankInfoSectionProps> = ({
  employeeId,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);

  const fetchBankDetails = async () => {
    try {
      const details = await bankDetailsService.getBankDetails(employeeId);
      setBankDetails(details);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  React.useEffect(() => {
    fetchBankDetails();
  }, [employeeId]);

  const maskAccountNumber = (number: string) => {
    const last4 = number.slice(-4);
    return `●●●● ${last4}`;
  };

  return (
    <>
      <InfoCard 
        title="Bank Information" 
        icon={CreditCard}
        onEdit={() => setIsEditModalOpen(true)}
      >
        <div className="space-y-4 p-2">
          <div className="space-y-2">
            {bankDetails && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bank Name</span>
                  <span>{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account No.</span>
                  <span>{maskAccountNumber(bankDetails.accountNumber)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Type</span>
                  <span className="capitalize">{bankDetails.accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">IFSC Code</span>
                  <span>{bankDetails.ifscCode}</span>
                </div>
              </>
            )}
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

      {bankDetails && (
        <BankDetailsEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={bankDetails}
          employeeId={employeeId}
          onUpdate={fetchBankDetails}
        />
      )}
    </>
  );
};
