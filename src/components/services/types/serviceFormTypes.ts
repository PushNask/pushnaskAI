import { z } from "zod";

export type StudyAbroadFormData = {
  fullName: string;
  email: string;
  phone: string;
  currentEducation: string;
  fieldOfStudy: string;
  preferredCountries: string;
  academicAchievements: string;
  languageProficiency: string;
  budgetRange: string;
  startDate: string;
  additionalInfo?: string;
};

export type FundingPrepFormData = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessDescription: string;
  fundingAmount: string;
  useOfFunds: string;
  marketAnalysis: string;
  financialProjections: string;
  currentProgress: string;
  teamComposition: string;
  competitiveAdvantage: string;
};

export const baseServiceFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});