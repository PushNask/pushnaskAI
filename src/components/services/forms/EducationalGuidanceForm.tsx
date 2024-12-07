import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "../components/FormField";
import { TextAreaField } from "../components/TextAreaField";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const educationLevels = [
  "High School",
  "Bachelor's",
  "Master's",
  "PhD",
  "Other"
] as const;

const educationalGuidanceSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  startDate: z.string().min(1, "Please select a start date"),
  currentEducationLevel: z.enum(educationLevels),
  institutionDetails: z.string().min(10, "Please provide institution details"),
  desiredFieldOfStudy: z.string().min(5, "Please specify your desired field"),
  preferredCountries: z.string().min(2, "Please list your preferred countries"),
  academicAchievements: z.string().min(10, "Please list your achievements"),
  languageProficiency: z.string().min(5, "Please specify language proficiency"),
  budgetRange: z.string().min(2, "Please specify your budget range"),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof educationalGuidanceSchema>;

const EducationalGuidanceForm = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(educationalGuidanceSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      startDate: "",
      currentEducationLevel: "Bachelor's",
      institutionDetails: "",
      desiredFieldOfStudy: "",
      preferredCountries: "",
      academicAchievements: "",
      languageProficiency: "",
      budgetRange: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: "Form Submitted",
      description: "Your educational guidance preferences have been saved.",
    });
  };

  const currentStep = 1;
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const FieldWithTooltip = ({ label, tooltip, children }: { label: string; tooltip: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">{label}</label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {children}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-primary">
            Personalized Study & Academic Planning
          </h2>
          <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            label="Full Name *"
            placeholder="John Doe"
          />
          <FormField
            control={form.control}
            name="email"
            label="Email *"
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            label="Phone *"
            placeholder="+1 (555) 000-0000"
          />
          <FormField
            control={form.control}
            name="startDate"
            label="Intended Start Date *"
            type="date"
            placeholder="Select a date"
          />
        </div>

        <FieldWithTooltip
          label="Current Education Level *"
          tooltip="Select your highest completed or current level of education"
        >
          <Select
            onValueChange={(value) => form.setValue("currentEducationLevel", value as any)}
            defaultValue={form.getValues("currentEducationLevel")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldWithTooltip>

        <TextAreaField
          control={form.control}
          name="institutionDetails"
          label="Institution Details *"
          placeholder="Current institution name and relevant coursework"
          tooltip="Include your current institution's name and any relevant courses or specializations"
        />

        <TextAreaField
          control={form.control}
          name="desiredFieldOfStudy"
          label="Desired Field of Study *"
          placeholder="e.g., Computer Science, International Relations"
          tooltip="Specify your intended field of study and any specific areas of interest"
        />

        <TextAreaField
          control={form.control}
          name="preferredCountries"
          label="Preferred Countries *"
          placeholder="e.g., Canada, Germany, Australia"
          tooltip="List the countries where you'd like to study, in order of preference"
        />

        <TextAreaField
          control={form.control}
          name="academicAchievements"
          label="Academic Achievements *"
          placeholder="e.g., Dean's List 2022, SAT 1400, GRE 320, TOEFL 100"
          tooltip="List your key academic achievements, test scores, and awards"
        />

        <TextAreaField
          control={form.control}
          name="languageProficiency"
          label="Language Proficiency *"
          placeholder="e.g., English (IELTS 7.5), French (B2)"
          tooltip="Specify languages and proficiency levels with test scores if available"
        />

        <FormField
          control={form.control}
          name="budgetRange"
          label="Budget Range *"
          placeholder="e.g., $10,000 - $20,000 per year"
          tooltip="Specify your annual budget range for studies including living expenses"
        />

        <TextAreaField
          control={form.control}
          name="additionalInfo"
          label="Additional Information"
          placeholder="Include details about extracurricular activities, scholarship interests, or personal circumstances"
          tooltip="Any other relevant information that might help us provide better guidance"
        />

        <div className="flex justify-between pt-4">
          <Button variant="outline" type="button">
            Save Draft
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default EducationalGuidanceForm;
