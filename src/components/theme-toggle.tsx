import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { useQuery } from "@tanstack/react-query";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { data: isMenuOpen } = useQuery<boolean>({ queryKey: ["navigation", "menu"] });
    const { data: isSidebarOpen } = useQuery<boolean>({ queryKey: ["navigation", "sidebar"] });
    const { theme, setTheme } = useTheme();
    const isMounted = useIsMounted();

    if (!isMounted) return null; // Prevents rendering until mounted

    const handleClick = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <Button variant="ghost" aria-label="Toggle theme" id="Toggle theme" onClick={handleClick}
            className="flex p-0 w-full items-center justify-start relative rounded-md whitespace-nowrap font-medium"
        >
            <div aria-hidden="true" className="flex size-9 p-2 shrink-0 items-center justify-center">
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </div>
            {(isMenuOpen || isSidebarOpen) && (
                <span className="pr-4 text-sm capitalize">{theme} Mode</span>
            )}
        </Button>
    );
}