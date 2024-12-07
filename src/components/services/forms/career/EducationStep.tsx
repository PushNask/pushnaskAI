import { Control } from "react-hook-form";
import { FormField } from "../components/FormField";
import { TextAreaField } from "../components/TextAreaField";
import { FormSection } from "../components/FormSection";
import { CareerFormData } from "./types";
import { educationLevels, fieldsOfStudy } from "./constants";

interface EducationStepProps {
  control: Control<CareerFormData>;
}

export const EducationStep = ({ control }: EducationStepProps) => {
  return (
    <FormSection title="Education & Skills">
      <div className="grid gap-4">
        <FormField
          control={control}
          name="educationLevel"
          label="Highest Education Level"
          type="select"
          options={educationLevels}
        />
        <FormField
          control={control}
          name="fieldOfStudy"
          label="Field of Study"
          type="select"
          options={fieldsOfStudy}
        />
        <TextAreaField
          control={control}
          name="otherEducation"
          label="Other Certification or Training"
          placeholder="List any additional certifications or training..."
        />
        <TextAreaField
          control={control}
          name="keySkills"
          label="Key Skills and Strengths"
          placeholder="List both technical and soft skills..."
          tooltip="Include both hard (technical) and soft (interpersonal) skills"
        />
        <TextAreaField
          control={control}
          name="interests"
          label="Interests and Hobbies"
          placeholder="Include interests relevant to career paths..."
          tooltip="List interests that reflect personal passions or career aspirations"
        />
      </div>
    </FormSection>
  );
};