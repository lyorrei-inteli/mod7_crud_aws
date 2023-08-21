import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstance } from "../../../../../axios";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (typeof credentials !== "undefined") {
                    try {
                        const { data } = await axiosInstance.post("/auth/login", {
                            email: credentials.email,
                            password: credentials.password,
                        });
                        return { ...data.user, apiToken: data.token };
                    } catch (error: any) {
                        return null;
                    }
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // the user object is what returned from the Credentials login, it has `accessToken` from the server `/login` endpoint
            // assign the accessToken to the `token` object, so it will be available on the `session` callback
            if (user) {
                token.accessToken = (user as any).apiToken;
            }
            return token;
        },

        async session({ session, token }) {
            // the token object is what returned from the `jwt` callback, it has the `accessToken` that we assigned before
            // Assign the accessToken to the `session` object, so it will be available on our app through `useSession` hooks
            if (token) {
                session.accessToken = token.accessToken;
            }
            return session;
        },

        // redirect({ url, baseUrl }) {
        //     console.log(url, baseUrl);
        //     // This function receives the `url` that's being redirected to.
        //     // `baseUrl` is your application's base URL.

        //     // If the user is redirecting to /api/auth/signin after a successful login
        //     // You can change this to redirect them to any page you want, like /dashboard
        //     if (url === baseUrl + "/api/auth/signin") {
        //         return "/protected/todos";
        //     }
        //     // If not, continue with the default redirect URL
        //     return url.startsWith(baseUrl) ? url : baseUrl;
        // },
    },
    jwt: {
        maxAge: 2 * 60 * 60, // 2 hours
    },
    session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
