import { z } from "zod";

export type CVFormData = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  education: string;
  workExperience: string;
  skills: string;
  personalStatement?: string;
  personalInfo?: string;
  objective?: string;
  professionalSummary?: string;
  technicalSkills?: string;
  softSkills?: string;
  hobbies?: string;
  extras?: string;
  certifications?: string;
  achievements?: string;
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