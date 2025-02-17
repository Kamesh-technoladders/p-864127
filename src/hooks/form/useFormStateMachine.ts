
import { useState, useEffect } from 'react';
import { PersonalDetailsData, EducationData, BankAccountData, Experience } from '@/components/employee/types';

export type FormState = 'IDLE' | 'VALIDATING' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

interface FormData {
  personal: PersonalDetailsData | null;
  education: EducationData | null;
  experience: Experience[];
  bank: BankAccountData | null;
}

interface FormProgress {
  personal: boolean;
  education: boolean;
  experience: boolean;
  bank: boolean;
}

const STORAGE_KEY = 'employee_form_data';

export const useFormStateMachine = () => {
  const [formState, setFormState] = useState<FormState>('IDLE');
  const [activeTab, setActiveTab] = useState("personal");
  const [formProgress, setFormProgress] = useState<FormProgress>({
    personal: false,
    education: false,
    experience: false,
    bank: false,
  });
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      personal: null,
      education: null,
      experience: [],
      bank: null,
    };
  });
  const [error, setError] = useState<string | null>(null);

  // Auto-save form data
  useEffect(() => {
    if (formData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const updateSectionProgress = (section: keyof FormProgress, completed: boolean) => {
    console.log(`Updating progress for ${section}:`, completed);
    setFormProgress(prev => ({
      ...prev,
      [section]: completed,
    }));
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    console.log(`Updating form data for ${section}:`, data);
    setFormData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const clearError = () => {
    setError(null);
  };

  const resetForm = () => {
    setFormState('IDLE');
    setFormData({
      personal: null,
      education: null,
      experience: [],
      bank: null,
    });
    setFormProgress({
      personal: false,
      education: false,
      experience: false,
      bank: false,
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    formState,
    setFormState,
    activeTab,
    setActiveTab,
    formProgress,
    formData,
    error,
    updateSectionProgress,
    updateFormData,
    clearError,
    resetForm,
  };
};
