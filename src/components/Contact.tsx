import { Github, Linkedin, FileText } from "lucide-react";
import Icon from "./Icon";

const SECONDARY_LINKS = [
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

export default function Contact() {
	return (
		<section
			id="contact"
			aria-labelledby="contact-heading"
			className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:py-28"
		>
			<h2
				id="contact-heading"
				className="font-sans text-display-section font-extrabold leading-[0.95] tracking-tight text-foreground"
			>
				<span aria-hidden="true" className="text-accent">
					#
				</span>
				contact
			</h2>

			<p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground sm:text-[15px]">
				Always up for a good conversation &mdash; engineering,
				infrastructure, photography, or building things on the internet.
			</p>

			<a
				href="mailto:contact@arshadanwer.com"
				className="mt-10 inline-block font-mono text-xl tracking-tight text-foreground underline decoration-accent decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:mt-12 sm:text-2xl lg:text-3xl"
			>
				contact@arshadanwer.com
			</a>

			<ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
				{SECONDARY_LINKS.map((link) => (
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

			<p className="mt-10 text-xs uppercase tracking-wider text-muted">
				<span aria-hidden="true" className="text-accent">
					↘
				</span>{" "}
				wellington, nz &middot; open to remote
			</p>
		</section>
	);
}
