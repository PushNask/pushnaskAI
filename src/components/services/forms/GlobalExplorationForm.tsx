import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormField } from "../components/FormField";
import { TextAreaField } from "../components/TextAreaField";

const globalExplorationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  primaryPurpose: z.string().min(2, "Please select a primary purpose"),
  preferredDestinations: z.string().min(2, "Please list your preferred destinations"),
  intendedTimeline: z.string().min(2, "Please provide your intended timeline"),
  budgetRange: z.string().min(2, "Please specify your budget range"),
  languageSkills: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof globalExplorationSchema>;

const GlobalExplorationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(globalExplorationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      primaryPurpose: "",
      preferredDestinations: "",
      intendedTimeline: "",
      budgetRange: "",
      languageSkills: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log("Form data:", data);
      toast({
        title: "Success",
        description: "Your global exploration preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        </div>

        <FormField
          control={form.control}
          name="phone"
          label="Phone (Optional)"
          placeholder="+1 (555) 000-0000"
        />

        <FormField
          control={form.control}
          name="primaryPurpose"
          label="Primary Purpose"
          placeholder="e.g., Work, Study, Cultural Experience"
        />

        <TextAreaField
          control={form.control}
          name="preferredDestinations"
          label="Preferred Destinations"
          placeholder="List the countries or regions you're interested in..."
        />

        <FormField
          control={form.control}
          name="intendedTimeline"
          label="Intended Timeline"
          placeholder="e.g., Within 6 months, Next year"
        />

        <FormField
          control={form.control}
          name="budgetRange"
          label="Budget Range"
          placeholder="e.g., $5,000 - $10,000"
        />

        <TextAreaField
          control={form.control}
          name="languageSkills"
          label="Language Skills"
          placeholder="List languages and proficiency levels..."
        />

        <TextAreaField
          control={form.control}
          name="additionalInfo"
          label="Additional Information"
          placeholder="Any other relevant details..."
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Global Exploration Preferences"}
        </Button>
      </form>
    </Form>
  );
};

export default GlobalExplorationForm;