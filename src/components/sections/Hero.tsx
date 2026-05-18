import Chip from "../Chip";
import SectionEyebrow from "../ui/SectionEyebrow";
import StatusPulse from "../ui/StatusPulse";
import { CONTACT_EMAIL } from "@/data/sidebar";

const HERO_CHIPS = [
	"TypeScript",
	"Node.js",
	"React",
	"AWS",
	"Terraform",
	"GitHub Actions",
] as const;

export default function Hero() {
	return (
		<section
			id="hello"
			aria-labelledby="hero-heading"
			className="mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-between px-6 pt-24 pb-[50px] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36"
		>
			<div>
				<SectionEyebrow number="01" label="hello" />

				<h1
					id="hero-heading"
					className="mt-10 font-sans text-display-hero font-extrabold uppercase leading-[0.88] tracking-[-0.045em] text-foreground"
				>
					<span className="block">arshad</span>
					<span className="block">anwer</span>
				</h1>

				<p className="mt-10 max-w-[640px] font-mono text-sm leading-[1.7] text-muted sm:text-base">
					Senior software engineer in{" "}
					<span className="text-foreground">Wellington, NZ</span>. Eleven
					years building enterprise web apps in Node, .NET, React, Vue.
					Lately the{" "}
					<span className="text-foreground">infrastructure</span> they
					run on too &mdash; AWS with Terraform and Ansible, GitHub
					Actions pipelines, internal CLI tools that replace brittle
					legacy scripts. The instinct hasn&rsquo;t really changed:{" "}
					<span className="text-foreground">
						build it properly, then make it dull to run
					</span>
					.
				</p>

				<div className="mt-10">
					<StatusPulse label="currently at totara — open to remote conversations" />
				</div>

				<ul className="mt-8 flex flex-wrap gap-1.5">
					{HERO_CHIPS.map((label) => (
						<li key={label}>
							<Chip>{label}</Chip>
						</li>
					))}
				</ul>

				<p className="mt-8">
					<a
						href={`mailto:${CONTACT_EMAIL}`}
						className="inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:text-base"
					>
						<span aria-hidden="true" className="text-accent">
							↘
						</span>
						<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
							{CONTACT_EMAIL}
						</span>
					</a>
				</p>
			</div>

			<p className="mt-12 font-mono text-xs uppercase tracking-[0.14em] text-muted/70">
				<span aria-hidden="true">↓</span> scroll, or jump via the top menu
			</p>
		</section>
	);
}
