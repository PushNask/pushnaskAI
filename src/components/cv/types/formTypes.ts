import { z } from "zod";

export type CVFormData = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  education: string;
  workExperience: string;
  skills: string;
  personalStatement?: string;  // Added for AfricaForm
  personalInfo?: string;       // Added for LatinAmericaForm
  objective?: string;          // Added for LatinAmericaForm
  professionalSummary?: string; // Added for OceaniaForm
  technicalSkills?: string;
  softSkills?: string;
  hobbies?: string;
  extras?: string;
  certifications?: string;     // Added for AfricaForm and OceaniaForm
  achievements?: string;       // Added for OceaniaForm
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