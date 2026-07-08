import express from "express";

const adminAppointmentRouter = express.Router();

const viewAppointmentsRoutes = adminAppointmentRouter.get("/", () => {});
const viewAppointmentById = adminAppointmentRouter.get("/:id", () => {});

export default adminAppointmentRouter;
