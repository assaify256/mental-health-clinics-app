// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Map restricted route patterns to their required roles
const ROLE_ROUTES: Record<string, string[]> = {
    "/dashboard/admin": ["admin"],
    "/dashboard/client": ["client"],
    "/dashboard/professional": ["professional"],
};

const PROTECTED_ROUTES: Record<string, string[]> = {
    "/dashboard": ["admin", "client", "professional"],
};

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get("connect.sid")?.value;

    const generalProtection = Object.keys(PROTECTED_ROUTES).find((route) => {
        return pathname.startsWith(route);
    });

    const specialProtection = Object.keys(ROLE_ROUTES).find((route) => {
        return pathname.startsWith(route);
    });

    if (!sessionToken) {
        const loginUrl = new URL("/sign-in", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (!generalProtection) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
        const user = await (
            await fetch("http://localhost:8080/api/v1/auth/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: request.cookies.toString(),
                },
            })
        ).json();
        const role = user.data.role;
        const allowedRoles = ROLE_ROUTES[specialProtection!];

        if (!role) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
        if (!allowedRoles.includes(role)) {
            return NextResponse.redirect(
                new URL(`/dashboard/${role}`, request.url),
            );
        }
    } catch (error) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// Target specific route paths to optimize edge proxy execution speed
export const config = {
    matcher: ["/dashboard/:path*"],
};
