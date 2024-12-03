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
  extras?: string;
  languages?: string;
  technicalSkills?: string;
  softSkills?: string;
  hobbies?: string;
  references?: string;
};

export const baseFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});