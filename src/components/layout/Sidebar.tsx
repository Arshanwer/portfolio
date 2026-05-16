"use client";

import { usePathname } from "next/navigation";
import { SECTION_IDS, resolveActiveLabel } from "@/data/sidebar";
import { useActiveSection } from "@/hooks/useActiveSection";
import SidebarContent from "./SidebarContent";

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
