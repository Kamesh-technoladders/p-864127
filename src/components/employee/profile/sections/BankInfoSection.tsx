
import React, { useState } from "react";
import { CreditCard, Download, Copy } from "lucide-react";
import { InfoCard } from "../InfoCard";
import { Button } from "@/components/ui/button";
import { BankDetailsEditModal } from "../../modals/BankDetailsEditModal";
import { bankDetailsService } from "@/services/employee/bankDetails.service";
import { BankDetails } from "@/services/types/employee.types";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

interface BankInfoSectionProps {
  employeeId: string;
}

export const BankInfoSection: React.FC<BankInfoSectionProps> = ({
  employeeId,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBankDetails = async () => {
    try {
      setIsLoading(true);
      const details = await bankDetailsService.getBankDetails(employeeId);
      setBankDetails(details);
    } catch (error) {
      console.error("Error fetching bank details:", error);
      toast.error("Failed to load bank details");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (employeeId) {
      console.log('Fetching bank details for employee:', employeeId);
      fetchBankDetails();
    }
  }, [employeeId]);

  const maskAccountNumber = (number: string) => {
    const last4 = number.slice(-4);
    return `●●●● ${last4}`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <>
      <InfoCard 
        title="Bank Information" 
        icon={CreditCard}
        onEdit={() => setIsEditModalOpen(true)}
      >
        <div className="space-y-3 p-2">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {bankDetails && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bank Name</span>
                      <span>{bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Account No.</span>
                      <div className="flex items-center gap-2">
                        <span>{maskAccountNumber(bankDetails.accountNumber)}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleCopy(bankDetails.accountNumber, 'Account number')}
                                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy account number</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Type</span>
                      <span className="capitalize">{bankDetails.accountType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">IFSC Code</span>
                      <div className="flex items-center gap-2">
                        <span>{bankDetails.ifscCode}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleCopy(bankDetails.ifscCode, 'IFSC code')}
                                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy IFSC code</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100">
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
            </>
          )}
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
