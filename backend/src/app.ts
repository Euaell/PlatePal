import express, { Request, Response, NextFunction } from "express"
import {graphqlHTTP, GraphQLParams} from "express-graphql"
import { createWriteStream } from "fs"
import { join } from "path"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import { ErrorHandler } from "./middlewares/ErrorHandler"
import routes from "./routes";
import schema, {createContext} from "./schema/schema";


const app = express()
const accessLogStream = createWriteStream(join(__dirname, "access.log"), { flags: "a" })

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(cookieParser())
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"))
morgan.token("body", (req: Request, res: Response) => JSON.stringify(req.body))
app.use(morgan(":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :body",
	{ stream: accessLogStream }))
app.use(cors({
	origin: true,
	credentials: true,
	exposedHeaders: ["token"]
}))

// using middleware
// app.use("/api/v1/graphql", Authenticate.authenticate, graphqlHTTP({
// 	schema,
// 	graphiql: true
// }))

app.use("/api/v1/graphql", graphqlHTTP(async (request: Request, response: Response, params: GraphQLParams) => ({
	schema,
	graphiql: true,
	context: await createContext(request, response, params)
})))

app.use("/api/v1/users", routes.UserRoute)
app.use("/api/v1/unverified-users", routes.UnverifiedUserRoute)
app.use("/api/v1/images", routes.ImageRoute)
app.use("/api/v1/recipes", routes.RecipesRoute)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Hello World!" })
})

app.use(ErrorHandler)

export default app
