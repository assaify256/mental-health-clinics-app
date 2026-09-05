import type { Response } from "express";

export interface PaginationMeta {
    page: number;
    pageSize: number;
    total: number;
}

export const sendData = <T>(res: Response, data: T, status = 200) => {
    return res.status(status).json({ success: true, data });
};

export const sendPaginated = <T>(
    res: Response,
    data: T[],
    meta: PaginationMeta,
    status = 200,
) => {
    return res.status(status).json({ data, meta });
};
