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
  // Study Abroad specific fields
  currentEducation?: string;
  fieldOfStudy?: string;
  preferredCountries?: string;
  academicAchievements?: string;
  languageProficiency?: string;
  budgetRange?: string;
  startDate?: string;
  additionalInfo?: string;
  // Funding Prep specific fields
  businessName?: string;
  businessDescription?: string;
  fundingAmount?: string;
  useOfFunds?: string;
  marketAnalysis?: string;
  financialProjections?: string;
  currentProgress?: string;
  teamComposition?: string;
  competitiveAdvantage?: string;
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