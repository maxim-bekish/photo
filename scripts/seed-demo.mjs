import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createPool } from '@vercel/postgres';

// Демо-контент вымышленного фотографа. ВНИМАНИЕ: скрипт ПЕРЕЗАПИСЫВАЕТ
// site_settings, stats, faq, awards, gear, qualities, blogs, reviews, socials
// и альбомы (albums + gallery + characteristics). Бренды, направления и видео не трогает.
// id генерируем сами: у импортированных из бэкапа таблиц нет DEFAULT для id.

const PROJECT_ROOT = process.cwd();
const ENV_FILE = resolve(PROJECT_ROOT, '.env.local');

const settings = {
	first_name: 'Алексей',
	last_name: 'Соколов',
	city: 'Москва',
	email: 'hello@example.com',
	phone: '+7 900 000-00-00',
	hero_title: 'Ловлю лучшие\nмоменты жизни',
	hero_text:
		'Привет! Я Алексей — фотограф из Москвы. Снимаю людей, события и предметы так, чтобы через годы хотелось пересматривать.',
	hero_video: '/assets/home-video.mp4',
	hero_poster: '/assets/poster-home-video.png',
	about_short:
		'Я фотограф, для которого главное — живые эмоции. С вниманием к деталям и **любовью к историям** я создаю кадры, которые не просто красивы, а передают настроение момента.',
	about_intro:
		'Привет! Я **Алексей Соколов**, фотограф из **Москвы**. Больше десяти лет я снимаю **то, что происходит всего один раз**: портреты, свадьбы, путешествия, предметную и событийную съёмку.',
	about_story:
		'Всё началось с плёночной «мыльницы», которую мне подарили в двенадцать лет. Я снимал всё подряд — друзей, двор, закаты — и ждал неделю, пока проявят плёнку.\n\nСо временем хобби стало профессией. Каждый щелчок затвора для меня — способ остановить время и сохранить эмоции, которые словами не передать.',
	about_highlight:
		'Мне посчастливилось работать с **замечательными людьми и брендами**, а мои работы **отмечены на конкурсах**.',
	about_cta:
		'Давайте создадим что-то особенное вместе. Нужны ли вам семейные фото, съёмка для бренда или репортаж с мероприятия — я буду рад помочь.\n\nНапишите мне, и обсудим вашу идею.',
	about_hero_image: '/assets/about/hero.avif',
	about_images: ['/assets/about/about/img-1.avif', '/assets/about/about/img-2.avif', '/assets/about/about/img-3.avif'],
	meta_title: 'Алексей Соколов — фотограф в Москве',
	meta_description:
		'Портретная, свадебная, предметная и событийная съёмка в Москве. Портфолио, отзывы клиентов и запись на фотосессию.',
};

const stats = [
	{ title: 'Часов за объективом', value: 9000 },
	{ title: 'Лет опыта', value: 12 },
	{ title: 'Наград и публикаций', value: 13 },
	{ title: 'Счастливых клиентов', value: 400 },
];

const faq = [
	{
		question: 'Как записаться на фотосессию?',
		answer:
			'Оставьте заявку в форме на странице «Контакты» или напишите мне в соцсетях. Я отвечу в течение дня, мы обсудим идею и выберем дату.',
	},
	{
		question: 'Сколько стоит съёмка?',
		answer:
			'Портретная съёмка — от 8 000 ₽\nСъёмка мероприятий — от 20 000 ₽\nПредметная и коммерческая съёмка — рассчитывается индивидуально',
	},
	{
		question: 'Что входит в стоимость?',
		answer:
			'Консультация и помощь с образом и локацией\nСама фотосессия\nЦветокоррекция и ретушь отобранных кадров\nОнлайн-галерея для просмотра и скачивания',
	},
	{
		question: 'Когда будут готовы фотографии?',
		answer:
			'Превью — через 2–3 дня, полностью обработанная серия — в течение 2 недель. Срочная обработка возможна по договорённости.',
	},
	{
		question: 'Сколько длится фотосессия?',
		answer:
			'Обычно от 1 до 2 часов в зависимости от формата и количества локаций. Репортажные съёмки длятся столько, сколько идёт событие.',
	},
	{
		question: 'Выезжаете ли вы в другие города?',
		answer: 'Да. Стоимость дороги и проживания обсуждается отдельно.',
	},
];

