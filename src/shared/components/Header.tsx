'use client';

import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

import { usePathname } from 'next/navigation';
import { navItems } from '../config/nav';
import { socials } from '../config/social';
import { cn } from '../lib/utils';

export function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const navRefs = useRef<HTMLAnchorElement[]>([]);

	useEffect(() => {
		if (!menuRef.current) return;

		if (menuOpen) {
			document.body.style.overflow = 'hidden';
			document.body.setAttribute('data-menu-open', 'true');
			gsap.to(menuRef.current, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
			});
			gsap.fromTo(
				navRefs.current,
				{ x: '70%', opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.5,
					stagger: 0.1,
					ease: 'power3.out',
					delay: 0.1, // чуть позже после появления меню
				}
			);
		} else {
			document.body.style.overflow = 'auto';
			document.body.removeAttribute('data-menu-open');
			// убирается обратно вверх
			gsap.to(menuRef.current, {
				y: '-100%',
				opacity: 0,
				duration: 1,
				ease: 'power3.in',
			});
			gsap.fromTo(
				navRefs.current,
				{ x: 0, opacity: 1 },
				{
					x: '70%',
					opacity: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: 'power3.out',
					delay: 0.4, // чуть позже после появления меню
				}
			);
		}
	}, [menuOpen]);

	const pathname = usePathname(); // текущий путь, напр. "/articles"

	return (
		<>
			<header className='mix-blend-exclusion z-60 w-full fixed top-0 [&>.xxx]:z-70 [&>.xxx]:relative '>
				<div className='flex xxx justify-between items-center h-16   mx-auto px-4 sm:px-6 lg:px-8'>
					<Logo />
					<ThemeToggle />

					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className='zoom-in-50 relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer hover:[&>span]:bg-deep-orange mix-blend-exclusion'>
						<span
							className={`absolute w-8 h-0.5 bg-foreground rounded transition-all duration-300 ease-in-out ${
								menuOpen ? 'rotate-45  ' : ' bg-white -translate-y-1.5'
							}`}></span>

						<span
							className={`absolute w-8 h-0.5 bg-foreground rounded transition-all duration-300 ease-in-out ${
								menuOpen ? '-rotate-45  ' : ' bg-white translate-y-1.5'
							}`}></span>
					</button>
				</div>
				{/* Меню на весь экран */}
			</header>
			<div
				ref={menuRef}
				className='fixed p-10 top-0 left-0 w-full h-full bg-background  backdrop-blur-md z-55 flex flex-col  transform -translate-y-full'>
				<nav className='flex flex-col gap-1.5 flex-1 justify-center uppercase text-2xl'>
					{navItems.map((el, i) => {
						const isActive = el.href === '/' ? pathname === '/' : pathname.startsWith(el.href);

						return (
							<a
								ref={el => {
									if (el) navRefs.current[i] = el;
								}}
								key={i}
								href={el.href}
								className={cn(
									'transition-colors w-min text-7xl leading-14 tracking-[-3.2] font-display nav-menu',
									{
										'text-deep-orange ': isActive,
										'hover:text-white/30': !isActive,
									}
								)}>
								{el.text}
							</a>
						);
					})}
				</nav>
				<ul className='flex h-[45px] items-center justify-between border  border-white'>
					{socials.map((item, index) => (
						<React.Fragment key={index}>
							<li className='flex-[1 0 0px] px-5 w-full flex justify-center'>
								<Button variant={'ghost'}>
									<span className='hidden md:block'>{item.text}</span>
									<span className='md:hidden'>{item.mob}</span>
								</Button>
							</li>
							{index < 3 && <hr className='bg-white w-px flex-[0 0 auto] h-6.5 ' />}
						</React.Fragment>
					))}
				</ul>
			</div>
		</>
	);
}
