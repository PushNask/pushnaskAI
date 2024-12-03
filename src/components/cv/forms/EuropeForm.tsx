import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CVFormData } from "../CVEditor";

interface EuropeFormProps {
  onSubmit: (data: CVFormData) => void;
}

const europeFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Please enter a valid address"),
  education: z.string().min(10, "Please provide your educational background"),
  workExperience: z.string().min(50, "Please provide your work experience"),
  languages: z.string().min(2, "Please list your language skills"),
  technicalSkills: z.string().min(10, "Please list your technical skills"),
  softSkills: z.string().min(10, "Please list your soft skills"),
  hobbies: z.string().optional(),
  references: z.string().optional(),
});

const EuropeForm = ({ onSubmit }: EuropeFormProps) => {
  const form = useForm<CVFormData>({
    resolver: zodResolver(europeFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input {...form.register("fullName")} />
          {form.formState.errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.fullName.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input type="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input {...form.register("phone")} />
          {form.formState.errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.phone.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <Input {...form.register("address")} />
          {form.formState.errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.address.message?.toString()}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Education</label>
        <Textarea {...form.register("education")} rows={4} />
        {form.formState.errors.education && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.education.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Work Experience</label>
        <Textarea {...form.register("workExperience")} rows={6} />
        {form.formState.errors.workExperience && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.workExperience.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Languages</label>
        <Input {...form.register("languages")} />
        {form.formState.errors.languages && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.languages.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Technical Skills</label>
        <Textarea {...form.register("technicalSkills")} rows={3} />
        {form.formState.errors.technicalSkills && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.technicalSkills.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Soft Skills</label>
        <Textarea {...form.register("softSkills")} rows={3} />
        {form.formState.errors.softSkills && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.softSkills.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Hobbies (Optional)</label>
        <Input {...form.register("hobbies")} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">References (Optional)</label>
        <Textarea {...form.register("references")} rows={3} />
      </div>

      <Button type="submit" className="w-full">Save European CV</Button>
    </form>
  );
};

export default EuropeForm;