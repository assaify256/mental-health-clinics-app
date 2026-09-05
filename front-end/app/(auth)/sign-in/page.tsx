<<<<<<< HEAD
"use client";
//Components
import { SignInForm } from "@/custom-components/form/sign-in.form";

// Assets

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-4 md:p-6 h-screen">
            <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col w-1/3 pb-8">
                    <SignInForm
                        className="border-2 border-black bg-mauve-50"
                        signUpLink="/sign-up"
                    />
=======
"use client"
//Components

import Image from "next/image";
import { LoginForm } from "@/custom-components/general/login-form";

// Assets
import Logo from "@/public/logo.png";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-6 h-screen">
            <div className="flex justify-center gap-2 md:justify-start">
                <a href="#" className="flex items-center gap-2 font-medium">
                    <div className="flex size-24 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Image alt="App Logo" src={Logo} />
                    </div>
                </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <LoginForm signUpLink="/sign-up" />
>>>>>>> 247ce7b085ad8271f53ade34154f8c66b005cdbf
                </div>
            </div>
        </div>
    );
}
