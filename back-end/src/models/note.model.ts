import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface NoteAttributes {
    id: number;
    authorUserId: number;
    clientId: number | null;
    appointmentId: number | null;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type NoteCreationAttributes = Optional<
    NoteAttributes,
    "id" | "createdAt" | "updatedAt"
>;

class Note
    extends Model<NoteAttributes, NoteCreationAttributes>
    implements NoteAttributes
{
    declare public id: number;
    declare public authorUserId: number;
    declare public clientId: number | null;
    declare public appointmentId: number | null;
    declare public title: string;
    declare public content: string;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        authorUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "clients",
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
        title: {
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
        tableName: "notes",
    },
);

export default Note;
