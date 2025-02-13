
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Grid,
  Download,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  selectedStatus,
  onStatusChange
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
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
