import express from "express";
import { professionals } from "../data/store.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { sendData } from "../utils/api-response.ts";

const professionalsRoutes = express.Router();

professionalsRoutes.get(
    "/",
    asyncHandler(async (_req, res) => {
        sendData(res, professionals);
    }),
);

export default professionalsRoutes;
