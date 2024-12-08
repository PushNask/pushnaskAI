export interface UserProfileCheck {
  personalInfo: boolean;
  cvCreated: boolean;
  servicePreferences: boolean;
}

export interface AdvisoryContext {
  userName: string;
  // Shared profile fields
  nationality?: string;
  currentLocation?: string;
  languageSkills?: string[];
  educationLevel?: string;
  
  // Career Development specific
  currentRole?: string;
  yearsOfExperience?: number;
  preferredIndustries?: string[];
  skillsets?: string[];
  careerGoals?: string[];

  // Global Exploration specific
  travelPreferences?: string[];
  budgetRange?: string;
  destinationInterests?: string[];
  travelTimeline?: string;

  // Study Abroad specific
  fieldOfStudy?: string;
  targetCountries?: string[];
  preferredPrograms?: string[];
  studyLevel?: string;
  
  // Startup Fundraising specific
  businessStage?: string;
  industryFocus?: string;
  fundingNeeds?: number;
  teamSize?: number;
  currentRevenue?: string;
}

export const generateInitialPrompt = (service: string, context: AdvisoryContext, profileCheck: UserProfileCheck): string => {
  // Common incomplete profile message
  if (!profileCheck.personalInfo || !profileCheck.servicePreferences) {
    return `Hello ${context.userName}! I'm your ${service} advisor. Before we proceed, we need some additional information to provide you with the most accurate advice.

${!profileCheck.personalInfo ? "• Please complete your personal information in your profile.\n" : ""}${!profileCheck.servicePreferences ? "• Take a moment to set up your preferences in the Service Setup section.\n" : ""}

Once completed, I'll be able to provide you with comprehensive guidance tailored to your specific situation.`;
  }

  // Service-specific prompts
  switch (service) {
    case "Career Development":
      return `Hello ${context.userName}! I'm your Career Development advisor, and I'm here to help you navigate your professional journey. I've reviewed your profile and would like to start our discussion with a clear understanding of your goals.

${context.currentRole ? `• You're currently working as a ${context.currentRole}\n` : ""}${context.fieldOfStudy ? `• Your educational background is in ${context.fieldOfStudy}\n` : ""}${context.preferredIndustries?.length ? `• You're interested in ${context.preferredIndustries.join(", ")}\n` : ""}

To provide you with the most valuable guidance, I'd like to explore:

1. Your short-term career objectives (next 1-2 years)
2. Your long-term vision (3-5 years)
3. Any specific challenges you're currently facing
4. Areas where you'd like to develop your skills

Which of these aspects would you like to discuss first? Or is there another area of your career development you'd prefer to focus on?`;

    case "Global Exploration":
      return `Hello ${context.userName}! I'm your International Opportunities advisor. I've reviewed your profile and I'm here to help you explore global possibilities.

${context.currentLocation ? `• You're currently based in ${context.currentLocation}\n` : ""}${context.languageSkills?.length ? `• You're proficient in ${context.languageSkills.join(", ")}\n` : ""}${context.destinationInterests?.length ? `• You're interested in ${context.destinationInterests.join(", ")}\n` : ""}

To help you discover international opportunities, let's explore:

1. Your primary motivation for international exploration
2. Your preferred timeline and duration
3. Specific regions or countries of interest
4. Any particular professional or personal goals abroad

Which aspect would you like to discuss first? Feel free to share any specific questions or concerns about international opportunities.`;

    case "Educational Guidance":
      return `Hello ${context.userName}! I'm your Study Abroad advisor, ready to help you find the perfect educational program.

${context.educationLevel ? `• Your current education level is ${context.educationLevel}\n` : ""}${context.fieldOfStudy ? `• You're interested in studying ${context.fieldOfStudy}\n` : ""}${context.targetCountries?.length ? `• You're considering studying in ${context.targetCountries.join(", ")}\n` : ""}

Let's explore these key areas:

1. Your academic goals and preferred programs
2. Target countries and universities
3. Admission requirements and timelines
4. Funding options and scholarships
5. Language requirements and preparation

Which aspect of studying abroad would you like to discuss first? I'm here to help you make informed decisions about your educational journey.`;

    case "Entrepreneurial Support":
      return `Hello ${context.userName}! I'm your Startup Fundraising advisor, here to help you launch and grow your business.

${context.businessStage ? `• Your business is in the ${context.businessStage} stage\n` : ""}${context.industryFocus ? `• You're operating in the ${context.industryFocus} industry\n` : ""}${context.fundingNeeds ? `• You're looking to raise approximately $${context.fundingNeeds.toLocaleString()}\n` : ""}

Let's focus on these crucial areas:

1. Your startup's current stage and immediate needs
2. Funding strategy and target investors
3. Pitch deck development
4. Financial projections and business model
5. Market analysis and competitive positioning

Which of these aspects would you like to explore first? Or do you have specific fundraising questions you'd like to address?

I'll help you develop a comprehensive fundraising strategy tailored to your business needs.`;

    default:
      return "Hello! Please select a specific service to begin our advisory session.";
  }
};