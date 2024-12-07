import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { careerFormSchema, CareerFormData } from "./career/types";
import { PersonalInfoStep } from "./career/PersonalInfoStep";
import { EducationStep } from "./career/EducationStep";
import { WorkPreferencesStep } from "./career/WorkPreferencesStep";
import { CareerGoalsStep } from "./career/CareerGoalsStep";

const CareerDevelopmentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useLocalStorage<Partial<CareerFormData>>("careerFormData", {});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<CareerFormData>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: formData || {
      fullName: "",
      email: "",
      currentRole: "",
      educationLevel: "",
      fieldOfStudy: "",
      otherEducation: "",
      keySkills: "",
      interests: "",
      workExperience: "",
      preferredIndustries: "",
      workEnvironment: "",
      willingToRelocate: "",
      careerGoals: "",
      shortTermGoals: "",
      longTermVision: "",
      additionalInfo: "",
      interestedInTraining: ""
    }
  });

  const onSubmit = (data: CareerFormData) => {
    setFormData(data);
    toast({
      title: "Success",
      description: "Your career development preferences have been saved.",
    });
  };

  const handleStepChange = (step: number) => {
    setFormData(form.getValues());
    setCurrentStep(step);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-primary">
            Career Path & Professional Growth
          </h2>
          <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          <Progress value={progress} className="h-2" />
        </div>

        {currentStep === 1 && <PersonalInfoStep control={form.control} />}
        {currentStep === 2 && <EducationStep control={form.control} />}
        {currentStep === 3 && <WorkPreferencesStep control={form.control} />}
        {currentStep === 4 && <CareerGoalsStep control={form.control} />}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleStepChange(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
            >
              Next
            </Button>
          ) : (
            <Button type="submit">Save Career Development Preferences</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CareerDevelopmentForm;