
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Search,
  FileText,
  FileSpreadsheet,
  Presentation,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee } from "@/hooks/useEmployees";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import pptxgen from "pptxgenjs";
import { saveAs } from "file-saver";
import { toast } from "sonner";

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  employees: Employee[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  employees
}) => {
  const downloadAsCSV = () => {
    try {
      const headers = ['Employee ID', 'Name', 'Email', 'Gender', 'Blood Group', 'Status'];
      const csvData = employees.map(emp => [
        emp.employee_id,
        `${emp.first_name} ${emp.last_name}`,
        emp.email,
        emp.gender || '-',
        emp.blood_group || '-',
        emp.employment_status || 'active'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'employees.csv');
      toast.success('CSV file downloaded successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      toast.error('Failed to download CSV file');
    }
  };

  const downloadAsPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text('Employee List', 15, 15);
      
      // Add employee data
      const tableData = employees.map(emp => [
        emp.employee_id,
        `${emp.first_name} ${emp.last_name}`,
        emp.email,
        emp.gender || '-',
        emp.blood_group || '-',
        emp.employment_status || 'active'
      ]);
      
      (doc as any).autoTable({
        head: [['ID', 'Name', 'Email', 'Gender', 'Blood Group', 'Status']],
        body: tableData,
        startY: 25,
      });
      
      doc.save('employees.pdf');
      toast.success('PDF file downloaded successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF file');
    }
  };

  const downloadAsPPT = async () => {
    try {
      const pres = new pptxgen();
      const slide = pres.addSlide();
      
      // Add title
      slide.addText("Employee List", {
        x: 1,
        y: 0.5,
        fontSize: 24,
        bold: true
      });
      
      // Convert data for PPT table
      const tableRows = employees.map(emp => ({
        cells: [
          { text: emp.employee_id },
          { text: `${emp.first_name} ${emp.last_name}` },
          { text: emp.email },
          { text: emp.gender || '-' },
          { text: emp.blood_group || '-' },
          { text: emp.employment_status || 'active' }
        ]
      }));
      
      slide.addTable({
        rows: [
          [
            { text: "ID" },
            { text: "Name" },
            { text: "Email" },
            { text: "Gender" },
            { text: "Blood Group" },
            { text: "Status" }
          ],
          ...tableRows.map(row => row.cells)
        ],
        x: 0.5,
        y: 1.5,
        w: 9,
        colW: [1.5, 2, 2.5, 1, 1, 1],
        border: { pt: 1, color: "666666" },
      });
      
      const fileName = 'employees.pptx';
      await pres.writeFile({ fileName });
      toast.success('PPT file downloaded successfully');
    } catch (error) {
      console.error('Error downloading PPT:', error);
      toast.error('Failed to download PPT file');
    }
  };

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
        <Button 
          variant="outline" 
          size="icon" 
          onClick={downloadAsCSV}
          title="Download as CSV"
        >
          <FileSpreadsheet className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={downloadAsPDF}
          title="Download as PDF"
        >
          <FileText className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={downloadAsPPT}
          title="Download as PPT"
        >
          <Presentation className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
