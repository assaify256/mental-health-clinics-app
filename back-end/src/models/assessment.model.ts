import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface AssessmentAttributes {
    id: number;
    clientId: number;
    professionalId: number | null;
    appointmentId: number | null;
    assessmentType: string;
    score: number | null;
    notes: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

class Assessment
    extends Model<AssessmentAttributes>
    implements AssessmentAttributes
{
    declare public id: number;
    declare public clientId: number;
    declare public professionalId: number | null;
    declare public appointmentId: number | null;
    declare public assessmentType: string;
    declare public score: number | null;
    declare public notes: string | null;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Assessment.init(
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
        assessmentType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "assessments",
    },
);

export default Assessment;
