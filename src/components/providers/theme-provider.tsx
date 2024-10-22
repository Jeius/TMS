"use client"

import { setThemeCookies } from "@/utils/actions/theme";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

function getSystemTheme(): string {
    if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode; initialTheme?: string }) {
    const [theme, setTheme] = useState<string>(() => initialTheme ?? getSystemTheme());

    useEffect(() => {
        if (!initialTheme) {
            const systemTheme = getSystemTheme();
            setTheme(systemTheme);

            const formData = new FormData();
            formData.set("theme", systemTheme);
            setThemeCookies(formData);
        }
    }, [initialTheme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
