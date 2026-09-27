# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Обзор

Сайт-портфолио фотографа (альбомы, видео, блог, отзывы, бренды, экспертиза) + простая админ-панель. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, TanStack Query, данные — Vercel Postgres (Neon).

## Команды

```bash
npm run dev                # dev-сервер на 0.0.0.0:3000
npm run build              # продакшен-сборка (заодно проверка типов)
npm run lint               # eslint (flat config, eslint-config-next)
npm run db:migrate         # идемпотентные ALTER-миграции схемы (scripts/migrate.mjs) — новые изменения схемы добавлять туда
npm run db:import-backup   # залить db_cluster-*.backup.gz в Postgres (scripts/import-backup-to-neon.mjs)
npm run db:seed-socials    # заполнить таблицу socials
npm run db:seed-demo       # демо-контент вымышленного фотографа (ПЕРЕЗАПИСЫВАЕТ settings/stats/faq/awards/gear/qualities/blogs/reviews)
```

Тестов в проекте нет. Скрипты в `scripts/` сами читают `.env.local` из корня.

Переменные окружения (`.env.local`): `POSTGRES_URL` (обязательна — без неё любой лоадер бросает ошибку), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

## Архитектура

**Алиас импортов:** `@/*` указывает на корень репозитория, поэтому импорты выглядят как `@/src/...`.

**Поток данных (публичная часть):**
1. `src/lib/vercel-loader.ts` — все SQL-запросы (`sql` из `@vercel/postgres`). Альбомы собираются из таблиц `albums` + `gallery` + `characteristics` + `videos` через `json_agg`; JSON-поля нормализуются через `parseJsonField`/`normalizeArrayField`. `getExpertise` раскладывает строки на `main` (до 4 элементов с картинкой) и `sub`.
2. Route handlers в `src/app/api/<resource>/route.ts` (и `[id]/route.ts`) — тонкие обёртки над лоадерами. Есть также универсальный `src/app/api/[resource]/route.ts`, но статические роуты имеют приоритет, так что он фактически перекрыт.
3. Клиент: axios-инстанс с `baseURL: '/api'` (`src/app/api/http/axiosInstance.ts`). Сосуществуют два стиля:
   - ручные `src/app/api/endpoints/*.api.ts` + хуки `src/hooks/queries/use*.ts`;
   - обобщённый `createApiClient` + `createQueryHook` (фабрика хуков), собранные в `src/lib/api-resources.ts` (сейчас только albums и blogs). Использование: `apiResources.albums.useQueryById(id)()` — обратите внимание на двойной вызов.
4. Ключи кеша — только через `src/utils/queryKeys.ts`.

**Контент сайта** (всё, что должно редактироваться из админки):
- `site_settings` — одна строка (`id = 1`): имя, город, контакты, тексты Hero и «Обо мне», картинки/видео, SEO. Читается через `useSettings()` на клиенте и `getSettings()` в `generateMetadata` (`layout.tsx`).
- Списки с `sort_order`: `stats`, `faq`, `awards`, `gear_categories` + `gear`, `qualities`. Хуки — `src/hooks/queries/useSiteContent.ts`.
- В текстах `**фрагмент**` — акцент, рендерится через `highlight()` из `src/shared/lib/highlight.tsx`; переносы строк — `\n` + `whitespace-pre-line`. Многострочный ответ FAQ выводится списком.
- Заголовки секций и подписи интерфейса — в коде, не в БД.
- Секции, которые подгружают контент после монтирования и используют GSAP ScrollTrigger, должны вызывать `ScrollTrigger.refresh()` после загрузки данных.

Форма на `/contacts` (`ContactForm.tsx`) шлёт `POST /api/contact`, заявки пишутся в таблицу `contact_requests`.

Почти все страницы — клиентские компоненты (`'use client'`), данные грузятся через React Query, SSR-фетчинга нет.

**Админка:**
- `/admin-login` → `POST /api/admin/login` ставит httpOnly-cookie `admin_token=authenticated` (`src/lib/admin-auth.ts`).
- `src/middleware.ts` защищает `/admin/*` (редирект) и `/api/admin/*` (401).
- **Важно:** CRUD-роуты `src/app/api/admin/{albums,blogs}/route.ts` всё ещё читают/пишут JSON-файлы `src/data/*.json`, которых в репозитории нет, тогда как публичная часть уже читает из Postgres (миграция в коммите «перенос в vercel bd» не завершена). Изменения из админки не попадают на сайт. `ADMIN_README.md` частично устарел по той же причине.

**Лейаут и UI:**
- `src/app/layout.tsx` — шрифты (ClashDisplay, Satoshi — локальные; Inter, Montserrat — Google), `Providers` (QueryClient), `SiteLayout`.
- `SiteLayout` добавляет Header/Footer и DOM-элемент кастомного курсора (`#cursor-custom`, управляется `useCustomCursor`); для `/admin*` и `/admin-login` рендерит только children.
- Группа роутов `(works)` — альбомы и видео с общим `layoutWorks.tsx`.
- Компоненты: `src/shared/components/{home,about,video,ui}`; `ui/` — shadcn (new-york), алиасы в `components.json` ведут в `@/src/shared/...`. Утилита `cn` — `src/shared/lib/utils.ts`.
- Типы доменных сущностей — `src/shared/types.ts`.
- Стили: Tailwind v4 без конфиг-файла, токены и кастомные цвета (`deep-orange`, `light-orange`, `creamy-white`, `matt-black`) и шрифты (`font-display`, `font-satoshi`) объявлены в `@theme` в `src/app/globals.css`. Тёмная тема через класс `.dark` на `<html>`.
- Анимации: `gsap` и `motion`; инерционный скролл — `useInertialScroll`, в `next.config.ts` включён `experimental.viewTransition`.

## Соглашения

- Язык интерфейса — русский (в будущем возможен RU/EN).
- Весь контент должен храниться в БД и редактироваться из админки — не хардкодить тексты в компонентах.
- Текст статьи блога — поле `blogs.content` (markdown, рендер через `react-markdown` + `remark-gfm`, стили — `.article-content` в `globals.css`). Поле `message` используется как заголовок статьи.

- Код форматирован табами, одинарными кавычками; комментарии и UI-тексты — на русском.
