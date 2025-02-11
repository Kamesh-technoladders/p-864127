
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BankAccountFormProps } from "./types";
import { FormField } from "./bank/FormField";
import { DocumentUploads } from "./bank/DocumentUploads";
import { bankAccountSchema, type BankFormData } from "./bank/bankAccountSchema";

export const BankAccountForm: React.FC<BankAccountFormProps> = ({ onComplete, initialData }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<BankFormData>({
    resolver: zodResolver(bankAccountSchema),
    mode: "onChange",
    defaultValues: initialData || {}
  });

  const formValues = watch();

  useEffect(() => {
    const isFormComplete = Object.values(formValues).every(value => !!value);
    onComplete(isFormComplete && isValid, formValues);
  }, [formValues, isValid, onComplete]);

  const onSubmit = (data: BankFormData) => {
    toast({
      title: "Bank Account Details",
      description: "Bank account details saved successfully!",
      duration: 3000,
    });
  };

  return (
    <div className="w-[648px] max-w-full bg-white rounded-lg border border-[#EEEEEE] px-6 py-4">
      <div className="flex items-center gap-2 text-[#30409F]">
        <Banknote className="h-6 w-6" />
        <span className="text-base font-semibold">Bank Account Details</span>
      </div>
      
      <div className="text-[#505050] text-xs mt-2">
        Enter your bank account information for salary processing.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
        <FormField
          id="accountHolderName"
          label="Account Holder Name"
          register={register}
          error={errors.accountHolderName}
        />

        <FormField
          id="accountNumber"
          label="Account Number"
          register={register}
          error={errors.accountNumber}
        />

        <FormField
          id="ifscCode"
          label="IFSC Code"
          register={register}
          error={errors.ifscCode}
          className="uppercase"
        />

        <FormField
          id="bankName"
          label="Bank Name"
          register={register}
          error={errors.bankName}
        />

        <FormField
          id="branchName"
          label="Branch Name"
          register={register}
          error={errors.branchName}
        />

        <div className="relative">
          <label htmlFor="accountType" className="text-sm font-semibold text-[#303030]">
            Account Type<span className="text-[#DD0101]">*</span>
          </label>
          <Select
            onValueChange={(value) => setValue("accountType", value as "savings" | "current")}
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
        />

        <DocumentUploads setValue={setValue} formValues={formValues} />
      </form>
    </div>
  );
};
