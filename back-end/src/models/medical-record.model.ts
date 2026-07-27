import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface MedicalRecordAttributes {
    id: number;
    clientId: number;
    professionalId: number | null;
    appointmentId: number | null;
    recordType: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class MedicalRecord
    extends Model<MedicalRecordAttributes>
    implements MedicalRecordAttributes
{
    declare public id: number;
    declare public clientId: number;
    declare public professionalId: number | null;
    declare public appointmentId: number | null;
    declare public recordType: string;
    declare public content: string;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

MedicalRecord.init(
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
        recordType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "medical_records",
    },
);

export default MedicalRecord;
