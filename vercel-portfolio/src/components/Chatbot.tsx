import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Why hire Maicon?',
  'Tell me about TXT2SQL for DATASUS',
  'What stack does he use?',
  'What is his background?'
];

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function fallbackResponse(userMessage: string) {
  const query = userMessage.toLowerCase();

  if (query.includes('hire') || query.includes('why')) {
    return 'Maicon combines **LLM orchestration, retrieval, APIs, and data workflows** in one profile. His strongest signal is shipping systems like healthcare TXT2SQL, AWS extraction pipelines, and evaluation-first research agents instead of isolated demos.';
  }

  if (query.includes('datasus') || query.includes('txt2sql') || query.includes('healthcare')) {
    return 'The DATASUS project is a **Portuguese NL2SQL agent** over roughly **37M Brazilian hospital records**. It uses LangGraph, validation, and repair loops, and reports **96.3% execution accuracy** in controlled evaluation.';
  }

  if (query.includes('stack') || query.includes('tools') || query.includes('tech')) {
    return 'Core tools include **LangGraph, OpenAI API, DuckDB, FastAPI, PostgreSQL, pgvector, AWS, Step Functions, and Streamlit**. The profile is strongest where AI engineering meets analytical backends and deployable product surfaces.';
  }

  if (query.includes('background') || query.includes('who') || query.includes('astro')) {
    return 'Maicon is a Brazilian data professional with a background in **Data Science and Astrophysics at UFRGS**. His work focuses on **AI Engineer / Data Scientist** roles with evaluation-minded systems, retrieval, and healthcare analytics.';
  }

  if (query.includes('aws') || query.includes('extractor') || query.includes('document')) {
    return 'The AWS Universal Extractor is a **serverless structured-extraction pipeline** using **S3, Lambda, Step Functions, and structured outputs**. It is designed to keep each stage inspectable rather than hiding the workflow behind one opaque prompt.';
  }

  if (query.includes('research') || query.includes('agentic')) {
    return 'The research agent combines **FastAPI, React, LangGraph, PostgreSQL, and pgvector** with explicit schemas for classification, planning, synthesis, and evaluation. The focus is grounded answers and observable behavior.';
  }

  if (query.includes('contact') || query.includes('linkedin') || query.includes('reach')) {
    return 'The best ways to reach Maicon today are **LinkedIn** and **GitHub**. The portfolio contact section also links to **Kaggle** and **LeetCode**.';
  }

  return 'I can answer about **Maicon\'s background, AI stack, DATASUS TXT2SQL, AWS extraction workflows, research-agent architecture, and contact links**. Try one of the suggestions above.';
}

async function generateResponse(userMessage: string) {
  if (!GEMINI_API_KEY) {
    return fallbackResponse(userMessage);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant for Maicon Kevyn's portfolio.

Facts you may use:
- Maicon Kevyn is a Brazilian AI Engineer / Data Scientist with a background in Data Science and Astrophysics at UFRGS.
- Core strengths: LLM orchestration, RAG pipelines, structured outputs, retrieval systems, API delivery, analytical backends.
- Featured projects:
  1. TXT2SQL for DATASUS: Portuguese NL2SQL over roughly 37M hospital records, LangGraph-based, 96.3% execution accuracy reported in controlled evaluation.
  2. AWS Universal Extractor: async serverless PDF extraction pipeline with S3, Lambda, Step Functions, YAML extraction profiles, and structured outputs.
  3. Research Agent with Continuous Evaluation: FastAPI + React + LangGraph + PostgreSQL + pgvector with schemas, retrieval, and execution traces.
  4. Amazon Feedback Analysis: GPT-4o sentiment, DeBERTa zero-shot topic detection, Streamlit dashboard.
- Main contact channels: LinkedIn, GitHub, Kaggle, LeetCode.

Instructions:
- Be concise, warm, and factual.
- Do not invent employers, awards, or achievements not listed above.
- Keep answers under 3 sentences unless the user asks for detail.

User question: ${userMessage}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || fallbackResponse(userMessage);
  } catch {
    return fallbackResponse(userMessage);
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi. I'm **Maicon's portfolio assistant**. Ask about his AI projects, stack, background, or where to contact him."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    const reply = await generateResponse(text);
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 h-[550px] max-h-[85vh] rounded-2xl flex flex-col overflow-hidden z-50 shadow-2xl"
            style={{
              background: '#0e1117',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            <div className="p-4 flex justify-between items-center" style={{ background: '#16161e' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #7e22ce 100%)' }}
                >
                  MK
                </div>
                <div>
                  <h3 className="font-bold text-white text-md">Maicon&apos;s AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: '#0e1117' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={`${msg.role}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`rounded-2xl p-4 text-[15px] leading-relaxed max-w-[85%] ${
                      msg.role === 'user' ? 'bg-cyan-500 text-black font-medium' : 'text-gray-200'
                    }`}
                    style={msg.role === 'assistant' ? { background: '#1e1e24' } : {}}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="bg-slate-800 border border-white/5 rounded-2xl p-4 flex gap-1 items-center" style={{ background: '#1e1e24' }}>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 pt-2" style={{ background: '#0e1117' }}>
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4 justify-start">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="px-4 py-2 text-sm rounded-xl border border-white/10 transition-colors text-cyan-400 hover:bg-white/5 whitespace-nowrap"
                      style={{ background: '#16161e' }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about Maicon's work..."
                  className="flex-1 rounded-2xl px-5 py-3.5 text-[15px] text-white focus:outline-none placeholder:text-gray-500"
                  style={{ background: '#16161e', border: '1px solid rgba(255,255,255,0.05)' }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed absolute right-1.5 top-1.5 bottom-1.5"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white text-black font-bold px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-2"
          >
            Hi! Ask Me!
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
          </motion.div>
        )}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #7e22ce 100%)',
            boxShadow: '0 0 0 8px rgba(6, 182, 212, 0.2)'
          }}
        >
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <MessageSquare size={30} className="text-white" />
          )}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-cyan-900" />
          )}
        </motion.button>
      </div>
    </>
  );
}
