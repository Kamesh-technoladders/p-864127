
import { useState } from "react";
import { toast } from "sonner";
import { FormProgress, FormData } from "@/utils/progressCalculator";
import { Experience } from "@/components/employee/types";
import { employeeService } from "@/services/employee/employee.service";
import { personalInfoService } from "@/services/employee/personalInfo.service";
import { useEffect } from "react";

export const useEmployeeForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState<FormProgress>({
    personal: false,
    education: false,
    experience: false,
    bank: false,
  });

  const [formData, setFormData] = useState<FormData>({
    personal: null,
    education: null,
    experience: [],
    bank: null,
  });

  // Debounced email check
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkEmail = async (email: string) => {
      try {
        setIsCheckingEmail(true);
        const exists = await personalInfoService.checkEmailExists(email);
        if (exists) {
          setEmailError(`Email ${email} is already registered`);
          updateSectionProgress('personal', false);
        } else {
          setEmailError(null);
        }
      } catch (error) {
        console.error('Error checking email:', error);
      } finally {
        setIsCheckingEmail(false);
      }
    };

    if (formData.personal?.email) {
      // Clear previous timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Set new timeout
      timeoutId = setTimeout(() => {
        checkEmail(formData.personal.email);
      }, 500); // 500ms debounce
    }

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [formData.personal?.email]);

  const updateSectionProgress = (section: keyof FormProgress, completed: boolean) => {
    setFormProgress((prev) => ({
      ...prev,
      [section]: completed,
    }));
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    console.log(`Updating ${section} data:`, data);
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));

    if (section === 'experience') {
      updateSectionProgress('experience', Array.isArray(data) && data.length > 0);
    }
  };

  const handleTabChange = (tabId: string) => {
    if (!formProgress[activeTab as keyof FormProgress]) {
      toast.error("Please complete the current section before proceeding");
      return;
    }
    setActiveTab(tabId);
  };

  const validatePersonalSection = (data: any) => {
    if (!data) return false;
    const requiredFields = [
      'employeeId',
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'gender',
      'bloodGroup',
      'maritalStatus',
      'presentAddress',
      'permanentAddress'
    ];

    const isValid = requiredFields.every(field => {
      if (field === 'presentAddress' || field === 'permanentAddress') {
        const address = data[field];
        return address && 
               address.addressLine1 && 
               address.country && 
               address.state && 
               address.city && 
               address.zipCode;
      }
      return data[field];
    });

    if (!isValid) {
      toast.error("Please fill in all required fields in Personal Details");
    }

    return isValid && !emailError;
  };

  const validateBankSection = (data: any) => {
    if (!data) return false;
    const requiredFields = [
      'accountHolderName',
      'accountNumber',
      'ifscCode',
      'bankName',
      'branchName',
      'accountType'
    ];

    const isValid = requiredFields.every(field => data[field]);
    if (!isValid) {
      toast.error("Please fill in all required fields in Bank Details");
    }
    return isValid;
  };

  const handleSaveAndNext = async () => {
    if (activeTab === "personal") {
      const form = document.getElementById("personalDetailsForm") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }

    if (!formProgress[activeTab as keyof FormProgress]) {
      toast.error("Please complete all required fields before proceeding");
      return;
    }

    const tabOrder = ["personal", "education", "bank"];
    const currentIndex = tabOrder.indexOf(activeTab);
    
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else {
      // Validate required sections
      const isPersonalValid = validatePersonalSection(formData.personal);
      const isBankValid = validateBankSection(formData.bank);
      
      if (isPersonalValid && isBankValid) {
        setIsSubmitting(true);
        try {
          console.log('Submitting form data:', formData);
          const personalData = {
            ...formData.personal!,
            emergencyContacts: formData.personal?.emergencyContacts || [],
            familyDetails: formData.personal?.familyDetails || []
          };
          
          await employeeService.createEmployee({
            personal: personalData,
            education: formData.education,
            experience: formData.experience || [],
            bank: formData.bank!,
          });
          
          toast.success("Employee information saved successfully!");
          setIsFormCompleted(true);
          window.location.reload(); // Refresh to show updated table
        } catch (error: any) {
          console.error('Error saving employee data:', error);
          if (error.message && (error.message.includes('Employee ID') || error.message.includes('Email'))) {
            toast.error(error.message);
          } else {
            toast.error("Failed to save employee information. Please try again.");
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return {
    activeTab,
    formProgress,
    formData,
    isFormCompleted,
    isSubmitting,
    isCheckingEmail,
    emailError,
    updateSectionProgress,
    updateFormData,
    handleTabChange,
    handleSaveAndNext,
  };
};
