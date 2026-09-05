import express from "express";
import {default as oldRoutes} from "./src/routes/routes.ts";
import sequelize, { connectDB } from "./src/libs/db-config.ts";
import sessionConfig, { store } from "./src/libs/session-config.ts";
import cors from "cors";
import associate from "./src/libs/associate.ts";
import { initiateData } from "./src/libs/initial-data.ts";
import createRoutes from "./src/routes/v2-bff/routes.ts";

const PORT = 8080;
const app = express();

//Middleware
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);
app.use(sessionConfig);
//assign routes
createRoutes(app);

async function startServer() {
    try {
        await connectDB();
        associate(() => console.log("Associating tables"));

        // Local iteration strategy (issue #4): sync schema, then backfill legacy data.
        await sequelize.sync({ alter: true, force: true });
        // await runLegacyDataMigration();
        // await runBootstrapSeed();
        await initiateData();

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
