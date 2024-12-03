import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData, BaseFormProps } from "../types/formTypes";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  location: z.string().optional(),
  careerObjective: z.string().max(500, "Career objective must be less than 500 characters"),
  workExperience: z.string(),
  education: z.string(),
  skills: z.string(),
  extras: z.string().optional(),
});

const NorthAmericaForm = ({ onSubmit, initialData }: BaseFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
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
            name="linkedin"
            label="LinkedIn Profile (Optional)"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <TextAreaField
          control={form.control}
          name="careerObjective"
          label="Career Objective"
          placeholder="Brief summary of your career goals and professional experience..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="workExperience"
          label="Work Experience"
          placeholder="List your work experience with measurable achievements..."
          rows={6}
        />

        <TextAreaField
          control={form.control}
          name="education"
          label="Education & Certifications"
          placeholder="List your educational background and certifications..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="skills"
          label="Skills"
          placeholder="List your technical, soft, and language skills..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
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
