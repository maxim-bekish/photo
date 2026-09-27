import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createPool } from '@vercel/postgres';

// Демо-контент вымышленного фотографа. ВНИМАНИЕ: скрипт ПЕРЕЗАПИСЫВАЕТ
// site_settings, stats, faq, awards, gear, qualities, blogs, reviews и socials.
// Альбомы, бренды, направления и видео не трогает.
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
