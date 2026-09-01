export type KnowledgeResponse = {
  text: string;
  category?: 'pricing' | 'timeline' | 'stack' | 'about' | 'process' | 'cases' | 'guarantee' | 'general' | 'media';
  suggestedAction?: {
    label: string;
    action: 'open_estimator' | 'open_telegram' | 'open_whatsapp' | 'scroll_cases' | 'scroll_contact';
  };
};

export function getAIResponse(query: string, lang: 'ru' | 'en' | 'ka' = 'ru'): KnowledgeResponse {
  const raw = query.toLowerCase().trim();
  const q = raw.replace(/[?!.,;:()_#@/\\-]/g, ' ').replace(/\s+/g, ' ');

  // 1. МЕДИАФАЙЛЫ, ССЫЛКИ, ВЛОЖЕНИЯ, ТЗ (ATTACHMENTS & LINKS)
  if (
    q.includes('прикрепить') ||
    q.includes('приложить') ||
    q.includes('файл') ||
    q.includes('медиа') ||
    q.includes('фото') ||
    q.includes('картинк') ||
    q.includes('ссылк') ||
    q.includes('документ') ||
    q.includes('макет') ||
    q.includes('скрин') ||
    q.includes('скриншот') ||
    q.includes('pdf') ||
    q.includes('figma com') ||
    q.includes('http') ||
    q.includes('www') ||
    q.includes('media') ||
    q.includes('file') ||
    q.includes('attachment') ||
    q.includes('link')
  ) {
    if (lang === 'ka') {
      return {
        category: 'media',
        text: 'მე ჯერ არ შემიძლია ფაილების ან ბმულების პირდაპირ ნახვა ამ ჩატში.\n\nგთხოვთ, გამოგვიგზავნოთ თქვენი ტექნიკური დავალება, ფაილები ან ბმულები პირდაპირ ჩვენს სპეციალისტთან:\n• WhatsApp: +995 598 902 876\n• Telegram: @valencedigital\n\nჩვენ განვიხილავთ მასალებს და გიპასუხებთ 10-15 წუთში!',
        suggestedAction: { label: 'WhatsApp-ში გაგზავნა', action: 'open_whatsapp' },
      };
    }
    if (lang === 'en') {
      return {
        category: 'media',
        text: 'I cannot directly view media files or external links in this chat widget yet.\n\nPlease send your specifications, design mockups, or files directly to our lead developer:\n• WhatsApp: +7 (995) 317-35-44\n• Telegram: @valencedigital\n\nWe will review your materials and get back to you within 10–15 minutes!',
        suggestedAction: { label: 'Send via WhatsApp', action: 'open_whatsapp' },
      };
    }
    return {
      category: 'media',
      text: 'Я пока не могу напрямую просматривать медиафайлы или внешние ссылки в этом чате.\n\nПожалуйста, отправьте ваше ТЗ, макеты или файлы напрямую нашему ведущему специалисту:\n• WhatsApp: +7 (995) 317-35-44\n• Telegram: @valencedigital\n\nМы изучим материалы и ответим вам в течение 10–15 минут!',
      suggestedAction: { label: 'Отправить в WhatsApp', action: 'open_whatsapp' },
    };
  }

  // 2. ПРОВЕРКА СВЯЗИ / ПРИВЕТСТВИЯ / ЛИЧНОСТЬ
  if (
    /^(ау|эй|ты тут|ты здесь|живой|алло|слушай|прием|ответь|ты где)(\s|$)/i.test(q) ||
    q === 'ау' ||
    q === 'ты тут' ||
    q === 'ты здесь'
  ) {
    if (lang === 'en') {
      return {
        category: 'general',
        text: 'Yes, I am online and ready to help. Ask me anything about website development, turnaround times, our tech stack, or get an instant project estimate.',
        suggestedAction: { label: 'Calculate Project Cost', action: 'open_estimator' },
      };
    }
    return {
      category: 'general',
      text: 'Да, я на связи и готов помочь. Спросите меня о стоимости сайта, сроках разработки, нашем стеке Next.js, кейсах или получите быстрый расчет сметы.',
      suggestedAction: { label: 'Рассчитать стоимость проекта', action: 'open_estimator' },
    };
  }

  if (
    q.includes('ты бот') ||
    q.includes('ты робот') ||
    q.includes('ты человек') ||
    q.includes('ты живой') ||
    q.includes('ты ии') ||
    q.includes('ты ai') ||
    q.includes('кто ты') ||
    q.includes('are you a bot') ||
    q.includes('are you human')
  ) {
    if (lang === 'en') {
      return {
        category: 'about',
        text: 'I am the AI assistant for Valence Agency.\n\nI am available 24/7 and know all details about our development processes, tech stack (Next.js/React), pricing tiers, and cases. I can calculate an estimate or connect you directly with our lead developers in Telegram.',
        suggestedAction: { label: 'Message Lead Dev in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'about',
      text: 'Я — AI-ассистент агентства Valence.\n\nЯ на связи 24/7 и знаю всё о наших процессах разработки, стеке Next.js/React, ценах и реализованных кейсах. Могу быстро рассчитать смету или перевести вас на ведущего разработчика в Telegram.',
      suggestedAction: { label: 'Написать разработчику в Telegram', action: 'open_telegram' },
    };
  }

  if (
    q.includes('привет') ||
    q.includes('здравствуй') ||
    q.includes('добрый день') ||
    q.includes('добрый вечер') ||
    q.includes('доброе утро') ||
    q.includes('салам') ||
    q.includes('салют') ||
    q.includes('гамарджоба') ||
    q.includes('hello') ||
    q.includes('gamarjoba') ||
    /^(хай|ку|йоу|hi|hey)\b/i.test(q)
  ) {
    if (lang === 'en') {
      return {
        category: 'general',
        text: 'Hello! I am the Valence AI assistant, online 24/7. How can I help you today?\n\nI can calculate your project cost, explain our turnaround times, show recent cases (Mesti Delivery, Retro ZAZ), or share why Next.js is superior to website builders.',
        suggestedAction: { label: 'Calculate Project Cost', action: 'open_estimator' },
      };
    }
    return {
      category: 'general',
      text: 'Здравствуйте! Я AI-ассистент агентства Valence, на связи 24/7.\n\nЧем могу помочь? Могу рассчитать смету проекта, сориентировать по срокам, показать наши кейсы (Mesti Delivery, Retro ZAZ) или объяснить, почему чистый код Next.js эффективнее конструкторов.',
      suggestedAction: { label: 'Рассчитать стоимость проекта', action: 'open_estimator' },
    };
  }

  if (
    q.includes('спасибо') ||
    q.includes('благодар') ||
    q.includes('отлично') ||
    q.includes('супер') ||
    q.includes('понял') ||
    q.includes('круто') ||
    q.includes('кайф') ||
    q.includes('thank')
  ) {
    if (lang === 'en') {
      return {
        category: 'general',
        text: 'Always happy to help! If you want to discuss your project in detail or lock in an estimate, drop us a message in Telegram.',
        suggestedAction: { label: 'Message Us in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'general',
      text: 'Всегда рад помочь! Если хотите детально обсудить ваш проект или зафиксировать индивидуальные условия — напишите нам в Telegram или запустите расчет сметы.',
      suggestedAction: { label: 'Написать нам в Telegram', action: 'open_telegram' },
    };
  }

  // 3. СРОКИ И ДЛИТЕЛЬНОСТЬ РАЗРАБОТКИ
  const isTimelineQuery =
    q.includes('срок') ||
    q.includes('делать') ||
    q.includes('сделает') ||
    q.includes('дней') ||
    q.includes('недел') ||
    q.includes('быстр') ||
    q.includes('времени') ||
    q.includes('время') ||
    q.includes('займет') ||
    q.includes('ждать') ||
    q.includes('дедлайн') ||
    q.includes('срочно') ||
    q.includes('когда готов') ||
    q.includes('how long') ||
    q.includes('timeline') ||
    q.includes('turnaround') ||
    q.includes('how fast') ||
    q.includes('days') ||
    q.includes('deadline');

  if (
    isTimelineQuery &&
    (q.includes('скольк') ||
      q.includes('за скольк') ||
      q.includes('как долг') ||
      q.includes('как быстр') ||
      q.includes('срок') ||
      q.includes('дней') ||
      q.includes('недел') ||
      q.includes('дедлайн') ||
      q.includes('время') ||
      q.includes('времени'))
  ) {
    if (lang === 'en') {
      return {
        category: 'timeline',
        text: 'Project Turnaround & Timelines:\n\n• High-converting Landing Page: 5–10 days\n• Corporate Multi-page Website: 10–18 days\n• E-commerce & Web Service / PWA: 15–25 days\n• Express MVP Launch: from 5–7 days\n\nHow the process is structured:\n1. Analytics & Prototype (2–3 days)\n2. UI/UX Design in Figma (3–5 days)\n3. Clean Next.js Development (5–10 days)\n4. QA Testing & Launch (2–3 days)\n\nWe provide interactive demos every 2–3 days so you track live progress.',
        suggestedAction: { label: 'Discuss Deadlines in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'timeline',
      text: 'Реальные сроки разработки в Valence:\n\n• Продающий Landing Page: 5–10 рабочих дней\n• Корпоративный многостраничный сайт: 10–18 дней\n• E-commerce / Веб-сервис / PWA: 15–25 дней\n• Срочный запуск MVP: от 5–7 дней\n\nЭтапы работы:\n1. Аналитика и прототип (2–3 дня)\n2. Авторский дизайн в Figma (3–5 дней)\n3. Разработка на Next.js + интеграции (5–10 дней)\n4. Тестирование и запуск (2–3 дня)\n\nКаждые 2–3 дня мы показываем рабочий прогресс на демо-сервере.',
      suggestedAction: { label: 'Обсудить дедлайн в Telegram', action: 'open_telegram' },
    };
  }

  // 4. ЧТО ТАКОЕ САЙТ
  if (
    q.includes('что такое сайт') ||
    q.includes('зачем сайт') ||
    q.includes('для чего сайт') ||
    q.includes('зачем нужен сайт') ||
    q.includes('что дает сайт') ||
    q.includes('зачем бизнесу сайт') ||
    q.includes('что входит в сайт') ||
    q.includes('what is a website')
  ) {
    if (lang === 'en') {
      return {
        category: 'about',
        text: 'What is a modern website and why does your business need one?\n\nA website is your 24/7 automated sales representative and the central asset of your business. Unlike social media accounts (which can be blocked or lost), your website is 100% owned by you.\n\nKey Business Benefits:\n• Converts Traffic: Turns visitors from ads, search, and social media into direct orders\n• Builds Credibility: High-end design positions your brand above competitors\n• Automates Operations: Accepts payments, calculates costs, and sends leads directly into CRM & Telegram\n• Organic Google Traffic (SEO): Free continuous flow of high-intent clients.\n\nIn Valence, we build websites not as static pictures, but as high-velocity revenue tools.',
        suggestedAction: { label: 'Calculate Project Cost', action: 'open_estimator' },
      };
    }
    return {
      category: 'about',
      text: 'Что такое современный сайт и зачем он бизнесу?\n\nСайт — это ваш круглосуточный цифровой филиал и главный генератор продаж в интернете. В отличие от соцсетей, сайт на 100% принадлежит вашей компании и не зависит от блокировок сторонних платформ.\n\nЧто сайт дает бизнесу:\n• Превращает посетителей в клиентов: конвертирует трафик из рекламы и поиска в реальные заявки и звонки.\n• Формирует доверие: премиальный интерфейс позволяет продавать с высоким средним чеком.\n• Автоматизирует процессы: принимает онлайн-оплаты, считает сметы, отправляет заявки в CRM и Telegram.\n• Приносит бесплатный SEO-трафик: стабильный поток клиентов из Яндекса и Google.\n\nВ Valence мы создаем сайты как быстрые коммерческие инструменты с окупаемостью уже за первые недели работы рекламы.',
      suggestedAction: { label: 'Рассчитать стоимость проекта', action: 'open_estimator' },
    };
  }

  // 5. ЧТО ТАКОЕ ЛЕНДИНГ
  if (
    q.includes('что такое лендинг') ||
    q.includes('что такое landing') ||
    q.includes('одностраничник') ||
    q.includes('посадочная страница') ||
    q.includes('чем лендинг отличается') ||
    q.includes('зачем лендинг')
  ) {
    if (lang === 'en') {
      return {
        category: 'about',
        text: 'What is a Landing Page?\n\nA Landing Page is a single-page website strictly focused on one target action: collecting a lead, selling a specific product/service, or booking a call.\n\nKey Advantages:\n• High conversion rate (4–8% vs 1–2% on standard multi-page sites)\n• Clear sales structure with zero distractions for the visitor\n• Best option for paid ads (Google, Meta, TikTok) and rapid market testing.',
        suggestedAction: { label: 'Calculate Landing Cost', action: 'open_estimator' },
      };
    }
    return {
      category: 'about',
      text: 'Что такое Landing Page (Лендинг / Одностраничник)?\n\nЛендинг — это страница, заточенная под одно ключевое действие: получить заявку, продать конкретную услугу или продукт.\n\nПреимущества:\n• Высокая конверсия (4–8% против 1–2% у обычных сайтов), так как внимание клиента сфокусировано на вашем оффере.\n• Идеально для платной рекламы в Яндексе и соцсетях.\n• Быстрый запуск под ключ за 5–10 дней.',
      suggestedAction: { label: 'Рассчитать стоимость лендинга', action: 'open_estimator' },
    };
  }

  // 6. ЧТО ТАКОЕ PWA / ВЕБ-СЕРВИС
  if (
    q.includes('что такое pwa') ||
    q.includes('что такое веб сервис') ||
    q.includes('веб сервис') ||
    q.includes('веб приложение') ||
    q.includes('mini app') ||
    q.includes('web app') ||
    q.includes('pwa')
  ) {
    if (lang === 'en') {
      return {
        category: 'stack',
        text: 'What is a PWA (Progressive Web App)?\n\nA PWA is a website that functions like a native mobile app (like our Mesti Delivery project). Users can install it directly to their iOS/Android home screen in 1 click without App Store moderation, receive push notifications, and use it offline with zero lag.',
        suggestedAction: { label: 'See Mesti Delivery Case', action: 'scroll_cases' },
      };
    }
    return {
      category: 'stack',
      text: 'Что такое PWA (Progressive Web App) и веб-сервисы?\n\nPWA — это технология, позволяющая сайту работать как полноценное мобильное приложение (как в нашем кейсе Mesti Delivery):\n\n• Установка в 1 клик на экран iPhone или Android прямо из браузера без App Store.\n• Мгновенная скорость работы и офлайн-режим.\n• Экономия бюджета в 3–4 раза по сравнению с раздельной разработкой под iOS и Android.',
      suggestedAction: { label: 'Смотреть кейс Mesti Delivery', action: 'scroll_cases' },
    };
  }

  // 7. ЧТО ТАКОЕ SEO
  if (
    q.includes('что такое seo') ||
    q.includes('сео') ||
    q.includes('seo') ||
    q.includes('поисковое продвижение')
  ) {
    if (lang === 'en') {
      return {
        category: 'stack',
        text: 'What is SEO (Search Engine Optimization)?\n\nSEO brings your website to page #1 on Google without paying for every ad click. Because Valence sites are built with Server-Side Rendering (Next.js) and score 100/100 in Google Lighthouse, search engines index them instantly and rank them higher than template builders.',
        suggestedAction: { label: 'Get Free SEO Audit', action: 'open_telegram' },
      };
    }
    return {
      category: 'stack',
      text: 'Что такое SEO-оптимизация и почему наши сайты в топе?\n\nSEO — это настройка сайта для бесплатного выхода на первые позиции в Google и Яндексе.\n\nПочему сайты Valence ранжируются выше:\n• Архитектура Next.js (SSR): поисковые роботы мгновенно индексируют чистый HTML-код.\n• 100/100 в Google Lighthouse: сверхбыстрая загрузка до 0.4 сек.\n• Микроразметка Schema.org для красивых сниппетов с ценами и рейтингом в поиске.',
      suggestedAction: { label: 'Получить бесплатный SEO-аудит', action: 'open_telegram' },
    };
  }

  // 8. СТОИМОСТЬ И ЦЕНЫ
  if (
    q.includes('стоим') ||
    q.includes('цен') ||
    q.includes('прайс') ||
    q.includes('бюджет') ||
    q.includes('тариф') ||
    q.includes('расценк') ||
    q.includes('скольк') ||
    q.includes('cost') ||
    q.includes('price') ||
    q.includes('budget') ||
    q.includes('pricing') ||
    q.includes('how much')
  ) {
    if (lang === 'en') {
      return {
        category: 'pricing',
        text: 'Valence Pricing Structure:\n\n• High-Converting Landing Page: from $1,000 (90,000 ₽ / 2,700 GEL)\n• Corporate Multi-page Website: from $2,000 (180,000 ₽ / 5,400 GEL)\n• E-commerce / Online Store: from $2,800 (250,000 ₽)\n• Custom Web Service / PWA: from $3,900 (350,000 ₽)\n\nAll estimates are strictly fixed in the contract before development starts.',
        suggestedAction: { label: 'Calculate Exact Cost', action: 'open_estimator' },
      };
    }
    return {
      category: 'pricing',
      text: 'Стоимость разработки в Valence:\n\n• Продающий Landing Page: от 90 000 ₽ ($1,000 / 2,700 GEL)\n• Корпоративный многостраничный сайт: от 180 000 ₽ ($2,000 / 5,400 GEL)\n• E-commerce / Интернет-магазин: от 250 000 ₽ ($2,800)\n• Веб-сервис / PWA-платформа: от 350 000 ₽ ($3,900)\n\nСмета фиксируется в договоре до начала работ и не меняется в процессе.',
      suggestedAction: { label: 'Рассчитать точную стоимость', action: 'open_estimator' },
    };
  }

  // 9. NEXT.JS VS TILDA / WORDPRESS
  if (
    q.includes('тильд') ||
    q.includes('tilda') ||
    q.includes('wordpress') ||
    q.includes('вордпресс') ||
    q.includes('конструктор') ||
    q.includes('стек') ||
    q.includes('технолог') ||
    q.includes('stack') ||
    q.includes('next') ||
    q.includes('react')
  ) {
    if (lang === 'en') {
      return {
        category: 'stack',
        text: 'Why Next.js & Pure Code Beats Tilda / WordPress:\n\n• Instant Load Speed (< 0.4s): Boosts ad conversions by +30–40% and lowers click costs.\n• Zero Technical Limits: High-performance 3D animations, custom PWA mobile apps, direct CRM/ERP APIs.\n• Security & Reliability: No vulnerability-prone plugins; handles millions of visitors without crashes.\n• 100% Code Ownership: You fully own your code without subscription lock-in.',
        suggestedAction: { label: 'Explore Live Cases', action: 'scroll_cases' },
      };
    }
    return {
      category: 'stack',
      text: 'Почему мы пишем чистый код на Next.js 16, а не используем Tilda или WordPress:\n\n• Скорость загрузки (< 0.4 сек): Конструкторы вроде Tilda часто грузятся 2-4 секунды, теряя до 40% клиентов из рекламы. Next.js открывается моментально.\n• Никаких ограничений: Любые калькуляторы, 3D-анимации, PWA-приложения, сложные CRM и платежи.\n• Безопасность: Нет дырявых плагинов, сайт не упадет при наплыве сотен тысяч посетителей.\n• 100% владение: Код принадлежит вам навсегда, без ежемесячной привязки к платформе.',
      suggestedAction: { label: 'Смотреть кейсы вживую', action: 'scroll_cases' },
    };
  }

  // 10. С ЧЕГО НАЧАТЬ / ПРОЦЕСС
  if (
    q.includes('с чего начат') ||
    q.includes('как заказат') ||
    q.includes('как начат') ||
    q.includes('процесс') ||
    q.includes('этап') ||
    q.includes('как работаете') ||
    q.includes('workflow') ||
    q.includes('process')
  ) {
    if (lang === 'en') {
      return {
        category: 'process',
        text: 'How We Work (4 Simple Steps):\n\n1. Brief & Strategy (1–2 days): 15-minute call or chat in Telegram to define goals, competitors, and offer.\n2. UI/UX Design in Figma (3–5 days): Custom prototype and visual identity, approved screen-by-screen.\n3. Engineering (Next.js) (5–10 days): Fast coding, animations, CRM & payment integrations.\n4. QA & Launch: Deploying to domain, analytics setup, and hand-off training.',
        suggestedAction: { label: 'Start Project in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'process',
      text: 'Как строится разработка в Valence (4 простых шага):\n\n1. Бриф и стратегия (1–2 дня): короткий диалог в Telegram — разбираем задачу, конкурентов и оффер.\n2. Дизайн в Figma (3–5 дней): проектируем структуру каждого экрана и утверждаем с вами.\n3. Разработка на Next.js (5–10 дней): пишем чистый быстрый код, подключаем формы, CRM и оплату.\n4. Тестирование и запуск: привязываем домен, настраиваем аналитику и передаем все доступы.',
      suggestedAction: { label: 'Начать проект в Telegram', action: 'open_telegram' },
    };
  }

  // 11. НЕТ ТЗ
  if (
    q.includes('нет тз') ||
    q.includes('без тз') ||
    q.includes('не знаю что') ||
    q.includes('поможете с тз') ||
    q.includes('что нужно от меня')
  ) {
    if (lang === 'en') {
      return {
        category: 'process',
        text: 'No technical specifications? Not a problem!\n\n90% of our clients come without a ready brief. We do not require complex technical documents. In a 15-minute dialogue in Telegram, we will ask 5 essential business questions and prepare the complete project structure for you free of charge.',
        suggestedAction: { label: 'Chat with Us in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'process',
      text: 'У вас нет готового ТЗ? Это абсолютно нормально!\n\nБольшинство наших клиентов обращаются без техзадания. Мы не требуем от вас сложных документов: достаточно 15 минут в Telegram или WhatsApp. Мы зададим 5 ключевых вопросов о вашем бизнесе и сами бесплатно составим структуру и ТЗ проекта.',
      suggestedAction: { label: 'Обсудить проект в Telegram', action: 'open_telegram' },
    };
  }

  // 12. КЕЙСЫ
  if (
    q.includes('кейс') ||
    q.includes('пример') ||
    q.includes('портфолио') ||
    q.includes('работ') ||
    q.includes('mesti') ||
    q.includes('мести') ||
    q.includes('заз') ||
    q.includes('zaz') ||
    q.includes('portfolio')
  ) {
    if (lang === 'en') {
      return {
        category: 'cases',
        text: 'Our Featured Client Cases:\n\n1. Mesti Delivery (Georgia) — FoodTech PWA platform with live restaurant menus, cart, courier tracking, and online payments.\n2. Retro ZAZ-968 — 3D interactive showcase for luxury retro car rental with instant date booking and 60fps animations.\n3. Custom CRM systems, Telegram Mini Apps, and high-load web services.',
        suggestedAction: { label: 'Explore Interactive Cases', action: 'scroll_cases' },
      };
    }
    return {
      category: 'cases',
      text: 'Наши ключевые реализованные проекты:\n\n1. Mesti Delivery (Грузия) — PWA-платформа доставки еды: интерактивное меню, онлайн-заказ, трекинг курьеров и оплата картами.\n2. Retro ZAZ-968 — Кинематографичный 3D-промосайт проката легендарного автомобиля с интерактивным бронированием и конверсией 8.4%.\n3. Высоконагруженные CRM-системы и Telegram Mini Apps.',
      suggestedAction: { label: 'Смотреть интерактивные кейсы', action: 'scroll_cases' },
    };
  }

  // 13. ОПЛАТА И ДОГОВОР
  if (
    q.includes('оплат') ||
    q.includes('карты') ||
    q.includes('договор') ||
    q.includes('счет') ||
    q.includes('рассрочк') ||
    q.includes('предоплат') ||
    q.includes('мир') ||
    q.includes('сбп') ||
    q.includes('tbc') ||
    q.includes('usdt') ||
    q.includes('крипт') ||
    q.includes('безнал')
  ) {
    if (lang === 'en') {
      return {
        category: 'pricing',
        text: 'Payments & Contracts:\n\n• Official Contract with transparent milestones and deadlines.\n• Payment Terms: 50% upfront / 50% upon final delivery & sign-off.\n• Methods: Visa / Mastercard, Bank Invoices (EU/US/CIS), Georgian banks (TBC, BOG), and Crypto (USDT TRC-20/ERC-20).',
        suggestedAction: { label: 'Calculate Project Cost', action: 'open_estimator' },
      };
    }
    return {
      category: 'pricing',
      text: 'Оплата, договор и география работы:\n\n• Официальный договор: фиксируем сроки, состав работ и гарантии.\n• Поэтапная оплата: 50% аванс / 50% после утверждения готового проекта.\n• Способы оплаты:\n  — РФ: Банковские карты (МИР/Visa/Mastercard), СБП, безналичный расчет по счету для юрлиц и ИП\n  — Грузия: TBC Bank, Bank of Georgia (BOG)\n  — Международные: Карты зарубежных банков, USDT (TRC-20, ERC-20).',
      suggestedAction: { label: 'Рассчитать проект', action: 'open_estimator' },
    };
  }

  // 14. ПРАВКИ И ГАРАНТИЯ
  if (
    q.includes('правк') ||
    q.includes('гарант') ||
    q.includes('баг') ||
    q.includes('поддержк') ||
    q.includes('сопровожден')
  ) {
    if (lang === 'en') {
      return {
        category: 'guarantee',
        text: 'Guarantees & Support:\n\n• Unlimited Design Revisions: We iterate in Figma until you are 100% satisfied.\n• 30-Day Free Technical Warranty: Any post-launch adjustments are resolved free of charge.\n• Full Code Transfer: You receive complete GitHub repository access with video guides on updating content.',
        suggestedAction: { label: 'Start Project with Guarantee', action: 'scroll_contact' },
      };
    }
    return {
      category: 'guarantee',
      text: 'Гарантии и техническое сопровождение:\n\n• Правки до полного утверждения: на этапе дизайна в Figma вносим корректировки до вашего полного одобрения.\n• 30 дней бесплатной гарантии: после релиза любые технические нюансы устраняем бесплатно и оперативно.\n• Передача всех исходников: отдаем репозиторий GitHub и обучаем вас управлению сайтом.',
      suggestedAction: { label: 'Запустить проект с гарантией', action: 'scroll_contact' },
    };
  }

  // 15. КОПИРАЙТИНГ И ТЕКСТЫ
  if (
    q.includes('текст') ||
    q.includes('копирайт') ||
    q.includes('контент')
  ) {
    if (lang === 'en') {
      return {
        category: 'about',
        text: 'Do we write texts and create content?\n\nYes! We provide turnkey copywriting. We craft compelling headlines, articulate your unique value proposition, and generate high-res visuals so you do not need to hire a separate copywriter.',
        suggestedAction: { label: 'Discuss Copywriting in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'about',
      text: 'Пишем ли мы тексты для сайта?\n\nДа! Мы создаем продающий копирайтинг под ключ: формулируем сильные офферы по формулам 4U/AIDA, пишем емкие тексты, закрывающие возражения клиентов, и готовим графические материалы. Вам не нужно нанимать стороннего копирайтера.',
      suggestedAction: { label: 'Обсудить контент в Telegram', action: 'open_telegram' },
    };
  }

  // 16. ДИЗАЙН И МОБИЛЬНАЯ ВЕРСИЯ
  if (
    q.includes('дизайн') ||
    q.includes('figma') ||
    q.includes('фигма') ||
    q.includes('моб') ||
    q.includes('адаптив') ||
    q.includes('смартфон')
  ) {
    if (lang === 'en') {
      return {
        category: 'about',
        text: 'Design & Mobile-First Approach:\n\nUp to 80% of your incoming traffic browses from smartphones. We design custom UI/UX in Figma tailored for mobile gestures, thumb-friendly CTAs, and smooth 60fps micro-animations before crafting the desktop layout.',
        suggestedAction: { label: 'See Live Designs', action: 'scroll_cases' },
      };
    }
    return {
      category: 'about',
      text: 'Дизайн и адаптивность под смартфоны:\n\nДо 80% клиентов приходят с мобильных устройств. Мы разрабатываем авторский дизайн в Figma по принципу Mobile-First: удобные кнопки под палец, плавная физика свайпов и безупречная верстка под все экраны iPhone и Android.',
      suggestedAction: { label: 'Смотреть дизайн в кейсах', action: 'scroll_cases' },
    };
  }

  // 17. ДОРОГО / СКИДКИ / ROI
  if (
    q.includes('дорог') ||
    q.includes('скидк') ||
    q.includes('дешев') ||
    q.includes('окупаем') ||
    q.includes('roi')
  ) {
    if (lang === 'en') {
      return {
        category: 'pricing',
        text: 'A quality website is not an expense, it is an investment with a proven ROI.\n\nA cheap template often wastes up to 70% of your advertising budget due to slow loading speeds and weak UI. A tailored Valence website with 4–6% conversion pays for itself in the first 2–4 weeks of active ads!',
        suggestedAction: { label: 'Calculate ROI & Cost', action: 'open_estimator' },
      };
    }
    return {
      category: 'pricing',
      text: 'Хороший сайт — это не расход, а инвестиция с прозрачной окупаемостью (ROI).\n\nДешёвый шаблон за 20 000 ₽ сливает до 70% рекламного бюджета из-за долгой загрузки и слабого доверия. Сайт от Valence с конверсией 4–6% окупает разработку уже за первые 2–4 недели работы рекламы!\n\nДавайте рассчитаем точную смету под ваш бюджет.',
      suggestedAction: { label: 'Рассчитать смету проекта', action: 'open_estimator' },
    };
  }

  // 18. О КОМАНДЕ
  if (
    q.includes('кто вы') ||
    q.includes('о вас') ||
    q.includes('команд') ||
    q.includes('студи') ||
    q.includes('агентств') ||
    q.includes('где вы')
  ) {
    if (lang === 'en') {
      return {
        category: 'about',
        text: 'About Valence:\n\nWe are an independent digital product agency and engineering lab. We bring together senior engineers, UI/UX designers, and growth marketers. We work without bloated management overhead — you collaborate directly with the lead engineers building your product.',
        suggestedAction: { label: 'Message Us in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'about',
      text: 'Об агентстве Valence:\n\nМы — независимая digital-лаборатория и продуктовое агентство. Объединяем senior-разработчиков, UI/UX дизайнеров и продуктовых маркетологов. Работаем распределенно (Грузия, СНГ, Европа) без лишней бюрократии — вы общаетесь напрямую с ведущими инженерами проекта.',
      suggestedAction: { label: 'Написать нам в Telegram', action: 'open_telegram' },
    };
  }

  // 19. АУДИТ
  if (
    q.includes('аудит') ||
    q.includes('разбор') ||
    q.includes('анализ')
  ) {
    if (lang === 'en') {
      return {
        category: 'process',
        text: 'Free Website & Conversion Audit:\n\n1. We analyze your current website and traffic flow.\n2. Point out conversion leaks where potential clients abandon.\n3. Provide a concrete blueprint to increase your revenue and speed up pages.',
        suggestedAction: { label: 'Request Free Audit in Telegram', action: 'open_telegram' },
      };
    }
    return {
      category: 'process',
      text: 'Бесплатный экспресс-аудит вашего сайта:\n\n1. Проанализируем ваш текущий сайт и мобильную версию.\n2. Покажем точки потери конверсии, где сейчас уходят клиенты.\n3. Подготовим четкий план, как повысить конверсию в заявку за счет современного стека.\n\nНапишите в Telegram — подготовим разбор за 1–2 часа!',
      suggestedAction: { label: 'Получить аудит в Telegram', action: 'open_telegram' },
    };
  }

  // 20. ИНТЕГРАЦИИ И CRM
  if (
    q.includes('интеграц') ||
    q.includes('crm') ||
    q.includes('црм') ||
    q.includes('амо') ||
    q.includes('битрикс') ||
    q.includes('бот') ||
    q.includes('автоматизац')
  ) {
    if (lang === 'en') {
      return {
        category: 'stack',
        text: 'Business Automations & Integrations:\n\n• Instant new lead alerts directly into your private Telegram chat\n• Automatic deal & contact synchronization with AmoCRM / Bitrix24\n• Telegram Mini Apps and intelligent bots for customer onboarding\n• Online payment gateways (Stripe, CloudPayments, TBC/BOG, Crypto).',
        suggestedAction: { label: 'Discuss Integrations', action: 'scroll_contact' },
      };
    }
    return {
      category: 'stack',
      text: 'Интеграции, CRM и Telegram-боты:\n\n• Мгновенные уведомления о каждой новой заявке с деталями заказа в ваш Telegram-чат\n• Автоматизация CRM: передача лидов в AmoCRM, Bitrix24, МойСклад\n• Разработка Telegram Mini Apps: удобные сервисы прямо внутри мессенджера\n• Онлайн-эквайринг: прием платежей картами, СБП и криптой.',
      suggestedAction: { label: 'Обсудить интеграцию', action: 'scroll_contact' },
    };
  }

  // 21. КОНТАКТЫ
  if (
    q.includes('контакт') ||
    q.includes('телефон') ||
    q.includes('номер') ||
    q.includes('почт') ||
    q.includes('написат') ||
    q.includes('телеграм') ||
    q.includes('whatsapp')
  ) {
    if (lang === 'en') {
      return {
        category: 'general',
        text: 'Contact Valence:\n\n• Telegram: @valencedigital\n• Email: valence.agency@gmail.com\n• WhatsApp: Instant direct line for project discussions\n\nWe respond within 5–15 minutes!',
        suggestedAction: { label: 'Open Telegram Chat', action: 'open_telegram' },
      };
    }
    return {
      category: 'general',
      text: 'Контакты агентства Valence:\n\n• Telegram: @valencedigital\n• WhatsApp: Прямая линия для обсуждения проектов\n• Email: valence.agency@gmail.com\n\nОтвечаем в течение 5–15 минут без выходных!',
      suggestedAction: { label: 'Написать в Telegram', action: 'open_telegram' },
    };
  }

  // 22. SMART FALLBACK
  if (lang === 'en') {
    return {
      category: 'general',
      text: 'In Valence, we engineer high-converting websites, web services (PWA), and business automations that drive predictable revenue.\n\nWhat would you like to explore?\n• Calculate project cost & timelines\n• Compare Next.js vs website builders\n• Review our case studies (Mesti Delivery, Retro ZAZ)\n• Request a free expert audit of your existing site.',
      suggestedAction: { label: 'Calculate Project Cost', action: 'open_estimator' },
    };
  }

  return {
    category: 'general',
    text: 'Мы в Valence разрабатываем высокоскоростные сайты на Next.js, веб-сервисы (PWA) и автоматизации, которые приносят бизнесу реальную прибыль и поток клиентов.\n\nЧем могу помочь:\n• Рассчитать стоимость и точные сроки под ваш проект\n• Рассказать, почему чистый код эффективнее Tilda\n• Показать реализованные кейсы (Mesti Delivery, Retro ZAZ)\n• Провести бесплатный экспресс-аудит вашего текущего сайта.',
    suggestedAction: { label: 'Рассчитать стоимость проекта', action: 'open_estimator' },
  };
}
