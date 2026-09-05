"use client";
//Components
import { SignInForm } from "@/custom-components/form/sign-in.form";

// Assets
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();
    useEffect(() => {
        const controller = new AbortController();
        const resObj = fetch("http://localhost:8080/api/v1/auth/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((resObj) => {
                if (resObj) {
                    resObj.data.role &&
                        router.push(`/dashboard/${resObj.data.role}`);
                }
            });
        return () => {
            controller.abort();
        };
    }, []);

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
