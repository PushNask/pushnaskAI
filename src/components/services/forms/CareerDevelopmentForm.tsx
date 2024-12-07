import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { FormSection } from "./components/FormSection";

const careerFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().min(2, "Please specify your current role"),
  educationLevel: z.string().min(2, "Please select your education level"),
  otherEducation: z.string().optional(),
  fieldOfStudy: z.string().min(2, "Please select your field of study"),
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

const educationLevels = [
  "Certification",
  "High School Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other"
];

const workExperienceOptions = [
  "None",
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years"
];

const workEnvironments = ["Remote", "On-site", "Hybrid", "No Preference"];
const yesNoMaybe = ["Yes", "No", "Maybe"];

const CareerDevelopmentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useLocalStorage("careerFormData", {});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm({
    resolver: zodResolver(careerFormSchema),
    defaultValues: formData
  });

  const onSubmit = (data: z.infer<typeof careerFormSchema>) => {
    setFormData(data);
    toast({
      title: "Success",
      description: "Your career development preferences have been saved.",
    });
  };

  const handleStepChange = (step: number) => {
    setFormData(form.getValues());
    setCurrentStep(step);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Define your career path and objectives</h2>
          <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          <Progress value={progress} className="h-2" />
        </div>

        {currentStep === 1 && (
          <FormSection title="Personal Information">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
              />
              <FormField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
              />
              <FormField
                control={form.control}
                name="currentRole"
                label="Current Role"
                placeholder="e.g., Software Engineer"
              />
            </div>
          </FormSection>
        )}

        {currentStep === 2 && (
          <FormSection title="Education & Skills">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="educationLevel"
                label="Highest Education Level"
                type="select"
                options={educationLevels}
              />
              <TextAreaField
                control={form.control}
                name="otherEducation"
                label="Other Education or Training"
                placeholder="List any additional certifications, courses, or training..."
              />
              <TextAreaField
                control={form.control}
                name="keySkills"
                label="Key Skills and Strengths"
                placeholder="List both technical and soft skills..."
                tooltip="Include both hard (technical) and soft (interpersonal) skills"
              />
            </div>
          </FormSection>
        )}

        {currentStep === 3 && (
          <FormSection title="Work Preferences">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="workExperience"
                label="Work Experience"
                type="select"
                options={workExperienceOptions}
              />
              <FormField
                control={form.control}
                name="workEnvironment"
                label="Preferred Work Environment"
                type="select"
                options={workEnvironments}
              />
              <FormField
                control={form.control}
                name="willingToRelocate"
                label="Willing to Relocate"
                type="select"
                options={yesNoMaybe}
              />
            </div>
          </FormSection>
        )}

        {currentStep === 4 && (
          <FormSection title="Career Goals">
            <div className="grid gap-4">
              <TextAreaField
                control={form.control}
                name="shortTermGoals"
                label="Short-Term Career Goals"
                placeholder="What do you want to achieve in the next 1-2 years?"
                tooltip="Be specific about your immediate career objectives"
              />
              <TextAreaField
                control={form.control}
                name="longTermVision"
                label="Long-Term Career Vision"
                placeholder="Where do you see yourself in 5+ years?"
                tooltip="Think about your ultimate career aspirations"
              />
              <FormField
                control={form.control}
                name="interestedInTraining"
                label="Interested in Additional Training"
                type="select"
                options={yesNoMaybe}
              />
            </div>
          </FormSection>
        )}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleStepChange(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
            >
              Next
            </Button>
          ) : (
            <Button type="submit">
              Save Career Development Preferences
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CareerDevelopmentForm;