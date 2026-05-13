import Image from "next/image";
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
				<div className="mt-12 columns-1 gap-4 sm:mt-16 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
					{photos.map((photo) => (
						<figure
							key={photo.public_id}
							className="mb-4 break-inside-avoid sm:mb-5 lg:mb-6"
						>
							{/* alt is read from Cloudinary's contextual metadata
							    (Settings → Asset → Metadata → Context → alt).
							    Empty fallback is acceptable here because the
							    parent section's heading provides gallery context. */}
							<Image
								src={photo.public_id}
								alt={photo.context?.custom?.alt ?? ""}
								width={photo.width}
								height={photo.height}
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
								className="h-auto w-full"
							/>
						</figure>
					))}
				</div>
			)}
		</section>
	);
}
