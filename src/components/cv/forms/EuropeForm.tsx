import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const europeFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Please enter a valid address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  photo: z.string().optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  careerSummary: z.string().min(50, "Please provide a detailed career summary"),
  education: z.string().min(10, "Please provide your educational background"),
  vocationalTraining: z.string().optional(),
  workExperience: z.string().min(50, "Please provide your work experience"),
  languages: z.string().min(2, "Please list your language skills"),
  technicalSkills: z.string().min(10, "Please list your technical skills"),
  softSkills: z.string().min(10, "Please list your soft skills"),
  hobbies: z.string().optional(),
  references: z.string().optional(),
});

type EuropeFormValues = z.infer<typeof europeFormSchema>;

const EuropeForm = () => {
  const { toast } = useToast();
  const form = useForm<EuropeFormValues>({
    resolver: zodResolver(europeFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      email: "",
      careerSummary: "",
      education: "",
      workExperience: "",
      languages: "",
      technicalSkills: "",
      softSkills: "",
    },
  });

  const onSubmit = (data: EuropeFormValues) => {
    console.log(data);
    toast({
      title: "CV Information Saved",
      description: "Your European format CV information has been saved successfully.",
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input {...form.register("fullName")} />
            {form.formState.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <Input {...form.register("address")} />
            {form.formState.errors.address && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input {...form.register("phone")} />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input {...form.register("email")} type="email" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Career Summary</label>
            <Textarea {...form.register("careerSummary")} rows={4} />
            {form.formState.errors.careerSummary && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.careerSummary.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Education</label>
            <Textarea {...form.register("education")} rows={3} />
            {form.formState.errors.education && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.education.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Work Experience</label>
          <Textarea {...form.register("workExperience")} rows={6} />
          {form.formState.errors.workExperience && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.workExperience.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Languages</label>
            <Input {...form.register("languages")} />
            {form.formState.errors.languages && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.languages.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technical Skills</label>
            <Input {...form.register("technicalSkills")} />
            {form.formState.errors.technicalSkills && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.technicalSkills.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Soft Skills</label>
          <Input {...form.register("softSkills")} />
          {form.formState.errors.softSkills && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.softSkills.message}</p>
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
      </div>

      <Button type="submit" className="w-full">Save European CV</Button>
    </form>
  );
};

export default EuropeForm;