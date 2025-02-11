import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadField } from "./UploadField";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Add blood groups array
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

interface PersonalDetailsFormProps {
  onComplete: (completed: boolean) => void;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onComplete }) => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [uanFile, setUanFile] = useState<File | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState([{ relationship: "", name: "", phone: "" }]);
  const [familyDetails, setFamilyDetails] = useState([{ relationship: "", name: "", occupation: "", phone: "" }]);

  const form = useForm();

  const handleUpload = async (file: File, type: string) => {
    switch (type) {
      case "profile":
        setProfilePhoto(file);
        break;
      case "aadhar":
        setAadharFile(file);
        break;
      case "uan":
        setUanFile(file);
        break;
    }
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { relationship: "", name: "", phone: "" }]);
  };

  const addFamilyMember = () => {
    setFamilyDetails([...familyDetails, { relationship: "", name: "", occupation: "", phone: "" }]);
  };

  const removeEmergencyContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };

  const removeFamilyMember = (index: number) => {
    setFamilyDetails(familyDetails.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-[622px] max-w-full flex-col text-sm font-medium ml-[15px]">
      <Form {...form}>
        <form className="space-y-6">
          <div>
            <div className="text-[rgba(48,64,159,1)] font-bold">Basic Info</div>
            <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
              Add your personal information here.
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Employee ID<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                        placeholder="Enter employee ID"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      First Name<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                        placeholder="Enter first name"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Last Name<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                        placeholder="Enter last name"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Email<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        type="email"
                        className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Phone Number<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <div className="flex gap-2">
                      <Select>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormControl>
                        <Input 
                          {...field}
                          type="tel"
                          className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Date of Birth<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        type="date"
                        className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Gender<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Blood Group<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1A1F2C] font-semibold">
                      Marital Status<span className="text-[#DD0101]">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="married" id="married" />
                          <Label htmlFor="married">Married</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="unmarried" id="unmarried" />
                          <Label htmlFor="unmarried">Unmarried</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 mt-6">
              <UploadField 
                label="Profile Picture" 
                required 
                onUpload={(file) => handleUpload(file, "profile")}
                showProgress
                value={profilePhoto?.name}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="aadharNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1A1F2C] font-semibold">
                        Aadhar Number<span className="text-[#DD0101]">*</span>
                      </FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <Input 
                            {...field}
                            className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                            placeholder="Enter Aadhar number"
                          />
                        </FormControl>
                        <UploadField 
                          label="Upload Aadhar" 
                          required 
                          onUpload={(file) => handleUpload(file, "aadhar")}
                          value={aadharFile?.name}
                        />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="panNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1A1F2C] font-semibold">
                        PAN Number<span className="text-[#DD0101]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                          placeholder="Enter PAN number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="esicNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1A1F2C] font-semibold">
                        ESIC Number
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                          placeholder="Enter ESIC number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uanNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1A1F2C] font-semibold">
                        UAN Number
                      </FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <Input 
                            {...field}
                            className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                            placeholder="Enter UAN number"
                          />
                        </FormControl>
                        <UploadField 
                          label="Upload UAN" 
                          onUpload={(file) => handleUpload(file, "uan")}
                          value={uanFile?.name}
                        />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-[rgba(48,64,159,1)] font-bold">Contact Info</div>
            <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
              Add your address details here.
            </div>

            <div className="grid grid-cols-2 gap-8 mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#1A1F2C]">Present Address</h3>
                <FormField
                  control={form.control}
                  name="presentAddress.addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1A1F2C] font-semibold">
                        Address Line 1<span className="text-[#DD0101]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                          placeholder="Enter address"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="presentAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1A1F2C] font-semibold">
                          Country<span className="text-[#DD0101]">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="usa">USA</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="presentAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1A1F2C] font-semibold">
                          State<span className="text-[#DD0101]">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="presentAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1A1F2C] font-semibold">
                          City<span className="text-[#DD0101]">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bangalore">Bangalore</SelectItem>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="presentAddress.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1A1F2C] font-semibold">
                          ZIP Code<span className="text-[#DD0101]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                            placeholder="Enter ZIP code"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#1A1F2C]">Permanent Address</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="copyAddress"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const presentAddress = form.getValues("presentAddress");
                          form.setValue("permanentAddress", presentAddress);
                        }
                      }}
                    />
                    <label htmlFor="copyAddress" className="text-sm text-gray-600">
                      Same as present address
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="permanentAddress.addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1A1F2C] font-semibold">
                          Address Line 1<span className="text-[#DD0101]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                            placeholder="Enter address"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="permanentAddress.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1F2C] font-semibold">
                            Country<span className="text-[#DD0101]">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="india">India</SelectItem>
                              <SelectItem value="usa">USA</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanentAddress.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1F2C] font-semibold">
                            State<span className="text-[#DD0101]">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="karnataka">Karnataka</SelectItem>
                              <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="permanentAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1F2C] font-semibold">
                            City<span className="text-[#DD0101]">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bangalore">Bangalore</SelectItem>
                              <SelectItem value="mumbai">Mumbai</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanentAddress.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1F2C] font-semibold">
                            ZIP Code<span className="text-[#DD0101]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="h-12 border-[#C8C8C9] focus:border-[#9b87f5]"
                              placeholder="Enter ZIP code"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[rgba(48,64,159,1)] font-bold">Emergency Contact</div>
            <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
              Add emergency contact details here.
            </div>

            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emergencyContacts.map((contact, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={contact.relationship}
                          onValueChange={(value) => {
                            const newContacts = [...emergencyContacts];
                            newContacts[index].relationship = value;
                            setEmergencyContacts(newContacts);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={contact.name}
                          onChange={(e) => {
                            const newContacts = [...emergencyContacts];
                            newContacts[index].name = e.target.value;
                            setEmergencyContacts(newContacts);
                          }}
                          placeholder="Enter name"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={contact.phone}
                          onChange={(e) => {
                            const newContacts = [...emergencyContacts];
                            newContacts[index].phone = e.target.value;
                            setEmergencyContacts(newContacts);
                          }}
                          placeholder="Enter phone number"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEmergencyContact(index)}
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
                onClick={addEmergencyContact}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/94b97c43fd3a409f8a2658d3c3f998e3/94ba00a354d444e81c8d49b7bd51add7537c14e2c575d31fbdfae2aad48e7d91?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 shrink-0 mr-2"
                  alt="Add icon"
                />
                Add Contact
              </Button>
            </div>
          </div>

          <div>
            <div className="text-[rgba(48,64,159,1)] font-bold">Family Details</div>
            <div className="text-[rgba(80,80,80,1)] text-xs mt-1">
              Add your family member details here.
            </div>

            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Occupation</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {familyDetails.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={member.relationship}
                          onValueChange={(value) => {
                            const newMembers = [...familyDetails];
                            newMembers[index].relationship = value;
                            setFamilyDetails(newMembers);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={member.name}
                          onChange={(e) => {
                            const newMembers = [...familyDetails];
                            newMembers[index].name = e.target.value;
                            setFamilyDetails(newMembers);
                          }}
                          placeholder="Enter name"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={member.occupation}
                          onChange={(e) => {
                            const newMembers = [...familyDetails];
                            newMembers[index].occupation = e.target.value;
                            setFamilyDetails(newMembers);
                          }}
                          placeholder="Enter occupation"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={member.phone}
                          onChange={(e) => {
                            const newMembers = [...familyDetails];
                            newMembers[index].phone = e.target.value;
                            setFamilyDetails(newMembers);
                          }}
                          placeholder="Enter phone number"
                        />
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

          <div className="flex justify-end pt-6">
            <Button type="submit" className="bg-[#DD0101] hover:bg-[#DD0101]/90">
              Save & Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
