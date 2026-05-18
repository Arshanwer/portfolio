import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Chip from "@/components/Chip";
import Icon from "@/components/Icon";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { CONTACT_EMAIL } from "@/data/sidebar";
import { PROJECTS, getProject } from "@/data/projects";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return { title: "Project not found" };
	return {
		title: `${project.title} — Arshad Anwer`,
		description: project.description,
	};
}

export default async function ProjectPage({ params }: PageProps) {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();

	const isComingSoon = project.status === "coming-soon";

	return (
		<article className="mx-auto max-w-6xl px-6 pt-28 pb-24 sm:px-10 sm:pt-32 sm:pb-28 lg:px-16 lg:pt-36">
			<SectionEyebrow number="03" label="projects" />

			{isComingSoon && (
				<p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-accent">
					<span aria-hidden="true">[ </span>case study in progress
					<span aria-hidden="true"> ]</span>
				</p>
			)}

			<h1
				className={`font-sans text-[clamp(40px,8vw,80px)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-foreground ${
					isComingSoon ? "mt-4" : "mt-6"
				}`}
			>
				{project.title}
			</h1>

			{(project.subtitle || project.dates) && (
				<p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-muted">
					{project.subtitle}
					{project.subtitle && project.dates && (
						<span aria-hidden="true" className="mx-2">
							·
						</span>
					)}
					{project.dates}
				</p>
			)}

			<p className="mt-8 max-w-[640px] font-mono text-sm leading-[1.7] text-foreground sm:text-base">
				{project.description}
			</p>

			{project.body && project.body.length > 0 && (
				<div className="mt-6 max-w-[640px] space-y-5 font-mono text-sm leading-[1.7] text-muted sm:text-base">
					{project.body.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			)}

			<ul className="mt-8 flex flex-wrap gap-1.5">
				{project.tech.map((t) => (
					<li key={t}>
						<Chip>{t}</Chip>
					</li>
				))}
			</ul>

			{project.url && (
				<p className="mt-10">
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 font-mono text-sm text-foreground transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:text-base"
					>
						<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
							{project.urlLabel ?? project.url}
						</span>
						<Icon
							icon={ArrowUpRight}
							size={16}
							className="text-accent"
							aria-hidden="true"
						/>
					</a>
				</p>
			)}

			{isComingSoon && (
				<div className="mt-16 max-w-[640px] border-t border-border pt-8">
					<p className="font-mono text-sm leading-[1.7] text-muted">
						Detailed writeup in progress &mdash; screenshots, architecture
						notes, lessons learned from production. In the meantime, ask
						me about it:{" "}
						<a
							href={`mailto:${CONTACT_EMAIL}`}
							className="text-foreground underline decoration-accent decoration-2 underline-offset-[4px] transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
						>
							{CONTACT_EMAIL}
						</a>
					</p>
				</div>
			)}
		</article>
	);
}
