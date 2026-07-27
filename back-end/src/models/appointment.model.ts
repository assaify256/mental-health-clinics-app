import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db-config.ts";
import Client from "./client.model.ts";

interface AppointmentAttributes {
    dateTime: string;
    status: "Pending" | "Confirmed" | "Completed" | "Canceled";
    clientId : number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Appointment
    extends Model<AppointmentAttributes>
    implements AppointmentAttributes
{
    declare public dateTime: string;
    declare public status: "Pending" | "Confirmed" | "Completed" | "Canceled";
    declare public clientId: number;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Appointment.init(
    {
        dateTime: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                "Pending",
                "Confirmed",
                "Completed",
                "Canceled",
            ),
            unique: false,
            allowNull: false,
        },
        clientId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: "id"
            }
        }
    },
    {
        sequelize,
        tableName: "appointments",
    },
);

export default Appointment;