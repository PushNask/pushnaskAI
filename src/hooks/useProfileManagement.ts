import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { profileApi } from "@/api/profile";
import { ProfileFormData, profileFormSchema } from "@/types/profile";
import { useAuth } from "@/contexts/auth/AuthContext";
import { toast } from "sonner";

export const useProfileManagement = (initialData?: Partial<ProfileFormData>) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData || {
      full_name: "",
      current_role: "",
      email: "",
      phone_number: "",
      nationality: "",
      country_of_residence: "",
      education_level: "",
      field_of_study: "",
      work_experience: "",
      work_preference: "",
      willing_to_relocate: false
    }
  });

  const handleSubmit = async (data: ProfileFormData) => {
    if (!user?.id) {
      toast.error('No user found');
      return;
    }

    setLoading(true);
    try {
      const result = await profileApi.updateProfile(user.id, data);
      
      if (result.success) {
        toast.success('Profile updated successfully');
        navigate('/profile');
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const profile = await profileApi.fetchProfile(user.id);
      if (profile) {
        form.reset(profile);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleSubmit: form.handleSubmit(handleSubmit),
    loadProfile
  };
};