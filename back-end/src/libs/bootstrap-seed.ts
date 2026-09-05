import bcrypt from "bcryptjs";
import Appointment from "../models/appointment.model.ts";
import Client from "../models/client.model.ts";
import Payment from "../models/payment.model.ts";
import Professional from "../models/professional.model.ts";
import Profile from "../models/profile.model.ts";
import ScheduleSlot from "../models/schedule-slot.model.ts";
import User, { type UserRole } from "../models/user.model.ts";

const DEFAULT_PASSWORD = "password123";

type SeedUserInput = {
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
};

const ensureUserWithProfile = async ({
    email,
    role,
    firstName,
    lastName,
}: SeedUserInput) => {
    let user = await User.findOne({ where: { email } });

    if (!user) {
        user = await User.create({
            email,
            passwordHash: await bcrypt.hash(DEFAULT_PASSWORD, 10),
            role,
        });
    }

    const existingProfile = await Profile.findOne({
        where: { userId: user.id },
    });
    if (!existingProfile) {
        await Profile.create({
            userId: user.id,
            firstName,
            lastName,
        });
    }

    return user;
};

export const runBootstrapSeed = async () => {
    await ensureUserWithProfile({
        email: "admin@clinic.local",
        role: "admin",
        firstName: "System",
        lastName: "Admin",
    });

    const professionalUser = await ensureUserWithProfile({
        email: "pro@clinic.local",
        role: "professional",
        firstName: "Grace",
        lastName: "Counsellor",
    });

    const clientUser = await ensureUserWithProfile({
        email: "client@clinic.local",
        role: "client",
        firstName: "Alex",
        lastName: "Client",
    });

    const [professional] = await Professional.findOrCreate({
        where: { userId: professionalUser.id },
        defaults: {
            userId: professionalUser.id,
            specialization: "Psychotherapy",
            licenseNumber: "LIC-1001",
            bio: "Trauma-informed therapist",
            firstName: "Jake",
            lastName: "Owie",
        },
    });

    const [client] = await Client.findOrCreate({
        where: { ownerUserId: clientUser.id },
        defaults: {
            ownerUserId: clientUser.id,
            firstName: "Alex",
            lastName: "Client",
            relationshipToOwner: "self",
        },
    });

    const [appointment] = await Appointment.findOrCreate({
        where: {
            clientId: client.id,
            professionalId: professional.id,
            notes: "Initial consultation",
        },
        defaults: {
            clientId: client.id,
            professionalId: professional.id,
            scheduledStart: new Date(),
            status: "pending",
            notes: "Initial consultation",
        },
    });

    await Payment.findOrCreate({
        where: {
            clientId: client.id,
            appointmentId: appointment.id,
            amount: 750000,
        },
        defaults: {
            clientId: client.id,
            appointmentId: appointment.id,
            amount: 750000,
            status: "pending",
            currency: "IDR",
            method: null,
        },
    });

    await ScheduleSlot.findOrCreate({
        where: {
            professionalId: professional.id,
            dayOfWeek: 1,
            startTime: "09:00",
            endTime: "12:00",
        },
        defaults: {
            professionalId: professional.id,
            dayOfWeek: 1,
            startTime: "09:00",
            endTime: "12:00",
            isAvailable: true,
        },
    });
};
