import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import MessageList from "@/components/MessageList";
import ChatInputBar from "./ChatInputBar";
import { Message } from "@/types/chat";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ChatContainer = ({ messages, isLoading, onSendMessage }: ChatContainerProps) => {
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
        <MessageList messages={messages} />
        <ChatInputBar onSendMessage={onSendMessage} isLoading={isLoading} />
      </Card>
    </ErrorBoundary>
  );
};

export default ChatContainer;