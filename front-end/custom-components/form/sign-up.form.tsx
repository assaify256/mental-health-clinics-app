"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SubmitEvent, SubmitEventHandler, useState } from "react";
import Logo from "@/public/logo.png";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    signInLink: `/${string}`;
}

export default function SignupForm({ signInLink, ...props }: Props) {
    const [error, setError] = useState<string | null>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [role, setRole] = useState<string>("");

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (
        e: SubmitEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password and Confirmed password must be the same");
            return;
        }
        redirect("/dashboard/admin")
    };
    return (
        <Card {...props}>
            <CardHeader className="flex flex-row">
                <Image
                    className="w-1/5 self-center"
                    src={Logo}
                    alt="app logo"
                ></Image>
                <span className="flex flex-col self-center">
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </span>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} method="POST">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="first-name">
                                First Name
                            </FieldLabel>
                            <Input
                                id="first-name"
                                name="first-name"
                                type="text"
                                placeholder="John"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="name">Last Name</FieldLabel>
                            <Input
                                id="last-name"
                                name="last-name"
                                type="text"
                                placeholder="Doe"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not
                                share your email with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                                required
                                onBlur={(e) => {
                                    if (password !== confirmPassword) {
                                        setError(
                                            "Password and Confirmed password must be the same",
                                        );
                                    } else {
                                        setError("");
                                    }
                                }}
                            />
                            <FieldDescription>
                                Please confirm your password.
                            </FieldDescription>
                        </Field>

                        <FieldGroup>
                            <FieldGroup>
                                <FieldLabel>Role</FieldLabel>
                                <Select
                                    value={role}
                                    onValueChange={(val) => setRole(val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Role</SelectLabel>
                                            <SelectItem key={""} value={""}>
                                                Set Role
                                            </SelectItem>
                                            <SelectItem
                                                key={"client"}
                                                value={"client"}
                                            >
                                                Client
                                            </SelectItem>
                                            <SelectItem
                                                key={"professional"}
                                                value={"professional"}
                                            >
                                                Professional
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FieldGroup>
                            {error && (
                                <p className="bg-red-300 text-center border-2 border-black rounded-sm">
                                    {error}
                                </p>
                            )}
                            <Field>
                                <Button
                                    disabled={
                                        !!error ||
                                        !email ||
                                        !firstName ||
                                        !lastName ||
                                        !password ||
                                        !confirmPassword ||
                                        !role
                                    }
                                    type="submit"
                                >
                                    Create Account
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account?{" "}
                                    <a href={signInLink}>Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
