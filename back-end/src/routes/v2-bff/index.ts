import express from "express";
import { authenticateSession } from "../../middlewares/auth.ts";
import authRoutes from "./auth/auth.routes.ts";
import adminRouter from "./admin-role/routes.ts";
import clientRouter from "./client-role/routes.ts";
import professionalRouter from "./professional-role/routes.ts";
import { requireRole } from "../../middlewares/requireRole.ts";

const apiRouter = express.Router();

apiRouter.use("/auth", authRoutes);

apiRouter.use(authenticateSession);

// Endpoints group

apiRouter.use("/admin", requireRole("admin"), adminRouter);
apiRouter.use("/client", requireRole("client"), clientRouter);
apiRouter.use("/professional", requireRole("professional"), professionalRouter);

export default apiRouter;
