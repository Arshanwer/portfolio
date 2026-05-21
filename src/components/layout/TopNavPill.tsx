"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
	Home,
	Briefcase,
	FolderKanban,
	Layers,
	Camera,
	MessageCircle,
	Mail,
} from "lucide-react";
import Icon from "../Icon";
import { MENU, SECTION_IDS, resolveActiveLabel } from "@/data/sidebar";
import { useActiveSection } from "@/hooks/useActiveSection";

const MENU_ICONS: Record<string, LucideIcon> = {
	home: Home,
	work: Briefcase,
	projects: FolderKanban,
	stack: Layers,
	photography: Camera,
	thoughts: MessageCircle,
	contact: Mail,
};

const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

function matchesRoute(pathname: string, routeMatch?: string) {
	if (!routeMatch) return false;
	return pathname === routeMatch || pathname.startsWith(routeMatch + "/");
}

export default function TopNavPill() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const activeSection = useActiveSection(SECTION_IDS, isHome);
	const ioLabel = resolveActiveLabel(pathname, activeSection);

	// clickIntent overrides the IO-derived label between click and the
	// moment IO/route navigation catches up — gives the indicator a single
	// clean slide from current → target instead of stop-and-go through
	// every intermediate section during a smooth scroll.
	const [clickIntent, setClickIntent] = useState<string | null>(null);
	const activeLabel = clickIntent ?? ioLabel;

	useEffect(() => {
		if (!clickIntent) return;
		if (ioLabel === clickIntent) {
			setClickIntent(null);
			return;
		}
		const id = setTimeout(() => setClickIntent(null), 1500);
		return () => clearTimeout(id);
	}, [clickIntent, ioLabel]);

	const handleClick = useCallback((label: string) => {
		setClickIntent(label);
	}, []);

	const desktopRefs = useRef<Map<string, HTMLLIElement>>(new Map());
	const mobileRefs = useRef<Map<string, HTMLLIElement>>(new Map());
	const [desktopIndicator, setDesktopIndicator] = useState<{
		left: number;
		width: number;
	} | null>(null);
	const [mobileIndicator, setMobileIndicator] = useState<{
		left: number;
		width: number;
	} | null>(null);
	const [mounted, setMounted] = useState(false);

	useIsomorphicLayoutEffect(() => {
		const measure = () => {
			if (!activeLabel) {
				setDesktopIndicator(null);
				setMobileIndicator(null);
				return;
			}
			const d = desktopRefs.current.get(activeLabel);
			const m = mobileRefs.current.get(activeLabel);
			setDesktopIndicator(d ? { left: d.offsetLeft, width: d.offsetWidth } : null);
			setMobileIndicator(m ? { left: m.offsetLeft, width: m.offsetWidth } : null);
		};
		measure();
		const id = requestAnimationFrame(() => setMounted(true));
		window.addEventListener("resize", measure);
		return () => {
			cancelAnimationFrame(id);
			window.removeEventListener("resize", measure);
		};
	}, [activeLabel]);

	return (
		<nav
			aria-label="Primary"
			className="fixed left-1/2 top-4 z-30 -translate-x-1/2 md:top-5"
		>
			<ul
				className={`relative hidden items-stretch gap-1 rounded-2xl border border-border bg-surface/90 p-1.5 shadow-md backdrop-blur-md md:flex ${
					mounted ? "" : "[&_[data-indicator]]:!transition-none"
				}`}
			>
				<span
					data-indicator
					aria-hidden="true"
					className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-xl bg-foreground/[0.08] transition-[left,width,opacity] duration-300 ease-out motion-reduce:transition-none ${
						desktopIndicator ? "opacity-100" : "opacity-0"
					}`}
					style={{
						left: desktopIndicator?.left ?? 0,
						width: desktopIndicator?.width ?? 0,
						height: "calc(100% - 12px)",
					}}
				/>
				{MENU.map((item) => {
					const IconComp = MENU_ICONS[item.label];
					const isActive = activeLabel === item.label;
					const ariaCurrent =
						isActive && matchesRoute(pathname, item.routeMatch)
							? ("page" as const)
							: isActive
							? ("location" as const)
							: undefined;
					return (
						<li
							key={item.label}
							ref={(el) => {
								if (el) desktopRefs.current.set(item.label, el);
								else desktopRefs.current.delete(item.label);
							}}
							className="relative"
						>
							<Link
								href={item.href}
								aria-current={ariaCurrent}
								onClick={() => handleClick(item.label)}
								className={`relative flex h-full min-w-[56px] flex-col items-center justify-center gap-1 rounded-xl px-2.5 py-1.5 font-mono lowercase tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
									isActive
										? "text-accent"
										: "text-muted hover:text-foreground"
								}`}
							>
								{IconComp && (
									<Icon icon={IconComp} size={16} aria-hidden="true" />
								)}
								<span className="text-[11px] leading-none">
									{item.label}
								</span>
								{item.soon && (
									<span
										aria-hidden="true"
										className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-accent"
									/>
								)}
							</Link>
						</li>
					);
				})}
			</ul>

			<ul
				className={`relative flex items-center gap-1 rounded-full border border-border bg-surface/90 px-1.5 py-1.5 shadow-md backdrop-blur-md md:hidden ${
					mounted ? "" : "[&_[data-indicator]]:!transition-none"
				}`}
			>
				<span
					data-indicator
					aria-hidden="true"
					className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.08] transition-[left,width,opacity] duration-300 ease-out motion-reduce:transition-none ${
						mobileIndicator ? "opacity-100" : "opacity-0"
					}`}
					style={{
						left: mobileIndicator?.left ?? 0,
						width: mobileIndicator?.width ?? 0,
						height: "calc(100% - 12px)",
					}}
				/>
				{MENU.map((item) => {
					const IconComp = MENU_ICONS[item.label];
					if (!IconComp) return null;
					const isActive = activeLabel === item.label;
					const ariaCurrent =
						isActive && matchesRoute(pathname, item.routeMatch)
							? ("page" as const)
							: isActive
							? ("location" as const)
							: undefined;
					return (
						<li
							key={item.label}
							ref={(el) => {
								if (el) mobileRefs.current.set(item.label, el);
								else mobileRefs.current.delete(item.label);
							}}
							className="relative"
						>
							<Link
								href={item.href}
								aria-current={ariaCurrent}
								aria-label={item.label}
								onClick={() => handleClick(item.label)}
								className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
									isActive ? "text-accent" : "text-muted hover:text-foreground"
								}`}
							>
								<Icon icon={IconComp} size={16} aria-hidden="true" />
								{item.soon && (
									<span
										aria-hidden="true"
										className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-accent"
									/>
								)}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
