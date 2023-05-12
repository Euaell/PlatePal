import {Request, Response, NextFunction} from "express"
import UserModel, {IUser, UserRole} from "../models/UserModel"

export default class Authenticate {

	public static async authenticate( req: Request, res: Response, next: NextFunction ): Promise<void> {
		try {
			const token = req.headers.token || req.cookies.token
			if (!token || Array.isArray(token)) {
				res.status(401).json({ message: 'Unauthorized' })
				return next(new Error("Unauthorized"))
			}

			const user: IUser | null = await UserModel.findByToken(token)
			if (!user) {
				res.status(401).json({ message: 'Invalid token' })
				return next(new Error("Invalid token"))
			}

			const userObj = user.toObject()
			delete userObj.Password

			req.body.user = userObj
			next()
		} catch (error) {
			next(error)
		}
	}

	public static async authorize( req: Request, res: Response, next: NextFunction ): Promise<void> {
		try {
			const { user } = req.body
			if (user.Role !== UserRole.ADMIN) {
				res.status(401).json({ message: 'Unauthorized' })
			}
			next()
		} catch (error) {
			next(error)
		}
	}

	public static async authenticateGraphql( req: Request ): Promise<IUser | null> {
		try {
			const token = req.headers.token || req.cookies.token
			if (!token || Array.isArray(token)) return null

			const user: IUser | null = await UserModel.findByToken(token)
			if (!user) return null

			const userObj = user.toObject()
			delete userObj.Password

			return userObj
		} catch (error) {
			return null
		}
	}
}
