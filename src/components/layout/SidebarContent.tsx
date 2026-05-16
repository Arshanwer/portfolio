"use client";

import Link from "next/link";
import {
	CONTACT_EMAIL,
	LOCATION_LINE,
	MENU,
	ROLE_LINE,
	SOCIAL,
} from "@/data/sidebar";
import ThemeToggle from "../ThemeToggle";

interface SidebarContentProps {
	pathname: string;
	activeLabel: string | null;
	onNavigate?: () => void;
}

export default function SidebarContent({
	pathname,
	activeLabel,
	onNavigate,
}: SidebarContentProps) {
	return (
		<div className="flex h-full flex-col">
			<div>
				<p className="font-mono text-[11px] lowercase tracking-[0.08em] text-muted">
					{ROLE_LINE}
				</p>
				<p className="font-mono text-[11px] lowercase tracking-[0.08em] text-muted">
					{LOCATION_LINE}
				</p>
			</div>

			<nav aria-label="Sections" className="mt-12">
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
									onClick={onNavigate}
									aria-current={ariaCurrent}
									className={`group flex items-center gap-2 font-mono text-base tracking-tight transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
										isActive ? "text-foreground" : "text-muted"
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

			<nav aria-label="Social" className="mt-10">
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
								onClick={onNavigate}
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

			<div className="mt-auto space-y-4 pt-10">
				<div>
					<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
						contact
					</p>
					<a
						href={`mailto:${CONTACT_EMAIL}`}
						onClick={onNavigate}
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
	);
}
