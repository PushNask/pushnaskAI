import { z } from "zod";

export type CVFormData = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  education: string;
  workExperience: string;
  skills: string;
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
  technicalSkills?: string;
  softSkills?: string;
  hobbies?: string;
  extras?: string;
  personalStatement?: string;
  personalInfo?: string;
  objective?: string;
  professionalSummary?: string;
  certifications?: string;
  achievements?: string;
};

export interface BaseFormProps {
  onSubmit: (data: CVFormData) => void;
  initialData?: CVFormData | null;
}

export const baseFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  education: z.string().min(10, "Education details are required"),
  workExperience: z.string().min(10, "Work experience is required"),
  skills: z.string().min(5, "Skills are required"),
  personalStatement: z.string().optional(),
  personalInfo: z.string().optional(),
  objective: z.string().optional(),
  professionalSummary: z.string().optional(),
  certifications: z.string().optional(),
  achievements: z.string().optional(),
  languages: z.string().optional(),
  references: z.string().optional(),
  nationality: z.string().optional(),
  dateOfBirth: z.string().optional(),
  maritalStatus: z.string().optional(),
  religion: z.string().optional(),
  visaStatus: z.string().optional(),
  linkedin: z.string().optional(),
  location: z.string().optional(),
  careerObjective: z.string().optional(),
  technicalSkills: z.string().optional(),
  softSkills: z.string().optional(),
  hobbies: z.string().optional(),
  extras: z.string().optional(),
  address: z.string().optional(),
});