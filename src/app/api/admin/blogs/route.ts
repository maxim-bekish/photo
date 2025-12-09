import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { ArticlesItem } from '@/src/shared/types';

const DATA_PATH = join(process.cwd(), 'src', 'data', 'blogs.json');

async function getBlogs(): Promise<ArticlesItem[]> {
	try {
		const file = await readFile(DATA_PATH, 'utf-8');
		return JSON.parse(file);
	} catch {
		return [];
	}
}

async function saveBlogs(blogs: ArticlesItem[]) {
	await writeFile(DATA_PATH, JSON.stringify(blogs, null, '\t'), 'utf-8');
}

export async function GET() {
	const blogs = await getBlogs();
	return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
	try {
		const blog: ArticlesItem = await request.json();
		const blogs = await getBlogs();

		// Генерируем ID если нет
		if (!blog.id) {
			blog.id = Date.now().toString();
		}

		blogs.push(blog);
		await saveBlogs(blogs);

		return NextResponse.json(blog);
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка при создании блога' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	try {
		const updatedBlog: ArticlesItem = await request.json();
		const blogs = await getBlogs();

		const index = blogs.findIndex((b) => b.id === updatedBlog.id);
		if (index === -1) {
			return NextResponse.json({ error: 'Блог не найден' }, { status: 404 });
		}

		blogs[index] = updatedBlog;
		await saveBlogs(blogs);

		return NextResponse.json(updatedBlog);
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка при обновлении блога' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'ID не указан' }, { status: 400 });
		}

		const blogs = await getBlogs();
		const filtered = blogs.filter((b) => b.id !== id);
		await saveBlogs(filtered);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка при удалении блога' }, { status: 500 });
	}
}

