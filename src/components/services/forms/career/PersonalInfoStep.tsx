import { Control } from "react-hook-form";
import { FormField } from "../components/FormField";
import { FormSection } from "../components/FormSection";
import { CareerFormData } from "./types";

interface PersonalInfoStepProps {
  control: Control<CareerFormData>;
}

export const PersonalInfoStep = ({ control }: PersonalInfoStepProps) => {
  return (
    <FormSection title="Personal Information">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
        />
        <FormField
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
        />
        <FormField
          control={control}
          name="currentRole"
          label="Current Role"
          placeholder="e.g., Software Engineer"
        />
      </div>
    </FormSection>
  );
};