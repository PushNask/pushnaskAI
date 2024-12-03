import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData, BaseFormProps } from "../types/formTypes";

const africaFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  personalStatement: z.string().min(50, "Personal statement must be at least 50 characters"),
  education: z.string().min(20, "Education details are required"),
  workExperience: z.string().min(30, "Work experience details are required"),
  skills: z.string().min(20, "Skills are required"),
  languages: z.string().min(10, "Language proficiency is required"),
  certifications: z.string().optional(),
  references: z.string().min(20, "References are typically required in African CVs"),
});

const AfricaForm = ({ onSubmit, initialData }: BaseFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(africaFormSchema),
    defaultValues: initialData || {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      personalStatement: "",
      education: "",
      workExperience: "",
      skills: "",
      languages: "",
      certifications: "",
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
            placeholder="Your Full Name"
          />
          <FormField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
          />
          <FormField
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="Your phone number"
          />
          <FormField
            control={form.control}
            name="location"
            label="Location"
            placeholder="City, Country"
          />
        </div>

        <TextAreaField
          control={form.control}
          name="personalStatement"
          label="Personal Statement"
          placeholder="Write a compelling personal statement..."
          rows={4}
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
          placeholder="List your work experience with responsibilities and achievements..."
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
          name="certifications"
          label="Certifications (Optional)"
          placeholder="List relevant certifications and qualifications..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="references"
          label="References"
          placeholder="List professional references with contact details..."
          rows={4}
        />

        <Button type="submit" className="w-full">Save CV Information</Button>
      </form>
    </Form>
  );
};

export default AfricaForm;