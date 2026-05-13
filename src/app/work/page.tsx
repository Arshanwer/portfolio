import { ArrowUpRight } from "lucide-react";
import Chip from "@/components/Chip";
import Icon from "@/components/Icon";

export const metadata = {
	title: "Work — Arshad Anwer",
	description: "Selected projects and case studies.",
};

const PIXXELLENT_STACK = [
	"Next.js",
	"TypeScript",
	"Fastify",
	"PostgreSQL",
	"Redis",
	"RabbitMQ",
	"AWS ECS",
	"GitHub Actions",
];

export default function WorkIndex() {
	return (
		<section
			id="work"
			aria-labelledby="work-heading"
			className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:py-28"
		>
			<h1
				id="work-heading"
				className="font-sans text-display-section font-extrabold leading-[0.95] tracking-tight text-foreground"
			>
				<span aria-hidden="true" className="text-accent">
					#
				</span>
				work
			</h1>

			<ul className="mt-12 sm:mt-16">
				<li>
					<a
						href="https://contributor.pixxellent.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit Pixxellent — digital asset platform (opens in new tab)"
						className="group block rounded-sm border border-border p-6 transition-colors duration-200 hover:border-accent focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:p-10"
					>
						<h2 className="font-sans text-3xl font-extrabold leading-none tracking-tight text-foreground sm:text-4xl lg:text-5xl">
							Pixxellent
						</h2>
						<p className="mt-3 text-xs uppercase tracking-wider text-muted sm:mt-4">
							digital asset platform &middot; private beta &middot; sept
							2024 &rarr; present
						</p>

						<p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground sm:text-[15px]">
							A specialized platform for high-resolution photography,
							currently in private beta with a closed circle of
							contributors. Built end-to-end &mdash; Next.js frontend,
							Fastify backend on PostgreSQL, with Redis caching and
							RabbitMQ asynchronous task queuing. Deployment automated
							through GitHub Actions to Amazon ECR and ECS.
						</p>

						<ul className="mt-6 flex flex-wrap gap-1.5">
							{PIXXELLENT_STACK.map((t) => (
								<li key={t}>
									<Chip>{t}</Chip>
								</li>
							))}
						</ul>

						<p className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-foreground transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent motion-reduce:transition-none sm:text-base">
							<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
								visit contributor.pixxellent.com
							</span>
							<Icon
								icon={ArrowUpRight}
								size={16}
								className="text-accent"
								aria-hidden="true"
							/>
						</p>
					</a>
				</li>
			</ul>

			<p className="mt-10 font-mono text-xs text-muted sm:mt-12">
				{"// more projects landing through 2026"}
			</p>
		</section>
	);
}
