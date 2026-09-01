'use client';

import { m } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function PaymentMethods() {
  const { lang } = useLanguage();

  const METHODS = [
    {
      name: 'Mastercard',
      logo: (
        <svg width="42" height="26" viewBox="0 0 44 28" fill="none">
          <circle cx="15" cy="14" r="12" fill="#EB001B" />
          <circle cx="29" cy="14" r="12" fill="#F79E1B" fillOpacity="0.9" />
          <path
            d="M22 4.8C24.8 7.2 26.5 10.4 26.5 14C26.5 17.6 24.8 20.8 22 23.2C19.2 20.8 17.5 17.6 17.5 14C17.5 10.4 19.2 7.2 22 4.8Z"
            fill="#FF5F00"
          />
        </svg>
      ),
    },
    {
      name: 'VISA',
      logo: (
        <svg width="46" height="18" viewBox="0 0 48 20" fill="none">
          <path
            d="M18.8 1.5L12.3 17.8H8.1L5 4.3C4.8 3.5 4.6 3.2 4 2.8C2.9 2.2 1.4 1.7 0 1.4L0.1 1L7.2 1C8.1 1 8.9 1.6 9.1 2.6L10.8 12.2L14.7 1.5H18.8ZM35.4 12.1C35.4 7.5 29 7.2 29.1 5.2C29.1 4.5 29.7 3.8 31.1 3.7C31.8 3.6 33.7 3.5 35.5 4.4L36.2 1.2C35.2 0.8 33.9 0.5 32.3 0.5C28.3 0.5 25.5 2.7 25.4 5.8C25.4 8.1 27.4 9.4 29 10.2C30.6 11 31.2 11.6 31.2 12.3C31.2 13.5 29.8 14 28.5 14C26.5 14 25.3 13.4 24.3 12.9L23.6 16.2C24.7 16.7 26.7 17.1 28.7 17.1C32.9 17.1 35.4 15 35.4 12.1ZM45.9 17.8H49.5L46.4 1.5H43C42.1 1.5 41.4 2 41 2.9L35 17.8H39.2L40.1 15.4H45.2L45.9 17.8ZM41.2 12.4L43.3 6.6L44.5 12.4H41.2ZM24.5 1.5L21.2 17.8H17.2L20.5 1.5H24.5Z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      name: 'СБП',
      logo: (
        <svg width="38" height="22" viewBox="0 0 38 24" fill="none">
          <path d="M12 12L7 4L2 12H12Z" fill="#F48020" />
          <path d="M12 12L2 12L7 20H12Z" fill="#5D2D91" />
          <path d="M12 12L20 7L20 17L12 12Z" fill="#00A859" />
          <text x="23" y="16" fill="#fff" fontFamily="monospace" fontSize="9" fontWeight="bold">
            СБП
          </text>
        </svg>
      ),
    },
    {
      name: 'МИР',
      logo: (
        <svg width="44" height="16" viewBox="0 0 46 18" fill="none">
          <path d="M0 2H4.5L7.5 10L10.5 2H15V16H11V7.5L8 15.5H7L4 7.5V16H0V2Z" fill="#00A859" />
          <path d="M18 2H22.5V16H18V2Z" fill="#00A859" />
          <path d="M26 2H35C38.5 2 41 4.5 41 8C41 11.5 38.5 14 35 14H30.5V16H26V2ZM30.5 10.5H34.5C36 10.5 37 9.5 37 8C37 6.5 36 5.5 34.5 5.5H30.5V10.5Z" fill="#0096E6" />
        </svg>
      ),
    },
    {
      name: 'USDT',
      logo: (
        <svg width="46" height="22" viewBox="0 0 46 22" fill="none">
          <circle cx="11" cy="11" r="9" fill="#26A17B" />
          <path
            d="M12.2 7.5V6H9.8V7.5C7.8 7.7 6.5 8.3 6.5 9C6.5 9.8 7.8 10.3 9.8 10.5V13.2C9.8 13.5 10.2 13.8 11 13.8C11.8 13.8 12.2 13.5 12.2 13.2V10.5C14.2 10.3 15.5 9.8 15.5 9C15.5 8.3 14.2 7.7 12.2 7.5ZM11 9.7C9.5 9.7 8.2 9.4 8.2 9C8.2 8.6 9.5 8.3 11 8.3C12.5 8.3 13.8 8.6 13.8 9C13.8 9.4 12.5 9.7 11 9.7Z"
            fill="#fff"
          />
          <text x="24" y="14" fill="#26A17B" fontFamily="monospace" fontSize="9" fontWeight="bold">
            USDT
          </text>
        </svg>
      ),
    },
    {
      name: 'TBC / BOG',
      logo: (
        <svg width="50" height="22" viewBox="0 0 50 22" fill="none">
          <rect x="1" y="2" width="48" height="18" rx="4" stroke="#ff4d00" strokeWidth="1.2" fill="#ff4d00" fillOpacity="0.1" />
          <text x="6" y="14" fill="#ff4d00" fontFamily="sans-serif" fontSize="8" fontWeight="bold">
            🇬🇪 TBC / BOG
          </text>
        </svg>
      ),
    },
    {
      name: 'Яндекс Pay',
      logo: (
        <svg width="46" height="20" viewBox="0 0 48 22" fill="none">
          <rect x="2" y="2" width="42" height="16" rx="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="5" fill="#FC3F1D" />
          <text x="8" y="13" fill="#fff" fontFamily="sans-serif" fontSize="8" fontWeight="bold">
            Я
          </text>
          <text x="18" y="13" fill="#fff" fontFamily="sans-serif" fontSize="8" fontWeight="bold">
            Pay
          </text>
        </svg>
      ),
    },
    {
      name: 'Счёт',
      logo: (
        <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
          <circle cx="9" cy="11" r="7" fill="#10B981" />
          <path d="M7 11L8.5 12.5L11.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="19" y="14" fill="#fff" fontFamily="monospace" fontSize="8" fontWeight="bold">
            СЧЁТ
          </text>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative border-b border-white/8 bg-[#060608] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* ── Seamless Header ── */}
        <div className="flex flex-col items-start text-left sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{lang === 'en' ? 'PAYMENTS // GLOBAL' : lang === 'ka' ? 'გადახდები // საერთაშორისო' : 'МЕЖДУНАРОДНЫЕ РАСЧЁТЫ // СНГ • ГРУЗИЯ • ЕВРОПА'}</span>
            </div>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
              {lang === 'en'
                ? 'Accepting payments by any convenient method'
                : lang === 'ka'
                ? 'ვიღებთ გადახდას ნებისმიერი მოსახერხებელი გზით'
                : 'Принимаем оплату любым удобным способом'}
            </h2>
          </div>

          <p className="max-w-xs text-xs leading-relaxed text-muted sm:text-right">
            {lang === 'en'
              ? 'Direct settlements in any currency ($, €, ₾, ₽) and crypto without bureaucracy.'
              : lang === 'ka'
              ? 'ანგარიშსწორება ნებისმიერ ვალუტასა და კრიპტოში.'
              : 'Прямые расчеты в любой валюте ($, €, ₾, ₽) и криптовалюте без лишней волокиты.'}
          </p>
        </div>

        {/* ── Seamless Grid of Clean Logos ── */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
          {METHODS.map((mItem, i) => (
            <m.div
              key={mItem.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="flex h-16 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] p-2 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.05]"
            >
              {mItem.logo}
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
