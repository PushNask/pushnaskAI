import { z } from "zod";

export const profileFormSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  current_role: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().optional(),
  nationality: z.string().optional(),
  country_of_residence: z.string().optional(),
  education_level: z.string().optional(),
  field_of_study: z.string().optional(),
  work_experience: z.string().optional(),
  work_preference: z.string().optional(),
  willing_to_relocate: z.boolean().default(false)
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

export interface ProfileUpdateResponse {
  success: boolean;
  error?: string;
  data?: ProfileFormData;
}