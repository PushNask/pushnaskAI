export const educationLevels = [
  "High School",
  "Bachelor's",
  "Master's",
  "PhD",
  "Other"
] as const;

export const studyFields = [
  "Computer Science",
  "Engineering",
  "Business",
  "Medicine",
  "Arts",
  "Social Sciences",
  "Natural Sciences",
  "Other"
] as const;

export const budgetRanges = [
  "Under $10,000",
  "$10,000 - $20,000",
  "$20,000 - $30,000",
  "$30,000 - $50,000",
  "Above $50,000"
] as const;

// Create mutable versions of the arrays for use with FormField
export const educationLevelOptions = [...educationLevels];
export const studyFieldOptions = [...studyFields];
export const budgetRangeOptions = [...budgetRanges];