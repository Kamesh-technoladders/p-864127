
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { BankAccountData } from "../types";

interface BankDetailsSectionProps {
  data: BankAccountData;
  onEdit: () => void;
}

export const BankDetailsSection: React.FC<BankDetailsSectionProps> = ({
  data,
  onEdit,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#30409F]">Bank Details</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600">Account Holder Name</label>
          <p className="font-medium">{data.accountHolderName}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Account Number</label>
          <p className="font-medium">{data.accountNumber}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">IFSC Code</label>
          <p className="font-medium">{data.ifscCode}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Bank Name</label>
          <p className="font-medium">{data.bankName}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Branch Name</label>
          <p className="font-medium">{data.branchName}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Account Type</label>
          <p className="font-medium">{data.accountType}</p>
        </div>
        {data.bankPhone && (
          <div>
            <label className="text-sm text-gray-600">Bank Phone</label>
            <p className="font-medium">{data.bankPhone}</p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-600">Cancelled Cheque</label>
          {data.cancelledCheque ? (
            <div className="flex items-center gap-2">
              <span className="text-blue-600">{data.cancelledCheque.name}</span>
            </div>
          ) : (
            <span className="text-gray-400">No document uploaded</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-600">Passbook Copy</label>
          {data.passbookCopy ? (
            <div className="flex items-center gap-2">
              <span className="text-blue-600">{data.passbookCopy.name}</span>
            </div>
          ) : (
            <span className="text-gray-400">No document uploaded</span>
          )}
        </div>
      </div>
    </div>
  );
};
