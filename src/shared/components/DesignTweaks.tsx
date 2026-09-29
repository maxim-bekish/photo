'use client';

// Панель подбора стиля: акцентный цвет, шрифт заголовков и шрифт текста.
// Видна в npm run dev и на демо-сайте с NEXT_PUBLIC_STYLE_PANEL=true (см. SiteLayout);
// на сайте покупателя скрыта. Выбор хранится только в браузере посетителя (localStorage).

import { useEffect, useState } from 'react';

const ACCENTS = [
	{ name: 'Оранжевый (по умолчанию)', value: 'rgb(255, 96, 23)' },
	{ name: 'Коралловый', value: '#ff5a5f' },
	{ name: 'Красный', value: '#e8352b' },
	{ name: 'Янтарный', value: '#ffb22c' },
	{ name: 'Голубой', value: '#4da3ff' },
	{ name: 'Сиреневый', value: '#b07cff' },
	{ name: 'Мятный', value: '#3ddc97' },
];

// family: '' — шрифт сайта по умолчанию; url — параметр для Google Fonts
const DISPLAY_FONTS = [
	{ name: 'ClashDisplay + Montserrat (по умолчанию)', family: '' },
	{ name: 'Unbounded', family: "'Unbounded'", url: 'Unbounded:wght@300..800' },
	{ name: 'Jost', family: "'Jost'", url: 'Jost:wght@300..700' },
	{ name: 'Onest', family: "'Onest'", url: 'Onest:wght@300..700' },
	{ name: 'Tektur', family: "'Tektur'", url: 'Tektur:wght@400..700' },
	{ name: 'Manrope', family: "'Manrope'", url: 'Manrope:wght@400..800' },
];

const TEXT_FONTS = [
	{ name: 'Manrope (по умолчанию)', family: '' },
	{ name: 'Onest', family: "'Onest'", url: 'Onest:wght@300..700' },
	{ name: 'Golos Text', family: "'Golos Text'", url: 'Golos+Text:wght@400..700' },
	{ name: 'IBM Plex Sans', family: "'IBM Plex Sans'", url: 'IBM+Plex+Sans:wght@300;400;500;600' },
	{ name: 'Rubik', family: "'Rubik'", url: 'Rubik:wght@300..700' },
	{ name: 'Montserrat', family: "'Montserrat'", url: 'Montserrat:wght@300..700' },
];

type FontOption = { name: string; family: string; url?: string };

// Классы, которые задают шрифт заголовков и цифр через font-display (в Tailwind он «зашит» в класс)
const DISPLAY_SELECTORS =
	'.font-display, .h1, .h1-b, .h2-l, .h2-s, .h3, .h3-s, .h4, .body2, .body3, .f-nav, .nav-menu';

const STORAGE_KEY = 'design-tweaks';

type Tweaks = { accent: string; displayFont: string; textFont: string };

const DEFAULTS: Tweaks = { accent: ACCENTS[0].value, displayFont: '', textFont: '' };

function readSaved(): Tweaks {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
	} catch {
		// localStorage может быть недоступен — начинаем со значений сайта
	}
	return DEFAULTS;
}

function loadGoogleFont(font?: FontOption) {
	if (!font?.url) return;
	const id = `tweak-font-${font.url}`;
	if (document.getElementById(id)) return;
	const link = document.createElement('link');
	link.id = id;
	link.rel = 'stylesheet';
	link.href = `https://fonts.googleapis.com/css2?family=${font.url}&display=swap`;
	document.head.appendChild(link);
}

