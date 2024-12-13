import { z } from "zod";

export const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  currentRole: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  nationality: z.string().optional(),
  countryOfResidence: z.string().optional(),
  educationLevel: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  workExperience: z.string().optional(),
  workPreference: z.string().optional(),
  willingToRelocate: z.boolean().default(false)
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

export interface ProfileUpdateResponse {
  success: boolean;
  error?: string;
  data?: ProfileFormData;
}