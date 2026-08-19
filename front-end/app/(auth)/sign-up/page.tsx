"use client";

// Components

import SignupForm from "@/custom-components/form/sign-up.form";

// Assets

export default function Page() {
    return (
        <div className="flex flex-col gap-4 md:p-12 h-screen">
            {/* <div className="flex justify-center md:justify-start">
                <a href="#" className="flex items-center font-medium">
                    <div className="flex size-24 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Image alt="App Logo" src={Logo} />
                    </div>
                </a>
            </div> */}
            <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col w-1/3 pb-8">
                    <SignupForm
                        className="border-2 border-black bg-mauve-50"
                        signInLink="/sign-in"
                    />
                </div>
            </div>
        </div>
    );
}
