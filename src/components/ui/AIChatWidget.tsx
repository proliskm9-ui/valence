'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, m } from 'framer-motion';
import {
  Paperclip,
  Smile,
  X,
  ArrowRight,
  Sparkles,
  Clock,
  Coins,
  Code2,
  ShieldCheck,
  Layers,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getAIResponse, KnowledgeResponse } from '@/lib/ai-knowledge';
import { openEstimator } from '@/components/ui/CostEstimatorModal';
import { SITE, getWhatsAppUrl } from '@/lib/site';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  category?: KnowledgeResponse['category'];
  time: string;
  action?: KnowledgeResponse['suggestedAction'];
};

export default function AIChatWidget() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const defaultGreeting =
    lang === 'en'
      ? 'Hello! I am the Valence AI assistant, available 24/7. Ask me anything about website development, pricing, timelines, our tech stack, or calculate an estimate.'
      : 'Здравствуйте! Я AI-ассистент Valence, на связи 24/7. Задайте любой вопрос по разработке сайтов, ценам, срокам или рассчитайте ориентировочную смету.';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: defaultGreeting,
      category: 'general',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: { label: 'Рассчитать стоимость проекта', action: 'open_estimator' },
    },
  ]);

  const quickPrompts = [
    'Сколько стоит разработка?',
    'Какие сроки реализации?',
    'Почему Next.js, а не Tilda?',
    'Что такое Landing Page?',
    'Покажите кейсы',
    'Как строится работа?',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    setHasUnread(false);
  };

  const handleActionClick = (action?: KnowledgeResponse['suggestedAction']) => {
    if (!action) return;
    if (action.action === 'open_estimator') {
      setIsOpen(false);
      openEstimator();
    } else if (action.action === 'open_telegram') {
      window.open(SITE.telegram, '_blank');
    } else if (action.action === 'open_whatsapp') {
      const waUrl = getWhatsAppUrl(lang as 'ru' | 'en' | 'ka');
      window.open(waUrl, '_blank');
    } else if (action.action === 'scroll_cases') {
      setIsOpen(false);
      const el = document.getElementById('work') || document.getElementById('cases');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action.action === 'scroll_contact') {
      setIsOpen(false);
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = getAIResponse(query, lang as 'ru' | 'en' | 'ka');
      const cleanText = resp.text.replace(/\*\*/g, '');

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: cleanText,
        category: resp.category,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: resp.suggestedAction,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  // Helper for Category Micro Badges
  const getCategoryBadge = (category?: KnowledgeResponse['category']) => {
    if (!category || category === 'general') return null;

    switch (category) {
      case 'pricing':
        return (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent uppercase tracking-wider">
            <Coins className="h-3 w-3 stroke-[2.2]" />
            <span>Цены и тарифы</span>
          </div>
        );
      case 'timeline':
        return (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent uppercase tracking-wider">
            <Clock className="h-3 w-3 stroke-[2.2]" />
            <span>Сроки разработки</span>
          </div>
        );
      case 'stack':
        return (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent uppercase tracking-wider">
            <Code2 className="h-3 w-3 stroke-[2.2]" />
            <span>Технологии и стек</span>
          </div>
        );
      case 'cases':
        return (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent uppercase tracking-wider">
            <Layers className="h-3 w-3 stroke-[2.2]" />
            <span>Кейсы и портфолио</span>
          </div>
        );
      case 'guarantee':
        return (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3 stroke-[2.2]" />
            <span>Гарантии и поддержка</span>
          </div>
        );
      case 'process':
        return (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent uppercase tracking-wider">
            <Sparkles className="h-3 w-3 stroke-[2.2]" />
            <span>Процесс работы</span>
          </div>
        );
      case 'media':
        return (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent uppercase tracking-wider">
            <FileText className="h-3 w-3 stroke-[2.2]" />
            <span>Файлы и ТЗ</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Format AI text nicely (clean structured paragraphs & list items)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-1.5" />;
      }

      // Check if bullet item
      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
        const content = trimmed.replace(/^[•-]\s*/, '');
        return (
          <div key={idx} className="my-1 flex items-start gap-2 text-[13px] leading-snug">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-zinc-200">{content}</span>
          </div>
        );
      }

      // Check if numbered item (e.g. "1. Analytics...")
      const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="my-1 flex items-start gap-2 text-[13px] leading-snug">
            <span className="font-mono text-[11px] font-bold text-accent shrink-0 mt-0.5">
              {numMatch[1]}.
            </span>
            <span className="text-zinc-200">{numMatch[2]}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="my-0.5 text-[13.5px] leading-relaxed text-zinc-200">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <aside aria-label="Чат с ассистентом Valence" className="fixed bottom-5 right-5 z-50 pointer-events-auto sm:bottom-6 sm:right-6">
      {/* ── 1. FLAWLESS OBSIDIAN CHAT WINDOW (Zero Scrollbars, Smooth Wheel Scroll) ── */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="mb-4 flex h-[590px] max-h-[85vh] w-[calc(100vw-2.5rem)] max-w-[415px] flex-col overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0c0c11]/98 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,77,0,0.08)] backdrop-blur-2xl sm:w-[415px]"
          >
            {/* Header with Orange-ring Avatar & Online Badge */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#121219]/90 px-4.5 py-3.5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {/* Official Master Logo Avatar with Vibrant Orange Border */}
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-accent shadow-[0_0_14px_rgba(255,77,0,0.4)] bg-[#121217]">
                  <Image
                    src="/valence-avatar-web-studio.png"
                    alt="Valence Logo"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover scale-110"
                  />
                </div>

                <div>
                  <h3 className="text-[14.5px] font-bold text-white tracking-tight leading-tight">
                    Ассистент Valence AI
                  </h3>
                  {/* Clean Social-Network Style Online Status */}
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[11.5px] font-medium lowercase tracking-wide text-emerald-400">
                      online
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400 transition-all hover:bg-white/[0.12] hover:text-white active:scale-95"
                aria-label="Закрыть чат"
              >
                <X className="h-4 w-4 stroke-[2.2]" />
              </button>
            </div>

            {/* Messages Body (PC Wheel Scrollable, Zero Scrollbars) */}
            <div
              ref={chatScrollRef}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => {
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                overscrollBehavior: 'contain',
              }}
              className="chat-scroll-container flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 space-y-3.5"
            >
              {messages.map((mItem) => (
                <m.div
                  key={mItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${
                    mItem.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`relative max-w-[88%] px-4 py-3 text-[13px] leading-relaxed ${
                      mItem.sender === 'user'
                        ? 'rounded-2xl rounded-tr-xs bg-gradient-to-r from-accent to-[#ff6600] text-[#0a0a0b] font-semibold shadow-[0_4px_18px_rgba(255,77,0,0.35)]'
                        : 'rounded-2xl rounded-tl-xs border border-white/[0.08] bg-[#16161f] text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    {/* Optional Category Micro Badge */}
                    {mItem.sender === 'ai' && getCategoryBadge(mItem.category)}

                    {mItem.sender === 'user' ? (
                      <div>{mItem.text}</div>
                    ) : (
                      <div>{renderFormattedText(mItem.text)}</div>
                    )}

                    {/* Interactive Action Button */}
                    {mItem.action && (
                      <div className="mt-3 pt-2.5 border-t border-white/[0.08]">
                        <button
                          type="button"
                          onClick={() => handleActionClick(mItem.action)}
                          className="group inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/15 px-3.5 py-2 text-[11.5px] font-bold text-accent shadow-[0_0_15px_rgba(255,77,0,0.15)] transition-all hover:bg-accent hover:text-[#0a0a0b] active:scale-95"
                        >
                          <span>{mItem.action.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    )}

                    {/* Timestamp inside bottom-right */}
                    <div
                      className={`mt-1.5 text-right text-[10px] font-mono leading-none ${
                        mItem.sender === 'user' ? 'text-[#0a0a0b]/60 font-semibold' : 'text-zinc-500'
                      }`}
                    >
                      {mItem.time}
                    </div>
                  </div>
                </m.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-white/[0.08] bg-[#16161f] px-4 py-3 w-fit">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:0.18s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:0.36s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips (Zero Scrollbar with Edge Fade) */}
            <div className="border-t border-white/[0.06] bg-[#101016]/90 py-2 px-3">
              <div
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                className="chips-scroll-container chips-fade-mask flex gap-1.5 overflow-x-auto px-1 py-0.5"
              >
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 rounded-full border border-white/[0.08] bg-[#161622] px-3.5 py-1.5 text-[11.5px] text-zinc-300 transition-all hover:border-accent/40 hover:bg-accent/15 hover:text-white active:scale-95 whitespace-nowrap shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Telegram Desktop Style Input Bar ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-white/[0.08] bg-[#0f0f15] p-2.5"
            >
              {/* Paperclip Button (Left) */}
              <button
                type="button"
                onClick={() => handleSend('Хочу прикрепить ТЗ, макет или ссылку')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-white/[0.08] hover:text-white active:scale-95"
                title="Прикрепить файл или ТЗ"
                aria-label="Прикрепить файл"
              >
                <Paperclip className="h-5 w-5 stroke-[2]" />
              </button>

              {/* Capsule Input (Center) */}
              <div className="flex flex-1 items-center gap-2 rounded-full border border-white/[0.08] bg-[#181822] px-4 py-2 focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/15 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Сообщение..."
                  className="flex-1 bg-transparent text-[13.5px] text-white placeholder:text-zinc-500 focus:outline-none"
                />

                {/* Smile / Emoji Icon */}
                <button
                  type="button"
                  onClick={() => setInput((prev) => prev + ' 👍')}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
                  aria-label="Эмодзи"
                >
                  <Smile className="h-4.5 w-4.5 stroke-[2]" />
                </button>
              </div>

              {/* Telegram-Style Send Button (Right) */}
              <button
                type="submit"
                disabled={!input.trim()}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-[#08080a] shadow-[0_2px_14px_rgba(255,77,0,0.5)] transition-all ${
                  input.trim()
                    ? 'hover:scale-105 active:scale-90 cursor-pointer opacity-100'
                    : 'opacity-40 cursor-not-allowed'
                }`}
                aria-label="Отправить"
              >
                {/* Crisp Telegram Paper Plane Vector */}
                <svg className="h-4.5 w-4.5 fill-[#08080a] translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      {/* ── 2. FLOATING LAUNCHER BUTTON ── */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleOpen}
          data-cursor="hover"
          aria-label={isOpen ? 'Закрыть чат' : 'Открыть AI чат'}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-[#0a0a0b] shadow-[0_8px_30px_rgba(255,77,0,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {/* Subtle pulse radar ring */}
          <span className="absolute inset-0 rounded-full bg-accent opacity-30 animate-ping" />

          {/* Unread badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0a0a0b] font-mono text-[9px] font-black text-accent ring-2 ring-accent shadow-[0_0_10px_rgba(255,77,0,0.9)]">
              1
            </span>
          )}

          {isOpen ? (
            <X className="relative z-10 h-6 w-6 stroke-[2.5]" />
          ) : (
            <MessageSquare className="relative z-10 h-6 w-6 stroke-[2.4] fill-transparent transition-transform group-hover:scale-105" />
          )}
        </button>
      </div>
    </aside>
  );
}
