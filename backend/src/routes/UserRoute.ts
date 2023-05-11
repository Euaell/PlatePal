import { Router } from "express"
import UserController from "../controllers/UserController"
import Authenticate from "../middlewares/Authenticate";

const router = Router()

router.get("/", UserController.getUsers)
router.post("/", UserController.createUser)

router.post("/login", UserController.loginUser)
router.post("/logout", Authenticate.authenticate, UserController.logoutUser)
router.get("/verifyuser", Authenticate.authenticate, UserController.verifyUser)

router.get("/:id", UserController.getUser)

// TODO: check if the user is an admin or the user himself
router.put("/:id", Authenticate.authenticate, UserController.updateUser)

// TODO: add a separate authorization middleware,
// 		 which will check if the user is an admin or the user himself
router.delete("/:id", Authenticate.authenticate, Authenticate.authorize, UserController.deleteUser)

router.get("/addFavoriteRecipe/:recipe", Authenticate.authenticate, UserController.addFavoriteRecipe)
router.get("/removeFavoriteRecipe/:recipe", Authenticate.authenticate, UserController.removeFavoriteRecipe)

export default router