import { Mail, Linkedin, Github, FileText } from "lucide-react";
import Icon from "./Icon";

const LINKS = [
	{
		href: "mailto:arshanwer91@gmail.com",
		label: "email",
		icon: Mail,
		external: false,
	},
	{
		href: "https://github.com/Arshanwer",
		label: "github",
		icon: Github,
		external: true,
	},
	{
		href: "https://www.linkedin.com/in/arshanwer",
		label: "linkedin",
		icon: Linkedin,
		external: true,
	},
	{
		href: "/resume.pdf",
		label: "resume",
		icon: FileText,
		external: true,
	},
] as const;

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-24 border-t border-border">
			<div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 text-sm sm:flex-row sm:items-center sm:justify-between">
				<p className="text-muted">
					<span aria-hidden="true" className="text-accent">
						↘
					</span>{" "}
					wellington, nz · {year}
				</p>
				<ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
					{LINKS.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								{...(link.external && {
									target: "_blank",
									rel: "noopener noreferrer",
								})}
								className="inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
							>
								<Icon icon={link.icon} size={14} aria-hidden="true" />
								{link.label}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="mx-auto max-w-5xl border-t border-border px-6 py-4 text-xs text-muted">
				built with Next.js · Geist · sage-lime / forest
			</div>
		</footer>
	);
}
