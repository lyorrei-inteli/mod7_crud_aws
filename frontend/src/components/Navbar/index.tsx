'use client'
import { routes } from "@/config/routes";
import { signOut } from "next-auth/react";
import React from "react";

export const Navbar = () => {
    return (
        <div className="fixed right-0 top-0">
            <button
                className="bg-primary transition-all hover:scale-105 m-4 text-white font-bold py-2 px-4 rounded"
                onClick={() => signOut({
                  redirect: true,
                  callbackUrl: routes.auth.login
                })}
            >
                Logout
            </button>
        </div>
    );
};
