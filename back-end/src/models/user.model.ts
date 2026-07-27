import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

export type UserRole = "admin" | "professional" | "client";

interface UserAttributes {
    id: number;
    email: string;
    passwordHash: string;
    role: UserRole;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttributes = Optional<
    UserAttributes,
    "id" | "isActive" | "createdAt" | "updatedAt"
>;

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare public id: number;
    declare public email: string;
    declare public passwordHash: string;
    declare public role: UserRole;
    declare public isActive: boolean;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "professional", "client"),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: "users",
        indexes: [{ unique: true, fields: ["email"] }],
    },
);

export default User;
