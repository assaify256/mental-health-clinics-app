import express from "express";
import createRoutes from "./src/routes/routes.ts";
import sequelize, { connectDB } from "./src/libs/db-config.ts";
import { store } from "./src/libs/session-config.ts";
import cors from "cors";
import session from "express-session";
import associate from "./src/libs/associate.ts";
import { runLegacyDataMigration } from "./src/libs/legacy-data-migration.ts";
import { runBootstrapSeed } from "./src/libs/bootstrap-seed.ts";

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

        // Local iteration strategy (issue #4): sync schema, then backfill legacy data.
        await sequelize.sync({ alter: true });
        await runLegacyDataMigration();
        await runBootstrapSeed();

        const [ownerlessClients] = await sequelize.query(
            "SELECT COUNT(*) as count FROM clients WHERE ownerUserId IS NULL",
        );
        const missingOwners = Number(
            (ownerlessClients as Array<{ count: number }>)[0]?.count ?? 0,
        );
        if (missingOwners > 0) {
            throw new Error(
                `Ownership rule violation: ${missingOwners} client(s) do not have ownerUserId`,
            );
        }

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
