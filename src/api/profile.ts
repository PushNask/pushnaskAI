import { supabase } from "@/integrations/supabase/client";
import { ProfileFormData, ProfileUpdateResponse } from "@/types/profile";
import { toast } from "sonner";

export const profileApi = {
  async fetchProfile(userId: string): Promise<ProfileFormData | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
      return null;
    }
  },

  async updateProfile(userId: string, data: Partial<ProfileFormData>): Promise<ProfileUpdateResponse> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: profile
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      };
    }
  }
};