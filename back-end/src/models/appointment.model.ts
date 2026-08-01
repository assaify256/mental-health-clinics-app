import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface AppointmentAttributes {
    id: number;
    professionalId: number | null;
    clientId: number;
    scheduledStart: Date | null;
    scheduledEnd: Date | null;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    notes: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

type AppointmentCreationAttributes = Optional<
    AppointmentAttributes,
    "id" | "createdAt" | "updatedAt"
>;

class Appointment
    extends Model<AppointmentAttributes, AppointmentCreationAttributes>
    implements AppointmentAttributes
{
    declare public id: number;
    declare public professionalId: number | null;
    declare public clientId: number;
    declare public scheduledStart: Date | null;
    declare public scheduledEnd: Date | null;
    declare public status: "pending" | "confirmed" | "completed" | "cancelled";
    declare public notes: string | null;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        professionalId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "professionals",
                key: "id",
            },
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "clients",
                key: "id",
            },
        },
        scheduledStart: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        scheduledEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(
                "pending",
                "confirmed",
                "completed",
                "cancelled",
            ),
            allowNull: false,
            defaultValue: "pending",
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "appointments",
        indexes: [
            { fields: ["professionalId", "scheduledStart"] },
            { fields: ["clientId", "scheduledStart"] },
        ],
    },
);

export default Appointment;