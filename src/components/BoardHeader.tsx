'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faLock, 
  faPlus, 
  faShare, 
  faDownload, 
  faEllipsis,
  faCalendar,
  faFilter,
  faSort,
  faTableColumns
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';

interface BoardHeaderProps {
  boardName: string;
  boardId: string;
  taskCount: number;
  lastUpdated: string;
}

export function BoardHeader({ boardName, boardId, taskCount, lastUpdated }: BoardHeaderProps) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
          <FontAwesomeIcon icon={faHome} className="text-xs" />
          Home
        </Link>
        <span>/</span>
        <span className="flex items-center gap-1">
          <FontAwesomeIcon icon={faTableColumns} className="text-xs" />
          Dashboard CRM
        </span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Task</span>
      </div>

      {/* Header row */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {boardName}
            </h1>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium border border-purple-100 dark:border-purple-500/20">
              <FontAwesomeIcon icon={faLock} className="text-xs" />
              Private
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {taskCount} tasks, update {lastUpdated}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Member avatars */}
          <div className="flex items-center -space-x-2">
            {['Sarah', 'John', 'Mike'].map((name, i) => (
              <div
                key={name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1a2e] bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-medium"
                title={name}
              >
                {name.charAt(0)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1a2e] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium">
              +12
            </div>
          </div>

          {/* Action buttons */}
          <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faPlus} className="text-sm" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faShare} className="text-xs" />
            Share
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faDownload} className="text-xs" />
            Request
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 font-medium">
            <FontAwesomeIcon icon={faTableColumns} className="text-xs" />
            Pipeline view
          </button>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FontAwesomeIcon icon={faFilter} className="text-xs" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faSort} className="text-xs" />
            Sort
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faCalendar} className="text-xs" />
            15 September 2024
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faDownload} className="text-xs" />
            Import / Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25">
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            Add New
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FontAwesomeIcon icon={faEllipsis} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
