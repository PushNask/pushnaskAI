import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Globe, Loader2 } from "lucide-react";

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInputBar = ({ onSendMessage, isLoading }: ChatInputBarProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
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
  );
};

export default ChatInputBar;