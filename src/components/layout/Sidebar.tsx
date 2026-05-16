"use client";

import { usePathname } from "next/navigation";
import { MENU, SECTION_IDS } from "@/data/sidebar";
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

export default function Sidebar() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const activeSection = useActiveSection(SECTION_IDS, isHome);
	const activeLabel = resolveActiveLabel(pathname, activeSection);

	return (
		<aside
			aria-label="Primary"
			className="sticky top-0 hidden h-screen w-[180px] shrink-0 border-r border-border bg-background px-5 py-7 md:block"
		>
			<SidebarContent pathname={pathname} activeLabel={activeLabel} />
		</aside>
	);
}
