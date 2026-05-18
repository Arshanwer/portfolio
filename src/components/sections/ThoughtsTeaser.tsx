import Link from "next/link";
import SectionEyebrow from "../ui/SectionEyebrow";

export default function ThoughtsTeaser() {
	return (
		<section
			id="thoughts"
			aria-labelledby="thoughts-teaser-heading"
			className="reveal-on-scroll mx-auto max-w-6xl px-6 pt-12 pb-24 sm:px-10 sm:pt-16 sm:pb-28 lg:px-16"
		>
			<SectionEyebrow number="06" label="thoughts" />

			<p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-accent">
				<span aria-hidden="true">[ </span>coming soon
				<span aria-hidden="true"> ]</span>
			</p>

			<h2
				id="thoughts-teaser-heading"
				className="mt-4 font-sans text-[clamp(28px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-foreground"
			>
				<Link
					href="/thoughts"
					className="transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
				>
					a blog about building things that don&rsquo;t break
				</Link>
			</h2>

			<p className="mt-8 max-w-[640px] font-mono text-sm leading-[1.7] text-muted sm:text-base">
				Notes on platform engineering, the seam between front-end and infra,
				and the unglamorous discipline of making systems boring to operate.
				The first posts are drafting; subscribe by email if you want a ping
				when the first lands.
			</p>
		</section>
	);
}
