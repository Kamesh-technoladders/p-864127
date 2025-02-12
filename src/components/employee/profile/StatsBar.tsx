
import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, Target } from "lucide-react";

interface StatsBarProps {
  joinedDate: string;
  gender: string;
  bloodGroup: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  joinedDate,
  gender,
  bloodGroup,
}) => {
  const stats = [
    { title: "Joined Date", value: joinedDate, icon: <Users className="w-5 h-5" /> },
    { title: "Gender", value: gender || "Not specified", icon: <Briefcase className="w-5 h-5" /> },
    { title: "Blood Group", value: bloodGroup || "Not specified", icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
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
