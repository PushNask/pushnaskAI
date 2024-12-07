import { LucideIcon } from "lucide-react";

export interface AIService {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  credits: number;
}

export type ServiceCategory = "career" | "global" | "education" | "business";