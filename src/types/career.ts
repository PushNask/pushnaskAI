export interface UserProfileCheck {
  personalInfo: boolean;
  cvCreated: boolean;
  servicePreferences: boolean;
}

export interface AdvisoryContext {
  userName: string;
  currentRole?: string;
  fieldOfStudy?: string;
  yearsOfExperience?: number;
  preferredIndustries?: string[];
  skillsets?: string[];
  careerGoals?: string[];
}

export const generateInitialPrompt = (context: AdvisoryContext, profileCheck: UserProfileCheck): string => {
  if (!profileCheck.personalInfo || !profileCheck.cvCreated || !profileCheck.servicePreferences) {
    return `Hello ${context.userName}! I'm your Career Development advisor. Before we dive into personalized career guidance, I notice we need some additional information to provide you with the most accurate advice.

${!profileCheck.personalInfo ? "• Could you please complete your personal information in your profile?\n" : ""}
${!profileCheck.cvCreated ? "• Please create or upload your CV so I can understand your background better.\n" : ""}
${!profileCheck.servicePreferences ? "• Take a moment to set up your career preferences in the Service Setup section.\n" : ""}

Once you've completed these, I'll be able to provide you with comprehensive career guidance tailored to your specific situation.`;
  }

  return `Hello ${context.userName}! I'm your Career Development advisor, and I'm here to help you navigate your professional journey. I've reviewed your profile and would like to start our discussion with a clear understanding of your goals.

${context.currentRole ? `• You're currently working as a ${context.currentRole}\n` : ""}
${context.fieldOfStudy ? `• Your educational background is in ${context.fieldOfStudy}\n` : ""}
${context.preferredIndustries?.length ? `• You're interested in ${context.preferredIndustries.join(", ")}\n` : ""}

To provide you with the most valuable guidance, I'd like to explore:

1. Your short-term career objectives (next 1-2 years)
2. Your long-term vision (3-5 years)
3. Any specific challenges you're currently facing
4. Areas where you'd like to develop your skills

Which of these aspects would you like to discuss first? Or is there another area of your career development you'd prefer to focus on?

Remember, I'm here to help you make informed decisions about your career path, and our discussion will be tailored to your specific needs and goals.`;
};