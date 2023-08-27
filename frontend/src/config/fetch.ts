import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { isServerSide } from "./environment";
import { getSession } from "next-auth/react";

export const fetchInstance = async (endpoint: string, options?: RequestInit) => {
    let baseURL: string | null = null
    let session: Session | null = null;

    if (isServerSide()) {
        session = await getServerSession(authOptions);
        baseURL = "http://backend:3001"
    } else {
        session = await getSession();
        baseURL = "http://localhost:3001";
    }

    const finalURL = `${baseURL}${endpoint}`;

    const mergedOptions: RequestInit = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: session ?`Bearer ${session.accessToken}` : "",
            ...options?.headers,
        },
    };

    const response = await fetch(finalURL, mergedOptions);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fetch request failed");
    }

    return response.json();
};
