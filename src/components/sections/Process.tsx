'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Process() {
  const { lang } = useLanguage();
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const STAGES = [
    {
      id: '01',
      title: lang === 'en' ? 'Deep Discovery First' : lang === 'ka' ? 'ანალიზით დაწყება' : 'Начинаем с разбора',
      desc:
        lang === 'en'
          ? 'Before estimating, we dive deep into your business metrics, competitors, and conversion funnel. We build clear wireframes and offer only solutions that truly pay off.'
          : lang === 'ka'
          ? 'ფასის დადგენამდე ვსწავლობთ ბიზნეს-პროცესებს, კონკურენტებს და მომხმარებლის გზას. ვთავაზობთ მხოლოდ იმას, რაც რეალურ შედეგს მოიტანს.'
          : 'Перед оценкой погружаемся в ваши бизнес-процессы, конкурентов и воронку продаж. Формируем ТЗ и предлагаем только те решения, которые реально окупятся.',
      icon: (
        <svg width="130" height="105" viewBox="0 0 130 105" fill="none" className="overflow-visible">
          {/* Schematic Signal Nodes & Data Busses */}
          <path d="M18 25H42M18 52.5H42M18 80H42" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 25C54 25 58 52.5 70 52.5" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" fill="none" />
          <path d="M42 80C54 80 58 52.5 70 52.5" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" fill="none" />
          
          <circle cx="18" cy="25" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" fill="#0d0d10" />
          <circle cx="18" cy="52.5" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" fill="#0d0d10" />
          <circle cx="18" cy="80" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" fill="#0d0d10" />

          {/* Glowing Lens Scope / Target */}
          <g className="filter drop-shadow-[0_0_16px_rgba(255,77,0,0.65)]">
            <circle cx="80" cy="52.5" r="26" stroke="#ff4d00" strokeWidth="3" fill="#140d0a" fillOpacity="0.4" />
            <path d="M98 72L116 90" stroke="#ff4d00" strokeWidth="4" strokeLinecap="round" />
            <path d="M80 34V71M62 52.5H98" stroke="rgba(255,77,0,0.4)" strokeWidth="2" />
            <circle cx="80" cy="52.5" r="4.5" fill="#ff4d00" />
          </g>
        </svg>
      ),
    },
    {
      id: '02',
      title: lang === 'en' ? 'UI/UX & Motion Design' : lang === 'ka' ? 'UI/UX დიზაინი' : 'UI/UX Дизайн',
      desc:
        lang === 'en'
          ? 'We create a unique visual concept and kinetic design system that elevates your brand. Every screen is optimized for mobile conversion and fluid 60fps animations.'
          : lang === 'ka'
          ? 'ვქმნით უნიკალურ ვიზუალურ კონცეფციას, 60fps ანიმაციებს და სრულყოფილ მობილურ ადაპტაციას.'
          : 'Создаём индивидуальную дизайн-систему и интерактивные прототипы. Прорабатываем каждую деталь интерфейса и плавную кинематику на смартфонах.',
      icon: (
        <svg width="130" height="105" viewBox="0 0 130 105" fill="none" className="overflow-visible">
          {/* Base UI Browser Wireframe Frame */}
          <rect x="15" y="16" width="100" height="74" rx="8" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="#0d0d10" />
          
          {/* Window Header Dots */}
          <path d="M15 32H115" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <circle cx="27" cy="24" r="2.5" fill="rgba(255,255,255,0.4)" />
          <circle cx="35" cy="24" r="2.5" fill="rgba(255,255,255,0.4)" />
          <circle cx="43" cy="24" r="2.5" fill="rgba(255,255,255,0.4)" />

          {/* Wireframe UI Grid Skeleton Lines */}
          <rect x="25" y="42" width="34" height="38" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M68 44H103M68 52H95M68 60H88" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />

          {/* Glowing Active UI Component & Figma Pen Cursor in Accent Orange */}
          <g className="filter drop-shadow-[0_0_14px_rgba(255,77,0,0.65)]">
            {/* Active Pill / Button in Orange */}
            <rect x="68" y="68" width="36" height="12" rx="6" fill="#ff4d00" />
            <path d="M82 74H92" stroke="#0d0d10" strokeWidth="2" strokeLinecap="round" />

            {/* Precision Vector Cursor Arrow */}
            <path
              d="M50 56L62 68L56 70L59 78L55 79L52 71L46 75L50 56Z"
              fill="#fff"
              stroke="#ff4d00"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      id: '03',
      title: lang === 'en' ? 'Development & Integrations' : lang === 'ka' ? 'დეველოპმენტი' : 'Разработка и интеграции',
      desc:
        lang === 'en'
          ? 'Fast, high-load code built on Next.js without template builders. Instant lead notifications in Telegram, CRM integration (AmoCRM/Bitrix24), and secure payment processing.'
          : lang === 'ka'
          ? 'Next.js სუფთა კოდი შაბლონების გარეშე. შეკვეთების მიღება Telegram-ში, CRM და ონლაინ გადახდები.'
          : 'Пишем быстрый код на Next.js без конструкторов. Подключаем заявки в Telegram, настраиваем CRM (AmoCRM/Битрикс24), онлайн-оплату и базы данных.',
      icon: (
        <svg width="130" height="105" viewBox="0 0 130 105" fill="none" className="overflow-visible">
          {/* Code Engine & Pipeline Nodes */}
          <rect x="20" y="20" width="90" height="65" rx="8" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" fill="#0d0d10" />
          <path d="M20 36H110" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle cx="34" cy="28" r="3" fill="rgba(255,255,255,0.45)" />
          <circle cx="44" cy="28" r="3" fill="rgba(255,255,255,0.45)" />
          
          {/* Glowing Code Brackets */}
          <g className="filter drop-shadow-[0_0_16px_rgba(255,77,0,0.7)]">
            <path d="M48 48L38 58L48 68" stroke="#ff4d00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M82 48L92 58L82 68" stroke="#ff4d00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M70 46L60 70" stroke="#ff4d00" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      ),
    },
    {
      id: '04',
      title: lang === 'en' ? 'Testing & Launch' : lang === 'ka' ? 'გაშვება და გარანტია' : 'Запуск и гарантия',
      desc:
        lang === 'en'
          ? 'Multi-device QA testing, SEO foundation, and zero-downtime production deployment. We include 30 days of complimentary technical warranty and post-launch support.'
          : lang === 'ka'
          ? 'ტესტირება ყველა ეკრანზე, SEO ოპტიმიზაცია და გაშვება. მოყვება 30 დღიანი უფასო ტექნიკური გარანტია.'
          : 'Тестируем сайт на всех типах устройств, настраиваем аналитику и передаем проект. Включаем 30 дней бесплатной технической гарантии и доработок.',
      icon: (
        <svg width="130" height="105" viewBox="0 0 130 105" fill="none" className="overflow-visible">
          {/* Precision Launch Orbit Ring */}
          <ellipse cx="65" cy="72" rx="42" ry="16" stroke="rgba(255,255,255,0.3)" strokeWidth="2.2" strokeDasharray="4 4" />
          
          {/* Glowing Ascending Kinetic Flash */}
          <g className="filter drop-shadow-[0_0_18px_rgba(255,77,0,0.75)]">
            <circle cx="65" cy="44" r="26" stroke="#ff4d00" strokeWidth="3" fill="#140d0a" fillOpacity="0.5" />
            <path
              d="M67 24L52 44H64L60 64L78 40H64L67 24Z"
              fill="#ff4d00"
              stroke="#ff4d00"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
          <circle cx="23" cy="72" r="3.5" fill="#ff4d00" />
          <circle cx="107" cy="72" r="3.5" fill="#ff4d00" />
        </svg>
      ),
    },
  ];

  return (
    <section id="process" className="relative px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-xl">
        {/* ── Minimalist Section Header ── */}
        <div className="flex flex-col items-start text-left">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            03 // {lang === 'en' ? 'PROCESS' : lang === 'ka' ? 'პროცესი' : 'ПРОЦЕСС'}
          </span>

          <h2 className="mt-3 font-display text-[clamp(1.75rem,5.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-fg">
            <span>{lang === 'en' ? 'How we build ' : lang === 'ka' ? 'როგორ ვქმნით ' : 'Как мы ведём '}</span>
            <span className="text-accent">
              {lang === 'en' ? 'your project' : lang === 'ka' ? 'თქვენს პროექტს' : 'ваш проект'}
            </span>
          </h2>

          <p className="mt-4 text-[13.5px] leading-relaxed text-muted/80 sm:text-[14.5px]">
            {lang === 'en'
              ? 'Transparent milestones, locked deadlines, and constant communication. You always know exactly what is happening at every stage.'
              : lang === 'ka'
              ? 'გამჭვირვალე ეტაპები, დაცული ვადები და მუდმივი კავშირი. თქვენ ყოველთვის იცით რა ეტაპზეა პროექტი.'
              : 'Прозрачные этапы, прогнозируемые сроки и постоянная связь. Вы всегда знаете, на каком этапе находится разработка.'}
          </p>
        </div>

        {/* ── Strict Qvelo-Style Accordion List ── */}
        <div className="mt-10 flex flex-col gap-3.5 sm:mt-12 sm:gap-4">
          {STAGES.map((stage, idx) => {
            const isOpen = activeIdx === idx;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveIdx(idx)}
                data-cursor="hover"
                className={`cursor-pointer overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-white/15 bg-[#0d0d10]'
                    : 'border-white/10 bg-[#0c0c0e] hover:border-white/20'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between px-5 py-5 sm:px-7 sm:py-5.5">
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Orange Number */}
                    <span className="font-display text-2xl font-black tracking-tight text-accent sm:text-3xl">
                      {stage.id}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
                      {stage.title}
                    </h3>
                  </div>

                  {/* Plus Icon (Only visible on closed cards) */}
                  {!isOpen && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-transparent text-muted sm:h-9 sm:w-9">
                      <span className="font-mono text-base font-bold leading-none">+</span>
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-7 pt-0 sm:px-7 sm:pb-8">
                        {/* Thin Divider Line */}
                        <div className="mb-6 h-px w-full bg-white/10" />

                        {/* Left-Aligned Schematic Graphic (Exact Qvelo alignment) */}
                        <div className="my-4 flex justify-start pl-1 sm:pl-2">
                          {stage.icon}
                        </div>

                        {/* Left-Aligned Readable Description */}
                        <p className="mt-5 max-w-lg text-left text-[13.5px] leading-relaxed text-muted/90 sm:text-[14.5px]">
                          {stage.desc}
                        </p>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
