import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { educationalGuidanceSchema, EducationalGuidanceData } from "./educational/types";
import { PersonalInfoStep } from "./educational/PersonalInfoStep";
import { EducationDetailsStep } from "./educational/EducationDetailsStep";
import { PreferencesStep } from "./educational/PreferencesStep";
import ErrorBoundary from "@/components/ErrorBoundary";

const EducationalGuidanceForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useLocalStorage<Partial<EducationalGuidanceData>>("educationalFormData", {});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<EducationalGuidanceData>({
    resolver: zodResolver(educationalGuidanceSchema),
    defaultValues: formData
  });

  const onSubmit = (data: EducationalGuidanceData) => {
    setFormData(data);
    toast({
      title: "Success",
      description: "Your educational guidance preferences have been saved.",
    });
  };

  const handleStepChange = (step: number) => {
    setFormData(form.getValues());
    setCurrentStep(step);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <ErrorBoundary>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-primary">
              Educational Planning & Study Abroad
            </h2>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
            <Progress value={progress} className="h-2" />
          </div>

          {currentStep === 1 && <PersonalInfoStep control={form.control} />}
          {currentStep === 2 && <EducationDetailsStep control={form.control} />}
          {currentStep === 3 && <PreferencesStep control={form.control} />}

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
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </ErrorBoundary>
  );
};

export default EducationalGuidanceForm;