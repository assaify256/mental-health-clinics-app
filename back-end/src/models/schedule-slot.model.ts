import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../libs/db-config.ts";

interface ScheduleSlotAttributes {
    id: number;
    professionalId: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

type ScheduleSlotCreationAttributes = Optional<
    ScheduleSlotAttributes,
    "id" | "createdAt" | "updatedAt"
>;

class ScheduleSlot
    extends Model<ScheduleSlotAttributes, ScheduleSlotCreationAttributes>
    implements ScheduleSlotAttributes
{
    declare public id: number;
    declare public professionalId: number;
    declare public dayOfWeek: number;
    declare public startTime: string;
    declare public endTime: string;
    declare public isAvailable: boolean;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

ScheduleSlot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        professionalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "professionals",
                key: "id",
            },
        },
        dayOfWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 6,
            },
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: "schedule_slots",
        indexes: [
            {
                unique: true,
                fields: ["professionalId", "dayOfWeek", "startTime", "endTime"],
            },
        ],
    },
);

export default ScheduleSlot;
