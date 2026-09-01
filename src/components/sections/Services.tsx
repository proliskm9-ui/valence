'use client';

import { m } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { openEstimator } from '@/components/ui/CostEstimatorModal';
import { EASE_OUT_EXPO } from '@/lib/site';

export default function Services() {
  const { lang, t } = useLanguage();

  const SERVICES = [
    {
      id: '01',
      tag: 'САЙТЫ «ПОД КЛЮЧ»',
      title: 'Сайты для бизнеса и E-commerce',
      desc: 'Лендинги, корпоративные сайты и интернет-магазины с индивидуальным 3D-дизайном. Проектируем структуру, которая удерживает внимание и ведет посетителя к покупке.',
      chips: ['Продающий UI/UX', 'Адаптивность 100%', 'Next.js 15', 'SEO-база'],
      outcome: 'Высокая конверсия в заявку и премиальный статус',
    },
    {
      id: '02',
      tag: 'ВЕБ-СЕРВИСЫ',
      title: 'Сложные платформы и PWA',
      desc: 'Разработка веб-приложений, SaaS-систем, сервисов онлайн-бронирования и личных кабинетов с надежной базой данных и моментальным откликом.',
      chips: ['Личные кабинеты', 'Базы данных', 'PWA для смартфонов', 'Защита данных'],
      outcome: 'Автоматизация бизнес-процессов и масштабируемость',
    },
    {
      id: '03',
      tag: 'АВТОМАТИЗАЦИЯ',
      title: 'Интеграция CRM, боты и платежи',
      desc: 'Связываем ваш сайт со всеми сервисами: моментальные уведомления о заявках в Telegram и CRM (AmoCRM, Битрикс24), подключение онлайн-эквайринга и касс.',
      chips: ['Telegram-боты', 'AmoCRM / Битрикс', 'Эквайринг и USDT', 'Авто-воронки'],
      outcome: 'Мгновенная доставка лидов без потери клиентов',
    },
    {
      id: '04',
      tag: 'МОДЕРНИЗАЦИЯ',
      title: 'Редизайн и ускорение сайтов',
      desc: 'Полная перезагрузка устаревших или медленных страниц. Переносим проекты с шаблонных конструкторов (Tilda, WordPress) на кастомный чистый код.',
      chips: ['Редизайн под ключ', 'Загрузка < 0.5 сек', 'Устранение багов', 'Гарантия 30 дней'],
      outcome: 'Рост конверсии и снятие технических ограничений',
    },
  ];

  return (
    <section id="services" className="relative px-5 py-20 md:px-10 md:py-32">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full bg-accent/[0.03] blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span>01 // {lang === 'en' ? 'SERVICES' : lang === 'ka' ? 'სერვისები' : 'УСЛУГИ'}</span>
          </div>

          <h2 className="mt-3 font-display text-[clamp(1.75rem,5.5vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-fg">
            <span>Что мы создаем </span>
            <span className="text-accent">для вашего бизнеса</span>
          </h2>

          <p className="mt-3.5 max-w-xl text-[13.5px] leading-relaxed text-muted/85 sm:text-[14.5px]">
            {lang === 'en'
              ? 'We design, code, and deploy custom high-converting web solutions tailored to generate profit.'
              : lang === 'ka'
              ? 'ვქმნით მაღალკონვერსიულ ციფრულ პროდუქტებს, რომლებიც რეალურ მოგებას მოგიტანთ.'
              : 'Проектируем, верстаем и запускаем кастомные цифровые решения, которые решают бизнес-задачи и приносят продажи.'}
          </p>
        </div>

        {/* ── 2x2 Clean Bento Grid ── */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {SERVICES.map((service, i) => (
            <m.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
              onClick={openEstimator}
              data-cursor="hover"
              className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-[#0f0f14] hover:shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(255,77,0,0.06)] sm:p-8"
            >
              <div>
                {/* Header Tag & ID */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold uppercase tracking-[0.2em] text-accent">
                    {service.tag}
                  </span>
                  <span className="text-muted/60">
                    {service.id} / 04
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted/80 sm:text-[14px]">
                  {service.desc}
                </p>

                {/* Tags Chips */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-muted/90 transition-colors group-hover:border-white/20 group-hover:text-fg"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcome Result Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-muted">
                  <span className="text-accent font-bold">Итог:</span>
                  <span className="text-fg/90 font-medium text-[11px]">{service.outcome}</span>
                </div>
                <span className="text-accent font-bold transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
