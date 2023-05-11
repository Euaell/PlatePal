import { Response, Request, NextFunction } from "express"
import User, { IUser } from "../models/UserModel"
import UnverifiedUserModel, { IUnverifiedUser } from "../models/UnverifiedUserModel";
import UserModel from "../models/UserModel";
import configs from "../config/configs";
import jwt from 'jsonwebtoken'

export default class UserController {
    public static async getUsers( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const users: IUser[] = await User.find().select("-Password")
            return res.status(200).json({users})
        } catch (error) {
            next(error)
        }
    }

    public static async getUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const user: IUser | null = await User.findById(req.params.id).select("-Password")
            if (user) {
                return res.status(200).json({user})
            } else {
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            next(error)
        }
    }

    public static async createUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { Email, verificationCode, Username, Password, ProfilePic } = req.body

            const unverifiedUser: IUnverifiedUser | null = await UnverifiedUserModel.findOne({ email: Email })
			if (unverifiedUser) {
                const authMessage: string = await unverifiedUser.verifyCode(verificationCode)
                if (authMessage !== "Success") {
                    return res.status(400).json({verificationCode: authMessage})
                }
                await UnverifiedUserModel.findByIdAndDelete(unverifiedUser._id)
			} else {
				return res.status(404).json({message: "User not found"})
			}

            const user: IUser = await User.create({ Email, Username, Password, ProfilePic })
            return res.status(201).json({user})
        } catch (error) {
            next(error)
        }
    }

    public static async loginUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { Email, Password } = req.body
            const user: IUser | null = await UserModel.findOne({Email}).populate("FavoriteRecipes").populate("RecipesMade")
            if (!user) {
                return res.status(400).json({Email: "Email not found"})
            }
            const authMessage: boolean = await user.ComparePassword(Password)
            if (!authMessage) {
                return res.status(400).json({Password: "Incorrect Password"})
            }
            const userObj = user.toObject()
			delete userObj.Password

            const token = user.GenerateToken()
            const token1 = await jwt.sign(
                {_id: user.id},
                configs.JWT_SECRET,
                {expiresIn: configs.JWT_EXPIRES_IN}
            )

            res.cookie("token", token1, { httpOnly: true })
            return res.status(200).json({
                user: { ...userObj, token: token1 },
                message: "Logged in",
                token1
            })
        } catch (error) {
            next(error)
        }
    }

    public static async logoutUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        res.clearCookie("token", { httpOnly: true })
        res.clearCookie("token")
        return res.status(200).json({message: "Logged out"})
    }

    public static async verifyUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { user } = req.body
			return res.status(200).json({ message: "User verified", user })
        } catch (error) {
            next(error)
        }
    }

    public static async updateUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { id } = req.params
            const user: IUser | null = await User.findByIdAndUpdate(id, req.body, {new: true})
            if (user) {
                return res.status(200).json({user})
            } else {
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            next(error)
        }
    }

    public static async deleteUser( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { id } = req.params
            const user: IUser | null = await User.findByIdAndDelete(id)
            if (user) {
                return res.status(200).json({user})
            } else {
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            next(error)
        }
    }

    public static async addFavoriteRecipe( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { recipe } = req.params
            console.log(recipe)
            const { user: u } = req.body
            const user: IUser | null = await User.findByIdAndUpdate(u._id, {$push: {FavoriteRecipes: recipe}}, {new: true})
            if (user) {
                return res.status(200).json({user})
            } else {
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            next(error)
        }
    }

    public static async removeFavoriteRecipe( req: Request, res: Response, next: NextFunction ): Promise<Response> {
        try {
            const { recipe } = req.params
            const { user: u } = req.body
            const user: IUser | null = await User.findByIdAndUpdate(u._id, {$pull: {FavoriteRecipes: recipe}}, {new: true})
            if (user) {
                return res.status(200).json({user})
            } else {
                return res.status(404).json({message: "User not found"})
            }
        } catch (error) {
            next(error)
        }
    }
}