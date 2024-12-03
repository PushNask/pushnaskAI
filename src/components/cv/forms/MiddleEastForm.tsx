import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { CVFormData } from "./types/formTypes";

const middleEastFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  education: z.string().min(10, "Education details must be at least 10 characters"),
  workExperience: z.string().min(10, "Work experience must be at least 10 characters"),
  skills: z.string().min(5, "Skills must be at least 5 characters"),
  languages: z.string().min(2, "Languages must be at least 2 characters"),
  religion: z.string().optional(),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
  dateOfBirth: z.string().min(2, "Date of birth is required"),
  maritalStatus: z.string().optional(),
  visaStatus: z.string().optional(),
});

interface MiddleEastFormProps {
  onSubmit: (data: CVFormData) => void;
}

const MiddleEastForm = ({ onSubmit }: MiddleEastFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(middleEastFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      workExperience: "",
      skills: "",
      languages: "",
      religion: "",
      nationality: "",
      dateOfBirth: "",
      maritalStatus: "",
      visaStatus: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
        />
        <FormField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <FormField
          control={form.control}
          name="phone"
          label="Phone"
          placeholder="Enter your phone number"
        />
        <FormField
          control={form.control}
          name="address"
          label="Address"
          placeholder="Enter your address"
        />
        <FormField
          control={form.control}
          name="nationality"
          label="Nationality"
          placeholder="Enter your nationality"
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          placeholder="Select your date of birth"
        />
        <FormField
          control={form.control}
          name="religion"
          label="Religion (Optional)"
          placeholder="Enter your religion"
        />
        <FormField
          control={form.control}
          name="maritalStatus"
          label="Marital Status"
          placeholder="Enter your marital status"
        />
        <FormField
          control={form.control}
          name="visaStatus"
          label="Visa Status"
          placeholder="Enter your visa status"
        />
        <TextAreaField
          control={form.control}
          name="education"
          label="Education"
          placeholder="Enter your educational background"
          rows={4}
        />
        <TextAreaField
          control={form.control}
          name="workExperience"
          label="Work Experience"
          placeholder="Enter your work experience"
          rows={4}
        />
        <TextAreaField
          control={form.control}
          name="skills"
          label="Skills"
          placeholder="Enter your skills"
          rows={3}
        />
        <TextAreaField
          control={form.control}
          name="languages"
          label="Languages"
          placeholder="Enter languages you know"
          rows={2}
        />
        <Button type="submit" className="w-full">Save CV</Button>
      </form>
    </Form>
  );
};

export default MiddleEastForm;