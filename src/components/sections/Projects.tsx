import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "../Icon";
import Chip from "../Chip";
import SectionEyebrow from "../ui/SectionEyebrow";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
	return (
		<section
			id="projects"
			aria-labelledby="projects-heading"
			className="reveal-on-scroll px-6 pt-12 pb-12 sm:px-10 sm:pt-16 sm:pb-16 lg:px-16"
		>
			<SectionEyebrow number="03" label="projects" />

			<h2
				id="projects-heading"
				className="mt-6 font-sans text-[clamp(28px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-foreground"
			>
				selected projects
			</h2>

			<ol className="mt-12">
				{PROJECTS.map((project, index) => (
					<li
						key={project.slug}
						className={
							index === PROJECTS.length - 1 ? "border-b border-border" : ""
						}
					>
						<Link
							href={`/projects/${project.slug}`}
							className="group block border-t border-border py-8 pl-0 transition-[padding] duration-300 ease-out hover:pl-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
						>
							<div className="flex items-start justify-between gap-4">
								<span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
									_{String(index + 1).padStart(2, "0")}
								</span>
								<Icon
									icon={ArrowUpRight}
									size={14}
									aria-hidden="true"
									className="shrink-0 text-muted transition-all duration-300 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-accent motion-reduce:transition-none"
								/>
							</div>
							<h3 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-foreground">
								{project.title}
							</h3>
							<p className="mt-2 max-w-[680px] font-mono text-[11px] leading-[1.6] text-muted">
								{project.description}
							</p>
							<ul className="mt-4 flex flex-wrap gap-1.5">
								{project.tech.map((t) => (
									<li key={t}>
										<Chip>{t}</Chip>
									</li>
								))}
							</ul>
						</Link>
					</li>
				))}
			</ol>

			<p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
				<span aria-hidden="true">_</span> more projects landing through 2026
			</p>
		</section>
	);
}
