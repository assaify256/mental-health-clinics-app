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
                </div>
            </div>
        </div>
    );
}
