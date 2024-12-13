import { useEffect } from "react";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileManagement } from "@/hooks/useProfileManagement";
import { ProfileFormData } from "@/types/profile";
import { Form } from "@/components/ui/form";

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  title: string;
}

export const ProfileForm = ({ initialData, title }: ProfileFormProps) => {
  const { form, loading, handleSubmit, loadProfile } = useProfileManagement(initialData);

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
              />
              <FormField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
              />
              <FormField
                control={form.control}
                name="currentRole"
                label="Current Role"
                placeholder="e.g., Software Engineer"
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
              />
              <FormField
                control={form.control}
                name="nationality"
                label="Nationality"
                placeholder="Your nationality"
              />
              <FormField
                control={form.control}
                name="countryOfResidence"
                label="Country of Residence"
                placeholder="Your country of residence"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};