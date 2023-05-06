import { Router } from "express"
import ImageController from "../controllers/ImageController"
import {ImageUpload} from "../middlewares/ImageUploader";

const router = Router()

router.post("/", ImageUpload.single("Profile"), ImageController.uploadImage)
router.post("/multiple", ImageUpload.array("Images", 10), ImageController.uploadImages)
export default router