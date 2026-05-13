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

export async function fetchPhotos(): Promise<CloudinaryPhoto[]> {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const apiKey = process.env.CLOUDINARY_API_KEY;
	const apiSecret = process.env.CLOUDINARY_API_SECRET;
	const folder = process.env.CLOUDINARY_FOLDER ?? "portfolio";

	if (!cloudName || !apiKey || !apiSecret) {
		return [];
	}

	const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
	const params = new URLSearchParams({
		asset_folder: folder,
		max_results: "100",
		context: "true",
	});
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
			return [];
		}

		const data = (await res.json()) as ListResponse;
		const photos = data.resources ?? [];

		return Promise.all(
			photos.map(async (photo) => ({
				...photo,
				blurDataURL: await fetchBlurDataURL(photo.public_id, cloudName),
			})),
		);
	} catch (error) {
		console.error("Cloudinary fetch error:", error);
		return [];
	}
}
