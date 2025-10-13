import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    return NextResponse.next();
  },
  {
    pages: { signIn: "/login" },
    callbacks: { authorized: ({ token }) => !!token },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|login|register|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|txt|json|map|woff2?|ttf|eot|otf|mp4|webm|ogg|mp3|wav)$).*)",
  ],
};

