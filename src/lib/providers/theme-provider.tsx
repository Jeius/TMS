"use client"

import { setThemeCookies } from "@/utils/actions/theme";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextProps = {
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

type ThemeProviderProps = {
    children: React.ReactNode;
    initialTheme?: string;
};

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
    const systemTheme = getSystemTheme();
    const [theme, setTheme] = useState<string>(initialTheme ?? systemTheme);

    useEffect(() => {
        if (!initialTheme) {
            setTheme(systemTheme);
            setThemeCookies(systemTheme);
        }
    }, [initialTheme, systemTheme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
