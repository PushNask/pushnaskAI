import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import MessageList from "./MessageList";
import ChatInputBar from "./chat/ChatInputBar";
import { Message } from "@/types/chat";

interface ChatInterfaceProps {
  serviceType: string;
  onReset: () => void;
}

const ChatInterface = ({ serviceType, onReset }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  useEffect(() => {
    const initializeChat = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        // Fetch user profile and CV data
        const [profileResponse, cvResponse] = await Promise.all([
          supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single(),
          supabase
            .from('user_cvs')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()
        ]);

        // Generate initial message based on service type, profile, and CV
        const initialMessage = generateInitialMessage(
          serviceType, 
          profileResponse.data,
          cvResponse.data
        );
        
        setMessages([{ role: 'assistant', content: initialMessage }]);

      } catch (error) {
        console.error('Error initializing chat:', error);
        toast({
          title: "Error",
          description: "Failed to initialize chat. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [user, serviceType, toast]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading || !user) return;

    const newMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Call AI service through edge function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: [...messages, newMessage],
          serviceType,
          userId: user.id
        }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onReset} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {getServiceTitle(serviceType)}
        </h2>
      </div>

      <Card className="p-0">
        <div className="h-[calc(100vh-12rem)] flex flex-col">
          <MessageList messages={messages} />
          <ChatInputBar onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </Card>
    </div>
  );
};

const getServiceTitle = (serviceType: string): string => {
  const titles: Record<string, string> = {
    career: "Career Development Advisor",
    global: "Global Opportunities Explorer",
    education: "Educational Guidance Counselor",
    business: "Entrepreneurial Advisor"
  };
  return titles[serviceType] || "AI Advisor";
};

const generateInitialMessage = (
  serviceType: string, 
  profile: any, 
  cv: any
): string => {
  const userName = profile?.full_name || "there";
  const hasCV = Boolean(cv);
  const skills = profile?.skills || [];
  const interests = profile?.interests || [];
  const careerGoals = profile?.career_goals || [];

  const messages: Record<string, string> = {
    career: `Hello ${userName}! I'm your Career Development Advisor. 
${hasCV ? "I've reviewed your CV and can provide personalized guidance based on your experience." : "I notice you haven't uploaded a CV yet. Would you like help creating one?"}
${skills.length ? `\nYour current skills include: ${skills.join(", ")}` : ""}
${careerGoals.length ? `\nBased on your career goals, I can help you develop a plan to achieve them.` : ""}
How would you like to proceed with your career development journey?`,

    global: `Welcome ${userName}! I'm here to help you discover global opportunities.
${hasCV ? "Based on your CV, I can suggest international positions that match your experience." : ""}
${interests.length ? `\nI see you're interested in: ${interests.join(", ")}` : ""}
Would you like to explore international opportunities in any specific regions?`,

    education: `Hi ${userName}! I'm your Educational Guidance Counselor.
${profile?.education_history ? "I've reviewed your educational background and can suggest relevant programs." : "Let's start by discussing your educational background."}
${interests.length ? `\nGiven your interests in ${interests.join(", ")}, I can recommend suitable educational paths.` : ""}
What aspect of your educational journey would you like to discuss?`,

    business: `Welcome ${userName}! I'm your Entrepreneurial Advisor.
${hasCV ? "I've analyzed your professional background and can provide targeted business advice." : ""}
${skills.length ? `\nYour skill set in ${skills.join(", ")} could be valuable for entrepreneurship.` : ""}
What aspect of your business venture would you like to explore?`
  };

  return messages[serviceType] || `Hello ${userName}! How can I assist you today?`;
};

export default ChatInterface;