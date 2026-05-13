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
		</section>
	);
}
