import type { ImageLoaderProps } from "next/image";

export interface CloudinaryPhoto {
	public_id: string;
	width: number;
	height: number;
	format: string;
	secure_url: string;
	context?: {
		custom?: {
			alt?: string;
			caption?: string;
		};
	};
}

interface SearchResponse {
	resources?: CloudinaryPhoto[];
}

export async function fetchPhotos(): Promise<CloudinaryPhoto[]> {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const apiKey = process.env.CLOUDINARY_API_KEY;
	const apiSecret = process.env.CLOUDINARY_API_SECRET;
	const folder = process.env.CLOUDINARY_FOLDER ?? "portfolio";

	if (!cloudName || !apiKey || !apiSecret) {
		return [];
	}

	const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Basic ${auth}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				expression: `folder:${folder}`,
				max_results: 100,
				sort_by: [{ created_at: "desc" }],
				with_field: ["context"],
			}),
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			console.error(`Cloudinary fetch failed: ${res.status}`);
			return [];
		}

		const data = (await res.json()) as SearchResponse;
		return data.resources ?? [];
	} catch (error) {
		console.error("Cloudinary fetch error:", error);
		return [];
	}
}

export function cloudinaryLoader({
	src,
	width,
	quality,
}: ImageLoaderProps): string {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const q = quality ?? "auto";
	return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_${q},f_auto,c_limit/${src}`;
}
