
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormData, CountryCode } from "@/lib/schemas";
import { saveUserData } from "@/lib/storage-service";
import { useToast } from "@/components/ui/use-toast";

interface UseUserFormProps {
  onSubmitSuccess: () => void;
}

export const useUserForm = ({ onSubmitSuccess }: UseUserFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      countryCode: "US",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const watchCountryCode = form.watch("countryCode") as CountryCode;

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Save to localStorage with duplicate check
      const result = saveUserData(data);
      
      if (result.success) {
        toast({
          title: "Form submitted successfully!",
          description: "Your information has been saved.",
        });
        
        // Reset form
        form.reset();
        
        // Notify parent component
        onSubmitSuccess();
      } else {
        toast({
          title: "Submission failed",
          description: result.error || "Failed to save data. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your form submission failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    watchCountryCode,
    onSubmit,
  };
};
