import { Router } from "express"
import {RecipesController} from "../controllers/RecipesController"
import Authenticate from "../middlewares/Authenticate"

const router = Router()

router.get("/", RecipesController.getRecipies)
router.get("/:id", RecipesController.getRecipe)
router.post("/", Authenticate.authenticate, RecipesController.createRecipe)

// TODO: add an ownership middleware
router.put("/:id", Authenticate.authenticate, RecipesController.updateRecipe)
router.delete("/:id", Authenticate.authenticate, RecipesController.deleteRecipe)

export default router