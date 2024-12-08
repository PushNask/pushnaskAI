export interface Service {
  id: string;
  label: string;
  description: string;
  icon: any;
  credits: number;
}

export type ServiceCategory = "career" | "global" | "education" | "entrepreneurial";