const awards = [
	{ title: 'Гран-при фестиваля «Городской свет»', year: '2025', img: '/assets/about/awards/img-1.avif' },
	{ title: 'Финалист конкурса «Портрет года»', year: '2024', img: '/assets/about/awards/img-2.avif' },
	{ title: 'Лучшая серия, «Фото путешествий»', year: '2023', img: '/assets/about/awards/img-3.avif' },
	{ title: 'Приз зрительских симпатий, «Лица города»', year: '2022', img: '/assets/about/awards/img-1.avif' },
];

const gear = [
	{ title: 'Камеры', icon: 'camera', items: ['Canon EOS R5', 'Sony Alpha a7 III', 'Fujifilm X-T4'] },
	{
		title: 'Объективы',
		icon: 'aperture',
		items: ['Canon RF 24-70mm f/2.8L IS USM', 'Sigma 35mm f/1.4 DG HSM Art', 'Sony FE 85mm f/1.4 GM'],
	},
	{
		title: 'Свет и аксессуары',
		icon: 'asterisk',
		items: ['Godox AD200 Pro', 'Profoto B10', 'Штатив Manfrotto Befree', 'Стабилизатор DJI Ronin-S'],
	},
	{ title: 'Обработка', icon: 'laptop', items: ['Adobe Lightroom и Photoshop', 'Планшет Wacom Intuos Pro'] },
];

const qualities = ['Творческий взгляд', 'Профессионализм', 'Увлечённость', 'Гибкость'];

const blogs = [
	{
		href: 'color-grading',
		src: '/assets/expertise/img-1.avif',
		message: 'Почему цветокоррекция решает всё',
		category: 'Обработка',
		date: '2025-03-06',
		subTitle: 'Советы',
		content: `## Цвет задаёт настроение

Один и тот же кадр может выглядеть **уютным** или **тревожным** — всё зависит от цвета.

- Тёплые тона добавляют уюта
- Холодные — драмы и сдержанности
- Приглушённые цвета делают снимок «киношным»

> Хороший пресет экономит часы работы, но не заменяет вкус.

## С чего начать

Начните с баланса белого и экспозиции, а уже потом переходите к стилю. Так серия будет выглядеть цельно.`,
	},
	{
		href: 'prepare-for-photoshoot',
		src: '/assets/expertise/img-2.avif',
		message: 'Как подготовиться к фотосессии',
		category: 'Советы',
		date: '2025-02-14',
		subTitle: 'Для клиентов',
		content: `## Одежда

Выбирайте однотонные вещи без крупных логотипов. Возьмите 2–3 образа — так серия будет разнообразнее.

## Накануне

- Выспитесь — это видно на фото лучше любого макияжа
- Продумайте, какие эмоции хотите показать
- Соберите референсы, которые вам нравятся

## На съёмке

Не бойтесь ошибиться — я подскажу позы и помогу расслабиться. Лучшие кадры обычно получаются, когда вы забываете о камере.`,
	},
	{
		href: 'travel-photography',
		src: '/assets/expertise/img-3.avif',
		message: 'Тревел-съёмка: как привезти из поездки не только селфи',
		category: 'Путешествия',
		date: '2024-11-20',
		subTitle: 'Опыт',
		content: `## Снимайте людей

Места запоминаются по людям: продавцу на рынке, музыканту на площади, случайному прохожему.

## Ловите свет

Утро и вечер — лучшее время. Днём ищите тень и отражения.

## Рассказывайте историю

Общий план, детали, эмоции — три типа кадров, из которых складывается серия.`,
	},
	{
		href: 'product-photography',
		src: '/assets/expertise/img-4.avif',
		message: 'Предметная съёмка для маленького бизнеса',
		category: 'Коммерция',
		date: '2024-09-02',
		subTitle: 'Бизнесу',
		content: `Хорошие фото товара продают лучше описания. Вот что важно:

1. **Единый стиль** — один фон и свет для всего каталога
2. **Детали** — фактура, упаковка, товар в руках
3. **Контекст** — как вещь выглядит в жизни

Если нужна съёмка каталога — напишите, обсудим задачу.`,
	},
];

