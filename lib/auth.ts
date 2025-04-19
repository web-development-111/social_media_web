import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  // Configure GitHub and Google providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // Callbacks for JWT and session handling
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        // Fetch the user from the database
        const dbUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          select: {
            username: true,
          },
        });

        if (dbUser?.username) {
          token.username = dbUser.username;
        } else {
          // Generate a username if it doesn't exist
          const baseUsername =
            user.email?.split("@")[0] ||
            user.name?.replace(/\s+/g, "") ||
            "user";
          const randomSuffix = Math.floor(Math.random() * 10000);
          const generatedUsername = `${baseUsername}${randomSuffix}`;

          // Create or update user with the generated username
          await prisma.user.upsert({
            where: { id: user.id },
            create: {
              id: user.id,
              username: generatedUsername,
              email: user.email ?? "",
              name: user.name,
            },
            update: {
              username: generatedUsername,
            },
          });

          token.username = generatedUsername;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Add the user ID to the session
        session.user.username = token.username as string;
      }
      return session;
    },
  },

  // Custom pages
  pages: {
    signIn: "/login", // Redirect to this page for login
    error: "/login", // Redirect to this page for errors
  },

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },

  // Secret for NextAuth.js
  secret: process.env.NEXTAUTH_SECRET,
};
