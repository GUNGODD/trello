"use client";
import { useTheme } from "@/components/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md transition-colors"
      style={{ 
        color: 'var(--color-text-secondary)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <FontAwesomeIcon icon={dark ? faSun : faMoon} />
    </button>
  );
}
