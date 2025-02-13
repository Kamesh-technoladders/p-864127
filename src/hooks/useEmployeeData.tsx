
import { useState, useCallback } from "react";
import { employeeService } from "@/services/employee/employee.service";
import { toast } from "sonner";
import { EmployeeData, PersonalInfo } from "@/services/types/employee.types";
import { supabase } from "@/integrations/supabase/client";

export const useEmployeeData = (employeeId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeData = useCallback(async () => {
    if (!employeeId) {
      setError("No employee ID provided");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching employee data for ID:', employeeId);
      const { data: employeeWithRelations, error: queryError } = await supabase
        .from('employees')
        .select(`
          *,
          employee_addresses (*),
          employee_emergency_contacts!employee_emergency_contacts_employee_id_fkey (*),
          employee_family_details!employee_family_details_employee_id_fkey (*)
        `)
        .eq('id', employeeId)
        .single();

      if (queryError) {
        console.error('Supabase query error:', queryError);
        throw queryError;
      }

      if (!employeeWithRelations) {
        console.error('No employee data found');
        throw new Error('Employee not found');
      }

      // Transform the data to match our expected format
      const transformedData = {
        ...employeeWithRelations,
        presentAddress: employeeWithRelations.employee_addresses.find(
          (addr: any) => addr.type === 'present'
        ) || {
          addressLine1: '',
          country: '',
          state: '',
          city: '',
          zipCode: ''
        },
        permanentAddress: employeeWithRelations.employee_addresses.find(
          (addr: any) => addr.type === 'permanent'
        ) || {
          addressLine1: '',
          country: '',
          state: '',
          city: '',
          zipCode: ''
        },
        emergencyContacts: employeeWithRelations.employee_emergency_contacts || [],
        familyDetails: employeeWithRelations.employee_family_details || []
      };

      console.log('Transformed employee data:', transformedData);
      setEmployeeData(transformedData);
    } catch (error: any) {
      console.error("Error fetching employee data:", error);
      const errorMessage = error.message === 'Invalid UUID' 
        ? 'Invalid employee ID format. Please use a valid UUID.'
        : error.code === 'PGRST116'
        ? 'Employee not found. Please check the ID and try again.'
        : 'Failed to fetch employee data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [employeeId]);

  const updateEmployee = useCallback(
    async (section: string, data: any) => {
      if (!employeeId) {
        toast.error("No employee ID provided");
        return;
      }

      try {
        let updateData: Partial<EmployeeData>;
        
        if (section === 'personal') {
          const personalInfo: PersonalInfo = {
            employeeId: data.employeeId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            bloodGroup: data.bloodGroup,
            maritalStatus: data.maritalStatus,
            presentAddress: data.presentAddress,
            permanentAddress: data.permanentAddress,
            emergencyContacts: data.emergencyContacts || [],
            familyDetails: data.familyDetails || []
          };
          
          // Update employee basic info
          const { error: employeeError } = await supabase
            .from('employees')
            .update({
              first_name: personalInfo.firstName,
              last_name: personalInfo.lastName,
              email: personalInfo.email,
              phone: personalInfo.phone,
              date_of_birth: personalInfo.dateOfBirth,
              gender: personalInfo.gender,
              blood_group: personalInfo.bloodGroup,
              marital_status: personalInfo.maritalStatus
            })
            .eq('id', employeeId);

          if (employeeError) throw employeeError;

          // Map present address to match database column names
          const presentAddressData = {
            employee_id: employeeId,
            type: 'present',
            address_line1: personalInfo.presentAddress.addressLine1,
            country: personalInfo.presentAddress.country,
            state: personalInfo.presentAddress.state,
            city: personalInfo.presentAddress.city,
            zip_code: personalInfo.presentAddress.zipCode
          };

          // Map permanent address to match database column names
          const permanentAddressData = {
            employee_id: employeeId,
            type: 'permanent',
            address_line1: personalInfo.permanentAddress.addressLine1,
            country: personalInfo.permanentAddress.country,
            state: personalInfo.permanentAddress.state,
            city: personalInfo.permanentAddress.city,
            zip_code: personalInfo.permanentAddress.zipCode
          };

          // Update present address
          await supabase
            .from('employee_addresses')
            .upsert(presentAddressData);

          // Update permanent address
          await supabase
            .from('employee_addresses')
            .upsert(permanentAddressData);

          // Update emergency contacts
          if (personalInfo.emergencyContacts) {
            // Delete existing contacts
            await supabase
              .from('employee_emergency_contacts')
              .delete()
              .eq('employee_id', employeeId);

            // Insert new contacts
            if (personalInfo.emergencyContacts.length > 0) {
              const contactsData = personalInfo.emergencyContacts.map(contact => ({
                employee_id: employeeId,
                name: contact.name,
                relationship: contact.relationship,
                phone: contact.phone
              }));
              
              await supabase
                .from('employee_emergency_contacts')
                .insert(contactsData);
            }
          }

          // Update family details
          if (personalInfo.familyDetails) {
            // Delete existing family details
            await supabase
              .from('employee_family_details')
              .delete()
              .eq('employee_id', employeeId);

            // Insert new family details
            if (personalInfo.familyDetails.length > 0) {
              const familyData = personalInfo.familyDetails.map(member => ({
                employee_id: employeeId,
                name: member.name,
                relationship: member.relationship,
                occupation: member.occupation,
                phone: member.phone
              }));
              
              await supabase
                .from('employee_family_details')
                .insert(familyData);
            }
          }
        } else {
          updateData = { [section]: data };
          await employeeService.updateEmployee(employeeId, updateData);
        }

        await fetchEmployeeData();
        toast.success(`${section} updated successfully`);
      } catch (error) {
        console.error(`Error updating ${section}:`, error);
        toast.error(`Failed to update ${section}`);
        throw error;
      }
    },
    [employeeId, fetchEmployeeData]
  );

  return {
    isLoading,
    employeeData,
    error,
    fetchEmployeeData,
    updateEmployee,
  };
};
