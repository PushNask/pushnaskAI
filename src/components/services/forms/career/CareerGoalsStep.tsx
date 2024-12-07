import { Control } from "react-hook-form";
import { FormField } from "../components/FormField";
import { TextAreaField } from "../components/TextAreaField";
import { FormSection } from "../components/FormSection";
import { CareerFormData } from "./types";
import { yesNoMaybe } from "./constants";

interface CareerGoalsStepProps {
  control: Control<CareerFormData>;
}

export const CareerGoalsStep = ({ control }: CareerGoalsStepProps) => {
  return (
    <FormSection title="Career Goals">
      <div className="grid gap-4">
        <TextAreaField
          control={control}
          name="careerGoals"
          label="Career Goals and Aspirations"
          placeholder="Describe your career objectives and desired impact..."
          tooltip="Include both short-term and long-term career objectives"
        />
        <TextAreaField
          control={control}
          name="shortTermGoals"
          label="Short-Term Career Goals"
          placeholder="What do you want to achieve in the next 1-2 years?"
          tooltip="Be specific about your immediate career objectives"
        />
        <TextAreaField
          control={control}
          name="longTermVision"
          label="Long-Term Career Vision"
          placeholder="Where do you see yourself in 5+ years?"
          tooltip="Think about your ultimate career aspirations"
        />
        <TextAreaField
          control={control}
          name="additionalInfo"
          label="Additional Information"
          placeholder="Any other relevant information..."
          tooltip="Include any other details that might be relevant"
        />
        <FormField
          control={control}
          name="interestedInTraining"
          label="Interested in Additional Training"
          type="select"
          options={yesNoMaybe}
        />
      </div>
    </FormSection>
  );
};