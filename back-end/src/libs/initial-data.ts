import bcrypt from "bcryptjs";
import User from "../models/user.model.ts";
import Appointment from "../models/appointment.model.ts";

const DEFAULT_ADMIN = "admin@thera.com";
const DEFAULT_PASSWORD = "password123";
const DEFAULT_ROLE = "admin";

export const initiateData = async () => {

    // Add admin
    const admin = await User.findOne({ where: { email: DEFAULT_ADMIN } });
    if (!admin) {
        await User.create({
            email: DEFAULT_ADMIN,
            passwordHash: await bcrypt.hash(DEFAULT_PASSWORD, 10),
            role: DEFAULT_ROLE,
        });
    }

    // Add Professional

    const professional = await User.findOne({ where: { email: "professional@thera.com" } });
    if (!professional) {
        await User.create({
            email: "professional@thera.com",
            passwordHash: await bcrypt.hash(DEFAULT_PASSWORD, 10),
            role: "professional",
        });
    }

    // Add Client

    const client = await User.findOne({ where: { email: "client@example.com" } });
    if (!client) {
        await User.create({
            email: "client@example.com",
            passwordHash: await bcrypt.hash(DEFAULT_PASSWORD, 10),
            role: "client",
        });
    }

    // Add Appointment 

};
