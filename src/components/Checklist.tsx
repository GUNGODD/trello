"use client";
import { ChecklistItem } from "@/app/liveblocks.config";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  items: ChecklistItem[];
  onAddItem: (text: string) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
};

export default function Checklist({ items, onAddItem, onToggleItem, onDeleteItem }: Props) {
  const [newItemText, setNewItemText] = useState("");
  const [adding, setAdding] = useState(false);

  const doneCount = items.filter((i) => i.done).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  function handleAdd() {
    if (!newItemText.trim()) return;
    onAddItem(newItemText.trim());
    setNewItemText("");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h5 
          className="font-semibold text-sm flex items-center gap-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <FontAwesomeIcon icon={faCheckSquare} />
          Checklist
        </h5>
        {totalCount > 0 && (
          <span 
            className="text-xs font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {doneCount}/{totalCount}
          </span>
        )}
      </div>
      {totalCount > 0 && (
        <div 
          className="w-full rounded-full h-2 bg-gray-100 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/20 overflow-hidden mb-4"
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: progress === 100 ? '#10B981' : '#8B5CF6',
            }}
          />
        </div>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-3 group py-1 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <button
              onClick={() => onToggleItem(item.id)}
              className="shrink-0 transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ 
                color: item.done ? '#10B981' : 'var(--color-text-muted)',
              }}
            >
              <FontAwesomeIcon
                icon={item.done ? faCheckSquare : faSquare}
                className="text-base"
              />
            </button>
            <span
              className="flex-1 text-sm transition-all duration-300"
              style={{ 
                color: item.done ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                textDecoration: item.done ? 'line-through' : 'none',
                opacity: item.done ? 0.6 : 1,
              }}
            >
              {item.text}
            </span>
            <button
              onClick={() => onDeleteItem(item.id)}
              className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all duration-200 shrink-0 p-1"
              style={{ color: 'var(--color-danger)' }}
            >
              <FontAwesomeIcon icon={faTrash} className="text-xs" />
            </button>
          </div>
        ))}
      </div>
      {adding ? (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Add an item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
              if (e.key === "Escape") {
                setAdding(false);
                setNewItemText("");
              }
            }}
            autoFocus
            className="text-sm"
          />
          <div className="flex gap-2 mt-2">
            <button className="btn primary text-sm py-1 px-3" onClick={handleAdd}>
              Add
            </button>
            <button
              className="btn text-sm py-1 px-3"
              onClick={() => {
                setAdding(false);
                setNewItemText("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="text-sm flex items-center gap-1.5 mt-3 transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
          onClick={() => setAdding(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Add an item
        </button>
      )}
    </div>
  );
}
