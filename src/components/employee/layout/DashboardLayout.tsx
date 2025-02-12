
import React from "react";
import { LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-main p-8">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => toast.info("Redirecting to dashboard...")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <LayoutDashboard className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
};
