import type { AuthUser } from "./api.types.ts";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

declare module "express-session" {
    interface SessionData {
        user?: AuthUser;
    }
}

export {};
