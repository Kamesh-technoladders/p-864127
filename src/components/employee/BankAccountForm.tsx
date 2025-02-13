
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormField } from "./bank/FormField";
import { DocumentUploads } from "./bank/DocumentUploads";
import { bankAccountSchema, type BankFormData } from "./bank/bankAccountSchema";
import { BankDetails } from "@/services/types/employee.types";

interface BankAccountFormProps {
  onComplete: (completed: boolean, formData?: BankDetails) => void;
  initialData?: BankDetails;
  isSubmitting?: boolean;
}

export const BankAccountForm: React.FC<BankAccountFormProps> = ({
  onComplete,
  initialData,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty }
  } = useForm<BankFormData>({
    resolver: zodResolver(bankAccountSchema),
    mode: "onChange",
    defaultValues: initialData || {}
  });

  const onSubmit = (data: BankFormData) => {
    onComplete(true, data);
  };

  const handleCancel = () => {
    onComplete(false);
  };

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="flex items-center gap-2 text-[#30409F] mb-6">
        <Banknote className="h-6 w-6" />
        <span className="text-base font-semibold">Bank Account Details</span>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          <FormField
            id="accountHolderName"
            label="Account Holder Name"
            register={register}
            error={errors.accountHolderName}
            placeholder="Enter account holder name"
          />

          <FormField
            id="accountNumber"
            label="Account Number"
            register={register}
            error={errors.accountNumber}
            placeholder="Enter account number"
          />

          <FormField
            id="ifscCode"
            label="IFSC Code"
            register={register}
            error={errors.ifscCode}
            placeholder="Enter IFSC code"
            className="uppercase"
          />

          <FormField
            id="bankName"
            label="Bank Name"
            register={register}
            error={errors.bankName}
            placeholder="Enter bank name"
          />

          <FormField
            id="branchName"
            label="Branch Name"
            register={register}
            error={errors.branchName}
            placeholder="Enter branch name"
          />

          <div className="relative">
            <label htmlFor="accountType" className="text-sm font-semibold text-[#303030]">
              Account Type<span className="text-[#DD0101]">*</span>
            </label>
            <Select
              onValueChange={(value) => setValue("accountType", value as "savings" | "current")}
              defaultValue={initialData?.accountType}
            >
              <SelectTrigger
                id="accountType"
                className="mt-2 h-11 border-[#E4E4E4] rounded-lg hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20"
              >
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="current">Current</SelectItem>
              </SelectContent>
            </Select>
            {errors.accountType && (
              <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.accountType.message}</span>
              </div>
            )}
          </div>

          <FormField
            id="bankPhone"
            label="Bank Phone Number"
            register={register}
            error={errors.bankPhone}
            type="tel"
            placeholder="Enter bank phone number"
          />
        </div>

        <DocumentUploads setValue={setValue} formValues={{}} />

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || !isDirty || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};
