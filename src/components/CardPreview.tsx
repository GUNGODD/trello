'use client';

import { Card as CardType } from "@/app/liveblocks.config";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCheckSquare, faComment } from "@fortawesome/free-regular-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { formatDueDate, getDueDateStatus } from "@/components/DueDatePicker";

interface CardPreviewProps {
  card: CardType;
  isVisible: boolean;
}

export function CardPreview({ card, isVisible }: CardPreviewProps) {
  const dueDateStatus = getDueDateStatus(card.dueDate);
  const completedChecklist = card.checklist?.filter(item => item.done).length || 0;
  const totalChecklist = card.checklist?.length || 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute z-50 w-72 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-2xl border border-white/20 dark:border-white/10 p-5 pointer-events-none backdrop-blur-xl"
          style={{
            left: '100%',
            top: '0',
            marginLeft: '8px',
          }}
        >
          {/* Labels */}
          {card.labels && card.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {card.labels.map((label) => (
                <span
                  key={label.id}
                  className="text-[10px] px-2 py-0.5 rounded font-semibold text-white shadow-sm"
                  style={{ backgroundColor: label.color }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">
            {card.name}
          </h3>

          {/* Description preview */}
          {card.description && (
            <div className="mb-3">
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-1">
                <FontAwesomeIcon icon={faAlignLeft} />
                <span>Description</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">
                {card.description}
              </p>
            </div>
          )}

          {/* Checklist progress */}
          {totalChecklist > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <FontAwesomeIcon icon={faCheckSquare} />
                  <span>Checklist</span>
                </div>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {completedChecklist}/{totalChecklist}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(completedChecklist / totalChecklist) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Due date */}
          {card.dueDate && (
            <div className="flex items-center gap-2 text-xs mb-2">
              <FontAwesomeIcon 
                icon={faCalendar} 
                className={
                  dueDateStatus === 'overdue' ? 'text-red-500' :
                  dueDateStatus === 'due-soon' ? 'text-yellow-500' :
                  'text-[var(--color-text-muted)]'
                }
              />
              <span className={
                dueDateStatus === 'overdue' ? 'text-red-500 font-medium' :
                dueDateStatus === 'due-soon' ? 'text-yellow-500 font-medium' :
                'text-[var(--color-text-secondary)]'
              }>
                {formatDueDate(card.dueDate)}
              </span>
            </div>
          )}

          {/* Assignees */}
          {card.assignees && card.assignees.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {card.assignees.slice(0, 3).map((email, index) => (
                  <div
                    key={email}
                    className="w-6 h-6 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-bg-secondary)] flex items-center justify-center text-xs text-white font-medium"
                  >
                    {email.charAt(0).toUpperCase()}
                  </div>
                ))}
                {card.assignees.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-bg-secondary)] flex items-center justify-center text-xs text-[var(--color-text-muted)] font-medium">
                    +{card.assignees.length - 3}
                  </div>
                )}
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">
                {card.assignees.length} {card.assignees.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
