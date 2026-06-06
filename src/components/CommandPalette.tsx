'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faPlus, faMoon, faSun, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

interface CommandPaletteProps {
  boards?: Array<{ id: string; name: string }>;
}

export function CommandPalette({ boards = [] }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { dark, toggle } = useTheme();

  const commands = [
    { id: 'home', label: 'Go to Home', icon: faHome, action: () => router.push('/') },
    { id: 'new-board', label: 'Create New Board', icon: faPlus, action: () => router.push('/new-board') },
    { id: 'toggle-theme', label: dark ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: dark ? faSun : faMoon, action: toggle },
    ...boards.map(board => ({
      id: `board-${board.id}`,
      label: `Go to ${board.name}`,
      icon: faHome,
      action: () => router.push(`/boards/${board.id}`),
    })),
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }

    if (!isOpen) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    }

    if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      setIsOpen(false);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen, filteredCommands, selectedIndex, router, dark]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => {
                setIsOpen(false);
                setSearch('');
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 bg-[var(--color-bg-secondary)] rounded-lg shadow-2xl border border-[var(--color-border)] overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-[var(--color-border-light)]">
                <FontAwesomeIcon icon={faSearch} className="text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent outline-none text-[var(--color-text-primary)]"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">
                  ESC
                </kbd>
              </div>
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-[var(--color-text-muted)]">
                    No commands found
                  </div>
                ) : (
                  filteredCommands.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                        index === selectedIndex
                          ? 'bg-[var(--color-bg-tertiary)]'
                          : 'hover:bg-[var(--color-bg-tertiary)]'
                      }`}
                    >
                      <FontAwesomeIcon 
                        icon={cmd.icon} 
                        className="w-4 h-4 text-[var(--color-text-muted)]"
                      />
                      <span className="text-[var(--color-text-primary)]">{cmd.label}</span>
                    </button>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-[var(--color-border-light)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faKeyboard} />
                  <span>Navigate</span>
                </div>
                <div className="flex gap-2">
                  <kbd className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">↑↓</kbd>
                  <kbd className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">↵</kbd>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
