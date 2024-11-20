'use client';

import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function ThemeSwitch({ open }: { open?: boolean }) {
  const { theme, setTheme } = useTheme();

  const handleClick = (isChecked: boolean) => {
    const themeValue = isChecked ? 'light' : 'dark';
    setTheme(themeValue);
  };

  return (
    <div className="flex h-fit w-full items-center justify-start whitespace-nowrap py-1">
      <Switch
        type="submit"
        checked={theme === 'light'}
        onCheckedChange={handleClick}
        className="mx-0.5 data-[state=unchecked]:bg-primary"
      />
      {open && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="ml-1 cursor-default text-sm font-semibold capitalize"
        >
          {theme} Mode
        </motion.span>
      )}
    </div>
  );
}
