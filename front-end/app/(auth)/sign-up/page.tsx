<<<<<<< HEAD
"use client";

// Components

import SignupForm from "@/custom-components/form/sign-up.form";

// Assets

export default function Page() {
    return (
        <div className="flex flex-col gap-4 md:p-12 h-screen">
            {/* <div className="flex justify-center md:justify-start">
=======
'use client'

// Components
import Image from "next/image";
import { SignupForm } from "@/custom-components/general/signup-form";

// Assets
import Logo from "@/public/logo.png";

export default function Page() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-6 h-screen">
            <div className="flex justify-center md:justify-start">
>>>>>>> 247ce7b085ad8271f53ade34154f8c66b005cdbf
                <a href="#" className="flex items-center font-medium">
                    <div className="flex size-24 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Image alt="App Logo" src={Logo} />
                    </div>
                </a>
<<<<<<< HEAD
            </div> */}
            <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col w-1/3 pb-8">
                    <SignupForm
                        className="border-2 border-black bg-mauve-50"
                        signInLink="/sign-in"
                    />
=======
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <SignupForm signInLink="/sign-in" />
>>>>>>> 247ce7b085ad8271f53ade34154f8c66b005cdbf
                </div>
            </div>
        </div>
    );
}
