import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export default function ThemeToggle({ open }: { open?: boolean }) {
    const { theme, setTheme } = useTheme();
    const isMounted = useIsMounted();

    if (!isMounted) return null; // Prevents rendering until mounted

    const handleClick = (isChecked: boolean) => setTheme(isChecked ? "light" : "dark");

    return (
        <div
            className="flex py-1 h-fit w-full items-center justify-start whitespace-nowrap">
            <Switch checked={theme === "light"} onCheckedChange={handleClick} className="mx-0.5 data-[state=unchecked]:bg-primary" />
            {open && (
                <span className="ml-1 text-sm font-semibold capitalize cursor-default">{theme} Mode</span>
            )}
        </div>
    );
}