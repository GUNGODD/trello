'use client';

import { useStorage } from '@liveblocks/react/suspense';
import { motion } from 'framer-motion';
import { faCheckCircle, faClock } from '@fortawesome/free-regular-svg-icons';
import { faList, faColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BoardProgress() {
  const cards = useStorage((root) => root.cards);
  const columns = useStorage((root) => root.columns);

  const totalCards = cards?.length || 0;
  const completedChecklistItems = cards?.reduce((acc, card) => {
    return acc + (card.checklist?.filter(item => item.done).length || 0);
  }, 0) || 0;
  const totalChecklistItems = cards?.reduce((acc, card) => {
    return acc + (card.checklist?.length || 0);
  }, 0) || 0;

  const overdueCards = cards?.filter(card => {
    if (!card.dueDate) return false;
    return new Date(card.dueDate) < new Date();
  }).length || 0;

  const cardsWithDueDate = cards?.filter(card => card.dueDate).length || 0;

  const checklistProgress = totalChecklistItems > 0 
    ? Math.round((completedChecklistItems / totalChecklistItems) * 100)
    : 0;

  if (totalCards === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-950/40 backdrop-blur-2xl rounded-2xl p-5 border border-white/20 dark:border-white/10 shadow-xl mb-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Total Cards */}
        <div className="text-center flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <FontAwesomeIcon icon={faList} />
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalCards}
            </span>
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Cards</div>
        </div>

        {/* Columns */}
        <div className="text-center flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
              <FontAwesomeIcon icon={faColumns} />
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {columns?.length || 0}
            </span>
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Columns</div>
        </div>

        {/* Checklist Progress */}
        <div className="text-center flex flex-col justify-center items-center w-full px-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {checklistProgress}%
            </span>
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Checklist Done</div>
          <div className="w-full max-w-[120px] h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${checklistProgress}%` }}
            />
          </div>
        </div>

        {/* Overdue Cards */}
        <div className="text-center flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${overdueCards > 0 ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/10 text-gray-400'}`}>
              <FontAwesomeIcon icon={faClock} />
            </div>
            <span className={`text-2xl font-bold ${overdueCards > 0 ? 'text-red-500 font-extrabold' : 'text-gray-800 dark:text-white'}`}>
              {overdueCards}
            </span>
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Overdue</div>
        </div>
      </div>
    </motion.div>
  );
}
