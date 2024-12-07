import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { FormField } from "../components/FormField";
import { TextAreaField } from "../components/TextAreaField";
import { FormSection } from "../components/FormSection";

const globalExplorationSchema = z.object({
  primaryPurpose: z.string().min(2, "Please select your primary purpose"),
  travelDates: z.string().max(100, "Maximum 100 characters allowed"),
  budget: z.string().min(1, "Please specify your budget"),
  destinationCountry: z.string().min(2, "Please select a destination country"),
  travelPreferences: z.string().max(500, "Maximum 500 characters allowed"),
  travelingWith: z.string().min(2, "Please select who you're traveling with"),
  languageSkills: z.string().min(2, "Please list your language skills"),
  visaStatus: z.string().min(2, "Please select your visa status"),
  specialRequirements: z.string().max(500, "Maximum 500 characters allowed").optional(),
  accommodationType: z.string().min(2, "Please select accommodation type"),
  bioAndGoals: z.string().max(1000, "Maximum 1000 characters allowed")
});

const purposeOptions = [
  "Vacation",
  "Business",
  "Investor Search",
  "Study",
  "Permanent Relocation",
  "Event",
  "Entrepreneurship",
  "Job Search & Relocation",
  "Other"
];

const travelingWithOptions = ["Alone", "Family", "Friends", "Colleagues", "Other"];
const visaOptions = ["Need Visa", "Visa Obtained", "Visa Not Required", "Undocumented Travel"];
const accommodationOptions = ["Hotel", "Rental Apartment", "Airbnb", "Hostel", "Staying with Friends/Family"];

const GlobalExplorationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useLocalStorage("globalExplorationData", {});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const form = useForm({
    resolver: zodResolver(globalExplorationSchema),
    defaultValues: formData
  });

  const onSubmit = (data: z.infer<typeof globalExplorationSchema>) => {
    if (data.visaStatus === "Undocumented Travel") {
      toast({
        title: "Important Notice",
        description: "We can only provide information about risks associated with undocumented travel. We cannot provide guidance for undocumented travel.",
        variant: "destructive"
      });
      return;
    }

    setFormData(data);
    toast({
      title: "Success",
      description: "Your global exploration preferences have been saved.",
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
          <h2 className="text-2xl font-bold">Set your international exploration preferences</h2>
          <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          <Progress value={progress} className="h-2" />
        </div>

        {currentStep === 1 && (
          <FormSection title="Travel Purpose & Timeline">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="primaryPurpose"
                label="Primary Purpose of Travel"
                type="select"
                options={purposeOptions}
              />
              <FormField
                control={form.control}
                name="travelDates"
                label="Intended Travel Dates"
                placeholder="e.g., June-August 2024 or within 6 months"
                tooltip="Specify a date range or general timeframe"
              />
              <FormField
                control={form.control}
                name="budget"
                label="Budget (USD)"
                type="number"
                placeholder="e.g., 5000"
                tooltip="Enter your total budget in US Dollars"
              />
            </div>
          </FormSection>
        )}

        {currentStep === 2 && (
          <FormSection title="Travel Details">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="destinationCountry"
                label="Preferred Destination Country"
                placeholder="Select country"
                tooltip="Choose your primary destination"
              />
              <TextAreaField
                control={form.control}
                name="travelPreferences"
                label="Travel Preferences and Interests"
                placeholder="Describe your interests: cultural immersion, networking, language courses..."
                tooltip="Be specific about the experiences you're seeking"
              />
              <FormField
                control={form.control}
                name="travelingWith"
                label="Traveling With"
                type="select"
                options={travelingWithOptions}
              />
            </div>
          </FormSection>
        )}

        {currentStep === 3 && (
          <FormSection title="Requirements & Accommodation">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="languageSkills"
                label="Language Skills"
                placeholder="e.g., English (Fluent), French (Intermediate)"
                tooltip="List languages and proficiency levels"
              />
              <FormField
                control={form.control}
                name="visaStatus"
                label="Visa and Immigration Status"
                type="select"
                options={visaOptions}
              />
              <TextAreaField
                control={form.control}
                name="specialRequirements"
                label="Special Requirements or Needs"
                placeholder="List any accessibility needs, dietary restrictions..."
                tooltip="Include any specific requirements for your travel"
              />
              <FormField
                control={form.control}
                name="accommodationType"
                label="Preferred Accommodation Type"
                type="select"
                options={accommodationOptions}
              />
              <TextAreaField
                control={form.control}
                name="bioAndGoals"
                label="Bio & Travel Goals"
                placeholder="Share your background and what you hope to achieve..."
                tooltip="Describe your personal background and travel objectives"
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
              Save Global Exploration Preferences
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default GlobalExplorationForm;
