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

export const baseFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export interface BaseFormProps {
  onSubmit: (data: CVFormData) => void;
  initialData?: CVFormData | null;
}