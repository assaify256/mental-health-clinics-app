import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface UserAttributes {
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    declare public email: string;
    declare public passwordHash: string;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
    },
);

export default User;
