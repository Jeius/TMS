import * as z from "zod";

export type Thesis = {
    id: string
    title: string
    year: number
    author: string
    adviser: string
    keywords: string
    specialization: string
    dateUploaded: string
    department: string
}

export type AuthActionResponse = {
    success?: string,
    error?: string,
    details?: string,
}

export const RemindersFormSchema = z.object({
    reminders: z.array(z.string()),
})

export type Message =
    | { success?: string }
    | { error?: string };

export const EmailSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const ConfirmPasswordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export const SignUpSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});