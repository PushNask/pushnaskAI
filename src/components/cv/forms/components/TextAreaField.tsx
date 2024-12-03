import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CVFormData } from "../types/formTypes";

interface TextAreaFieldProps {
  form: UseFormReturn<CVFormData>;
  name: keyof CVFormData;
  label: string;
  placeholder?: string;
  rows?: number;
}

export const TextAreaField = ({ form, name, label, placeholder, rows = 3 }: TextAreaFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea 
              rows={rows} 
              placeholder={placeholder} 
              {...field}
              name={field.name}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};