import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstance } from "../../../../../axios";
import { fetchInstance } from "@/config/fetch";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetchInstance(
                        "/auth/login",
                        {
                            method: "POST",
                            body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                        }
                    );
                    console.log("res:", res)
                    
                    return { ...res.user, apiToken: res.token };
                } catch (error: any) {
                    console.log("error:", error)
                    throw new Error(error.message || error);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).apiToken;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
    jwt: {
        maxAge: 2 * 60 * 60, // 2 hours
    },
    session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
