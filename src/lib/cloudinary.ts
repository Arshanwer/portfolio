export const RESUME_URL = (() => {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	if (!cloudName) return "/resume.pdf";
	return `https://res.cloudinary.com/${cloudName}/image/upload/ArshadAnwerCv.pdf`;
})();

export interface CloudinaryPhoto {
	public_id: string;
	width: number;
	height: number;
	format: string;
	secure_url: string;
	blurDataURL?: string;
	context?: {
		custom?: {
			alt?: string;
			caption?: string;
		};
	};
}

interface ListResponse {
	resources?: CloudinaryPhoto[];
	next_cursor?: string;
}

export interface PhotoPage {
	photos: CloudinaryPhoto[];
	nextCursor: string | null;
}

async function fetchBlurDataURL(
	publicId: string,
	cloudName: string,
): Promise<string | undefined> {
	const url = `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_16,e_blur:1500,q_30,f_jpg/${publicId}`;
	try {
		const res = await fetch(url, { next: { revalidate: 3600 } });
		if (!res.ok) return undefined;
		const buffer = await res.arrayBuffer();
		const base64 = Buffer.from(buffer).toString("base64");
		return `data:image/jpeg;base64,${base64}`;
	} catch {
		return undefined;
	}
}

interface FetchPhotosOptions {
	cursor?: string;
	limit?: number;
}

export async function fetchPhotos({
	cursor,
	limit = 12,
}: FetchPhotosOptions = {}): Promise<PhotoPage> {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const apiKey = process.env.CLOUDINARY_API_KEY;
	const apiSecret = process.env.CLOUDINARY_API_SECRET;
	const folder = process.env.CLOUDINARY_FOLDER ?? "portfolio";

	if (!cloudName || !apiKey || !apiSecret) {
		return { photos: [], nextCursor: null };
	}

	const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
	const params = new URLSearchParams({
		asset_folder: folder,
		max_results: String(limit),
		context: "true",
	});
	if (cursor) params.set("next_cursor", cursor);
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?${params}`;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Basic ${auth}`,
			},
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			console.error(`Cloudinary fetch failed: ${res.status}`);
			return { photos: [], nextCursor: null };
		}

		const data = (await res.json()) as ListResponse;
		const resources = data.resources ?? [];
		const photos = await Promise.all(
			resources.map(async (photo) => ({
				...photo,
				blurDataURL: await fetchBlurDataURL(photo.public_id, cloudName),
			})),
		);
		return {
			photos,
			nextCursor: data.next_cursor ?? null,
		};
	} catch (error) {
		console.error("Cloudinary fetch error:", error);
		return { photos: [], nextCursor: null };
	}
}
