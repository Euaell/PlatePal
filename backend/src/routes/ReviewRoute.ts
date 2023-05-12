import { Router } from "express"
import ReviewController from "../controllers/ReviewController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.post("/", Authenticate.authenticate, ReviewController.create)
router.get("/user", Authenticate.authenticate, ReviewController.getReviewsByUser)

router.get("/", ReviewController.getReviews)
router.get("/:id", ReviewController.getReview)
router.get("/recipe/:recipeID", ReviewController.getReviewsByRecipe)

router.delete("/:id", Authenticate.authenticate, ReviewController.deleteReview)

export default router
