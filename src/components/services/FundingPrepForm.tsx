import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { FundingPrepFormData } from "./types/serviceFormTypes";

const fundingPrepFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessDescription: z.string().min(50, "Please provide a detailed business description"),
  fundingAmount: z.string().min(2, "Please specify the funding amount needed"),
  useOfFunds: z.string().min(50, "Please detail how the funds will be used"),
  marketAnalysis: z.string().min(50, "Please provide market analysis"),
  financialProjections: z.string().min(50, "Please provide financial projections"),
  currentProgress: z.string().min(20, "Please describe your current progress"),
  teamComposition: z.string().min(20, "Please describe your team"),
  competitiveAdvantage: z.string().min(50, "Please describe your competitive advantage"),
});

interface FundingPrepFormProps {
  onSubmit: (data: FundingPrepFormData) => void;
}

const FundingPrepForm = ({ onSubmit }: FundingPrepFormProps) => {
  const form = useForm<FundingPrepFormData>({
    resolver: zodResolver(fundingPrepFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      businessDescription: "",
      fundingAmount: "",
      useOfFunds: "",
      marketAnalysis: "",
      financialProjections: "",
      currentProgress: "",
      teamComposition: "",
      competitiveAdvantage: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="phone"
            label="Phone"
            placeholder="+1 (555) 000-0000"
          />
          <FormField
            control={form.control}
            name="businessName"
            label="Business Name"
            placeholder="Enter your business name"
          />
        </div>

        <TextAreaField
          control={form.control}
          name="businessDescription"
          label="Business Description"
          placeholder="Provide a detailed description of your business..."
          rows={4}
        />

        <FormField
          control={form.control}
          name="fundingAmount"
          label="Funding Amount Needed"
          placeholder="Enter the amount of funding you're seeking"
        />

        <TextAreaField
          control={form.control}
          name="useOfFunds"
          label="Use of Funds"
          placeholder="Explain how you plan to use the funding..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="marketAnalysis"
          label="Market Analysis"
          placeholder="Provide your market analysis and opportunity..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="financialProjections"
          label="Financial Projections"
          placeholder="Detail your financial projections..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="currentProgress"
          label="Current Progress"
          placeholder="Describe your current business progress..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="teamComposition"
          label="Team Composition"
          placeholder="Describe your team and their expertise..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="competitiveAdvantage"
          label="Competitive Advantage"
          placeholder="Describe your competitive advantage..."
          rows={4}
        />

        <Button type="submit" className="w-full">Save Funding Preparation Information</Button>
      </form>
    </Form>
  );
};

export default FundingPrepForm;