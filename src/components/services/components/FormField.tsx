import { useFormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface FormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps) => {
  const { error } = useFormField();

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type={type}
          placeholder={placeholder}
          {...control.register(name)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};