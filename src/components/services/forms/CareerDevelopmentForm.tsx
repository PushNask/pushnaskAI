import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormField } from "../components/FormField";
import { TextAreaField } from "../components/TextAreaField";

const careerFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().optional(),
  yearsExperience: z.string(),
  coreSkills: z.string().min(10, "Please provide more detail about your skills"),
  shortTermGoals: z.string().min(10, "Please describe your short-term goals"),
  longTermGoals: z.string().optional(),
  preferredIndustries: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof careerFormSchema>;

const CareerDevelopmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      currentRole: "",
      yearsExperience: "",
      coreSkills: "",
      shortTermGoals: "",
      longTermGoals: "",
      preferredIndustries: "",
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
        description: "Your career development preferences have been saved.",
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
          name="currentRole"
          label="Current Role"
          placeholder="e.g., Software Engineer"
        />

        <FormField
          control={form.control}
          name="yearsExperience"
          label="Years of Experience"
          placeholder="e.g., 5 years"
        />

        <TextAreaField
          control={form.control}
          name="coreSkills"
          label="Core Skills & Strengths"
          placeholder="List both technical and soft skills..."
        />

        <TextAreaField
          control={form.control}
          name="shortTermGoals"
          label="Short-Term Career Goals"
          placeholder="What do you want to achieve in the next 1-2 years?"
        />

        <TextAreaField
          control={form.control}
          name="longTermGoals"
          label="Long-Term Career Vision"
          placeholder="Where do you see yourself in 5+ years?"
        />

        <TextAreaField
          control={form.control}
          name="preferredIndustries"
          label="Preferred Industries"
          placeholder="e.g., Tech, Healthcare, Finance"
        />

        <TextAreaField
          control={form.control}
          name="additionalInfo"
          label="Additional Information"
          placeholder="Any other relevant information..."
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Career Development Preferences"}
        </Button>
      </form>
    </Form>
  );
};

export default CareerDevelopmentForm;