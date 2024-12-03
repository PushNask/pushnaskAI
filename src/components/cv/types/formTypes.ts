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

export const baseFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  education: z.string().min(10, "Education details are required"),
  workExperience: z.string().min(10, "Work experience is required"),
  skills: z.string().min(5, "Skills are required"),
  personalStatement: z.string().min(20, "Personal statement is required"),
  personalInfo: z.string().min(20, "Personal information is required"),
  objective: z.string().min(20, "Objective is required"),
  professionalSummary: z.string().min(20, "Professional summary is required"),
  certifications: z.string().min(10, "Certifications are required"),
  achievements: z.string().min(10, "Achievements are required"),
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