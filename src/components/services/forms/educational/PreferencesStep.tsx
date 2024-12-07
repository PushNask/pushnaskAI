import { Control } from "react-hook-form";
import { FormField } from "../../components/FormField";
import { TextAreaField } from "../../components/TextAreaField";
import { FormSection } from "../../components/FormSection";
import { EducationalGuidanceData } from "./types";
import { budgetRangeOptions } from "./constants";

interface PreferencesStepProps {
  control: Control<EducationalGuidanceData>;
}

export const PreferencesStep = ({ control }: PreferencesStepProps) => {
  return (
    <FormSection title="Study Preferences">
      <div className="grid gap-4">
        <TextAreaField
          control={control}
          name="preferredCountries"
          label="Preferred Countries"
          placeholder="List the countries where you'd like to study"
        />
        <TextAreaField
          control={control}
          name="languageProficiency"
          label="Language Proficiency"
          placeholder="Specify languages and proficiency levels with test scores"
        />
        <FormField
          control={control}
          name="budgetRange"
          label="Budget Range"
          type="select"
          options={budgetRangeOptions}
        />
        <TextAreaField
          control={control}
          name="additionalInfo"
          label="Additional Information"
          placeholder="Any other relevant information that might help us provide better guidance"
        />
      </div>
    </FormSection>
  );
};