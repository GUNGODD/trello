"use client";
import { useTheme } from "@/components/ThemeContext";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SHORTCUTS = [
  { key: "n", description: "Focus new card input" },
  { key: "/", description: "Toggle this help" },
  { key: "d", description: "Toggle dark mode" },
  { key: "Escape", description: "Close modal / go back" },
];

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { toggle } = useTheme();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "/" || (e.key === "?" && e.shiftKey)) {
        e.preventDefault();
        setShowHelp((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (params.cardId) {
          router.back();
        }
        setShowHelp(false);
      }
      if (e.key === "n") {
        e.preventDefault();
        const inputs = document.querySelectorAll<HTMLInputElement>('input[placeholder="card name"]');
        if (inputs.length > 0) {
          inputs[inputs.length - 1].focus();
        }
      }
      if (e.key === "d") {
        toggle();
      }
    },
    [params.cardId, router, toggle]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <button
        className="btn text-sm flex items-center gap-1.5 fixed bottom-4 right-4 z-40"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={() => setShowHelp(true)}
        title="Keyboard shortcuts (?)"
      >
        <FontAwesomeIcon icon={faKeyboard} />
        <span className="hidden sm:inline">?</span>
      </button>
      {showHelp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setShowHelp(false)}
        >
          <div 
            className="rounded-lg p-6 max-w-sm w-full"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <FontAwesomeIcon icon={faKeyboard} />
              Keyboard Shortcuts
            </h3>
            <div className="space-y-3">
              {SHORTCUTS.map((shortcut) => (
                <div key={shortcut.key} className="flex justify-between items-center">
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {shortcut.description}
                  </span>
                  <kbd 
                    className="px-2 py-1 text-xs font-semibold rounded"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
            <button
              className="btn primary w-full mt-4 text-sm"
              onClick={() => setShowHelp(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
