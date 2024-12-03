import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CVFormData } from "../CVEditor";

interface AsiaFormProps {
  onSubmit: (data: CVFormData) => void;
}

const asiaFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Please enter a valid address"),
  education: z.string(),
  workExperience: z.string(),
  skills: z.string(),
});

const AsiaForm = ({ onSubmit }: AsiaFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(asiaFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      workExperience: "",
      skills: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input type="text" {...form.register("fullName")} />
          {form.formState.errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input type="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input type="tel" {...form.register("phone")} />
          {form.formState.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <Input type="text" {...form.register("address")} />
          {form.formState.errors.address && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Education</label>
        <Textarea rows={4} {...form.register("education")} />
        {form.formState.errors.education && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.education.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Work Experience</label>
        <Textarea rows={6} {...form.register("workExperience")} />
        {form.formState.errors.workExperience && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.workExperience.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Skills</label>
        <Textarea rows={3} {...form.register("skills")} />
        {form.formState.errors.skills && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.skills.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">Save CV Information</Button>
    </form>
  );
};

export default AsiaForm;
