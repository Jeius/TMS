"use client"

import { Message, SignInSchema } from "@/lib/types";
import { wait } from "@/lib/utils";
import { signInAction } from "@/server/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import SubmitButton, { Status } from "../animated/submit-button";
import { CustomFormMessage } from "../form-message";
import { Form } from "../ui/form";
import { EmailField, PasswordField } from "./form-fields";

export default function SignIn() {
    const [status, setStatus] = useState<Status | undefined>();
    const [message, setMessage] = useState<Message>();
    const router = useRouter();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        setStatus("loading");
        const result = await signInAction(data);

        if (result.success) {
            setStatus("success");
            setMessage({ success: result.success })
            await wait(3000);
            form.reset();
            setStatus(undefined);
            router.push("/");

        } else {
            setStatus("failed");
            setMessage({ error: (result.details ?? result.error ?? "").toString() })
            await wait(3000);
            setStatus(undefined);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col min-w-64 max-w-64 justify-center space-y-8 mx-auto"
            >
                <EmailField formControl={form.control} name="email" label="Email" />
                <PasswordField formControl={form.control} name="password" label="Password" />
                {message && <CustomFormMessage message={message} />}
                <SubmitButton status={status} isSubmitting={form.formState.isSubmitting}>Sign In</SubmitButton>
            </form>
        </Form>
    );
}


