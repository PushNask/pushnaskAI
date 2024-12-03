import { FormControl, FormField as Field, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { CVFormData } from "../../types/formTypes";

interface FormFieldProps {
  form?: any;
  control: Control<CVFormData>;
  name: keyof CVFormData;
  label: string;
  placeholder?: string;
  type?: string;
}

export const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps) => {
  return (
    <Field
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              type={type} 
              placeholder={placeholder} 
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};