import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader, MessageSquare, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatMessage, sendMessage, subscribeToMessages } from '../services/chatService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { auth } from '../lib/firebase';

export function SupportChat() {
  const navigate = useNavigate();
  const { orderId = '' } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
      return;
    }

    if (!orderId || !isOpen) return;

    const unsubscribe = subscribeToMessages(
      orderId,
      (newMessages) => {
        setMessages(newMessages);
        setError(null);
      },
      (error) => {
        console.error('Erreur du chat:', error);
        setError('Impossible de charger les messages. Veuillez réessayer.');
      }
    );

    return () => unsubscribe();
  }, [orderId, isOpen, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !orderId) return;

    try {
      setIsTyping(true);
      setError(null);
      await sendMessage(orderId, message, 'user');
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setError('Impossible d\'envoyer le message. Veuillez réessayer.');
    } finally {
      setIsTyping(false);
    }
  };

  if (!auth.currentUser) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Contacter le support</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-96 h-[600px] bg-gray-900 rounded-lg shadow-xl flex flex-col border border-gray-800 z-50"
          >
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Support Grindup</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {error && (
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {format(msg.timestamp, 'HH:mm', { locale: fr })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-400">Support répond...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  disabled={!!error}
                />
                <button
                  type="submit"
                  className="p-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!!error || !message.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}