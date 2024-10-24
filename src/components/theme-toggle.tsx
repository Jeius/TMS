import { setThemeCookies } from "@/utils/actions/theme";
import { useTheme } from "./providers/theme-provider";
import { Switch } from "./ui/switch";

export default function ThemeToggle({ open }: { open?: boolean }) {
    const { theme, setTheme } = useTheme();

    const handleClick = (isChecked: boolean) => {
        const themeValue = isChecked ? "light" : "dark"
        setTheme(themeValue)
        setThemeCookies(themeValue);
    };

    return (
        <div className="flex py-1 h-fit w-full items-center justify-start whitespace-nowrap">
            <Switch type="submit" checked={theme === "light"}
                onCheckedChange={handleClick}
                className="mx-0.5 data-[state=unchecked]:bg-primary"
            />
            {open && (
                <span className="ml-1 text-sm font-semibold capitalize cursor-default">{theme} Mode</span>
            )}
        </div>
    );
}