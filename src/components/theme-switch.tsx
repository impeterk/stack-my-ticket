import { useState, type JSX } from "react";
import { cn } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme, type Theme } from "@/providers/theme-provider";

const defFunc = () => null;

function ThemeOption({
  icon,
  value,
  isActive,
  onClick = defFunc,
}: {
  icon: JSX.Element;
  value: Theme;
  isActive?: boolean;
  onClick?: (value: Theme) => void;
}) {
  return (
    <button
      aria-checked={isActive}
      aria-label={`Switch to ${value} theme`}
      className={cn(
        "relative flex size-8 cursor-default items-center justify-center rounded-full transition-all [&_svg]:size-4",
      )}
      role="radio"
      type="button"
      onClick={() => onClick(value)}
    >
      {icon}
    </button>
  );
}

const THEME_OPTIONS = [
  {
    icon: <MonitorIcon />,
    value: "system",
  },
  {
    icon: <SunIcon />,
    value: "light",
  },
  {
    icon: <MoonIcon />,
    value: "dark",
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const pos_left = `${THEME_OPTIONS.findIndex((t) => t.value === theme) * 2}rem`;

  return (
    <div
      className="bg-muted ring-secondary relative inline-flex h-min items-center rounded-full ring-1"
      role="radiogroup"
    >
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          key={option.value}
          icon={option.icon}
          isActive={theme === option.value}
          value={option.value as Theme}
          onClick={setTheme}
        />
      ))}

      <div
        className={cn(
          "border-foreground dark:border-primary absolute size-8 rounded-full border transition-all",
        )}
        style={{ left: pos_left }}
      />
    </div>
  );
}
