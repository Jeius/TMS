import { setThemeCookies } from "@/utils/actions/theme";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

function getTheme() {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        return storedTheme;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}


export default function ThemeToggle({ open }: { open?: boolean }) {
    const [theme, setTheme] = useState<string>();

    useEffect(() => {
        const currentTheme = getTheme();
        setTheme(currentTheme);
    }, []);

    const handleClick = (isChecked: boolean) => setTheme(isChecked ? "light" : "dark");

    return (
        <form action={setThemeCookies} className="flex py-1 h-fit w-full items-center justify-start whitespace-nowrap">
            <input hidden name="theme" value={theme} readOnly />
            <Switch type="submit" checked={theme === "light"}
                onCheckedChange={handleClick}
                className="mx-0.5 data-[state=unchecked]:bg-primary"
            />
            {open && (
                <span className="ml-1 text-sm font-semibold capitalize cursor-default">{theme} Mode</span>
            )}
        </form>
    );
}