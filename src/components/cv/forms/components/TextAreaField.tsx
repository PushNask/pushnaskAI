import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { CVFormData } from "../types/formTypes";

interface TextAreaFieldProps {
  form?: any;
  control: Control<CVFormData>;
  name: keyof CVFormData;
  label: string;
  placeholder?: string;
  rows?: number;
}

export const TextAreaField = ({ control, name, label, placeholder, rows = 3 }: TextAreaFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea 
              rows={rows} 
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