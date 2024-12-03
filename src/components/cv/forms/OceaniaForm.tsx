import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData } from "../types/formTypes";

const oceaniaFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  professionalSummary: z.string().min(50, "Professional summary must be at least 50 characters"),
  keySkills: z.string().min(20, "Please list your key skills"),
  workExperience: z.string().min(50, "Please provide detailed work experience"),
  education: z.string().min(20, "Please provide your educational background"),
  certifications: z.string().optional(),
  achievements: z.string().optional(),
  references: z.string().optional(),
});

interface OceaniaFormProps {
  onSubmit: (data: CVFormData) => void;
}

const OceaniaForm = ({ onSubmit }: OceaniaFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(oceaniaFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      professionalSummary: "",
      keySkills: "",
      workExperience: "",
      education: "",
      certifications: "",
      achievements: "",
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
            placeholder="+61 4XX XXX XXX"
          />
          <FormField
            control={form.control}
            name="location"
            label="Location"
            placeholder="Sydney, NSW"
          />
        </div>

        <TextAreaField
          control={form.control}
          name="professionalSummary"
          label="Professional Summary"
          placeholder="Write a compelling summary of your professional background..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="keySkills"
          label="Key Skills"
          placeholder="List your key technical and soft skills..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="workExperience"
          label="Work Experience"
          placeholder="Detail your work history with achievements..."
          rows={6}
        />

        <TextAreaField
          control={form.control}
          name="education"
          label="Education"
          placeholder="List your educational qualifications..."
          rows={4}
        />

        <TextAreaField
          control={form.control}
          name="certifications"
          label="Certifications (Optional)"
          placeholder="List relevant certifications..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="achievements"
          label="Achievements (Optional)"
          placeholder="List key achievements and awards..."
          rows={3}
        />

        <TextAreaField
          control={form.control}
          name="references"
          label="References (Optional)"
          placeholder="Available upon request or list references..."
          rows={3}
        />

        <Button type="submit" className="w-full">Save CV Information</Button>
      </form>
    </Form>
  );
};

export default OceaniaForm;