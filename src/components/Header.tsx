"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
	{ href: "/", label: "home" },
	{ href: "/work", label: "work" },
	{ href: "/photography", label: "photography" },
] as const;

function isActive(pathname: string, href: string): boolean {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background">
			<div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
				<nav aria-label="Primary" className="hidden md:block">
					<ul className="flex items-center gap-8">
						{NAV_LINKS.map((link) => {
							const active = isActive(pathname, link.href);
							return (
								<li key={link.href}>
									<Link
										href={link.href}
										aria-current={active ? "page" : undefined}
										className={`inline-flex border-b-2 py-1 text-sm tracking-tight transition-colors duration-200 motion-reduce:transition-none ${
											active
												? "border-accent text-foreground"
												: "border-transparent text-muted hover:text-foreground"
										}`}
									>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<button
					type="button"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					aria-controls="mobile-menu"
					onClick={() => setOpen((v) => !v)}
					className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors duration-200 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none md:hidden"
				>
					{open ? (
						<Icon icon={X} aria-hidden="true" />
					) : (
						<Icon icon={Menu} aria-hidden="true" />
					)}
				</button>

				<ThemeToggle />
			</div>

			{open && (
				<nav
					id="mobile-menu"
					aria-label="Primary mobile"
					className="border-t border-border bg-background md:hidden"
				>
					<ul className="mx-auto flex max-w-5xl flex-col px-6 py-2">
						{NAV_LINKS.map((link) => {
							const active = isActive(pathname, link.href);
							return (
								<li key={link.href}>
									<Link
										href={link.href}
										onClick={() => setOpen(false)}
										aria-current={active ? "page" : undefined}
										className={`flex items-center gap-2 py-3 text-sm tracking-tight transition-colors duration-200 motion-reduce:transition-none ${
											active
												? "text-foreground"
												: "text-muted hover:text-foreground"
										}`}
									>
										<span
											aria-hidden="true"
											className={
												active
													? "text-accent"
													: "text-transparent"
											}
										>
											#
										</span>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			)}
		</header>
	);
}
