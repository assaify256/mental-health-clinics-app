import express from "express";
import {
    signInController,
    signUpController,
} from "../../controllers/auth.controller.ts";

const authRouter = express.Router();

const signUpRouter = authRouter.post("/sign-up", signUpController);
const signInRouter = authRouter.post("/sign-in", signInController);

export default authRouter;
