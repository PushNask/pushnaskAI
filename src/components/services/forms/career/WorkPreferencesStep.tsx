import { Control } from "react-hook-form";
import { FormField } from "../components/FormField";
import { FormSection } from "../components/FormSection";
import { CareerFormData } from "./types";
import { workExperienceOptions, preferredIndustries, workEnvironments, yesNoMaybe } from "./constants";

interface WorkPreferencesStepProps {
  control: Control<CareerFormData>;
}

export const WorkPreferencesStep = ({ control }: WorkPreferencesStepProps) => {
  return (
    <FormSection title="Work Preferences">
      <div className="grid gap-4">
        <FormField
          control={control}
          name="workExperience"
          label="Work Experience"
          type="select"
          options={workExperienceOptions}
        />
        <FormField
          control={control}
          name="preferredIndustries"
          label="Preferred Industries"
          type="select"
          options={preferredIndustries}
        />
        <FormField
          control={control}
          name="workEnvironment"
          label="Preferred Work Environment"
          type="select"
          options={workEnvironments}
        />
        <FormField
          control={control}
          name="willingToRelocate"
          label="Willing to Relocate"
          type="select"
          options={yesNoMaybe}
        />
      </div>
    </FormSection>
  );
};