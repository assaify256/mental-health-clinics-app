import express from "express";
import {
    signInController,
    signUpController,
} from "../controllers/auth.controller.ts";

const authRoutes = express.Router();

const signUpRouter = authRoutes.post("/sign-up", signUpController);
const signInRouter = authRoutes.post("/sign-in", signInController);

export default authRoutes;
