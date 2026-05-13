export default function About() {
	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:py-28"
		>
			<h2
				id="about-heading"
				className="font-sans text-display-section font-extrabold leading-[0.95] tracking-tight text-foreground"
			>
				<span aria-hidden="true" className="text-accent">
					#
				</span>
				about
			</h2>

			<div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-foreground sm:mt-12 sm:text-[15px]">
				<p>
					I&rsquo;m a senior software engineer based in Wellington, New
					Zealand. Eleven years in, most of it building and scaling
					enterprise web apps across Node.js, .NET, and modern frontend
					frameworks &mdash; React, Vue, TypeScript. Lately my work has
					shifted toward platform engineering: AWS orchestration with
					Terraform and Ansible, GitHub Actions pipelines, internal CLI
					tooling that replaces brittle legacy scripts.
				</p>
				<p>
					I care about the parts of software that are easy to overlook
					&mdash; accessibility that actually meets WCAG AA, components
					other engineers want to reuse, deployment paths that fail
					clearly. I trained as a software engineer (BSc Hons, University
					of Staffordshire, 2013), and the underlying instinct
					hasn&rsquo;t changed: build the thing well, then make it boring
					to operate.
				</p>
				<p>
					Outside work I shoot photography, which is partly why I&rsquo;m
					building Pixxellent &mdash; a digital asset platform for
					high-resolution work.
				</p>
			</div>
		</section>
	);
}
