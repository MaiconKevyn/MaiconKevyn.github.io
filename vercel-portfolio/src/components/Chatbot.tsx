import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Where does he work?',
  'Tell me about his RAG work',
  'What stack does he use?',
  'How can I contact him?'
];

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function fallbackResponse(userMessage: string) {
  const query = userMessage.toLowerCase();

  if (query.includes('hire') || query.includes('why')) {
    return 'Maicon combines **real AI delivery experience at ADP**, **AI research at PUCRS**, and a strong data foundation from **UFRGS**. His strongest signal is shipping RAG, document extraction, evaluation workflows, and applied ML systems instead of isolated demos.';
  }

  if (query.includes('datasus') || query.includes('txt2sql') || query.includes('healthcare')) {
    return 'The DATASUS project is a **LangGraph-based Portuguese NL2SQL system** over **11M+ SUS health records**. It uses PostgreSQL, validation and retry logic, and a schema covering **15+ tables** to keep healthcare answers inspectable.';
  }

  if (query.includes('work') || query.includes('experience') || query.includes('adp') || query.includes('pucrs')) {
    return 'Maicon currently works as **Data Scientist | AI Engineer at ADP** and is also a **Data Science Researcher in AI at PUCRS**. His work spans RAG, structured extraction, evaluation workflows, and production cloud delivery.';
  }

  if (query.includes('stack') || query.includes('tools') || query.includes('tech')) {
    return 'Core tools include **LangGraph, OpenAI API, Databricks, MLflow, PostgreSQL, pgvector, AWS, Textract, Lambda, Step Functions, SageMaker, OpenSearch, and Streamlit**. The profile is strongest where AI engineering meets deployable cloud systems and analytical backends.';
  }

  if (query.includes('background') || query.includes('who') || query.includes('astro') || query.includes('education')) {
    return 'Maicon is a Brazilian **AI Engineer / GenAI Engineer** with a background in **Astrophysics at UFRGS**, **Data Science**, and AI research at **PUCRS**. That combination shows up in his work through statistical rigor, systems thinking, and practical AI delivery.';
  }

  if (query.includes('doctune') || query.includes('fine-tun') || query.includes('qlora') || query.includes('payroll')) {
    return 'DocTune fine-tunes **Qwen2.5-1.5B with QLoRA** for structured payroll extraction from noisy OCR text. It improves average field accuracy from **63.86% to 93.71%** on 100 held-out synthetic payslips and serves typed JSON through FastAPI.';
  }

  if (query.includes('aws') || query.includes('extractor') || query.includes('document')) {
    return 'The AWS Universal Extractor is a **serverless structured-extraction pipeline** using **Textract, PyMuPDF, docling, S3, Lambda, Step Functions, API Gateway, and DynamoDB**. It is designed to keep parsing, orchestration, validation, and persistence inspectable.';
  }

  if (query.includes('rag') || query.includes('evaluation') || query.includes('pinecone') || query.includes('retrieval')) {
    return 'The RAG Evaluation Lab is a **retrieval experimentation platform** with **OpenAI, Pinecone, YAML-based configs, benchmark generation, and cost-aware evaluation**. It generated **1,054 benchmark QA pairs** and ran **4 real RAG configurations** over the same corpus to compare chunking and retrieval trade-offs.';
  }

  if (query.includes('contact') || query.includes('linkedin') || query.includes('reach') || query.includes('email') || query.includes('cv')) {
    return 'The fastest ways to reach Maicon are **LinkedIn** and **email at osonodenewton@gmail.com**. You can also download his CV directly from the portfolio.';
  }

  return 'I can answer about **Maicon\'s experience at ADP and PUCRS, his AI stack, RAG work, healthcare TXT2SQL, AWS extraction workflows, and contact links**. Try one of the suggestions above.';
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
- Maicon Kevyn is a Brazilian AI Engineer / GenAI Engineer with experience across ADP, PUCRS, and UFRGS.
- Current roles: Data Scientist | AI Engineer at ADP and Data Science Researcher in Artificial Intelligence at PUCRS.
- Core strengths: LLM orchestration, RAG pipelines, evaluation workflows, structured outputs, retrieval systems, AWS delivery, Databricks, and analytical backends.
- Featured projects:
  1. TXT2SQL for DATASUS: LangGraph-based Portuguese NL2SQL over 11M+ SUS health records with a PostgreSQL schema covering 15+ tables.
  2. AWS Universal Extractor: async serverless PDF extraction pipeline using Textract, PyMuPDF, docling, S3, Lambda, Step Functions, API Gateway, and DynamoDB.
  3. DocTune Fine-tuned Extractor: Qwen2.5-1.5B QLoRA fine-tuning for noisy payroll extraction, improving average field accuracy from 63.86% to 93.71% on 100 held-out samples.
  4. RAG Evaluation Lab: OpenAI + Pinecone experimentation platform with YAML configs, benchmark generation, cost tracking, and comparative RAG evaluation across 4 configurations.
- Professional highlights: built RAG for 500+ documents, reached 92% retrieval precision, reduced response time by 60%, implemented MLflow LLM-as-a-Judge.
- Main contact channels: LinkedIn, GitHub, email, and CV download.

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
        "Hi. I'm **Maicon's portfolio assistant**. Ask about his experience, AI stack, RAG work, background, or how to contact him."
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
