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

interface ListResponse {
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
		return data.resources ?? [];
	} catch (error) {
		console.error("Cloudinary fetch error:", error);
		return [];
	}
}
