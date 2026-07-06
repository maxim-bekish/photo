import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createPool } from '@vercel/postgres';

const PROJECT_ROOT = process.cwd();
const ENV_FILE = resolve(PROJECT_ROOT, '.env.local');

const socials = [
	{
		id: 'ig',
		mob: 'ig',
		text: 'Instagram',
		href: 'https://www.instagram.com/maxa_max',
		icon: 'instagram',
		nav: true,
		footer: true,
		contact: true,
	},
	{
		id: 'fb',
		mob: 'fb',
		text: 'Facebook',
		href: '#',
		icon: 'facebook',
		nav: true,
		footer: true,
		contact: true,
	},
	{
		id: 'yt',
		mob: 'yt',
		text: 'Youtube',
		href: '#',
		icon: 'youtube',
		nav: true,
		footer: true,
		contact: true,
	},
	{
		id: 'tg',
		mob: 'tg',
		text: 'Telegram',
		href: 'https://t.me/maxa_max',
		icon: 'telegram',
		nav: true,
		footer: true,
		contact: true,
	},
	{
		id: 'tw',
		mob: 'tw',
		text: 'Twitter',
		href: 'http://twitter.com/ECIEWUBCUYAEWVCYVEWBCYHEWBVHC',
		icon: 'twitter',
		nav: true,
		footer: true,
		contact: true,
	},
	{
		id: 'twt',
		mob: 'twt',
		text: 'Twitch',
		href: '#',
		icon: 'twitch',
		nav: true,
		footer: true,
		contact: true,
	},
	{
		id: 'li',
		mob: 'li',
		text: 'Linkedin',
		href: 'https://www.linkedin.com/in/maksim-bekish-819b8920a/',
		icon: 'linkedin',
		nav: true,
		footer: true,
		contact: true,
	},
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
			const value = line.slice(sepIdx + 1).trim();
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

	try {
		for (const social of socials) {
			await pool.query(
				`INSERT INTO socials (id, href, icon, text, mob, nav, footer, contact)
				 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
				 ON CONFLICT (id) DO UPDATE SET
					href = EXCLUDED.href,
					icon = EXCLUDED.icon,
					text = EXCLUDED.text,
					mob = EXCLUDED.mob,
					nav = EXCLUDED.nav,
					footer = EXCLUDED.footer,
					contact = EXCLUDED.contact`,
				[
					social.id,
					social.href,
					social.icon,
					social.text,
					social.mob,
					social.nav,
					social.footer,
					social.contact,
				],
			);
		}

		const { rows } = await pool.query(
			'SELECT id, text, nav, footer, contact FROM socials ORDER BY id',
		);
		console.table(rows);
		console.log('Socials заполнены.');
	} finally {
		await pool.end();
	}
}

main().catch((error) => {
	console.error('Ошибка заполнения socials:', error);
	process.exitCode = 1;
});
