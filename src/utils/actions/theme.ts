"use server"

import { cookies } from "next/headers";

async function setThemeCookies(formData: FormData) {
    const theme = formData.get('theme') ?? 'light';
    cookies().set("theme", theme.toString());
}
async function deleteThemeCookies() {
    cookies().delete("theme");
}

export { deleteThemeCookies, setThemeCookies };

