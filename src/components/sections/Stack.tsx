import Chip from "../Chip";
import SectionEyebrow from "../ui/SectionEyebrow";
import { STACK } from "@/data/stack";

export default function Stack() {
	return (
		<section
			id="stack"
			aria-labelledby="stack-heading"
			className="reveal-on-scroll px-6 pt-12 pb-12 sm:px-10 sm:pt-16 sm:pb-16 lg:px-16"
		>
			<SectionEyebrow number="04" label="stack" />

			<h2
				id="stack-heading"
				className="mt-6 font-sans text-[clamp(28px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-foreground"
			>
				tools of the trade
			</h2>

			<dl className="mt-12 space-y-8">
				{STACK.map((category) => (
					<div
						key={category.label}
						className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6"
					>
						<dt className="font-mono text-xs uppercase tracking-[0.1em] text-accent sm:w-[110px] sm:shrink-0 sm:pt-1.5">
							{category.label}
						</dt>
						<dd>
							<ul className="flex flex-wrap gap-1.5">
								{category.items.map((item) => (
									<li key={item}>
										<Chip>{item}</Chip>
									</li>
								))}
							</ul>
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
