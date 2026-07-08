import express from "express";
import adminAppointmentRouter from "./appointment.routes.ts";
import adminPaymentRouter from "./payment.routes.ts";

const adminRouter = express.Router();

const appointmentRoutes = adminRouter.use(
    "/appointment",
    adminAppointmentRouter,
);


const paymentRoutes = adminRouter.use("/payment", adminPaymentRouter);


export default adminRouter;
