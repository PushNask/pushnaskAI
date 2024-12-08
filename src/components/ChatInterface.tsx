import { useChat } from "@/hooks/useChat";
import ChatContainer from "./chat/ChatContainer";

const ChatInterface = () => {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <ChatContainer
      messages={messages}
      isLoading={isLoading}
      onSendMessage={sendMessage}
    />
  );
};

export default ChatInterface;