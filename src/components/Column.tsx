"use client";
import { Card } from "@/app/liveblocks.config";
import CancelButton from "@/components/CancelButton";
import { faEllipsis, faTrash, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallow } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { FormEvent, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { toast } from "sonner";
import NewCardForm from "@/components/forms/NewCardForm";
import { default as ColumnCard } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { motion } from "framer-motion";

type ColumnProps = {
  id: string;
  name: string;
};

export default function Column({ id, name }: ColumnProps) {
  const [renameMode, setRenameMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const columnCards = useStorage<Card[]>(
    (root) => {
      return root.cards
        .filter((card) => card.columnId === id)
        .map((c) => ({ ...c }))
        .sort((a, b) => a.index - b.index);
    },
    shallow
  );

  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage.get("cards").get(index);
    if (card) {
      for (let key in updateData) {
        card?.set(key as keyof Card, updateData[key]);
      }
    }
  }, []);

  const updateColumn = useMutation(({ storage }, id, newName) => {
    const columns = storage.get("columns");
    columns.find((c) => c.toObject().id === id)?.set("name", newName);
  }, []);

  const deleteColumn = useMutation(({ storage }, id) => {
    const columns = storage.get("columns");
    const columnIndex = columns.findIndex((c) => c.toObject().id === id);
    if (columnIndex !== -1) {
      columns.delete(columnIndex);
    }
    
    // Clean up cards belonging to this column
    const cards = storage.get("cards");
    if (cards) {
      let i = cards.length - 1;
      while (i >= 0) {
        if (cards.get(i)?.get("columnId") === id) {
          cards.delete(i);
        }
        i--;
      }
    }
    
    toast.success("Column deleted");
  }, []);

  const setTasksOrderForColumn = useMutation(
    ({ storage }, sortedCards: Card[], newColumnId) => {
      const idsOfSortedCards = sortedCards.map((c) => c.id.toString());
      const allCards: Card[] = [
        ...storage.get("cards").map((c) => c.toObject()),
      ];
      idsOfSortedCards.forEach((sortedCardId, colIndex) => {
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId
        );
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        });
      });
    },
    []
  );

  function handleRenameSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newColumnName = input.value;
      updateColumn(id, newColumnName);
      toast.success("Column renamed");
      setRenameMode(false);
    }
  }

  if (isCollapsed) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-12 shrink-0 select-none"
      >
        <div className="relative bg-[#f1f2f4] dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-2xl py-4 px-2 shadow-sm flex flex-col items-center gap-4">
          {/* Expand Button */}
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-8 h-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-white/60 flex items-center justify-center"
            title="Expand list"
          >
            <FontAwesomeIcon icon={faRightLeft} className="text-xs rotate-90 sm:rotate-0" />
          </button>
          
          {/* Rotated List Name */}
          <span 
            className="font-bold text-sm text-gray-800 dark:text-white/80 tracking-wide [writing-mode:vertical-lr] select-none py-2"
          >
            {name}
          </span>
          
          {/* Card Count Badge */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-gray-500 dark:text-white/40 border border-black/5 dark:border-white/5">
            {columnCards?.length || 0}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-80 shrink-0"
    >
      {/* Column container */}
      <div className="relative bg-[#f1f2f4] dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-md">
        <div className="relative p-4">
          {/* Column header */}
          {!renameMode && (
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-[15px] text-gray-800 dark:text-white/90">
                  {name}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-gray-500 dark:text-white/40 border border-black/5 dark:border-white/5">
                  {columnCards?.length || 0}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                {/* Collapse Button */}
                <button
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/80"
                  onClick={() => setIsCollapsed(true)}
                  title="Collapse list"
                >
                  <FontAwesomeIcon icon={faRightLeft} className="text-xs" />
                </button>
                {/* Options button */}
                <button
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/80"
                  onClick={() => setRenameMode(true)}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </div>
            </div>
          )}
          
          {/* Rename mode */}
          {renameMode && (
            <div className="mb-4 space-y-3">
              <form onSubmit={handleRenameSubmit} className="space-y-2">
                <input 
                  type="text" 
                  defaultValue={name} 
                  autoFocus 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <div className="flex gap-2">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-medium py-2 rounded-lg transition-all duration-300"
                  >
                    Save
                  </button>
                  <button 
                    type="button" 
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium py-2 rounded-lg border border-white/10 transition-all duration-300"
                    onClick={() => setRenameMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <button
                onClick={() => deleteColumn(id)}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium py-2 rounded-lg border border-red-500/20 flex items-center justify-center gap-2 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTrash} />
                Delete column
              </button>
            </div>
          )}
          
          {/* Cards */}
          {!renameMode && columnCards && (
            <div className="space-y-2 min-h-[10px]">
              {columnCards.length === 0 ? (
                <EmptyState type="cards" columnId={id} />
              ) : (
                <ReactSortable
                  list={columnCards}
                  setList={(items) => setTasksOrderForColumn(items, id)}
                  group="cards"
                  ghostClass="opacity-40"
                  className="space-y-2"
                >
                  {columnCards.map((card) => (
                    <ColumnCard 
                      key={card.id} 
                      id={card.id} 
                      name={card.name} 
                      labels={card.labels} 
                      dueDate={card.dueDate} 
                      assignees={card.assignees} 
                      checklist={card.checklist} 
                      coverImage={card.coverImage}
                      description={card.description}
                    />
                  ))}
                </ReactSortable>
              )}
            </div>
          )}
          
          {/* Add card form */}
          {!renameMode && <NewCardForm columnId={id} />}
        </div>
      </div>
    </motion.div>
  );
}
