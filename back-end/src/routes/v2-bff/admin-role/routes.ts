import express from "express"
import adminHomeRouter from "./home.routes.ts"

const adminRouter = express.Router()

adminRouter.use("/home", adminHomeRouter)

export default adminRouter