import { z } from "zod";

export const careerFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().min(2, "Please specify your current role"),
  educationLevel: z.string().min(2, "Please select your education level"),
  fieldOfStudy: z.string().min(2, "Please select your field of study"),
  otherEducation: z.string().optional(),
  keySkills: z.string().max(500, "Maximum 500 characters allowed"),
  interests: z.string().max(500, "Maximum 500 characters allowed"),
  workExperience: z.string().min(2, "Please select your work experience"),
  preferredIndustries: z.string().min(2, "Please select preferred industries"),
  workEnvironment: z.string().min(2, "Please select preferred work environment"),
  willingToRelocate: z.string().min(2, "Please indicate relocation preference"),
  careerGoals: z.string().max(1000, "Maximum 1000 characters allowed"),
  shortTermGoals: z.string().max(500, "Maximum 500 characters allowed"),
  longTermVision: z.string().max(500, "Maximum 500 characters allowed"),
  additionalInfo: z.string().optional(),
  interestedInTraining: z.string().min(2, "Please indicate training interest")
});

export type CareerFormData = z.infer<typeof careerFormSchema>;