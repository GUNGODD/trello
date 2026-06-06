'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faInbox, faFolderOpen, faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useMutation } from '@liveblocks/react/suspense';
import { LiveObject } from '@liveblocks/client';
import uniqid from 'uniqid';
import NewColumnForm from '@/components/forms/NewColumnForm';

interface EmptyStateProps {
  type: 'board' | 'cards' | 'column';
  boardId?: string;
  columnId?: string;
}

export function EmptyState({ type, boardId, columnId }: EmptyStateProps) {
  const createTemplateColumns = useMutation(({ storage }) => {
    const columnsList = storage.get("columns");
    if (!columnsList) return;
    
    // Pushes standard "To Do", "In Progress", and "Done" columns
    const templates = [
      { name: "To Do", id: uniqid.time() + "-todo", index: 0 },
      { name: "In Progress", id: uniqid.time() + "-inprog", index: 1 },
      { name: "Done", id: uniqid.time() + "-done", index: 2 }
    ];
    
    for (const temp of templates) {
      columnsList.push(new LiveObject(temp));
    }
  }, []);

  const configs = {
    board: {
      icon: faFolderOpen,
      title: 'No boards yet',
      description: 'Create your first board to start organizing your projects and tasks.',
      action: (
        <Link href="/new-board">
          <button className="btn primary flex items-center gap-2 mt-4">
            <FontAwesomeIcon icon={faPlus} />
            Create your first board
          </button>
        </Link>
      ),
    },
    cards: {
      icon: faInbox,
      title: 'No cards in this column',
      description: 'Add cards to track tasks, ideas, or anything you need to organize.',
      action: null,
    },
    column: {
      icon: faUsers,
      title: 'No columns yet',
      description: 'Create columns to organize your workflow (e.g., To Do, In Progress, Done).',
      action: (
        <div className="flex flex-col items-center gap-4 mt-6">
          <button 
            onClick={() => createTemplateColumns()}
            className="bg-[#0c66e4] hover:bg-[#0055cc] active:scale-[0.97] text-white text-sm font-bold px-5 py-3 rounded-xl transition-all border-0 shadow-md flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Start with a template
          </button>
          <div className="flex items-center gap-2 w-full max-w-xs justify-center my-2">
            <div className="h-[1px] bg-gray-300 dark:bg-white/10 flex-grow"></div>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">or create custom list</span>
            <div className="h-[1px] bg-gray-300 dark:bg-white/10 flex-grow"></div>
          </div>
          <div className="w-full flex justify-center">
            <NewColumnForm />
          </div>
        </div>
      ),
    },
  };

  const config = configs[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-4">
        <FontAwesomeIcon 
          icon={config.icon} 
          className="w-10 h-10 text-[var(--color-text-muted)]"
        />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        {config.title}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-md mb-4">
        {config.description}
      </p>
      {config.action}
    </motion.div>
  );
}
