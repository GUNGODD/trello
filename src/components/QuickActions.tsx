'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faTag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickActionsProps {
  cardId: string;
  onAssign?: () => void;
  onDueDate?: () => void;
  onLabel?: () => void;
  onDelete?: () => void;
}

export function QuickActions({ 
  cardId, 
  onAssign, 
  onDueDate, 
  onLabel, 
  onDelete 
}: QuickActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  const actions = [
    { icon: faUser, label: 'Assign', onClick: onAssign, color: 'text-blue-500' },
    { icon: faCalendar, label: 'Due date', onClick: onDueDate, color: 'text-green-500' },
    { icon: faTag, label: 'Label', onClick: onLabel, color: 'text-purple-500' },
    { icon: faTrash, label: 'Delete', onClick: onDelete, color: 'text-red-500' },
  ].filter(action => action.onClick);

  if (actions.length === 0) return null;

  return (
    <div
      className="absolute top-2 right-2 z-10"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="flex gap-1 bg-[var(--color-bg-secondary)] rounded-md shadow-lg border border-[var(--color-border)] p-1"
          >
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  action.onClick?.();
                }}
                className={`p-2 rounded hover:bg-[var(--color-bg-tertiary)] transition-colors ${action.color}`}
                title={action.label}
              >
                <FontAwesomeIcon icon={action.icon} className="w-4 h-4" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
