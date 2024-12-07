import { z } from "zod";

export const educationalGuidanceSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  startDate: z.string().min(1, "Please select a start date"),
  currentEducationLevel: z.string().min(2, "Please select your education level"),
  institutionDetails: z.string().min(10, "Please provide institution details"),
  desiredFieldOfStudy: z.string().min(5, "Please specify your desired field"),
  preferredCountries: z.string().min(2, "Please list your preferred countries"),
  academicAchievements: z.string().min(10, "Please list your achievements"),
  languageProficiency: z.string().min(5, "Please specify language proficiency"),
  budgetRange: z.string().min(2, "Please specify your budget range"),
  additionalInfo: z.string().optional(),
});

export type EducationalGuidanceData = z.infer<typeof educationalGuidanceSchema>;