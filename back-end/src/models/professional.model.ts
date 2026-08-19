import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface ProfessionalAttributes {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    licenseNumber: string | null;
    specialization: string | null;
    bio: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

type ProfessionalCreationAttributes = Optional<
    ProfessionalAttributes,
    "id" | "createdAt" | "updatedAt"
>;

class Professional
    extends Model<ProfessionalAttributes, ProfessionalCreationAttributes>
    implements ProfessionalAttributes
{
    declare public id: number;
    declare public userId: number;
    declare public firstName: string;
    declare public lastName: string;
    declare public licenseNumber: string | null;
    declare public specialization: string | null;
    declare public bio: string | null;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Professional.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "users",
                key: "id",
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "professionals",
        indexes: [
            { unique: true, fields: ["userId"] },
            { unique: true, fields: ["licenseNumber"] },
        ],
    },
);

export default Professional;
