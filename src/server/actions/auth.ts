"use server";

import { supabaseServerClient } from "@/lib/supabase/server";
import { AuthActionResponse, ConfirmPasswordSchema, EmailSchema, SignInSchema, SignUpSchema } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function signUpAction(data: z.infer<typeof SignUpSchema>): Promise<AuthActionResponse> {
    const result = SignUpSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        console.log("Validation errors:", errors);
        return { error: "Invalid form submission" };
    }

    const { email, password } = result.data;
    const supabase = await supabaseServerClient();
    const origin = (await headers()).get("origin");

    const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        if (signUpError.message.includes("already registered")) {
            return { error: "This email is already registered. Please use another one." };
        }
        console.error(signUpError.code + " " + signUpError.message);
        return { error: "Authentication error", details: signUpError.message };
    } else {
        return {
            success: "Signed up successfully",
            details: `Please verify your account via the confirmation link sent to ${email}.`
        };
    }
}

export async function signInAction(data: z.infer<typeof SignInSchema>): Promise<AuthActionResponse> {
    const result = SignInSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        console.log("Validation errors:", errors);
        return { error: "Invalid form submission" };
    }

    const { email, password } = result.data;
    const supabase = await supabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: "Authentication error", details: error.message };
    } else {
        return { success: "Signed in successfully" };
    }
}

export async function forgotPasswordAction(data: z.infer<typeof EmailSchema>): Promise<AuthActionResponse> {
    const result = EmailSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        console.log("Validation errors:", errors);
        return { error: "Invalid form submission" };
    }

    const { email } = result.data;
    const supabase = await supabaseServerClient();
    const origin = (await headers()).get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        console.error(error.message);
        return { error: "Could not reset password", details: error.message };
    }

    return { success: "Submitted successfully", details: `A confirmation link has been sent to ${email}` };
}

export async function resetPasswordAction(data: z.infer<typeof ConfirmPasswordSchema>): Promise<AuthActionResponse> {
    const result = ConfirmPasswordSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        console.log("Validation errors:", errors);
        return { error: "Invalid form submission" };
    }

    const { password } = result.data;

    const supabase = await supabaseServerClient();

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return { error: "Password update failed", details: error.message };
    }

    return { success: "Password updated" };
}

export const signOutAction = async () => {
    const supabase = await supabaseServerClient();
    await supabase.auth.signOut();
    return redirect("/");
};
