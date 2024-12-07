import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { FormField } from "@/components/services/forms/components/FormField";
import { TextAreaField } from "@/components/services/forms/components/TextAreaField";
import { FormSection } from "@/components/services/forms/components/FormSection";

const entrepreneurialFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  businessName: z.string().min(2, "Business name is required"),
  businessWebsite: z.string().url().optional().or(z.literal("")),
  industry: z.string().min(2, "Industry is required"),
  businessStage: z.string().min(2, "Business stage is required"),
  businessDescription: z.string().min(50, "Please provide a detailed description"),
  fundingAmount: z.string().min(1, "Funding amount is required"),
  useOfFunds: z.string().min(20, "Please detail how funds will be used"),
  marketAnalysis: z.string().min(50, "Please provide market analysis"),
  competitiveAnalysis: z.string().min(50, "Please provide competitive analysis"),
  currentRevenue: z.string().optional(),
  financialProjections: z.string().min(50, "Please provide financial projections"),
  existingFunding: z.string().optional(),
  teamComposition: z.string().min(20, "Please describe your team"),
  advisors: z.string().optional(),
  uniqueValue: z.string().min(20, "Please describe your unique value proposition"),
  intellectualProperty: z.string().optional(),
  location: z.string().min(2, "Current location is required"),
  expansionPlans: z.string().optional(),
  targetInvestors: z.string().optional(),
  desiredOutcome: z.string().optional(),
});

type FormData = z.infer<typeof entrepreneurialFormSchema>;

const EntrepreneurialSupportForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useLocalStorage<Partial<FormData>>("entrepreneurialFormData", {});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<FormData>({
    resolver: zodResolver(entrepreneurialFormSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    toast({
      title: "Form Submitted",
      description: "Your entrepreneurial support preferences have been saved.",
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
          <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          <Progress value={progress} className="h-2" />
        </div>

        {currentStep === 1 && (
          <FormSection title="Personal & Business Information">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                label="Full Name *"
                placeholder="John Doe"
              />
              <FormField
                control={form.control}
                name="email"
                label="Email *"
                type="email"
                placeholder="john@example.com"
              />
              <FormField
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="+1 (555) 000-0000"
              />
              <FormField
                control={form.control}
                name="businessName"
                label="Business Name *"
                placeholder="GreenTech Innovations Ltd."
              />
            </div>
          </FormSection>
        )}

        {currentStep === 2 && (
          <FormSection title="Business Details">
            <TextAreaField
              control={form.control}
              name="businessDescription"
              label="Business Description *"
              placeholder="Include your value proposition, target customers, and unique selling points"
              tooltip="Be specific about what makes your business unique"
            />
            <TextAreaField
              control={form.control}
              name="marketAnalysis"
              label="Market Analysis *"
              placeholder="Highlight market size, growth rate, and target customer segments"
              tooltip="Include relevant market research and statistics"
            />
          </FormSection>
        )}

        {currentStep === 3 && (
          <FormSection title="Financial Information">
            <FormField
              control={form.control}
              name="fundingAmount"
              label="Funding Amount Needed *"
              placeholder="$500,000 USD"
              tooltip="Specify the total funding amount you're seeking"
            />
            <TextAreaField
              control={form.control}
              name="useOfFunds"
              label="Use of Funds *"
              placeholder="40% product development, 30% marketing, 20% operations, 10% contingency"
              tooltip="Break down how you plan to allocate the funding"
            />
          </FormSection>
        )}

        {currentStep === 4 && (
          <FormSection title="Team & Vision">
            <TextAreaField
              control={form.control}
              name="teamComposition"
              label="Team Composition *"
              placeholder="List key team members, their roles, and experience"
              tooltip="Highlight relevant expertise and achievements"
            />
            <TextAreaField
              control={form.control}
              name="uniqueValue"
              label="Unique Value Proposition *"
              placeholder="What makes your business stand out from competitors?"
              tooltip="Focus on your key differentiators"
            />
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
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default EntrepreneurialSupportForm;
