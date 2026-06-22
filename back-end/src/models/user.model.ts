import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface UserAttributes {
    email: string;
    password_hash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    declare public email: string;
    declare public password_hash: string;
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
        password_hash: {
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
