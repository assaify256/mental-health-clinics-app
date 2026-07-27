import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db-config.ts";
import User from "./user.model.ts";

interface ClientAttributes {
    id: number;
    ownerUserId: number | null;
    firstName: string | null;
    lastName: string | null;
    sex: "Male" | "Female" | "Other" | null;
    phoneNumber: string | null;
    dateOfBirth: Date | null;
    relationshipToOwner: "self" | "spouse" | "child" | "parent" | "other";
    emergencyContactName: string | null;
    emergencyContactPhone: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

class Client extends Model<ClientAttributes> implements ClientAttributes {
    declare public id: number;
    declare public ownerUserId: number | null;
    declare public firstName: string | null;
    declare public lastName: string | null;
    declare public sex: "Male" | "Female" | "Other" | null;
    declare public phoneNumber: string | null;
    declare public dateOfBirth: Date | null;
    declare public relationshipToOwner:
        | "self"
        | "spouse"
        | "child"
        | "parent"
        | "other";
    declare public emergencyContactName: string | null;
    declare public emergencyContactPhone: string | null;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Client.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ownerUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: "id",
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sex: {
            type: DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        relationshipToOwner: {
            type: DataTypes.ENUM("self", "spouse", "child", "parent", "other"),
            allowNull: false,
            defaultValue: "self",
        },
        emergencyContactName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emergencyContactPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "clients",
        indexes: [{ fields: ["ownerUserId"] }],
    },
);

export default Client;
