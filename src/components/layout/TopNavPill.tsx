"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Icon from "../Icon";
import { MENU, SECTION_IDS, resolveActiveLabel } from "@/data/sidebar";
import { useActiveSection } from "@/hooks/useActiveSection";
import MobileMenuOverlay from "./MobileMenuOverlay";

export default function TopNavPill() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const activeSection = useActiveSection(SECTION_IDS, isHome);
	const activeLabel = resolveActiveLabel(pathname, activeSection);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	return (
		<>
			<nav
				aria-label="Primary"
				className="fixed left-1/2 top-5 z-30 hidden -translate-x-1/2 md:block"
			>
				<ul className="flex items-center gap-0.5 rounded-full border border-border bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-md">
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
									aria-current={ariaCurrent}
									className={`inline-block rounded-full px-3 py-1.5 font-mono text-sm lowercase tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
										isActive
											? "text-accent"
											: "text-muted hover:text-foreground"
									}`}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="fixed left-1/2 top-4 z-30 -translate-x-1/2 md:hidden">
				<button
					type="button"
					onClick={() => setMobileOpen(true)}
					aria-label="Open menu"
					aria-expanded={mobileOpen}
					aria-controls="mobile-overlay"
					className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
				>
					<Icon icon={Menu} size={18} aria-hidden="true" />
				</button>
			</div>

			<MobileMenuOverlay
				open={mobileOpen}
				onClose={() => setMobileOpen(false)}
				pathname={pathname}
				activeLabel={activeLabel}
			/>
		</>
	);
}
