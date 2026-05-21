"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Icon from "./Icon";
import type { CloudinaryPhoto } from "@/lib/cloudinary";

interface PhotographyGalleryProps {
	photos: CloudinaryPhoto[];
}

export default function PhotographyGallery({ photos }: PhotographyGalleryProps) {
	const [selectedPhoto, setSelectedPhoto] = useState<CloudinaryPhoto | null>(
		null,
	);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const close = useCallback(() => setSelectedPhoto(null), []);

	useEffect(() => {
		if (!selectedPhoto) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				close();
			} else if (e.key === "Tab") {
				// Single focusable element — keep focus on close button
				e.preventDefault();
				closeButtonRef.current?.focus();
			}
		};
		document.addEventListener("keydown", onKey);

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		closeButtonRef.current?.focus();

		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
			triggerRef.current?.focus();
		};
	}, [selectedPhoto, close]);

	return (
		<>
			<div className="mt-12 columns-1 gap-2 sm:columns-2 lg:columns-3 sm:mt-16">
				{photos.map((photo, index) => (
					<button
						key={photo.public_id}
						type="button"
						onClick={(e) => {
							triggerRef.current = e.currentTarget;
							setSelectedPhoto(photo);
						}}
						aria-label={`Open ${
							photo.context?.custom?.alt ?? "photograph"
						} in full size`}
						className="mb-2 block w-full cursor-zoom-in break-inside-avoid overflow-hidden border border-transparent p-0 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
					>
						<Image
							src={photo.public_id}
							alt={photo.context?.custom?.alt ?? ""}
							width={photo.width}
							height={photo.height}
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							priority={index < 3}
							placeholder={photo.blurDataURL ? "blur" : "empty"}
							blurDataURL={photo.blurDataURL}
							className="h-auto w-full"
						/>
					</button>
				))}
			</div>

			{selectedPhoto && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label={
						selectedPhoto.context?.custom?.alt ?? "Photograph"
					}
					onClick={close}
					className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm sm:p-8"
				>
					<button
						ref={closeButtonRef}
						type="button"
						onClick={close}
						aria-label="Close"
						className="absolute right-4 top-4 rounded-full bg-foreground/10 p-2 text-foreground transition-colors hover:bg-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
					>
						<Icon icon={X} aria-hidden="true" />
					</button>
					<div
						onClick={(e) => e.stopPropagation()}
						className="relative"
						style={{
							aspectRatio: `${selectedPhoto.width} / ${selectedPhoto.height}`,
							width: `min(95vw, calc(90vh * ${selectedPhoto.width} / ${selectedPhoto.height}))`,
						}}
					>
						<Image
							src={selectedPhoto.public_id}
							alt={selectedPhoto.context?.custom?.alt ?? ""}
							fill
							sizes="95vw"
							priority
							placeholder={
								selectedPhoto.blurDataURL ? "blur" : "empty"
							}
							blurDataURL={selectedPhoto.blurDataURL}
							className="object-contain"
						/>
					</div>
				</div>
			)}
		</>
	);
}
