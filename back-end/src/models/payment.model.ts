import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface PaymentAttributes {
    id: number;
    appointmentId: number | null;
    clientId: number | null;
    amount: number;
    currency: string;
    status: "pending" | "completed" | "failed";
    method: string | null;
    paidAt: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
    declare public id: number;
    declare public appointmentId: number | null;
    declare public clientId: number | null;
    declare public amount: number;
    declare public currency: string;
    declare public status: "pending" | "completed" | "failed";
    declare public method: string | null;
    declare public paidAt: Date | null;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "appointments",
                key: "id",
            },
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "clients",
                key: "id",
            },
        },
        amount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "IDR",
        },
        status: {
            type: DataTypes.ENUM("pending", "completed", "failed"),
            allowNull: false,
            defaultValue: "pending",
        },
        method: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        paidAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "payments",
    },
);

export default Payment;
