import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Mail } from "lucide-react";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";
import { CONTACT_EMAIL, SOCIAL } from "@/data/sidebar";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
	github: Github,
	linkedin: Linkedin,
};

export default function BottomRailPill() {
	return (
		<nav
			aria-label="Site utility"
			className="fixed bottom-5 right-5 z-30 hidden md:block"
		>
			<ul className="flex items-center gap-0.5 rounded-full border border-border bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-md">
				{SOCIAL.map((item) => {
					const IconComp = SOCIAL_ICONS[item.label];
					if (!IconComp) return null;
					return (
						<li key={item.label}>
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={item.label}
								className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
							>
								<Icon icon={IconComp} size={16} aria-hidden="true" />
							</a>
						</li>
					);
				})}
				<li>
					<a
						href={`mailto:${CONTACT_EMAIL}`}
						aria-label={`Email ${CONTACT_EMAIL}`}
						className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
					>
						<Icon icon={Mail} size={16} aria-hidden="true" />
					</a>
				</li>
				<li aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
				<li>
					<ThemeToggle />
				</li>
			</ul>
		</nav>
	);
}
