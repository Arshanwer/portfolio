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
						className={
							index === WORK.length - 1 ? "border-b border-border" : ""
						}
					>
						<div className="border-t border-border py-7">
							<p className="font-mono text-xs uppercase tracking-[0.04em] text-muted">
								{item.dates}
							</p>
							<h3 className="mt-2 font-mono text-[15px] text-foreground">
								{item.role}
								<span aria-hidden="true" className="mx-2 text-muted">
									·
								</span>
								<span className="text-muted">{item.company}</span>
							</h3>
							<p className="mt-2 max-w-[680px] font-mono text-sm leading-[1.65] text-muted">
								{item.description}
							</p>
						</div>
					</li>
				))}
			</ol>

			<p className="mt-8">
				<a
					href={RESUME_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="group inline-flex items-center gap-1.5 font-mono text-sm tracking-tight text-foreground transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
				>
					<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
						view full resume
					</span>
					<Icon
						icon={ArrowUpRight}
						size={14}
						aria-hidden="true"
						className="text-accent transition-transform duration-200 ease-out group-hover:-translate-y-[1px] group-hover:translate-x-[1px] motion-reduce:transition-none"
					/>
				</a>
			</p>
		</section>
	);
}
