
import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Building2, BadgeCheck, Clock } from "lucide-react";

interface StatsBarProps {
  joinedDate: string;
  department: string;
  designation: string;
  yearsOfExperience: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  joinedDate,
  department,
  designation,
  yearsOfExperience,
}) => {
  const stats = [
    { title: "Joined Date", value: joinedDate, icon: <Users className="w-5 h-5" /> },
    { title: "Department", value: department || "Not specified", icon: <Building2 className="w-5 h-5" /> },
    { title: "Designation", value: designation || "Not specified", icon: <BadgeCheck className="w-5 h-5" /> },
    { title: "Experience", value: yearsOfExperience, icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {stats.map(({ title, value, icon }) => (
        <Card key={title} className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <div className="text-sm text-gray-500">{title}</div>
              <div className="text-xl font-bold">{value}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
