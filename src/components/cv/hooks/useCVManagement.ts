import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { UserCV } from "../types/cvTypes";
import { useToast } from "@/hooks/use-toast";

export const useCVManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadExistingCV = async () => {
    try {
      const { data: cvData, error } = await supabase
        .from('user_cvs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      return cvData as UserCV;
    } catch (error) {
      console.error('Error loading CV:', error);
      return null;
    }
  };

  const handleSaveCV = async (formData: any) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('user_cvs')
        .upsert({
          user_id: user?.id,
          content: JSON.stringify(formData),
          parsed_data: {
            region: formData.region,
            ...formData
          },
          version: 1
        });

      if (error) throw error;

      toast({
        title: "CV Saved",
        description: "Your CV has been successfully saved."
      });
    } catch (error) {
      console.error('Error saving CV:', error);
      toast({
        title: "Error",
        description: "Failed to save CV. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loadExistingCV,
    handleSaveCV
  };
};