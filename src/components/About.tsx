export default function About() {
	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
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
					The parts of software I care about are usually the ones easy
					to ignore &mdash; the seams between the front-end, back-end,
					and data that hold up as the system grows, components other
					engineers reach for, deploys that fail loudly when they fail.
					The underlying instinct hasn&rsquo;t really changed: build it
					properly, then make it dull to run.
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
