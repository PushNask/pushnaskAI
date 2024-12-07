import { Control } from "react-hook-form";
import { FormField } from "../components/FormField";
import { TextAreaField } from "../components/TextAreaField";
import { FormSection } from "../components/FormSection";
import { EducationalGuidanceData } from "./types";
import { educationLevels, studyFields } from "./constants";

interface EducationDetailsStepProps {
  control: Control<EducationalGuidanceData>;
}

export const EducationDetailsStep = ({ control }: EducationDetailsStepProps) => {
  return (
    <FormSection title="Education Details">
      <div className="grid gap-4">
        <FormField
          control={control}
          name="currentEducationLevel"
          label="Current Education Level"
          type="select"
          options={educationLevels}
        />
        <TextAreaField
          control={control}
          name="institutionDetails"
          label="Current Institution Details"
          placeholder="Include your current institution's name and relevant coursework"
        />
        <FormField
          control={control}
          name="desiredFieldOfStudy"
          label="Desired Field of Study"
          type="select"
          options={studyFields}
        />
        <TextAreaField
          control={control}
          name="academicAchievements"
          label="Academic Achievements"
          placeholder="List your key academic achievements, test scores, and awards"
        />
      </div>
    </FormSection>
  );
};