import express from "express";
import authRoutes from "./auth.routes.ts";
import usersRoutes from "./users.routes.ts";
import professionalsRoutes from "./professionals.routes.ts";
import clientsRoutes from "./clients.routes.ts";
import appointmentsRoutes from "./appointments.routes.ts";
import assessmentsRoutes from "./assessments.routes.ts";
import prescriptionsRoutes from "./prescriptions.routes.ts";
import recordsRoutes from "./records.routes.ts";
import notesRoutes from "./notes.routes.ts";
import paymentsRoutes from "./payments.routes.ts";
import schedulesRoutes from "./schedules.routes.ts";
import dashboardRoutes from "./dashboard.routes.ts";
import { authenticateSession } from "../middlewares/auth.ts";

const apiRouter = express.Router();

apiRouter.use("/auth", authRoutes);

apiRouter.use(authenticateSession);

apiRouter.use("/users", usersRoutes);
apiRouter.use("/professionals", professionalsRoutes);
apiRouter.use("/clients", clientsRoutes);
apiRouter.use("/appointments", appointmentsRoutes);
apiRouter.use("/assessments", assessmentsRoutes);
apiRouter.use("/prescriptions", prescriptionsRoutes);
apiRouter.use("/records", recordsRoutes);
apiRouter.use("/notes", notesRoutes);
apiRouter.use("/payments", paymentsRoutes);
apiRouter.use("/schedules", schedulesRoutes);
apiRouter.use("/dashboard", dashboardRoutes);

export default apiRouter;
