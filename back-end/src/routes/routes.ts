import authRoutes from "./auth.routes.ts";
import { type Application } from "express";

const createRoutes = (app: Application) => {
    app.use("/api/v1/auth", authRoutes);
};

export default createRoutes;
