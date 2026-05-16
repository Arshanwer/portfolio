import type { Metadata } from "next";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { CONTACT_EMAIL } from "@/data/sidebar";

export const metadata: Metadata = {
	title: "Thoughts — Arshad Anwer",
	description:
		"Notes on platform engineering and the seam between front-end and infra. Coming soon.",
};

export default function ThoughtsPage() {
	return (
		<article className="px-6 pt-20 pb-24 sm:px-10 sm:pt-24 sm:pb-28 lg:px-16 lg:pt-28">
			<SectionEyebrow number="06" label="thoughts" />

			<p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
				<span aria-hidden="true">[ </span>coming soon
				<span aria-hidden="true"> ]</span>
			</p>

			<h1 className="mt-4 font-sans text-[clamp(40px,8vw,80px)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-foreground">
				a blog about building things that don&rsquo;t break
			</h1>

			<div className="mt-10 max-w-[640px] space-y-5 font-mono text-[13px] leading-[1.7] text-muted">
				<p>
					The posts I&rsquo;d like to write live at the seam between
					front-end and platform &mdash; reliable releases, internal
					tooling that earns its keep, the small operational habits that
					separate systems that page you on a Sunday from systems that
					don&rsquo;t.
				</p>
				<p>
					Less manifesto, more notebook. Specific examples from real work,
					with names changed where they need to be. The first posts are
					drafting now.
				</p>
				<p>
					Want a ping when the first one lands? Email me at{" "}
					<a
						href={`mailto:${CONTACT_EMAIL}`}
						className="text-foreground underline decoration-accent decoration-2 underline-offset-[4px] transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
					>
						{CONTACT_EMAIL}
					</a>{" "}
					and I&rsquo;ll add you to a short list.
				</p>
			</div>
		</article>
	);
}
