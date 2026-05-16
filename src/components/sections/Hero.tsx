import Chip from "../Chip";
import SectionEyebrow from "../ui/SectionEyebrow";
import StatusPulse from "../ui/StatusPulse";

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
			className="flex min-h-[85vh] flex-col justify-between px-6 pt-[60px] pb-[50px] sm:px-10 lg:px-16"
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

				<p className="mt-10 max-w-[92%] font-mono text-[13px] leading-[1.65] text-muted sm:max-w-[640px] sm:text-sm">
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
			</div>

			<p className="mt-12 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
				<span aria-hidden="true">↓</span> scroll, or use the sidebar
			</p>
		</section>
	);
}
