import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        return NextResponse.next();
    },
    {
        pages: {
            signIn: '/login',
        },
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/((?!api/auth|_next/static|_next/image|favicon.ico|login|register).*)",
    ],
};
