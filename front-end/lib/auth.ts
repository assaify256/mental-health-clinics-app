"use client";

import { redirect } from "next/navigation";

export async function login(formData: { email: string; password: string }) {
    const email = formData.email;
    const password = formData.password;

    // 1. Forward credentials to your external API
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        return { error: "Invalid credentials" };
    }

    const data = await response.json();
    
    const token = data.accessToken; // Extract token from external API response
    console.log(data, token);
    // 2. Store the token securely in an HttpOnly cookie
    // cookieStore.set("session_token", token, {
    //     httpOnly: true, // Prevents client-side JS theft
    //     secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    //     sameSite: "lax",
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7, // 1 week
    // });

    // 3. Redirect to dashboard
    // redirect("/dashboard/admin");
}

export async function logout() {
    cookieStore.delete("session_token");
    redirect("/login");
}
