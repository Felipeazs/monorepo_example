import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"

import { env } from "../../t3-env"

cloudinary.config({
	cloud_name: env.CLOUDINARY_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
	secure: env.NODE_ENV === "production",
})

export async function uploadImage(image: string, id: string): Promise<UploadApiResponse> {
	const res = await cloudinary.uploader.upload(`data:image/webp;base64,${image}`, {
		resource_type: "image",
		public_id: id,
		folder: "profiles",
		overwrite: true,
		transformation: [
			{
				width: 50,
				crop: "scale",
			},
			{ radius: "max" },
			{ quality: "auto" },
		],
	})

	return res
}
