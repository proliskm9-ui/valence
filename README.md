# делаем· — сайт digital-агентства

Тёмный лендинг с формой заявок в Firestore и админкой на `/admin`.

**Стек:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis · Firebase (Firestore)

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

Без ключей Firebase сайт работает: в dev отправка формы имитируется (лог в консоли),
вход в `/admin` работает по логину/паролю из `.env.local`, список заявок — после
настройки Firebase.

## Админка

Вход только по **логину и паролю** (httpOnly-сессия на сервере). Учётка задаётся
в `.env.local`:

```
ADMIN_LOGIN=...
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...   # длинная случайная строка
```

Скопируйте шаблон: `cp .env.local.example .env.local` и заполните значения.
При первом успешном входе, если Firebase уже настроен, сервер сам создаёт
служебного пользователя Auth для чтения заявок (в UI его не видно).

## Настройка Firebase

1. Создайте проект на [console.firebase.google.com](https://console.firebase.google.com).
2. Добавьте Web-приложение → скопируйте конфиг.
3. Заполните `NEXT_PUBLIC_FIREBASE_*` в `.env.local`.
4. Включите **Firestore** (production mode) и **Authentication → Email/Password**
   (нужно серверу для доступа к заявкам от имени админа).
5. Опубликуйте правила из [firestore.rules](firestore.rules):
   Firestore → Rules → вставить содержимое → Publish
   (или `firebase deploy --only firestore:rules` при установленном Firebase CLI).

Правила: создание заявки — кому угодно (только валидная форма, статус `new`);
чтение и смена статуса — только авторизованным; удаление запрещено.

## Деплой на Vercel

1. Запушьте репозиторий на GitHub и импортируйте в Vercel — настройки по умолчанию.
2. Добавьте переменные из `.env.local` в Project Settings → Environment Variables.
3. В `src/lib/site.ts` замените `url` на боевой домен (нужно для OG/sitemap).

## Где что менять

| Что | Где |
|---|---|
| Название, почта, telegram, домен | [src/lib/site.ts](src/lib/site.ts) |
| Акцентный цвет | `--accent` в [src/app/globals.css](src/app/globals.css) |
| Тексты hero | [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) |
| Услуги | [src/components/sections/Services.tsx](src/components/sections/Services.tsx) |
| Кейсы (заглушки) | [src/components/sections/Cases.tsx](src/components/sections/Cases.tsx) |
| Шаги процесса | [src/components/sections/Process.tsx](src/components/sections/Process.tsx) |
| Цифры (плейсхолдеры) | [src/components/sections/Stats.tsx](src/components/sections/Stats.tsx) |
| Бегущая строка | [src/components/sections/Marquee.tsx](src/components/sections/Marquee.tsx) |
| Диапазоны бюджета в форме | [src/components/sections/ContactForm.tsx](src/components/sections/ContactForm.tsx) |
| OG-картинка | `src/app/opengraph-image.png` (1200×630) |

После выбора акцентного цвета удалите временный переключатель:
компонент `AccentSwitcher` и его подключение в [src/app/(site)/layout.tsx](src/app/(site)/layout.tsx),
затем зафиксируйте выбранный `--accent` в globals.css.

## Служебное

- `?np=1` в URL — все анимации мгновенно в конечном состоянии, прелоадер и
  переключатель акцента скрыты (для скриншотов и автотестов).
- `node scripts/screenshot.mjs <url> <out.png> [w] [h] [selector] [fullpage]` —
  скриншоты через установленный Chrome.
- Прелоадер показывается раз за сессию (sessionStorage).

## Анти-спам формы

Honeypot-поле + клиентский rate-limit (не чаще раза в минуту, до 5 заявок в сутки)
+ валидация формы в Firestore rules. Для жёсткой серверной защиты можно добавить
Cloud Function с проверкой, но для лендинга этого уровня обычно достаточно.
