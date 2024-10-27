"use client"

import SubmitButton, { Status } from "@/components/animated/submit-button";
import { CustomFormMessage } from "@/components/form-message";
import { Form } from "@/components/ui/form";
import { Message, SignUpSchema } from "@/lib/types";
import { wait } from "@/lib/utils";
import { signUpAction } from "@/server/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EmailField, PasswordField } from "./form-fields";

export default function SignUp() {
    const [status, setStatus] = useState<Status | undefined>();
    const [message, setMessage] = useState<Message>();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
        setStatus("loading");
        const result = await signUpAction(data);

        if (result.success) {
            setStatus("success");
            setMessage({ success: result.details })
            await wait(3000);
            form.reset();
            setStatus(undefined);
        } else {
            setStatus("failed");
            setMessage({ error: result.details.toString() })
            await wait(3000);
            setStatus(undefined);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center space-y-8 mx-auto"
            >
                <EmailField formControl={form.control} name="email" label="Email" />
                <PasswordField formControl={form.control} name="password" label="Password" />
                <PasswordField formControl={form.control} name="confirmPassword" label="Confirm Password" />
                {message && <CustomFormMessage message={message} />}
                <SubmitButton status={status} isSubmitting={form.formState.isSubmitting}>Sign Up</SubmitButton>
            </form>
        </Form>
    );
}


