import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Send, Paperclip, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AppError, handleError } from "@/utils/errorHandling";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { AdvisoryContext, UserProfileCheck, generateInitialPrompt } from "@/types/career";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  useEffect(() => {
    const initializeChat = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        // Fetch user profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Check profile completeness
        const profileCheck: UserProfileCheck = {
          personalInfo: Boolean(profile?.full_name),
          cvCreated: true, // This should be checked against CV storage
          servicePreferences: true, // This should be checked against service preferences
        };

        // Prepare advisory context
        const context: AdvisoryContext = {
          userName: profile?.full_name || user.email?.split('@')[0] || 'there',
          currentRole: profile?.current_role || undefined,
          fieldOfStudy: profile?.field_of_study || undefined,
          preferredIndustries: profile?.preferred_industries || [],
        };

        // Generate and set initial message
        const initialPrompt = generateInitialPrompt(context, profileCheck);
        setMessages([{ role: 'assistant', content: initialPrompt }]);

      } catch (error) {
        const errorDetails = handleError(error);
        toast({
          title: "Error",
          description: errorDetails.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [user, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
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
      const errorDetails = handleError(error);
      toast({
        title: "Error",
        description: errorDetails.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && messages.length === 0) {
    return (
      <Card className="flex flex-col h-[calc(100vh-12rem)] bg-white">
        <div className="flex-1 p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-start">
              <Skeleton className="h-12 w-3/4 rounded-lg" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <Card className="flex flex-col h-[calc(100vh-12rem)] bg-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message PushNask..."
            className="flex-1 p-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <Globe className="h-5 w-5" />
          </Button>
          
          <Button 
            type="submit" 
            className="rounded-full bg-blue-600 hover:bg-blue-700"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Card>
    </ErrorBoundary>
  );
};

export default ChatInterface;