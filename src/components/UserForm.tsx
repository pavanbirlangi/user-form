
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalInfoFields from "./form/PersonalInfoFields";
import ContactInfoFields from "./form/ContactInfoFields";
import AddressField from "./form/AddressField";
import { useUserForm } from "./form/useUserForm";

interface UserFormProps {
  onSubmitSuccess: () => void;
}

const UserForm = ({ onSubmitSuccess }: UserFormProps) => {
  const { form, isSubmitting, watchCountryCode, onSubmit } = useUserForm({ 
    onSubmitSuccess 
  });

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoFields control={form.control} />
            <ContactInfoFields 
              control={form.control} 
              watchCountryCode={watchCountryCode} 
            />
            <AddressField control={form.control} />

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