export function DesignTweaks() {
	const [open, setOpen] = useState(false);
	const [tweaks, setTweaks] = useState<Tweaks | null>(null);

	// Сохранённый выбор читаем после монтирования: localStorage есть только в браузере
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- разовая инициализация из localStorage
		setTweaks(readSaved());
	}, []);

	useEffect(() => {
		if (!tweaks) return;

		// Акцент — CSS-переменные цвета; светлый оттенок считаем из основного
		const root = document.documentElement;
		root.style.setProperty('--color-deep-orange', tweaks.accent);
		root.style.setProperty('--color-light-orange', `color-mix(in oklab, ${tweaks.accent} 85%, white)`);

		// Шрифт текста — переопределяем переменную Manrope на body (там её ставит next/font)
		const textFont = TEXT_FONTS.find((f) => f.family === tweaks.textFont);
		loadGoogleFont(textFont);
		if (tweaks.textFont) document.body.style.setProperty('--font-manrope', `${tweaks.textFont}, sans-serif`);
		else document.body.style.removeProperty('--font-manrope');

		// Шрифт заголовков — стилем поверх классов
		const displayFont = DISPLAY_FONTS.find((f) => f.family === tweaks.displayFont);
		loadGoogleFont(displayFont);
		let style = document.getElementById('tweak-display-font');
		if (!style) {
			style = document.createElement('style');
			style.id = 'tweak-display-font';
			document.head.appendChild(style);
		}
		style.textContent = tweaks.displayFont
			? `${DISPLAY_SELECTORS} { font-family: ${tweaks.displayFont}, var(--font-montserrat), sans-serif !important; }`
			: '';

		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
		} catch {
			// не сохранилось — выбор действует до перезагрузки
		}
	}, [tweaks]);

	if (!tweaks) return null;

	const isDefault =
		tweaks.accent === DEFAULTS.accent && !tweaks.displayFont && !tweaks.textFont;

	const selectStyle = { background: '#2a2a2a', color: 'inherit', border: '1px solid #444', borderRadius: 6, padding: 6 };

	return (
		<div
			style={{
				position: 'fixed',
				right: 16,
				bottom: 16,
				zIndex: 10000,
				width: open ? 280 : 'auto',
				background: '#1b1b1b',
				color: '#f5f5f5',
				border: '1px solid #3a3a3a',
				borderRadius: 10,
				padding: 12,
				font: '13px/1.4 system-ui, sans-serif',
				boxShadow: '0 10px 30px rgba(0,0,0,.5)',
			}}>
			<button
				type='button'
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				style={{ background: 'none', border: 0, color: 'inherit', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
				{open ? '▾ Стиль сайта' : '▸ Стиль сайта'}
			</button>

			{open && (
				<div style={{ display: 'grid', gap: 12, marginTop: 10 }}>
					<div style={{ display: 'grid', gap: 6 }}>
						<span style={{ opacity: 0.7 }}>Акцентный цвет</span>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
							{ACCENTS.map((a) => (
								<button
									key={a.value}
									type='button'
									title={a.name}
									aria-label={a.name}
									aria-pressed={tweaks.accent === a.value}
									onClick={() => setTweaks({ ...tweaks, accent: a.value })}
									style={{
										width: 28,
										height: 28,
										borderRadius: '50%',
										background: a.value,
										cursor: 'pointer',
										border: tweaks.accent === a.value ? '2px solid #fff' : '2px solid transparent',
										outline: tweaks.accent === a.value ? '1px solid #000' : 'none',
									}}
								/>
							))}
						</div>
						<span style={{ opacity: 0.7, fontSize: 12 }}>
							{ACCENTS.find((a) => a.value === tweaks.accent)?.name}
						</span>
					</div>

					<label style={{ display: 'grid', gap: 6 }}>
						<span style={{ opacity: 0.7 }}>Шрифт заголовков</span>
						<select
							value={tweaks.displayFont}
							onChange={(e) => setTweaks({ ...tweaks, displayFont: e.target.value })}
							style={selectStyle}>
							{DISPLAY_FONTS.map((f) => (
								<option key={f.name} value={f.family}>
									{f.name}
								</option>
							))}
						</select>
					</label>

					<label style={{ display: 'grid', gap: 6 }}>
						<span style={{ opacity: 0.7 }}>Шрифт текста</span>
						<select
							value={tweaks.textFont}
							onChange={(e) => setTweaks({ ...tweaks, textFont: e.target.value })}
							style={selectStyle}>
							{TEXT_FONTS.map((f) => (
								<option key={f.name} value={f.family}>
									{f.name}
								</option>
							))}
						</select>
					</label>

					<button
						type='button'
						disabled={isDefault}
						onClick={() => setTweaks(DEFAULTS)}
						style={{ ...selectStyle, cursor: isDefault ? 'default' : 'pointer', opacity: isDefault ? 0.5 : 1 }}>
						Сбросить к стилю сайта
					</button>
				</div>
			)}
		</div>
	);
}
