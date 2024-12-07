import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className }: FormSectionProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};