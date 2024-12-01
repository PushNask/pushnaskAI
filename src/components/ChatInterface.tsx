import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: 'Thank you for your message. I am analyzing your request and will provide personalized recommendations shortly.'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    toast({
      title: "Message sent",
      description: "Your request is being processed.",
    });
  };

  return (
    <Card className="flex flex-col h-[600px] bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
        <p className="text-sm text-gray-600">Ask me anything about career development, travel, education, or business</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-ocean text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean"
        />
        <Button type="submit" className="bg-ocean hover:bg-ocean-dark">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};

export default ChatInterface;