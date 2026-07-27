import Appointment from "../models/appointment.model.ts";
import Assessment from "../models/assessment.model.ts";
import Client from "../models/client.model.ts";
import MedicalRecord from "../models/medical-record.model.ts";
import Note from "../models/note.model.ts";
import Payment from "../models/payment.model.ts";
import Prescription from "../models/prescription.model.ts";
import Professional from "../models/professional.model.ts";
import Profile from "../models/profile.model.ts";
import ScheduleSlot from "../models/schedule-slot.model.ts";
import User from "../models/user.model.ts";

const associate = (cb: () => void) => {
    // User profile / role mappings
    User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
    Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

    User.hasOne(Professional, { foreignKey: "userId", as: "professionalProfile" });
    Professional.belongsTo(User, { foreignKey: "userId", as: "user" });

    // Ownership rule: one user owns many clients
    User.hasMany(Client, { foreignKey: "ownerUserId", as: "ownedClients" });
    Client.belongsTo(User, { foreignKey: "ownerUserId", as: "owner" });

    // Appointments
    Professional.hasMany(Appointment, {
        foreignKey: "professionalId",
        as: "appointments",
    });
    Appointment.belongsTo(Professional, {
        foreignKey: "professionalId",
        as: "professional",
    });

    Client.hasMany(Appointment, { foreignKey: "clientId", as: "appointments" });
    Appointment.belongsTo(Client, { foreignKey: "clientId", as: "client" });

    // Assessments
    Client.hasMany(Assessment, { foreignKey: "clientId", as: "assessments" });
    Assessment.belongsTo(Client, { foreignKey: "clientId", as: "client" });
    Professional.hasMany(Assessment, { foreignKey: "professionalId", as: "assessments" });
    Assessment.belongsTo(Professional, {
        foreignKey: "professionalId",
        as: "professional",
    });
    Appointment.hasMany(Assessment, { foreignKey: "appointmentId", as: "assessments" });
    Assessment.belongsTo(Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
    });

    // Prescriptions
    Client.hasMany(Prescription, { foreignKey: "clientId", as: "prescriptions" });
    Prescription.belongsTo(Client, { foreignKey: "clientId", as: "client" });
    Professional.hasMany(Prescription, {
        foreignKey: "professionalId",
        as: "prescriptions",
    });
    Prescription.belongsTo(Professional, {
        foreignKey: "professionalId",
        as: "professional",
    });
    Appointment.hasMany(Prescription, {
        foreignKey: "appointmentId",
        as: "prescriptions",
    });
    Prescription.belongsTo(Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
    });

    // Medical records
    Client.hasMany(MedicalRecord, { foreignKey: "clientId", as: "medicalRecords" });
    MedicalRecord.belongsTo(Client, { foreignKey: "clientId", as: "client" });
    Professional.hasMany(MedicalRecord, {
        foreignKey: "professionalId",
        as: "medicalRecords",
    });
    MedicalRecord.belongsTo(Professional, {
        foreignKey: "professionalId",
        as: "professional",
    });
    Appointment.hasMany(MedicalRecord, {
        foreignKey: "appointmentId",
        as: "medicalRecords",
    });
    MedicalRecord.belongsTo(Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
    });

    // Notes
    User.hasMany(Note, { foreignKey: "authorUserId", as: "authoredNotes" });
    Note.belongsTo(User, { foreignKey: "authorUserId", as: "author" });
    Client.hasMany(Note, { foreignKey: "clientId", as: "notes" });
    Note.belongsTo(Client, { foreignKey: "clientId", as: "client" });
    Appointment.hasMany(Note, { foreignKey: "appointmentId", as: "appointmentNotes" });
    Note.belongsTo(Appointment, { foreignKey: "appointmentId", as: "appointment" });

    // Payments
    Appointment.hasMany(Payment, { foreignKey: "appointmentId", as: "payments" });
    Payment.belongsTo(Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
    });
    Client.hasMany(Payment, { foreignKey: "clientId", as: "payments" });
    Payment.belongsTo(Client, { foreignKey: "clientId", as: "client" });

    // Schedule slots
    Professional.hasMany(ScheduleSlot, {
        foreignKey: "professionalId",
        as: "scheduleSlots",
    });
    ScheduleSlot.belongsTo(Professional, {
        foreignKey: "professionalId",
        as: "professional",
    });

    cb();
};

export default associate;
