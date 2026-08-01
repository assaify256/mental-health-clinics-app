import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface ProfileAttributes {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    sex: "Male" | "Female" | "Other" | null;
    dateOfBirth: Date | null;
    address: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

type ProfileCreationAttributes = Optional<
    ProfileAttributes,
    "id" | "createdAt" | "updatedAt"
>;

class Profile
    extends Model<ProfileAttributes, ProfileCreationAttributes>
    implements ProfileAttributes
{
    declare public id: number;
    declare public userId: number;
    declare public firstName: string;
    declare public lastName: string;
    declare public phoneNumber: string | null;
    declare public sex: "Male" | "Female" | "Other" | null;
    declare public dateOfBirth: Date | null;
    declare public address: string | null;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Profile.init(
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
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sex: {
            type: DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "profiles",
        indexes: [{ unique: true, fields: ["userId"] }],
    },
);

export default Profile;