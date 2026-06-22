import bcrypt from "bcryptjs";
import User from "../models/user.model.ts";

export const checkEmail = async (email: string) => {
    const isUserExist = await User.findOne({ where: { email: email } });
    const isEmailAvailable = !isUserExist;
    return isEmailAvailable;
};

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 12);
};

export const createUser = async (email: string, hashedPassword: string) => {
    const isUserCreated = await User.create({
        email: email,
        password_hash: hashedPassword,
    });
    return isUserCreated !== null;
};

export const compareHashedPassword = async (
    email: string,
    password: string,
) => {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        return await bcrypt.compare(password, user.password_hash);
    }
};

