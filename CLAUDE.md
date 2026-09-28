# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Обзор

Сайт-портфолио фотографа (альбомы, видео, блог, отзывы, бренды, экспертиза) + простая админ-панель. Next.js 16.3 (App Router), React 19, TypeScript, Tailwind CSS v4, TanStack Query, данные — Vercel Postgres (Neon).

## Команды

```bash
npm run dev                # dev-сервер на 0.0.0.0:3000
npm run build              # продакшен-сборка (заодно проверка типов)
npm run lint               # eslint (flat config, eslint-config-next)
npm run db:migrate         # идемпотентные ALTER-миграции схемы (scripts/migrate.mjs) — новые изменения схемы добавлять туда
npm run db:import-backup   # залить db_cluster-*.backup.gz в Postgres (scripts/import-backup-to-neon.mjs)
npm run db:seed-socials    # заполнить таблицу socials
npm run db:seed-demo       # демо-контент вымышленного фотографа (ПЕРЕЗАПИСЫВАЕТ settings/stats/faq/awards/gear/qualities/blogs/reviews/socials)
```

Тестов в проекте нет. Скрипты в `scripts/` сами читают `.env.local` из корня.

Переменные окружения (`.env.local`): `POSTGRES_URL` (обязательна — без неё любой лоадер бросает ошибку), `ADMIN_EMAIL`, `ADMIN_PASSWORD`. `ALLOW_INDEXING=true` — разрешить индексацию поисковиками (задавать только на боевом сайте фотографа; без неё все страницы `noindex`, а `robots.txt` без sitemap). `NEXT_PUBLIC_SITE_URL` — адрес сайта, если это не адрес Vercel.

## Архитектура

**Алиас импортов:** `@/*` указывает на корень репозитория, поэтому импорты выглядят как `@/src/...`.

**Поток данных (публичная часть):**
1. `src/lib/vercel-loader.ts` — все SQL-запросы (`sql` из `@vercel/postgres`). Альбомы собираются из таблиц `albums` + `gallery` + `characteristics` + `videos` через `json_agg`; JSON-поля нормализуются через `parseJsonField`/`normalizeArrayField`. `getExpertise` раскладывает строки на `main` (до 4 элементов с картинкой) и `sub`.
2. Route handlers в `src/app/api/<resource>/route.ts` (и `[id]/route.ts`) — тонкие обёртки над лоадерами.
3. Клиент: axios-инстанс с `baseURL: '/api'` (`src/app/api/http/axiosInstance.ts`). Сосуществуют два стиля:
   - ручные `src/app/api/endpoints/*.api.ts` + хуки `src/hooks/queries/use*.ts`;
   - обобщённый `createApiClient` + `createQueryHook` (фабрика хуков), собранные в `src/lib/api-resources.ts` (сейчас только albums и blogs). Использование: `apiResources.albums.useQueryById(id)()` — обратите внимание на двойной вызов.
4. Ключи кеша — только через `src/utils/queryKeys.ts`.

**Контент сайта** (всё, что должно редактироваться из админки):
- `site_settings` — одна строка (`id = 1`): имя, город, контакты, тексты Hero и «Обо мне», картинки/видео, SEO. Читается через `useSettings()` на клиенте и `getSettings()` в `generateMetadata` (`layout.tsx`).
- Списки с `sort_order`: `stats`, `faq`, `awards`, `gear_categories` + `gear`, `qualities`. Хуки — `src/hooks/queries/useSiteContent.ts`.
- В текстах `**фрагмент**` — акцент, рендерится через `highlight()` из `src/shared/lib/highlight.tsx`; переносы строк — `\n` + `whitespace-pre-line`. Многострочный ответ FAQ выводится списком.
- Заголовки секций и подписи интерфейса — в коде, не в БД: все строки в `src/shared/config/texts.ts` (заготовка под RU/EN). Новые подписи добавлять туда, не писать текст прямо в JSX.
- Секции, которые подгружают контент после монтирования и используют GSAP ScrollTrigger, должны вызывать `ScrollTrigger.refresh()` после загрузки данных.

**Состояния загрузки:** секции главной при загрузке показывают `SectionSkeleton`, а без данных/при ошибке возвращают `null` (секция скрывается). Страницы-списки используют `EmptyState` (оба в `src/shared/components/ui/states.tsx`). Глобальные `src/app/not-found.tsx` и `src/app/error.tsx`.

Форма на `/contacts` (`ContactForm.tsx`) шлёт `POST /api/contact`, заявки пишутся в таблицу `contact_requests`.

**Серверный рендер (SEO):**
- `albums/[id]` и `blogs/[id]` — полностью серверные: `page.tsx` вызывает лоадер через `cache()`, `generateMetadata`, `notFound()`; рядом `loading.tsx` и `not-found.tsx`.
- Остальные страницы: `page.tsx` — серверная обёртка (`metadata`, `revalidate = 60`, `prefetchQuery` + `HydrationBoundary`), а UI — в клиентском `*List.tsx` / `*View.tsx` с хуками React Query. **`queryKey` в `prefetchQuery` должен совпадать с ключом клиентского хука** (например, блоги — `QueryKeys.blogs('')`), иначе клиент загрузит данные заново.
- `layout.tsx` предзагружает `settings` и `socials` для шапки и футера всех страниц, задаёт шаблон `title` (`%s — Имя`) и `metadataBase` из `SITE_URL` (`src/shared/config/site.ts`).
- `sitemap.ts` (статические страницы + альбомы и статьи из БД) и `robots.ts` (закрыты `/admin`, `/api`).

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
- Анимации: `gsap` и `motion`. Плавный скролл — `useSmoothScroll` (Lenis, синхронизирован с ScrollTrigger через тикер GSAP; на тач-экранах нативная прокрутка; блокируется при открытом меню через `data-menu-open` на `body`).
- Кастомный курсор — `useCustomCursor`: работает только на устройствах с мышью (`hover: hover`), слежение за мышью одно на весь сайт (`gsap.quickTo`), сколько бы компонентов ни вызывали хук.

## Соглашения

- Язык интерфейса — русский (в будущем возможен RU/EN).
- Весь контент должен храниться в БД и редактироваться из админки — не хардкодить тексты в компонентах.
- Текст статьи блога — поле `blogs.content` (markdown, рендер через `react-markdown` + `remark-gfm`, стили — `.article-content` в `globals.css`). Поле `message` используется как заголовок статьи.

- Код форматирован табами, одинарными кавычками; комментарии и UI-тексты — на русском.
