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

export const RemindersFormSchema = z.object({
    reminders: z.array(z.string()),
})

export type Message =
    | { success: string }
    | { error: string }
    | { message: string };


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