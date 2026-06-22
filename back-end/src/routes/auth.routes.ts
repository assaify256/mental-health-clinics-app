import express from "express";
import { signUpController } from "../controllers/auth.controller.ts";

const authRoutes = express.Router();

const signUpRouter = authRoutes.post("/sign-up", signUpController);

export default authRoutes;