const reviews = [
	{
		src: '/assets/expertise/img-1.avif',
		name: 'Мария К.',
		role: 'Семейная фотосессия',
		rating: 5,
		message:
			'Алексей за час нашёл подход и к нам, и к двухлетнему сыну. Фото получились живыми и тёплыми — теперь они висят у нас по всей квартире.',
	},
	{
		src: '/assets/expertise/img-2.avif',
		name: 'Дмитрий Л.',
		role: 'Основатель кофейни «Зерно»',
		rating: 5,
		message:
			'Заказывали съёмку меню и интерьера. Всё сдали в срок, кадры сразу пошли в соцсети и на сайт — продажи доставки заметно выросли.',
	},
	{
		src: '/assets/expertise/img-3.avif',
		name: 'Екатерина и Олег',
		role: 'Свадебная съёмка',
		rating: 5,
		message:
			'Мы почти не замечали фотографа, а в итоге получили больше пятисот кадров, на которых видно, каким был этот день на самом деле.',
	},
	{
		src: '/assets/expertise/img-4.avif',
		name: 'Ирина В.',
		role: 'Портретная съёмка',
		rating: 4,
		message:
			'Очень боялась камеры, но Алексей всё время подсказывал, как встать и куда смотреть. Впервые нравлюсь себе на фото.',
	},
	{
		src: '/assets/expertise/img-1.avif',
		name: 'Павел Р.',
		role: 'HR-директор',
		rating: 5,
		message: 'Снимали корпоратив на 150 человек. Репортаж получился динамичным, а превью прислали уже на следующий день.',
	},
];

// Альбомы. id прежние: к ним по album_id привязаны видео, и старые ссылки на альбомы продолжат работать.
// Требует выполненной миграции (npm run db:migrate): иконки характеристик берутся из characteristic_types.
// Фото — из public/assets (своих пока мало, поэтому в галереях они повторяются).
// Характеристики — коды из characteristic_types (подписи и иконки берутся оттуда).
const A = '/assets/albums';
const E = '/assets/expertise';
const B = '/assets/about/about';

const albums = [
	{
		id: 'd2b9c8f1-7e5a-4f3d-b8c2-6f1a9b3d5e8c',
		href: 'bright-india',
		src: `${A}/img-1.avif`,
		title: 'Яркая Индия',
		description:
			'Три недели по Раджастхану и Агре: рынки, храмы и люди, для которых цвет — часть повседневной жизни. Тревел-серия об уличном свете и случайных встречах.',
		gallery: [`${A}/img-1.avif`, `${E}/img-3.avif`, `${B}/img-2.avif`, `${A}/img-2.avif`],
		characteristics: [
			['camera', 'Fujifilm X-T4'],
			['lenses', 'Fujinon XF 23mm f/1.4 R, Fujinon XF 56mm f/1.2 R'],
			['category', 'Тревел'],
			['projectType', 'Личный проект'],
			['location', 'Индия: Раджастхан и Агра'],
			['time', 'Март 2024'],
		],
	},
	{
		id: 'e9d6f3b8-7c5a-4d2e-9a7f-6b4e8c1d5f2a',
		href: 'wild-wonders',
		src: `${A}/img-5.avif`,
		title: 'Дикие чудеса',
		description:
			'Серия о дикой природе Карелии: долгие часы в укрытии ради нескольких секунд, когда зверь выходит к воде. Работа с естественным светом и терпением.',
		gallery: [`${A}/img-5.avif`, `${E}/img-2.avif`, `${A}/img-3.avif`, `${B}/img-1.avif`],
		characteristics: [
			['camera', 'Sony Alpha a7 III'],
			['lenses', 'Sony FE 200–600mm f/5.6–6.3 G OSS'],
			['otherDevices', 'Дрон DJI Mavic Air 2'],
			['category', 'Дикая природа'],
			['projectType', 'Личный проект'],
			['location', 'Карелия'],
			['time', 'Июнь — август 2024'],
		],
	},
	{
		id: 'a4f7c9b2-8d6e-4a5c-9b3d-7e2f8a4c6d9b',
		href: 'echo-of-dreams',
		src: `${A}/img-2.avif`,
		title: 'Эхо снов',
		description:
			'Концептуальная портретная серия на грани сна и реальности: мягкий свет, дым и длинные выдержки. Снята для выставки в арт-пространстве.',
		gallery: [`${A}/img-2.avif`, `${B}/img-3.avif`, `${E}/img-1.avif`, `${A}/img-4.avif`],
		characteristics: [
			['camera', 'Canon EOS R5'],
			['lenses', 'Canon RF 50mm f/1.2L USM'],
			['otherDevices', 'Godox AD200 Pro, генератор дыма'],
			['category', 'Концептуальный портрет'],
			['projectType', 'Коммерческий'],
			['client', 'Арт-пространство «Точка»'],
			['location', 'Москва, студия'],
			['time', 'Октябрь 2024'],
		],
	},
	{
		id: 'c5e8d3a1-9f7b-4c2d-8a6e-5d3f9b2c7e4a',
		href: 'wings-of-freedom',
		src: `${A}/img-3.avif`,
		title: 'Крылья свободы',
		description:
			'Северное побережье с воздуха и с земли: птичьи колонии, скалы и ветер, который не даёт стоять на месте. Пейзажная серия о просторе.',
		gallery: [`${A}/img-3.avif`, `${E}/img-4.avif`, `${A}/img-5.avif`, `${B}/img-2.avif`],
		characteristics: [
			['camera', 'Canon EOS R5'],
			['lenses', 'Canon RF 100–500mm f/4.5–7.1L IS USM'],
			['otherDevices', 'Дрон DJI Mavic Air 2'],
			['category', 'Пейзаж'],
			['projectType', 'Личный проект'],
			['location', 'Кольский полуостров, Териберка'],
			['time', 'Июль 2023'],
		],
	},
	{
		id: 'b7f2e9c4-6a8d-5b3e-9c1f-8e4a7d2f6b5c',
		href: 'perfection-in-details',
		src: `${A}/img-4.avif`,
		title: 'Совершенство в деталях',
		description:
			'Предметная съёмка ювелирной коллекции: макро, работа со светом и отражениями, единый стиль для каталога, сайта и соцсетей.',
		gallery: [`${A}/img-4.avif`, `${E}/img-1.avif`, `${A}/img-1.avif`, `${B}/img-3.avif`],
		characteristics: [
			['camera', 'Canon EOS R5'],
			['lenses', 'Canon RF 100mm f/2.8L Macro IS USM'],
			['otherDevices', 'Profoto B10, лайтбокс'],
			['category', 'Предметная съёмка'],
			['projectType', 'Коммерческий'],
			['client', 'Ювелирная мастерская «Грань»'],
			['location', 'Москва, студия'],
			['time', 'Февраль 2025'],
		],
	},
];

