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
import { redirect } from "next/navigation";

import { useState } from "react";

interface Props extends React.ComponentProps<typeof Card> {
    signUpLink: `/${string}`;
}

export function LoginForm({ signUpLink, ...props }: Props) {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e) => {
        // const result = await login({ email, password });
        // if (result?.error) {
        //     setError(result.error);
        // }
        e.preventDefault();
        const response = fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    setError("Invalid credentials");
                }
                return response.json();
            })
            .then((resObj) => {
                console.log(resObj)
                if (resObj) {
                    const role = resObj.data.user.role;
                    console.log(role)
                    redirect(`/dashboard/${role}`);
                }
            });
    };
    return (
        <div {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>
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
        </div>
    );
}
