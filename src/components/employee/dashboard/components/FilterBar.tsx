
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Filter, 
  Plus, 
  Search, 
  SlidersHorizontal,
  Grid,
  Download,
  UserCircle,
  Briefcase
} from "lucide-react";

export const FilterBar: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="text-brand-secondary">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Columns
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="text-brand-secondary">
          <Filter className="mr-2 h-4 w-4" />
          Department
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="text-brand-secondary">
          <UserCircle className="mr-2 h-4 w-4" />
          Designation
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="text-brand-secondary">
          <Briefcase className="mr-2 h-4 w-4" />
          Job Type
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="text-brand-secondary">
          Status
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm"
          />
        </div>
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <Grid className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
