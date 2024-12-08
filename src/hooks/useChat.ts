import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/chat";
import { AdvisoryContext, UserProfileCheck, generateInitialPrompt } from "@/types/career";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  useEffect(() => {
    const initializeChat = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        const profileCheck: UserProfileCheck = {
          personalInfo: Boolean(profile?.full_name),
          cvCreated: true,
          servicePreferences: true,
        };

        const context: AdvisoryContext = {
          userName: profile?.full_name || user.email?.split('@')[0] || 'there',
          currentRole: profile?.current_role || undefined,
          fieldOfStudy: profile?.field_of_study || undefined,
          preferredIndustries: profile?.preferred_industries || [],
        };

        const initialPrompt = generateInitialPrompt("Career Development", context, profileCheck);
        setMessages([{ role: 'assistant', content: initialPrompt }]);

      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to initialize chat",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [user, toast]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const newMessage: Message = {
      role: 'user',
      content
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse: Message = {
        role: 'assistant',
        content: 'Thank you for sharing that. I understand your career goals better now. Let me analyze your situation and provide personalized recommendations.'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      toast({
        title: "Message sent",
        description: "Your request is being processed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};