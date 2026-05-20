import SectionEyebrow from "../ui/SectionEyebrow";
import { CONTACT_EMAIL, LOCATION_LINE, SOCIAL } from "@/data/sidebar";
import { RESUME_URL } from "@/lib/cloudinary";

export default function Contact() {
	return (
		<section
			id="contact"
			aria-labelledby="contact-heading"
			className="reveal-on-scroll mx-auto max-w-6xl px-6 pt-12 pb-24 sm:px-10 sm:pt-16 sm:pb-28 lg:px-16"
		>
			<SectionEyebrow number="07" label="contact" />

			<h2
				id="contact-heading"
				className="mt-6 font-sans text-[clamp(32px,6vw,72px)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-foreground"
			>
				let&rsquo;s build
				<br />
				something dull
				<br />
				<span className="text-accent">to run.</span>
			</h2>

			<p className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">
				<span
					aria-hidden="true"
					className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
				/>
				<span>open to senior / staff roles — remote-friendly</span>
			</p>

			<p className="mt-6 max-w-[640px] font-mono text-sm leading-[1.7] text-muted sm:text-base">
				Happy to chat about platform engineering, the seam between
				front-end and infra, or whether your CI pipeline really needs that
				fourth caching layer.
			</p>

			<p className="mt-10">
				<a
					href={`mailto:${CONTACT_EMAIL}`}
					className="inline-flex items-center gap-3 font-mono text-base text-foreground transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:text-xl"
				>
					<span aria-hidden="true" className="text-accent">
						↘
					</span>
					<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
						{CONTACT_EMAIL}
					</span>
				</a>
			</p>

			<ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm text-muted">
				{SOCIAL.map((item) => (
					<li key={item.label}>
						<a
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							className="transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
						>
							{item.label} <span aria-hidden="true">↗</span>
						</a>
					</li>
				))}
				<li>
					<a
						href={RESUME_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
					>
						resume <span aria-hidden="true">↗</span>
					</a>
				</li>
				<li aria-hidden="true" className="hidden text-muted/60 sm:block">
					·
				</li>
				<li className="basis-full text-muted/80 sm:basis-auto">
					{LOCATION_LINE}
				</li>
			</ul>
		</section>
	);
}
