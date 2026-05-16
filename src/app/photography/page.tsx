import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/Icon";
import PhotographyGallery from "@/components/PhotographyGallery";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
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
			className="px-6 pt-20 pb-24 sm:px-10 sm:pt-24 sm:pb-28 lg:px-16 lg:pt-28"
		>
			<SectionEyebrow number="05" label="photography" />

			<h1
				id="photography-heading"
				className="mt-6 font-sans text-[clamp(40px,8vw,80px)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-foreground"
			>
				photography
			</h1>

			<p className="mt-8 max-w-[640px] font-mono text-sm leading-[1.7] text-muted sm:text-base">
				Streets, mountains, and what shows up in front of the camera between
				them. Mostly Wellington, sometimes elsewhere. Shot on a mix of
				digital and film.
			</p>

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
				<p className="mt-4 max-w-xl font-mono text-sm leading-[1.7] text-foreground sm:text-base">
					Pixxellent is the digital asset platform I&rsquo;m building for
					high-resolution work. The contributor side is live in private
					beta; the public-facing site is coming.
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
