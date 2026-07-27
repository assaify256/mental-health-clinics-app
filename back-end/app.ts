import express from "express";
import createRoutes from "./src/routes/routes.ts";
import sequelize, { connectDB } from "./src/libs/db-config.ts";
import { store } from "./src/libs/session-config.ts";
import cors from "cors";
import session from "express-session";
import associate from "./src/libs/associate.ts";

const PORT = 8080;
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: "secret",
        resave: false,
        name: "connect.sid",
        store: store,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    }),
);

//assign routes
createRoutes(app);

async function startServer() {
    try {
        await connectDB();
        associate(() => console.log("Associating tables"));
        await store.sync();
        console.log("Session table synced");

        app.listen(PORT, () => {
            console.log("Server running on port 8080");
        });
    } catch (error) {
        console.error("Startup error:", error);
        process.exit(1);
    }
}

startServer();
