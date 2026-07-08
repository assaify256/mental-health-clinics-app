import adminRouter from "./admin-role/admin.routes.ts";
import authRouter from "./auth/auth.routes.ts";
import { type Application } from "express";

const createRoutes = (app: Application) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/admin", adminRouter);
};

export default createRoutes;
