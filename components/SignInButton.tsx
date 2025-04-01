"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

interface SignInButtonProps {
    children?: ReactNode;
    className?: string;
    variant?: "default" | "ghost" | "outline" | "destructive" | "secondary";
    size?: "default" | "icon" | "lg" | "sm"
}

export default function SignInButton({
    children = "Sign In",
    className,
    variant = "default",
    size

}: SignInButtonProps) {
    return (
        <Button variant={variant} onClick={() => signIn()} className={className} size={size}>
            {children}
        </Button>
    );
}
