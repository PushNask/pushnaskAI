import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData, BaseFormProps } from "../types/formTypes";

const latinAmericaFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  personalInfo: z.string().min(20, "Personal information is required"),
  objective: z.string().min(30, "Career objective must be at least 30 characters"),
  education: z.string().min(20, "Education details are required"),
  workExperience: z.string().min(30, "Work experience details are required"),
  skills: z.string().min(20, "Skills are required"),
  languages: z.string().min(10, "Language proficiency is required"),
  references: z.string().optional(),
});

const LatinAmericaForm = ({ onSubmit, initialData }: BaseFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(latinAmericaFormSchema),
    defaultValues: initialData || {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      personalInfo: "",
      objective: "",
      education: "",
      workExperience: "",
      skills: "",
      languages: "",
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
            placeholder="Juan Pérez"
          />
          <FormField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="juan@example.com"
          />
          <FormField
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="+52 55 XXXX XXXX"
          />
          <FormField
            control={form.control}
            name="location"
            label="Location"
            placeholder="Ciudad de México, México"
          />
        </div>

        <TextAreaField
          control={form.control}
          name="personalInfo"
          label="Personal Information"
          placeholder="Date of birth, nationality, marital status..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="objective"
          label="Career Objective"
          placeholder="Brief description of your career goals..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="education"
          label="Education"
          placeholder="Detail your educational background..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="workExperience"
          label="Work Experience"
          placeholder="List your work experience..."
          rows={6}
        />

        <TextAreaField
          control={form.control}
          name="skills"
          label="Skills"
          placeholder="List your technical and soft skills..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="languages"
          label="Languages"
          placeholder="List languages and proficiency levels..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="references"
          label="References (Optional)"
          placeholder="List professional references..."
          rows={3}
        />

        <Button type="submit" className="w-full">Save CV Information</Button>
      </form>
    </Form>
  );
};

export default LatinAmericaForm;
