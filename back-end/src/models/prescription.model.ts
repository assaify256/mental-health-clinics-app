import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface PrescriptionAttributes {
    id: number;
    clientId: number;
    professionalId: number | null;
    appointmentId: number | null;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes: string | null;
    status: "active" | "completed" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}

type PrescriptionCreationAttributes = Optional<
    PrescriptionAttributes,
    "id" | "createdAt" | "updatedAt"
>;

class Prescription
    extends Model<PrescriptionAttributes, PrescriptionCreationAttributes>
    implements PrescriptionAttributes
{
    declare public id: number;
    declare public clientId: number;
    declare public professionalId: number | null;
    declare public appointmentId: number | null;
    declare public medicineName: string;
    declare public dosage: string;
    declare public frequency: string;
    declare public duration: string;
    declare public notes: string | null;
    declare public status: "active" | "completed" | "cancelled";
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Prescription.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "clients",
                key: "id",
            },
        },
        professionalId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "professionals",
                key: "id",
            },
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "appointments",
                key: "id",
            },
        },
        medicineName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dosage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("active", "completed", "cancelled"),
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        sequelize,
        tableName: "prescriptions",
    },
);

export default Prescription;
