
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FormData } from "@/utils/progressCalculator";
import { 
  ChevronDown, 
  Filter, 
  Plus, 
  Search, 
  SlidersHorizontal,
  Grid,
  Download
} from "lucide-react";

interface DashboardViewProps {
  formData: FormData;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ formData }) => {
  return (
    <div className="space-y-8">
      {/* Title and Progress Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-brand-primary">People</h1>
        
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-brand-secondary">Interviews</span>
              <span className="text-sm font-bold">25%</span>
            </div>
            <Progress value={25} className="h-2 bg-gray-100" />
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-brand-secondary">Hired</span>
              <span className="text-sm font-bold">51%</span>
            </div>
            <Progress value={51} className="h-2 bg-gray-100" />
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-brand-secondary">Project time</span>
              <span className="text-sm font-bold">13%</span>
            </div>
            <Progress value={13} className="h-2 bg-gray-100" />
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-brand-secondary">Output</span>
              <span className="text-sm font-bold">14%</span>
            </div>
            <Progress value={14} className="h-2 bg-gray-100" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Button variant="outline" className="text-brand-secondary">
              Directory
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-brand-secondary">
              Org Chat
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-brand-secondary">
              Insights
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
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
            Site
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-brand-secondary">
            Lifecycle
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-brand-secondary">
            Status
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-brand-secondary">
            Entity
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

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Lifecycle</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-brand-accent/10">
              <TableCell>
                <input type="checkbox" className="rounded border-gray-300" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-brand-secondary">john@example.com</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>Software Engineer</TableCell>
              <TableCell>Engineering</TableCell>
              <TableCell>San Francisco</TableCell>
              <TableCell>$120,000</TableCell>
              <TableCell>Jan 15, 2024</TableCell>
              <TableCell>Full-time</TableCell>
              <TableCell>
                <span className="status-pill status-pill-invited">Invited</span>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-brand-accent/10">
              <TableCell>
                <input type="checkbox" className="rounded border-gray-300" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-brand-secondary">jane@example.com</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>Product Designer</TableCell>
              <TableCell>Design</TableCell>
              <TableCell>London</TableCell>
              <TableCell>$95,000</TableCell>
              <TableCell>Feb 1, 2024</TableCell>
              <TableCell>Contract</TableCell>
              <TableCell>
                <span className="status-pill status-pill-absent">Absent</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
