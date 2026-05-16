"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Icon from "../Icon";
import { MENU, NAME_LINES, SECTION_IDS } from "@/data/sidebar";
import { useActiveSection } from "@/hooks/useActiveSection";
import SidebarContent from "./SidebarContent";

function resolveActiveLabel(
	pathname: string,
	activeSection: string | null
): string | null {
	const routeMatch = MENU.find(
		(item) => item.routeMatch && pathname === item.routeMatch
	);
	if (routeMatch) return routeMatch.label;
	if (pathname === "/") {
		if (activeSection) {
			const sectionMatch = MENU.find(
				(item) => item.sectionId === activeSection
			);
			if (sectionMatch) return sectionMatch.label;
		}
		return "home";
	}
	return null;
}

export default function MobileNav() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const activeSection = useActiveSection(SECTION_IDS, isHome);
	const activeLabel = resolveActiveLabel(pathname, activeSection);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!open) return;
		const handler = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open]);

	useEffect(() => {
		if (open) {
			const previous = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = previous;
			};
		}
	}, [open]);

	return (
		<>
			<header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-background px-5 md:hidden">
				<Link
					href="/"
					className="font-sans text-sm font-extrabold tracking-tight text-foreground"
				>
					{NAME_LINES.join(" ")}
				</Link>
				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Open menu"
					aria-expanded={open}
					aria-controls="mobile-drawer"
					className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors duration-200 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
				>
					<Icon icon={Menu} aria-hidden="true" />
				</button>
			</header>

			{open && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="Site menu"
					id="mobile-drawer"
					className="fixed inset-0 z-40 md:hidden"
				>
					<button
						type="button"
						aria-label="Close menu"
						onClick={() => setOpen(false)}
						className="absolute inset-0 bg-background/85 backdrop-blur-sm"
					/>
					<div className="absolute right-0 top-0 flex h-full w-[280px] max-w-[85vw] flex-col border-l border-border bg-background px-6 py-7">
						<div className="-mr-2 flex justify-end">
							<button
								type="button"
								onClick={() => setOpen(false)}
								aria-label="Close menu"
								className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors duration-200 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
							>
								<Icon icon={X} aria-hidden="true" />
							</button>
						</div>
						<div className="mt-2 flex-1">
							<SidebarContent
								pathname={pathname}
								activeLabel={activeLabel}
								onNavigate={() => setOpen(false)}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
