import { DataTypes, Model } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface ClientAttributes {
    name: string;
    sex: string;
    phoneNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Client extends Model<ClientAttributes> implements ClientAttributes {
    declare public name: string;
    declare public sex: string;
    declare public phoneNumber: string;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Client.init(
    {
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
        },
        sex: {
            type: DataTypes.ENUM("Male", "Female"),
            unique: false,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "clients",
    },
);

export default Client;
