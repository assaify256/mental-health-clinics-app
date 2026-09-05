"use client";
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
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import Logo from "@/public/logo.png";

import { SubmitEvent, SubmitEventHandler, useState } from "react";

interface Props extends React.ComponentProps<typeof Card> {
    signUpLink: `/${string}`;
}

export function SignInForm({ signUpLink, ...props }: Props) {
    const [error, setError] = useState<string | null>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter()
    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (
        e: SubmitEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        redirect("/dashboard/admin")
    };
    return (
        <Card {...props}>
            <CardHeader className="flex flex-row ">
                <Image
                    className="w-1/5 self-center"
                    src={Logo}
                    alt="app logo"
                ></Image>
                <span className="flex flex-col self-center">
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </span>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} method="POST">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Field>
                        <Field>
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field>
                        {error && (
                            <p className="bg-red-300 text-center border-2 border-black rounded-sm">
                                {error}
                            </p>
                        )}
                        <Field>
                            <Button
                                type="submit"
                                disabled={!!error || !email || !password}
                            >
                                Login
                            </Button>
                            {/* <Button variant="outline" type="button">
                                    Login with Google
                                </Button> */}
                            <FieldDescription className="text-center">
                                Don&apos;t have an account?{" "}
                                <a href={signUpLink}>Sign up</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
