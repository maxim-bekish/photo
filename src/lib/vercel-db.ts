import { sql } from '@vercel/postgres';

export function assertVercelPostgresEnv() {
	if (!process.env.POSTGRES_URL) {
		throw new Error('POSTGRES_URL не установлен в переменных окружения');
	}
}

type Primitive = string | number | boolean | null;
type JsonValue = Primitive | JsonValue[] | { [key: string]: JsonValue };

export function parseJsonField<T>(value: JsonValue): T {
	if (typeof value === 'string') {
		try {
			return JSON.parse(value) as T;
		} catch {
			return value as T;
		}
	}

	return value as T;
}

export { sql };
