import {Schema, model, Document, Model} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import configs from "../config/configs";

export enum UserRole {
    ADMIN = "admin",
    NORMAL = "normal"
}

export interface IUser extends Document{
    Username: string

    Email: string
    Password: string
    Role: UserRole

    ProfilePic: string

    FavoriteRecipes: string[]
    RecipesMade: Schema.Types.ObjectId[]

    CreatedAt: Date
    UpdatedAt: Date
    ComparePassword: (password: string) => Promise<boolean>
    GenerateToken: () => string
}

interface UserModel extends Model<IUser> {
    login(email: string, password: string): any
    findByToken(token: string): IUser | null
}

const UserSchema: Schema<IUser> = new Schema(
    {
        Username: {
            type: String,
            required: true,
            unique: true
        },
        Email: {
            type: String,
            required: true,
            unique: true
        },
        Password: {
            type: String,
            required: true
        },
        Role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.NORMAL
        },
        ProfilePic: {
            type: String,
            default: "profile_pic"
        },
        FavoriteRecipes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Recipe"
            }
        ],
        RecipesMade: [
            {
                type: Schema.Types.ObjectId,
                ref: "Recipe"
            }
        ]
    },
    {
        timestamps: true
    }
)

UserSchema.methods.ComparePassword = async function (password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.Password)
}

UserSchema.methods.GenerateToken = function () : string {
    return jwt.sign(
        {_id: this._id},
        configs.JWT_SECRET,
        {expiresIn: configs.JWT_EXPIRES_IN}
    )
}

UserSchema.statics.findByToken = async function (token: string) : Promise<IUser | null> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, configs.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err)
            }
            resolve(this.findOne({_id: decoded._id}).populate("FavoriteRecipes").populate("RecipesMade"))
        })
    })
}

UserSchema.statics.login = async function (email: string, password: string) : Promise<IUser | null> {
    return new Promise(async (resolve, reject) => {
        const user = await this.findOne({Email: email} )
        if (!user) {
            reject("User not found")
        }
        const isMatch = await user.ComparePassword(password)
        if (!isMatch) {
            reject("Wrong password")
        }
        resolve(user)

    })
}

UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        next()
    }
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
})


export default model<IUser, UserModel>("User", UserSchema)