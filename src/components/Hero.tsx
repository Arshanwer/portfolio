export default function Hero() {
	return (
		<section className="px-6 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32 lg:px-12 lg:pt-32 lg:pb-40">
			<h1 className="font-sans text-display-hero font-black leading-[0.92] tracking-tight text-foreground">
				Arshad Anwer
			</h1>
			<p className="mt-8 text-sm leading-relaxed text-muted sm:text-base">
				senior software engineer
				<span
					className="mx-2 hidden sm:inline"
					aria-hidden="true"
				>
					·
				</span>
				<br className="sm:hidden" />
				wellington, nz
			</p>
			<p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
				eleven years building enterprise web apps; lately, the{" "}
				<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
					infrastructure
				</span>{" "}
				they run on too.
			</p>
		</section>
	);
}
