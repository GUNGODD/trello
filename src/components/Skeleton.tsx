'use client';

import { motion } from 'framer-motion';

export function CardSkeleton() {
  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-md p-3 border border-[var(--color-border-light)]">
      <div className="animate-pulse space-y-2">
        <div className="h-2 bg-[var(--color-bg-tertiary)] rounded w-3/4"></div>
        <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-full"></div>
        <div className="flex gap-2">
          <div className="h-2 bg-[var(--color-bg-tertiary)] rounded w-16"></div>
          <div className="h-2 bg-[var(--color-bg-tertiary)] rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

export function ColumnSkeleton() {
  return (
    <div className="w-72 md:w-64 shrink-0 rounded-lg p-3 bg-[var(--color-bg-tertiary)]">
      <div className="animate-pulse space-y-3">
        <div className="h-5 bg-[var(--color-bg-hover)] rounded w-2/3"></div>
        <div className="space-y-2">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

export function BoardSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto">
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
    </div>
  );
}

export function BoardsListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[var(--color-bg-tertiary)] rounded-lg p-6 border border-[var(--color-border-light)]"
        >
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-[var(--color-bg-hover)] rounded w-3/4"></div>
            <div className="h-4 bg-[var(--color-bg-hover)] rounded w-1/2"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-8 bg-[var(--color-bg-hover)] rounded w-8"></div>
              <div className="h-8 bg-[var(--color-bg-hover)] rounded w-8"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
