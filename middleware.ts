import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import withAuth from "next-auth/middleware";

export default withAuth(
    async function middleware(req: NextRequest) {
        const token = await getToken({ req }); // Get the user's session token
        const { pathname } = req.nextUrl;

        // Log token and pathname for debugging
        console.log(`TOKEN: ${token}`);
        console.log(`PATHNAME: ${pathname}`);

        // Redirect logged-in users away from the login page
        if (token && pathname === "/login") {
            return NextResponse.redirect(new URL("/", req.url)); // Redirect to home
        }

        // Allow the request to proceed
        return NextResponse.next();
    },
    {
        callbacks: {
            // The `authorized` callback determines if the user is allowed to access the route
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // Allow public and authentication routes
                if (
                    pathname.startsWith("/api/auth") || // NextAuth.js API routes
                    pathname === "/login" || // Login page
                    pathname === "/" ||// Homepage (public)
                    pathname === "/api/uploadthing"
                ) {
                    return true;
                }

                // Protect all other routes
                return !!token; // If token exists, allow access; otherwise, deny
            },
        },
    }
);

// Define the paths where the middleware should run
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api/uploadthing).*)"],
};