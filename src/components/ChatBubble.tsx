
import React from 'react';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div 
        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
          isBot 
            ? 'bg-karius-light-purple text-karius-dark-purple rounded-tl-none' 
            : 'bg-karius-purple text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p className="text-xs opacity-70 text-right mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
