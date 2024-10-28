'use server'

import { cookies } from 'next/headers';

async function setThemeCookies(theme: string) {
    cookies().set('theme', theme);
}
async function deleteThemeCookies() {
    cookies().delete('theme');
}

export { deleteThemeCookies, setThemeCookies };

