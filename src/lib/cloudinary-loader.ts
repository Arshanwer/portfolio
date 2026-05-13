"use client";

interface LoaderProps {
	src: string;
	width: number;
	quality?: number;
}

export default function cloudinaryLoader({
	src,
	width,
	quality,
}: LoaderProps): string {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const q = quality ?? "auto";
	return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_${q},f_auto,c_limit/${src}`;
}
