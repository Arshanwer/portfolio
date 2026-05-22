import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Icon from "../Icon";
import SectionEyebrow from "../ui/SectionEyebrow";
import { fetchPhotos } from "@/lib/cloudinary";

export default async function PhotographyTeaser() {
	const { photos } = await fetchPhotos({ limit: 5 });

	return (
		<section
			id="photography"
			aria-labelledby="photography-teaser-heading"
			className="reveal-on-scroll mx-auto max-w-6xl px-6 pt-12 pb-12 sm:px-10 sm:pt-16 sm:pb-16 lg:px-16"
		>
			<SectionEyebrow number="05" label="photography" />

			<h2
				id="photography-teaser-heading"
				className="mt-6 font-sans text-[clamp(28px,5vw,52px)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-foreground"
			>
				things i&rsquo;ve pointed a lens at
			</h2>

			{photos.length === 0 ? (
				<p className="mt-10 font-mono text-sm text-muted">
					{
						"// gallery wiring up — photos go live once Cloudinary is connected"
					}
				</p>
			) : (
				<div className="mt-10 columns-1 gap-2 sm:columns-2 lg:columns-3">
					{photos.map((photo, index) => (
						<div key={photo.public_id} className="mb-2 break-inside-avoid">
							<Image
								src={photo.public_id}
								alt={photo.context?.custom?.alt ?? ""}
								width={photo.width}
								height={photo.height}
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
								priority={index < 3}
								placeholder={
									photo.blurDataURL ? "blur" : "empty"
								}
								blurDataURL={photo.blurDataURL}
								className="h-auto w-full"
							/>
						</div>
					))}
				</div>
			)}

			<p className="mt-8">
				<Link
					href="/photography"
					className="group inline-flex items-center gap-1.5 font-mono text-sm tracking-tight text-foreground transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
				>
					<span className="underline decoration-accent decoration-2 underline-offset-[6px]">
						view full gallery
					</span>
					<Icon
						icon={ArrowRight}
						size={14}
						aria-hidden="true"
						className="text-accent transition-transform duration-200 ease-out group-hover:translate-x-[2px] motion-reduce:transition-none"
					/>
				</Link>
			</p>
		</section>
	);
}
