import sequelize from "./db-config.ts";

type TableColumn = { name: string };

const hasColumn = async (table: string, column: string): Promise<boolean> => {
    const [rows] = await sequelize.query(`PRAGMA table_info(${table});`);
    return (rows as TableColumn[]).some((row) => row.name === column);
};

const splitLegacyName = (name: string | null | undefined) => {
    const safe = (name ?? "").trim();
    if (!safe) {
        return { firstName: "Unknown", lastName: "Client" };
    }

    const parts = safe.split(/\s+/);
    const firstName = parts[0] || "Unknown";
    const lastName = parts.slice(1).join(" ") || "Client";
    return { firstName, lastName };
};

const mapLegacyAppointmentStatus = (raw: string | null | undefined) => {
    const value = (raw ?? "").toLowerCase();
    if (value === "confirmed") return "confirmed";
    if (value === "completed") return "completed";
    if (value === "canceled" || value === "cancelled") return "cancelled";
    return "pending";
};

const toIsoDateTime = (date: string, time?: string | null) => {
    const normalizedDate = date.includes("T") ? date.split("T")[0] ?? date : date;
    const normalizedTime = (time ?? "00:00").slice(0, 5);
    return `${normalizedDate}T${normalizedTime}:00.000Z`;
};

export const runLegacyDataMigration = async () => {
    // users.role normalization
    const userHasRole = await hasColumn("users", "role");
    if (userHasRole) {
        await sequelize.query(`
            UPDATE users
            SET role = CASE LOWER(role)
                WHEN 'admin' THEN 'admin'
                WHEN 'professional' THEN 'professional'
                WHEN 'client' THEN 'client'
                ELSE 'client'
            END
            WHERE role IS NOT NULL;
        `);
    }

    // clients: backfill firstName/lastName from legacy name
    const clientHasName = await hasColumn("clients", "name");
    const clientHasFirstName = await hasColumn("clients", "firstName");
    const clientHasLastName = await hasColumn("clients", "lastName");
    if (clientHasName && clientHasFirstName && clientHasLastName) {
        const [legacyClients] = await sequelize.query(
            `SELECT id, name FROM clients WHERE (firstName IS NULL OR firstName = '') OR (lastName IS NULL OR lastName = '')`,
        );

        for (const row of legacyClients as Array<{ id: number; name: string | null }>) {
            const { firstName, lastName } = splitLegacyName(row.name);
            await sequelize.query(
                `UPDATE clients SET firstName = :firstName, lastName = :lastName WHERE id = :id`,
                {
                    replacements: { id: row.id, firstName, lastName },
                },
            );
        }
    }

    // clients.ownerUserId backfill from legacy userId
    const clientHasOwner = await hasColumn("clients", "ownerUserId");
    const clientHasUserId = await hasColumn("clients", "userId");
    if (clientHasOwner && clientHasUserId) {
        await sequelize.query(`
            UPDATE clients
            SET ownerUserId = userId
            WHERE ownerUserId IS NULL AND userId IS NOT NULL;
        `);
    }

    if (clientHasOwner) {
        await sequelize.query(`
            UPDATE clients
            SET ownerUserId = (SELECT id FROM users ORDER BY id LIMIT 1)
            WHERE ownerUserId IS NULL;
        `);
    }

    // appointments.scheduledStart backfill from legacy dateTime
    const apptHasDateTime = await hasColumn("appointments", "dateTime");
    const apptHasScheduledStart = await hasColumn("appointments", "scheduledStart");
    if (apptHasDateTime && apptHasScheduledStart) {
        await sequelize.query(`
            UPDATE appointments
            SET scheduledStart = dateTime
            WHERE scheduledStart IS NULL AND dateTime IS NOT NULL;
        `);
    }

    // appointments.scheduledStart backfill from legacy scheduledDate + scheduledTime
    const apptHasScheduledDate = await hasColumn("appointments", "scheduledDate");
    const apptHasScheduledTime = await hasColumn("appointments", "scheduledTime");
    if (apptHasScheduledStart && apptHasScheduledDate) {
        const [rows] = await sequelize.query(
            `SELECT id, scheduledDate, ${apptHasScheduledTime ? "scheduledTime" : "NULL as scheduledTime"} FROM appointments WHERE scheduledStart IS NULL AND scheduledDate IS NOT NULL`,
        );

        for (const row of rows as Array<{
            id: number;
            scheduledDate: string;
            scheduledTime: string | null;
        }>) {
            await sequelize.query(
                `UPDATE appointments SET scheduledStart = :scheduledStart WHERE id = :id`,
                {
                    replacements: {
                        id: row.id,
                        scheduledStart: toIsoDateTime(row.scheduledDate, row.scheduledTime),
                    },
                },
            );
        }
    }

    // appointments.status normalization
    const apptHasStatus = await hasColumn("appointments", "status");
    if (apptHasStatus) {
        const [rows] = await sequelize.query(`SELECT id, status FROM appointments;`);
        for (const row of rows as Array<{ id: number; status: string | null }>) {
            const normalized = mapLegacyAppointmentStatus(row.status);
            await sequelize.query(
                `UPDATE appointments SET status = :status WHERE id = :id`,
                { replacements: { id: row.id, status: normalized } },
            );
        }
    }

    // ensure non-null fallback for scheduledStart when still null
    if (apptHasScheduledStart) {
        await sequelize.query(`
            UPDATE appointments
            SET scheduledStart = createdAt
            WHERE scheduledStart IS NULL;
        `);
    }
};
