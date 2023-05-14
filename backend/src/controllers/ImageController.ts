import { Response, Request, NextFunction } from "express";
import cloudinary, { UploadApiResponse } from 'cloudinary';
import configs from "../config/configs";

cloudinary.v2.config({
  cloud_name: configs.CLOUDINARY_NAME,
  api_key: configs.CLOUDINARY_API_KEY,
  api_secret: configs.CLOUDINARY_API_SECRET
});

export default class ImageController {
	public static async uploadImage( req: Request, res: Response, next: NextFunction) : Promise<Response> {
		try {
			const file = req.file
			if (!file) {
				return res.status(400).json({ message: 'Please upload a file' })
			}

			await cloudinary.v2.uploader.upload_stream((error: any, result: UploadApiResponse) => {
				if (error) {
					return res.status(400).json({ message: error.message })
				}
				return res.status(200).json({ message: 'File uploaded successfully', data: result })
			}).end(file.buffer)

		} catch (error) {
			next(error)
		}
	}

	public static async uploadImages( req: Request, res: Response, next: NextFunction) : Promise<Response> {
		try {
			const files: any = req.files
			if (!files) {
				return res.status(400).json({ message: 'Please upload a file' })
			}

			const result = await Promise.all(
				files.map(async (file: any) => {
					return new Promise((resolve, reject) => {
						cloudinary.v2.uploader.upload_stream((error: any, result: UploadApiResponse) => {
							if (error) {
								reject(error)
							}
							resolve(result)
						}).end(file.buffer)
					})
				})
			)

			return res.status(200).json({ message: 'File uploaded successfully', data: result })
		} catch (error) {
			next(error)
		}
	}
}