import { type Application } from "express";
import apiRouter from "./index.ts";
import { errorHandler, notFoundHandler } from "../../middlewares/errorHandler.ts";

const createRoutes = (app: Application) => {
    app.use("/api/v2", apiRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);
};

export default createRoutes;
