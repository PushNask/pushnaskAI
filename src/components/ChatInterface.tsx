import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import ChatContainer from "./chat/ChatContainer";
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

        // Fetch user profile and preferences
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        // Generate initial message based on service type and user profile
        const initialMessage = generateInitialMessage(serviceType, profile);
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
  }, [user, serviceType]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Call AI service through edge function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: [...messages, newMessage],
          serviceType,
          userId: user?.id
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
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      </Card>
    </div>
  );
};

const getServiceTitle = (serviceType: string): string => {
  const titles: Record<string, string> = {
    career: "Career Development Advisor",
    global: "Global Opportunities Explorer",
    education: "Educational Guidance Counselor",
    cv: "CV Analysis Expert",
    business: "Entrepreneurial Advisor"
  };
  return titles[serviceType] || "AI Advisor";
};

const generateInitialMessage = (serviceType: string, profile: any): string => {
  const userName = profile?.full_name || "there";

  const messages: Record<string, string> = {
    career: `Hello ${userName}! I'm your Career Development Advisor. I can help you explore career paths, develop professional skills, and achieve your career goals. What would you like to discuss today?`,
    global: `Welcome ${userName}! I'm here to help you discover global opportunities. Whether you're interested in working abroad, international education, or global business ventures, I can guide you through the process.`,
    education: `Hi ${userName}! I'm your Educational Guidance Counselor. I can help you find the right educational path, from choosing programs to preparing applications. What are your educational goals?`,
    cv: `Hello ${userName}! I'm your CV Analysis Expert. I can help you improve your CV and make it stand out to potential employers. Would you like me to analyze your current CV or help you create a new one?`,
    business: `Welcome ${userName}! I'm your Entrepreneurial Advisor. I can help you with business planning, funding strategies, and growth opportunities. What aspect of your business would you like to discuss?`
  };

  return messages[serviceType] || `Hello ${userName}! How can I assist you today?`;
};

export default ChatInterface;