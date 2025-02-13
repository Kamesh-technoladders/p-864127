
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, AlertCircle } from "lucide-react";

interface FamilyMember {
  relationship: string;
  name: string;
  occupation: string;
  phone: string;
}

interface FamilyDetailsSectionProps {
  familyMembers: FamilyMember[];
  onFamilyMembersChange: (members: FamilyMember[]) => void;
  errors?: string[][];
  showValidation?: boolean;
}

export const FamilyDetailsSection: React.FC<FamilyDetailsSectionProps> = ({
  familyMembers,
  onFamilyMembersChange,
  errors = [],
  showValidation = false,
}) => {
  const addFamilyMember = () => {
    onFamilyMembersChange([...familyMembers, { relationship: "", name: "", occupation: "", phone: "" }]);
  };

  const removeFamilyMember = (index: number) => {
    onFamilyMembersChange(familyMembers.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof FamilyMember, value: string) => {
    const newMembers = [...familyMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    onFamilyMembersChange(newMembers);
  };

  const isFieldEmpty = (value: string) => value.trim() === "";
  const hasError = (index: number, field: keyof FamilyMember) => {
    return showValidation && isFieldEmpty(familyMembers[index][field]);
  };

  return (
    <div>
      <div className="text-[rgba(48,64,159,1)] font-bold">Family Details</div>
      <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
        Add at least one family member with all fields filled.
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Relationship<span className="text-red-500">*</span></TableHead>
              <TableHead>Name<span className="text-red-500">*</span></TableHead>
              <TableHead>Occupation<span className="text-red-500">*</span></TableHead>
              <TableHead>Phone Number<span className="text-red-500">*</span></TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {familyMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="relative">
                    <Select
                      value={member.relationship}
                      onValueChange={(value) => updateMember(index, "relationship", value)}
                    >
                      <SelectTrigger 
                        className={hasError(index, "relationship") ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                    {hasError(index, "relationship") && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-red-500">Please select relationship</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative">
                    <Input
                      value={member.name}
                      onChange={(e) => updateMember(index, "name", e.target.value)}
                      placeholder="Enter name"
                      className={hasError(index, "name") ? "border-red-500" : ""}
                    />
                    {hasError(index, "name") && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-red-500">Please enter name</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative">
                    <Input
                      value={member.occupation}
                      onChange={(e) => updateMember(index, "occupation", e.target.value)}
                      placeholder="Enter occupation"
                      className={hasError(index, "occupation") ? "border-red-500" : ""}
                    />
                    {hasError(index, "occupation") && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-red-500">Please enter occupation</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative">
                    <Input
                      value={member.phone}
                      onChange={(e) => updateMember(index, "phone", e.target.value)}
                      placeholder="Enter phone number"
                      className={hasError(index, "phone") ? "border-red-500" : ""}
                    />
                    {hasError(index, "phone") && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-red-500">Please enter phone number</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFamilyMember(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          type="button"
          variant="outline"
          className="text-[#DD0101] border-[#DD0101] mt-4"
          onClick={addFamilyMember}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/94ba00a354d444e81c8d49b7bd51add7537c14e2c575d31fbdfae2aad48e7d91?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-4 shrink-0 mr-2"
            alt="Add icon"
          />
          Add Family Member
        </Button>
      </div>
    </div>
  );
};
