import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/Icon";
import PhotographyGallery from "@/components/PhotographyGallery";
import { fetchPhotos } from "@/lib/cloudinary";

export const metadata = {
	title: "Photography — Arshad Anwer",
	description: "Wellington-shot, mixed aspect.",
};

export const revalidate = 3600;

export default async function Photography() {
	const photos = await fetchPhotos();

	return (
		<section
			id="photography"
			aria-labelledby="photography-heading"
			className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
		>
			<h1
				id="photography-heading"
				className="font-sans text-display-section font-extrabold leading-[0.95] tracking-tight text-foreground"
			>
				<span aria-hidden="true" className="text-accent">
					#
				</span>
				photography
			</h1>

			{photos.length === 0 ? (
				<p className="mt-12 font-mono text-sm text-muted sm:mt-16">
					{"// gallery wiring up — photos go live once Cloudinary is connected"}
				</p>
			) : (
				<PhotographyGallery photos={photos} />
			)}

			<div className="mt-16 border-t border-border pt-10 sm:mt-20 sm:pt-12">
				<p className="font-mono text-xs uppercase tracking-wider text-muted">
					<span aria-hidden="true" className="text-accent">
						↘
					</span>{" "}
					if you shoot too
				</p>
				<p className="mt-4 max-w-xl text-base leading-relaxed text-foreground sm:text-[15px]">
					Pixxellent is the digital asset platform I&rsquo;m building
					for high-resolution work. The contributor side is live in
					private beta; the public-facing site is coming.
				</p>
				<p className="mt-6">
					<a
						href="https://contributor.pixxellent.com"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 font-mono text-sm text-foreground transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:text-base"
					>
						<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
							visit contributor.pixxellent.com
						</span>
						<Icon
							icon={ArrowUpRight}
							size={16}
							className="text-accent"
							aria-hidden="true"
						/>
					</a>
				</p>
			</div>
		</section>
	);
}
