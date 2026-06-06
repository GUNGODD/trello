'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Card {
  id: string;
  title: string;
  color: string;
  labels?: string[];
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Design landing page', color: '#a855f7', labels: ['design', 'ui'] },
      { id: '2', title: 'Write documentation', color: '#06b6d4', labels: ['docs'] },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    cards: [
      { id: '3', title: 'Build API endpoints', color: '#3b82f6', labels: ['backend'] },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: '4', title: 'Setup project', color: '#10b981', labels: ['setup'] },
    ],
  },
];

export function InteractiveBoardMockup() {
  const [columns, setColumns] = useState(initialColumns);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  // Simulate card movements
  useEffect(() => {
    const interval = setInterval(() => {
      setColumns(prev => {
        const newColumns = JSON.parse(JSON.stringify(prev));
        const sourceColIndex = Math.floor(Math.random() * newColumns.length);
        const sourceCol = newColumns[sourceColIndex];
        
        if (sourceCol.cards.length === 0) return prev;
        
        const cardIndex = Math.floor(Math.random() * sourceCol.cards.length);
        const card = sourceCol.cards[cardIndex];
        const targetColIndex = (sourceColIndex + 1) % newColumns.length;
        
        sourceCol.cards.splice(cardIndex, 1);
        newColumns[targetColIndex].cards.push(card);
        
        return newColumns;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate cursor movement
  useEffect(() => {
    const moveCursor = () => {
      const x = 20 + Math.random() * 60;
      const y = 20 + Math.random() * 60;
      setCursorPosition({ x, y });
      setIsDragging(Math.random() > 0.5);
    };

    const interval = setInterval(moveCursor, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Board */}
      <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-4">
        <div className="flex gap-4 overflow-x-auto">
          {columns.map((column) => (
            <motion.div
              key={column.id}
              layout
              className="flex-shrink-0 w-64"
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-sm font-semibold text-white/90">
                  {column.title}
                </h3>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                  {column.cards.length}
                </span>
              </div>
              
              {/* Cards */}
              <div className="space-y-2 min-h-[280px]">
                <AnimatePresence mode="popLayout">
                  {column.cards.map((card) => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="bg-white/[0.03] backdrop-blur-sm rounded-lg p-3 border border-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-pointer group"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      {/* Color indicator */}
                      <div
                        className="w-full h-1 rounded-full mb-2 opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: card.color }}
                      />
                      
                      {/* Card title */}
                      <p className="text-sm text-white/80 group-hover:text-white transition-colors">
                        {card.title}
                      </p>
                      
                      {/* Labels */}
                      {card.labels && card.labels.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {card.labels.map((label, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simulated cursor */}
      <motion.div
        className="absolute pointer-events-none z-10"
        animate={{
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="relative">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          >
            <path
              d="M5 5L12 19L14 12L21 10L5 5Z"
              fill="url(#cursorGradient)"
              stroke="white"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="cursorGradient" x1="5" y1="5" x2="21" y2="19">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div 
            className="absolute left-6 top-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Sarah K.
          </motion.div>
        </div>
      </motion.div>

      {/* Drag indicator */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-4 py-2 rounded-full shadow-lg shadow-purple-500/50"
          >
            Moving card...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
