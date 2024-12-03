import { useFormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface TextAreaFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export const TextAreaField = ({ control, name, label, placeholder, rows = 3 }: TextAreaFieldProps) => {
  const { error } = useFormField();

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={placeholder}
          rows={rows}
          {...control.register(name)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};