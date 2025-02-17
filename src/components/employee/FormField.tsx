
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  error?: { message?: string };
  required?: boolean;
  type?: string;
  register: any;
  className?: string;
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  required = true,
  type = "text",
  register,
  className,
  placeholder,
}) => {
  return (
    <div className="relative">
      <Label htmlFor={id} className="text-[9px] font-semibold text-[#303030]">
        {label}{required && <span className="text-[#DD0101]">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        {...register(id)}
        className={cn(
          "mt-0.5 h-5 max-w-[200px] border-[#E4E4E4] rounded text-[10px] placeholder:text-[10px]",
          "hover:border-[#30409F]/50 focus:ring-1 focus:ring-[#30409F]/20",
          error && "border-[#DD0101] hover:border-[#DD0101]/80 focus:ring-[#DD0101]/20",
          className
        )}
        placeholder={placeholder}
      />
      {error && (
        <div className="flex items-center gap-0.5 mt-0.5 text-[9px] text-[#DD0101]">
          <AlertCircle className="h-2.5 w-2.5" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};
