
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface BankAccountFormProps {
  onComplete: (completed: boolean) => void;
}

interface BankFormData {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
}

export const BankAccountForm: React.FC<BankAccountFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<BankFormData>();

  const formValues = watch();

  useEffect(() => {
    const isFormComplete = Object.values(formValues).every(value => !!value);
    onComplete(isFormComplete);
  }, [formValues, onComplete]);

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <div className="flex items-center gap-2 text-[rgba(48,64,159,1)] font-bold">
        <banknote className="h-5 w-5" />
        <span>Bank Account Details</span>
      </div>
      <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
        Enter your bank account information for salary processing.
      </div>

      <form className="space-y-6 mt-6">
        <div>
          <Label htmlFor="accountHolderName">Account Holder Name<span className="text-red-500">*</span></Label>
          <Input
            id="accountHolderName"
            {...register("accountHolderName", { required: true })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="accountNumber">Account Number<span className="text-red-500">*</span></Label>
          <Input
            id="accountNumber"
            {...register("accountNumber", { required: true })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="ifscCode">IFSC Code<span className="text-red-500">*</span></Label>
          <Input
            id="ifscCode"
            {...register("ifscCode", { required: true })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="bankName">Bank Name<span className="text-red-500">*</span></Label>
          <Input
            id="bankName"
            {...register("bankName", { required: true })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="branchName">Branch Name<span className="text-red-500">*</span></Label>
          <Input
            id="branchName"
            {...register("branchName", { required: true })}
            className="mt-1"
          />
        </div>
      </form>
    </div>
  );
};
