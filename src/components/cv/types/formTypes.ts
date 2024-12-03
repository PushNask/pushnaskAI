import { z } from "zod";

export type CVFormData = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  education: string;
  workExperience: string;
  skills: string;
  personalStatement: string;  // Required for AfricaForm
  personalInfo: string;       // Required for LatinAmericaForm
  objective: string;          // Required for LatinAmericaForm
  professionalSummary: string; // Required for OceaniaForm
  technicalSkills?: string;
  softSkills?: string;
  hobbies?: string;
  extras?: string;
  certifications: string;     // Required for AfricaForm and OceaniaForm
  achievements: string;       // Required for OceaniaForm
  languages?: string;
  references?: string;
  nationality?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  religion?: string;
  visaStatus?: string;
  linkedin?: string;
  location?: string;
  careerObjective?: string;
};

export interface BaseFormProps {
  onSubmit: (data: CVFormData) => void;
  initialData?: CVFormData | null;
}