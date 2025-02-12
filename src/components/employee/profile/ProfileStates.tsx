
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/employee/layout/DashboardLayout";

interface ErrorStateProps {
  message: string;
  onReturn: () => void;
}

export const LoadingState = () => (
  <DashboardLayout>
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  </DashboardLayout>
);

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onReturn }) => (
  <DashboardLayout>
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{message}</h2>
        <p className="text-gray-500">Please try again or return to dashboard.</p>
      </div>
      <Button onClick={onReturn}>Return to Dashboard</Button>
    </div>
  </DashboardLayout>
);
