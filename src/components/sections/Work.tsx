import { ArrowUpRight } from "lucide-react";
import Icon from "../Icon";
import SectionEyebrow from "../ui/SectionEyebrow";
import { WORK } from "@/data/work";
import { RESUME_URL } from "@/lib/cloudinary";

export default function Work() {
	return (
		<section
			id="work"
			aria-labelledby="work-heading"
			className="reveal-on-scroll px-6 pt-20 pb-12 sm:px-10 sm:pt-24 sm:pb-16 lg:px-16"
		>
			<SectionEyebrow number="02" label="work" />

			<h2
				id="work-heading"
				className="mt-6 font-sans text-[clamp(28px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-foreground"
			>
				where i&rsquo;ve been working
			</h2>

			<ol className="mt-12">
				{WORK.map((item, index) => (
					<li
						key={item.id}
						className={index === WORK.length - 1 ? "border-b border-border" : ""}
					>
						<a
							href={RESUME_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="group block border-t border-border py-7 pl-0 transition-[padding] duration-300 ease-out hover:pl-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
						>
							<div className="flex items-start justify-between gap-4">
								<span className="font-mono text-[10px] uppercase tracking-[0.04em] text-muted">
									{item.dates}
								</span>
								<Icon
									icon={ArrowUpRight}
									size={14}
									aria-hidden="true"
									className="shrink-0 text-muted transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-accent motion-reduce:transition-none"
								/>
							</div>
							<h3 className="mt-2 font-mono text-sm text-foreground">
								{item.role}
								<span aria-hidden="true" className="mx-2 text-muted">
									·
								</span>
								<span className="text-muted">{item.company}</span>
							</h3>
							<p className="mt-2 max-w-[680px] font-mono text-[11px] leading-[1.55] text-muted">
								{item.description}
							</p>
						</a>
					</li>
				))}
			</ol>

			<p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
				<span aria-hidden="true">↗</span> rows open the full resume
			</p>
		</section>
	);
}