// Ссылки-заглушки: фотограф подставит свои аккаунты в админке.
// icon — имя файла в public/assets/network/
const socials = [
	{ id: 'ig', mob: 'ig', text: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
	{ id: 'tg', mob: 'tg', text: 'Telegram', href: 'https://t.me/', icon: 'telegram' },
	{ id: 'yt', mob: 'yt', text: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
];

function parseEnv(content) {
	const env = {};
	content
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#'))
		.forEach((line) => {
			const sepIdx = line.indexOf('=');
			if (sepIdx === -1) return;
			const key = line.slice(0, sepIdx).trim();
			let value = line.slice(sepIdx + 1).trim();
			if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
				value = value.slice(1, -1);
			}
			env[key] = value;
		});
	return env;
}

async function main() {
	const localEnv = parseEnv(await readFile(ENV_FILE, 'utf8'));
	const connectionString = process.env.POSTGRES_URL ?? localEnv.POSTGRES_URL;

	if (!connectionString) {
		throw new Error('POSTGRES_URL не найден в окружении или .env.local');
	}

	const pool = createPool({ connectionString });
	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		const columns = Object.keys(settings);
		await client.query(
			`INSERT INTO site_settings (id, ${columns.join(', ')})
			 VALUES (1, ${columns.map((_, i) => `$${i + 1}`).join(', ')})
			 ON CONFLICT (id) DO UPDATE SET ${columns.map((c) => `${c} = EXCLUDED.${c}`).join(', ')}`,
			columns.map((c) => (c === 'about_images' ? JSON.stringify(settings[c]) : settings[c])),
		);

		await client.query('DELETE FROM stats');
		for (const [i, s] of stats.entries()) {
			await client.query('INSERT INTO stats (title, value, sort_order) VALUES ($1, $2, $3)', [s.title, s.value, i]);
		}

		await client.query('DELETE FROM faq');
		for (const [i, f] of faq.entries()) {
			await client.query('INSERT INTO faq (question, answer, sort_order) VALUES ($1, $2, $3)', [
				f.question,
				f.answer,
				i,
			]);
		}

		await client.query('DELETE FROM awards');
		for (const [i, a] of awards.entries()) {
			await client.query('INSERT INTO awards (title, year, img, sort_order) VALUES ($1, $2, $3, $4)', [
				a.title,
				a.year,
				a.img,
				i,
			]);
		}

		await client.query('DELETE FROM gear_categories'); // gear удаляется каскадно
		for (const [i, c] of gear.entries()) {
			const { rows } = await client.query(
				'INSERT INTO gear_categories (title, icon, sort_order) VALUES ($1, $2, $3) RETURNING id',
				[c.title, c.icon, i],
			);
			for (const [j, value] of c.items.entries()) {
				await client.query('INSERT INTO gear (category_id, value, sort_order) VALUES ($1, $2, $3)', [
					rows[0].id,
					value,
					j,
				]);
			}
		}

		await client.query('DELETE FROM qualities');
		for (const [i, title] of qualities.entries()) {
			await client.query('INSERT INTO qualities (title, sort_order) VALUES ($1, $2)', [title, i]);
		}

		await client.query('DELETE FROM blogs');
		for (const b of blogs) {
			await client.query(
				`INSERT INTO blogs (id, href, src, message, category, date, "subTitle", content)
				 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[randomUUID(), b.href, b.src, b.message, b.category, b.date, b.subTitle, b.content],
			);
		}

		await client.query('DELETE FROM reviews');
		for (const r of reviews) {
			await client.query('INSERT INTO reviews (id, src, message, name, role, rating) VALUES ($1, $2, $3, $4, $5, $6)', [
				randomUUID(),
				r.src,
				r.message,
				r.name,
				r.role,
				String(r.rating),
			]);
		}

		await client.query('DELETE FROM socials');
		for (const so of socials) {
			await client.query(
				`INSERT INTO socials (id, href, icon, text, mob, nav, footer, contact)
				 VALUES ($1, $2, $3, $4, $5, true, true, true)`,
				[so.id, so.href, so.icon, so.text, so.mob],
			);
		}

		// Альбомы обновляем по id, а не удаляем: на них ссылаются видео (внешний ключ videos.album_id).
		// Галерею и характеристики этих альбомов пересоздаём.
		const albumIds = albums.map((al) => al.id);
		await client.query('DELETE FROM characteristics WHERE album_id = ANY($1)', [albumIds]);
		await client.query('DELETE FROM gallery WHERE album_id = ANY($1)', [albumIds]);
		let galleryN = 1;
		let characteristicId = 1;
		for (const al of albums) {
			await client.query(
				`INSERT INTO albums (id, src, alt, title, "videoSrc", "videoPreview", description, href)
				 VALUES ($1, $2, $3, $4, NULL, NULL, $5, $6)
				 ON CONFLICT (id) DO UPDATE SET
					src = EXCLUDED.src, alt = EXCLUDED.alt, title = EXCLUDED.title,
					"videoSrc" = NULL, "videoPreview" = NULL,
					description = EXCLUDED.description, href = EXCLUDED.href`,
				[al.id, al.src, al.title, al.title, al.description, al.href],
			);
			// gallery_id в базе text и по нему сортируется галерея — ведущие нули держат порядок ('010' после '009')
			for (const src of al.gallery) {
				await client.query('INSERT INTO gallery (gallery_id, album_id, src) VALUES ($1, $2, $3)', [
					String(galleryN++).padStart(3, '0'),
					al.id,
					src,
				]);
			}
			// icon в characteristics обязателен — берём из типа характеристики
			for (const [code, value] of al.characteristics) {
				await client.query(
					`INSERT INTO characteristics (characteristic_id, album_id, code, icon, value)
					 VALUES ($1, $2, $3, COALESCE((SELECT icon FROM characteristic_types WHERE code = $3), 'circle'), $4)`,
					[characteristicId++, al.id, code, value],
				);
			}
		}

		await client.query('COMMIT');
		console.log('Демо-контент загружен.');
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	} finally {
		client.release();
		await pool.end();
	}
}

main().catch((error) => {
	console.error('Ошибка загрузки демо-контента:', error);
	process.exitCode = 1;
});
