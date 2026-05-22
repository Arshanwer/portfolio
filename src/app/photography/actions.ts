"use server";

import { fetchPhotos, type PhotoPage } from "@/lib/cloudinary";

export async function loadMorePhotos(cursor: string): Promise<PhotoPage> {
	return fetchPhotos({ cursor, limit: 12 });
}
