
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Bot, ArrowLeft } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { ChatMessage } from '../types';
import { mockPlaces } from '../data/places';

const ChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      content: '¡Hola! Soy Karitou, tu asistente para encontrar el lugar perfecto. ¿Qué estás buscando hoy?',
      sender: 'bot',
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate bot typing and response
  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Generate a relevant response based on user input keywords
    setTimeout(() => {
      const lowerMsg = userMessage.toLowerCase();
      let botResponse = '';
      let recommendedPlaces = [];
      
      if (lowerMsg.includes('trabajo') || lowerMsg.includes('estudiar') || lowerMsg.includes('wifi')) {
        botResponse = 'Para trabajar o estudiar, necesitas un lugar tranquilo con buen WiFi. Te recomiendo estos lugares:';
        recommendedPlaces = mockPlaces.filter(place => 
          place.tags.some(tag => ['tranquilo', 'buen wifi', 'coworking'].includes(tag.name))
        ).slice(0, 2);
      } else if (lowerMsg.includes('cita') || lowerMsg.includes('romántico') || lowerMsg.includes('pareja')) {
        botResponse = 'Para una cita romántica, estos lugares tienen el ambiente perfecto:';
        recommendedPlaces = mockPlaces.filter(place => 
          place.tags.some(tag => ['romántico', 'cena', 'exclusivo'].includes(tag.name))
        ).slice(0, 2);
      } else if (lowerMsg.includes('familia') || lowerMsg.includes('niños')) {
        botResponse = 'Para salir con la familia, estos lugares son ideales:';
        recommendedPlaces = mockPlaces.filter(place => 
          place.tags.some(tag => ['familiar', 'terraza', 'juegos infantiles'].includes(tag.name))
        ).slice(0, 2);
      } else {
        botResponse = 'Tengo algunas recomendaciones que podrían interesarte:';
        recommendedPlaces = mockPlaces.slice(0, 2);
      }
      
      // Format place recommendations
      if (recommendedPlaces.length > 0) {
        botResponse += '\n\n' + recommendedPlaces.map(place => 
          `• ${place.name} - ${place.priceRange} - ${place.location.distance} km`
        ).join('\n\n');
        
        botResponse += '\n\n¿Te interesa alguno de estos lugares o prefieres ver más opciones?';
      }
      
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          content: botResponse,
          sender: 'bot',
          timestamp: Date.now(),
        },
      ]);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    simulateBotResponse(input);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center">
        <Link to="/" className="mr-4">
          <ArrowLeft size={24} className="text-karius-dark-purple" />
        </Link>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-karius-purple rounded-full flex items-center justify-center mr-3">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-karius-dark-purple">Karitou</h1>
            <p className="text-xs text-gray-500">Tu asistente de recomendaciones</p>
          </div>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map(message => (
            <ChatBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-karius-light-purple text-karius-dark-purple px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-karius-dark-purple/70 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-karius-dark-purple/70 animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-karius-dark-purple/70 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border border-gray-300 rounded-l-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-karius-purple"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="bg-karius-purple hover:bg-karius-dark-purple text-white rounded-r-full px-4 py-3 transition-colors"
            disabled={!input.trim() || isTyping}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
