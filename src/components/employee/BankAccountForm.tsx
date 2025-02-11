
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Banknote, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BankAccountFormProps {
  onComplete: (completed: boolean) => void;
}

const bankAccountSchema = z.object({
  accountHolderName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[A-Za-z\s.]+$/, "Name can only contain letters, spaces, and dots"),
  accountNumber: z
    .string()
    .min(9, "Account number must be at least 9 digits")
    .max(18, "Account number cannot exceed 18 digits")
    .regex(/^\d+$/, "Account number can only contain numbers"),
  ifscCode: z
    .string()
    .length(11, "IFSC code must be exactly 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format (e.g., SBIN0123456)")
    .transform(val => val.toUpperCase()),
  bankName: z
    .string()
    .min(3, "Bank name must be at least 3 characters")
    .max(50, "Bank name cannot exceed 50 characters")
    .regex(/^[A-Za-z\s.]+$/, "Bank name can only contain letters, spaces, and dots"),
  branchName: z
    .string()
    .min(3, "Branch name must be at least 3 characters")
    .max(50, "Branch name cannot exceed 50 characters")
    .regex(/^[A-Za-z0-9\s.-]+$/, "Branch name can only contain letters, numbers, spaces, dots, and dashes"),
  accountType: z.enum(["savings", "current"], {
    required_error: "Please select an account type",
  }),
  bankPhone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number can only contain numbers"),
  bankEmail: z
    .string()
    .email("Invalid email address")
    .max(50, "Email cannot exceed 50 characters"),
});

type BankFormData = z.infer<typeof bankAccountSchema>;

export const BankAccountForm: React.FC<BankAccountFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<BankFormData>({
    resolver: zodResolver(bankAccountSchema),
    mode: "onChange"
  });

  const formValues = watch();

  useEffect(() => {
    const isFormComplete = Object.values(formValues).every(value => !!value);
    onComplete(isFormComplete && isValid);
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
        <div className="relative">
          <Label htmlFor="accountHolderName" className="text-sm font-semibold text-[#303030]">
            Account Holder Name<span className="text-[#DD0101]">*</span>
          </Label>
          <Input
            id="accountHolderName"
            {...register("accountHolderName")}
            className={cn(
              "mt-2 h-11 border-[#E4E4E4] rounded-lg placeholder:text-[#8E8E8E]",
              "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
              errors.accountHolderName && "border-[#DD0101] hover:border-[#DD0101]/80"
            )}
          />
          {errors.accountHolderName && (
            <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.accountHolderName.message}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="accountNumber" className="text-sm font-semibold text-[#303030]">
            Account Number<span className="text-[#DD0101]">*</span>
          </Label>
          <Input
            id="accountNumber"
            {...register("accountNumber")}
            className={cn(
              "mt-2 h-11 border-[#E4E4E4] rounded-lg placeholder:text-[#8E8E8E]",
              "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
              errors.accountNumber && "border-[#DD0101] hover:border-[#DD0101]/80"
            )}
          />
          {errors.accountNumber && (
            <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.accountNumber.message}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="ifscCode" className="text-sm font-semibold text-[#303030]">
            IFSC Code<span className="text-[#DD0101]">*</span>
          </Label>
          <Input
            id="ifscCode"
            {...register("ifscCode")}
            className={cn(
              "mt-2 h-11 border-[#E4E4E4] rounded-lg placeholder:text-[#8E8E8E] uppercase",
              "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
              errors.ifscCode && "border-[#DD0101] hover:border-[#DD0101]/80"
            )}
          />
          {errors.ifscCode && (
            <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.ifscCode.message}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="bankName" className="text-sm font-semibold text-[#303030]">
            Bank Name<span className="text-[#DD0101]">*</span>
          </Label>
          <Input
            id="bankName"
            {...register("bankName")}
            className={cn(
              "mt-2 h-11 border-[#E4E4E4] rounded-lg placeholder:text-[#8E8E8E]",
              "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
              errors.bankName && "border-[#DD0101] hover:border-[#DD0101]/80"
            )}
          />
          {errors.bankName && (
            <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.bankName.message}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="branchName" className="text-sm font-semibold text-[#303030]">
            Branch Name<span className="text-[#DD0101]">*</span>
          </Label>
          <Input
            id="branchName"
            {...register("branchName")}
            className={cn(
              "mt-2 h-11 border-[#E4E4E4] rounded-lg placeholder:text-[#8E8E8E]",
              "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
              errors.branchName && "border-[#DD0101] hover:border-[#DD0101]/80"
            )}
          />
          {errors.branchName && (
            <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.branchName.message}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="accountType" className="text-sm font-semibold text-[#303030]">
            Account Type<span className="text-[#DD0101]">*</span>
          </Label>
          <Select
            onValueChange={(value) => setValue("accountType", value as "savings" | "current")}
          >
            <SelectTrigger
              id="accountType"
              className={cn(
                "mt-2 h-11 border-[#E4E4E4] rounded-lg",
                "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
                errors.accountType && "border-[#DD0101] hover:border-[#DD0101]/80"
              )}
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

        <div className="relative">
          <Label htmlFor="bankPhone" className="text-sm font-semibold text-[#303030]">
            Bank Phone Number<span className="text-[#DD0101]">*</span>
          </Label>
          <Input
            id="bankPhone"
            {...register("bankPhone")}
            type="tel"
            className={cn(
              "mt-2 h-11 border-[#E4E4E4] rounded-lg placeholder:text-[#8E8E8E]",
              "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
              errors.bankPhone && "border-[#DD0101] hover:border-[#DD0101]/80"
            )}
          />
          {errors.bankPhone && (
            <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.bankPhone.message}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="bankEmail" className="text-sm font-semibold text-[#303030]">
            Bank Email<span className="text-[#DD0101]">*</span>
          </Label>
          <Input
            id="bankEmail"
            {...register("bankEmail")}
            type="email"
            className={cn(
              "mt-2 h-11 border-[#E4E4E4] rounded-lg placeholder:text-[#8E8E8E]",
              "hover:border-[#30409F]/50 focus:ring-2 focus:ring-[#30409F]/20",
              errors.bankEmail && "border-[#DD0101] hover:border-[#DD0101]/80"
            )}
          />
          {errors.bankEmail && (
            <div className="flex items-center gap-1 mt-1 text-xs text-[#DD0101]">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.bankEmail.message}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
