import { z } from "zod";

export type CVFormData = {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  location?: string;
  careerObjective?: string;
  workExperience: string;
  education: string;
  skills: string;
  personalStatement?: string;
  personalInfo?: string;
  objective?: string;
  professionalSummary?: string;
  keySkills?: string;
  certifications?: string;
  achievements?: string;
  languages?: string;
  references?: string;
  // Additional fields for Asia and Middle East forms
  nationality?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  religion?: string;
  visaStatus?: string;
};

export const baseFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});