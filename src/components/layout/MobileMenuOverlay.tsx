"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";
import {
	CONTACT_EMAIL,
	LOCATION_LINE,
	MENU,
	ROLE_LINE,
	SOCIAL,
} from "@/data/sidebar";

interface MobileMenuOverlayProps {
	open: boolean;
	onClose: () => void;
	pathname: string;
	activeLabel: string | null;
}

export default function MobileMenuOverlay({
	open,
	onClose,
	pathname,
	activeLabel,
}: MobileMenuOverlayProps) {
	useEffect(() => {
		if (!open) return;
		const handler = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, onClose]);

	useEffect(() => {
		if (!open) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previous;
		};
	}, [open]);

	if (!open) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Site menu"
			id="mobile-overlay"
			className="fixed inset-0 z-40 md:hidden"
		>
			<button
				type="button"
				aria-label="Close menu"
				onClick={onClose}
				className="absolute inset-0 bg-background/85 backdrop-blur-sm"
			/>
			<div className="absolute inset-x-4 top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-border bg-background px-6 py-6">
				<div className="-mr-2 -mt-1 flex justify-end">
					<button
						type="button"
						onClick={onClose}
						aria-label="Close menu"
						className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
					>
						<Icon icon={X} aria-hidden="true" />
					</button>
				</div>

				<p className="font-mono text-[11px] lowercase tracking-[0.08em] text-muted">
					{ROLE_LINE}
				</p>
				<p className="font-mono text-[11px] lowercase tracking-[0.08em] text-muted">
					{LOCATION_LINE}
				</p>

				<nav aria-label="Sections" className="mt-8">
					<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
						menu
					</p>
					<ul className="mt-3 space-y-2">
						{MENU.map((item) => {
							const isActive = activeLabel === item.label;
							const ariaCurrent =
								isActive && item.routeMatch && pathname === item.routeMatch
									? ("page" as const)
									: isActive
									? ("location" as const)
									: undefined;
							return (
								<li key={item.label}>
									<Link
										href={item.href}
										onClick={onClose}
										aria-current={ariaCurrent}
										className={`flex items-center gap-2 font-mono text-base tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
											isActive
												? "text-accent"
												: "text-muted hover:text-foreground"
										}`}
									>
										<span
											aria-hidden="true"
											className={`inline-block w-3 ${
												isActive ? "text-accent" : "opacity-0"
											}`}
										>
											→
										</span>
										<span className="flex-1">{item.label}</span>
										{item.soon && (
											<span
												aria-label="coming soon"
												className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
											>
												soon
											</span>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<nav aria-label="Social" className="mt-8">
					<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
						social
					</p>
					<ul className="mt-3 space-y-2">
						{SOCIAL.map((item) => (
							<li key={item.label}>
								<a
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									onClick={onClose}
									className="flex items-center gap-2 font-mono text-base tracking-tight text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
								>
									<span aria-hidden="true" className="inline-block w-3 opacity-0">
										→
									</span>
									<span>{item.label}</span>
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div className="mt-8 space-y-4">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
							contact
						</p>
						<a
							href={`mailto:${CONTACT_EMAIL}`}
							onClick={onClose}
							className="mt-2 inline-block font-mono text-[13px] tracking-tight text-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
						>
							{CONTACT_EMAIL}
						</a>
					</div>
					<div className="flex items-center justify-between border-t border-border pt-3">
						<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
							theme
						</span>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</div>
	);
}
