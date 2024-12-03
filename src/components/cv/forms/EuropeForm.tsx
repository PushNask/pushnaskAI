import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData, baseFormSchema } from "../types/formTypes";

const europeFormSchema = baseFormSchema.extend({
  education: z.string().min(10, "Please provide your educational background"),
  workExperience: z.string().min(50, "Please provide your work experience"),
  languages: z.string().min(2, "Please list your language skills"),
  technicalSkills: z.string().min(10, "Please list your technical skills"),
  softSkills: z.string().min(10, "Please list your soft skills"),
  hobbies: z.string().optional(),
  references: z.string().optional(),
});

interface EuropeFormProps {
  onSubmit: (data: CVFormData) => void;
}

const EuropeForm = ({ onSubmit }: EuropeFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(europeFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      education: "",
      workExperience: "",
      languages: "",
      technicalSkills: "",
      softSkills: "",
      hobbies: "",
      references: "",
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
        </div>

        <TextAreaField
          control={form.control}
          name="education"
          label="Education"
          placeholder="Your educational background..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="workExperience"
          label="Work Experience"
          placeholder="Your work experience..."
          rows={6}
        />

        <FormField
          control={form.control}
          name="languages"
          label="Languages"
          placeholder="English (Native), French (B2), German (A2)"
        />

        <TextAreaField
          control={form.control}
          name="technicalSkills"
          label="Technical Skills"
          placeholder="Your technical skills..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="softSkills"
          label="Soft Skills"
          placeholder="Your soft skills..."
          rows={3}
        />

        <FormField
          control={form.control}
          name="hobbies"
          label="Hobbies (Optional)"
          placeholder="Your hobbies and interests"
        />

        <TextAreaField
          control={form.control}
          name="references"
          label="References (Optional)"
          placeholder="Your references..."
          rows={3}
        />

        <Button type="submit" className="w-full">Save European CV</Button>
      </form>
    </Form>
  );
};

export default EuropeForm;