import { BookOpen, Github, Mail, Twitter } from 'lucide-react';
import { Separator } from './ui/separator';

export function Footer() {
	return (
		<footer className='border-t border-border/50 bg-card/30 backdrop-blur-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div className='md:col-span-1'>
						<div className='flex items-center gap-2 mb-4'>
							<div className='p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600'>
								<BookOpen className='h-5 w-5 text-white' />
							</div>
							<span className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
								DevKnowledge
							</span>
						</div>
						<p className='text-muted-foreground text-sm'>
							База знаний для роста разработчиков от junior до middle уровня
						</p>
					</div>

					<div>
						<h3 className='mb-4'>Категории</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									Frontend
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									Backend
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									DevOps
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									Mobile
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='mb-4'>Ресурсы</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									Все статьи
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									Roadmap
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									Глоссарий
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-muted-foreground hover:text-primary transition-colors text-sm'>
									FAQ
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='mb-4'>Связаться</h3>
						<div className='flex gap-4'>
							<a
								href='#'
								className='p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all'>
								<Github className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all'>
								<Twitter className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all'>
								<Mail className='h-5 w-5' />
							</a>
						</div>
					</div>
				</div>

				<Separator className='my-8 bg-border/50' />

				<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
					<p className='text-muted-foreground text-sm'>
						© 2024 DevKnowledge. Все права защищены.
					</p>
					<div className='flex gap-6'>
						<a
							href='#'
							className='text-muted-foreground hover:text-primary transition-colors text-sm'>
							Конфиденциальность
						</a>
						<a
							href='#'
							className='text-muted-foreground hover:text-primary transition-colors text-sm'>
							Условия использования
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
