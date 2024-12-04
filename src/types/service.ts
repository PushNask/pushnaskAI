export interface ServiceConfig {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component type
  credits: number;
  price: string;
  setupTitle?: string;
  setupDescription?: string;
}

export interface ServiceError {
  code: string;
  message: string;
  statusCode: number;
}

export interface ServiceResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: ServiceError;
}