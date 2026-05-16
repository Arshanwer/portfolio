"use client";

import { useEffect, useState } from "react";

export function useActiveSection(
	sectionIds: readonly string[],
	enabled: boolean
): string | null {
	const [active, setActive] = useState<string | null>(
		enabled ? sectionIds[0] ?? null : null
	);

	useEffect(() => {
		if (!enabled) {
			setActive(null);
			return;
		}

		const elements = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActive(entry.target.id);
					}
				}
			},
			{ rootMargin: "-40% 0px -55% 0px", threshold: 0 }
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [sectionIds, enabled]);

	return active;
}
