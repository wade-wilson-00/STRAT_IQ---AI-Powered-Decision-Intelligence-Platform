'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Loader2,
  Bot,
  User,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAuthHeaders } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userQuery }]);
    setIsLoading(true);

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: 'assistant', content: '', sources: [] }]);

    try {
      const headers = await getAuthHeaders();
      const API_BASE_URL = process.env.NEXT_PUBLIC_FAST_API_URL || 'http://localhost:8000/api/v1';

      const response = await fetch(`${API_BASE_URL}/chat_stream`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: userQuery }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      let doneReading = false;

      // Read the SSE stream
      while (!doneReading) {
        const { value, done } = await reader.read();
        if (done) {
          doneReading = true;
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        // SSE messages are separated by double newlines
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              doneReading = true;
              break;
            }
            if (!dataStr) continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === 'sources') {
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].sources = parsed.data;
                  return newMsgs;
                });
              } else if (parsed.type === 'token') {
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].content += parsed.data;
                  return newMsgs;
                });
              }
            } catch (e) {
              console.error('Error parsing JSON chunk:', e, dataStr);
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to get an answer from the advisor.');
      
      // Remove the empty assistant message on error
      setMessages((prev) => {
        const newMsgs = [...prev];
        if (newMsgs[newMsgs.length - 1].role === 'assistant' && !newMsgs[newMsgs.length - 1].content) {
          newMsgs.pop();
        }
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] glass-card rounded-2xl overflow-hidden relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-800/50 bg-slate-900/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Bot className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-slate-100">STRAT_IQ Knowledge Base</h2>
            <p className="text-xs text-slate-400">Ask questions based on your specialized company data.</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <Search className="h-12 w-12 text-cyan-500/50 mb-4" />
              <h3 className="text-lg font-medium text-slate-300">How can I help you today?</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-2">
                Ask about MRR strategies, churn reduction, or specific internal documents.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4 max-w-4xl mx-auto",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full border",
                    msg.role === 'user' 
                      ? "bg-purple-500/20 border-purple-500/30 text-purple-400"
                      : "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
                  )}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  
                  <div className={cn(
                    "flex flex-col gap-2 min-w-0",
                    msg.role === 'user' ? "items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl whitespace-pre-wrap break-words text-sm leading-relaxed",
                      msg.role === 'user'
                        ? "bg-purple-600/20 text-purple-50 border border-purple-500/20 rounded-tr-sm"
                        : "bg-slate-800/40 text-slate-200 border border-slate-700/50 rounded-tl-sm"
                    )}>
                      {msg.content || (
                        <div className="flex items-center gap-1 h-5">
                          <motion.div className="h-1.5 w-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} />
                          <motion.div className="h-1.5 w-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }} />
                          <motion.div className="h-1.5 w-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }} />
                        </div>
                      )}
                    </div>
                    
                    {/* Sources Badge */}
                    {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest self-center mr-1">Sources:</span>
                        {msg.sources.map((src, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-cyan-400">
                            {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/50 border-t border-slate-800/50">
          <div className="max-w-4xl mx-auto flex gap-3 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message STRAT_IQ Advisor..."
              className="flex-1 bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder:text-slate-500 pr-12 rounded-xl focus-visible:ring-cyan-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className={cn(
                "absolute right-1.5 top-1.5 h-7 w-7 rounded-lg transition-all",
                input.trim() && !isLoading 
                  ? "bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/20" 
                  : "bg-slate-700 text-slate-400"
              )}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="text-center mt-2">
             <span className="text-[10px] text-slate-500">AI can make mistakes. Consider verifying important metrics.</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
