import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData, baseFormSchema } from "../types/formTypes";

const formSchema = baseFormSchema.extend({
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  location: z.string().optional(),
  careerObjective: z.string().max(500, "Career objective must be less than 500 characters"),
  workExperience: z.string(),
  education: z.string(),
  skills: z.string(),
  extras: z.string().optional(),
});

interface NorthAmericaFormProps {
  onSubmit: (data: CVFormData) => void;
}

const NorthAmericaForm = ({ onSubmit }: NorthAmericaFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      location: "",
      careerObjective: "",
      workExperience: "",
      education: "",
      skills: "",
      extras: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            form={form}
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
          />
          <FormField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
          />
          <FormField
            form={form}
            name="phone"
            label="Phone"
            placeholder="+1 (555) 000-0000"
          />
          <FormField
            form={form}
            name="linkedin"
            label="LinkedIn Profile (Optional)"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <TextAreaField
          form={form}
          name="careerObjective"
          label="Career Objective"
          placeholder="Brief summary of your career goals and professional experience..."
          rows={4}
        />

        <TextAreaField
          form={form}
          name="workExperience"
          label="Work Experience"
          placeholder="List your work experience with measurable achievements..."
          rows={6}
        />

        <TextAreaField
          form={form}
          name="education"
          label="Education & Certifications"
          placeholder="List your educational background and certifications..."
          rows={4}
        />

        <TextAreaField
          form={form}
          name="skills"
          label="Skills"
          placeholder="List your technical, soft, and language skills..."
          rows={4}
        />

        <TextAreaField
          form={form}
          name="extras"
          label="Additional Information (Optional)"
          placeholder="Volunteer work, projects, or other relevant information..."
          rows={4}
        />

        <Button type="submit" className="w-full">Save CV Information</Button>
      </form>
    </Form>
  );
};

export default NorthAmericaForm;