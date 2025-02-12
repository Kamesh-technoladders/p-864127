
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const employmentSchema = z.object({
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  employmentStartDate: z.string().min(1, "Start date is required"),
  employmentStatus: z.enum(["active", "inactive", "onLeave"], {
    required_error: "Employment status is required",
  }),
});

type EmploymentFormData = z.infer<typeof employmentSchema>;

interface EmploymentDetailsFormProps {
  onComplete: (completed: boolean, data?: any) => void;
  initialData?: EmploymentFormData | null;
  employeeId: string;
}

export const EmploymentDetailsForm: React.FC<EmploymentDetailsFormProps> = ({
  onComplete,
  initialData,
  employeeId,
}) => {
  const form = useForm<EmploymentFormData>({
    resolver: zodResolver(employmentSchema),
    defaultValues: initialData || {
      department: "",
      position: "",
      employmentStartDate: "",
      employmentStatus: "active",
    },
  });

  const onSubmit = (data: EmploymentFormData) => {
    onComplete(true, data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[622px]">
        <div>
          <label className="text-sm font-medium">Department</label>
          <Input
            {...form.register("department")}
            className="mt-1"
            placeholder="Enter department"
          />
          {form.formState.errors.department && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.department.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Position</label>
          <Input
            {...form.register("position")}
            className="mt-1"
            placeholder="Enter position"
          />
          {form.formState.errors.position && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.position.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Start Date</label>
          <Input
            {...form.register("employmentStartDate")}
            type="date"
            className="mt-1"
          />
          {form.formState.errors.employmentStartDate && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.employmentStartDate.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Employment Status</label>
          <Select
            onValueChange={(value) => form.setValue("employmentStatus", value as "active" | "inactive" | "onLeave")}
            defaultValue={form.getValues("employmentStatus")}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="onLeave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.employmentStatus && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.employmentStatus.message}
            </span>
          )}
        </div>
      </form>
    </Form>
  );
};
