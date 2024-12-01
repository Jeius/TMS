'use client';

import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

export default function ThemeSwitch({ open }: { open?: boolean }) {
  const { theme, setTheme } = useTheme();

  const handleClick = (isChecked: boolean) => {
    const themeValue = isChecked ? 'light' : 'dark';
    setTheme(themeValue);
  };

  return (
    <div className="flex h-fit w-full items-center justify-start space-x-2 whitespace-nowrap p-1">
      <Switch
        checked={theme === 'light'}
        onCheckedChange={handleClick}
        className="data-[state=unchecked]:bg-primary"
      />
      {open && (
        <span className="ml-1 cursor-default text-sm font-semibold capitalize">
          {theme} Mode
        </span>
      )}
    </div>
  );
}
