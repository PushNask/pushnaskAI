import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData } from "../types/formTypes";

const studyAbroadFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  currentEducation: z.string().min(10, "Please provide your current education details"),
  preferredCountries: z.string().min(2, "Please list your preferred countries"),
  fieldOfStudy: z.string().min(5, "Please specify your desired field of study"),
  academicAchievements: z.string().min(10, "Please list your academic achievements"),
  languageProficiency: z.string().min(5, "Please specify your language proficiency"),
  budgetRange: z.string().min(2, "Please specify your budget range"),
  startDate: z.string().min(2, "Please specify your intended start date"),
  additionalInfo: z.string().optional(),
});

interface StudyAbroadFormProps {
  onSubmit: (data: CVFormData) => void;
}

const StudyAbroadForm = ({ onSubmit }: StudyAbroadFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(studyAbroadFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      currentEducation: "",
      preferredCountries: "",
      fieldOfStudy: "",
      academicAchievements: "",
      languageProficiency: "",
      budgetRange: "",
      startDate: "",
      additionalInfo: "",
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
            name="startDate"
            label="Intended Start Date"
            type="date"
            placeholder="Select your intended start date"
          />
        </div>

        <TextAreaField
          control={form.control}
          name="currentEducation"
          label="Current Education"
          placeholder="Describe your current education level and institution..."
          rows={4}
        />

        <FormField
          control={form.control}
          name="fieldOfStudy"
          label="Desired Field of Study"
          placeholder="Enter your desired field of study"
        />

        <FormField
          control={form.control}
          name="preferredCountries"
          label="Preferred Countries"
          placeholder="List your preferred countries for study"
        />

        <TextAreaField
          control={form.control}
          name="academicAchievements"
          label="Academic Achievements"
          placeholder="List your key academic achievements, awards, and scores..."
          rows={4}
        />

        <FormField
          control={form.control}
          name="languageProficiency"
          label="Language Proficiency"
          placeholder="List languages and proficiency levels (e.g., English - IELTS 7.5)"
        />

        <FormField
          control={form.control}
          name="budgetRange"
          label="Budget Range"
          placeholder="Specify your budget range for studies"
        />

        <TextAreaField
          control={form.control}
          name="additionalInfo"
          label="Additional Information (Optional)"
          placeholder="Any other relevant information..."
          rows={4}
        />

        <Button type="submit" className="w-full">Save Study Abroad Information</Button>
      </form>
    </Form>
  );
};

export default StudyAbroadForm;