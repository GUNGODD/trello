"use client";
import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  dueDate: string | null;
  onSetDueDate: (date: string | null) => void;
};

export function getDueDateStatus(dueDate: string | null): "overdue" | "due-soon" | "due-later" | null {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  const hours = diff / (1000 * 60 * 60);
  if (hours < 0) return "overdue";
  if (hours < 24) return "due-soon";
  return "due-later";
}

export function formatDueDate(dueDate: string | null): string {
  if (!dueDate) return "";
  const date = new Date(dueDate);
  const now = new Date();
  const isThisYear = date.getFullYear() === now.getFullYear();
  if (isThisYear) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DueDatePicker({ dueDate, onSetDueDate }: Props) {
  const [editMode, setEditMode] = useState(false);
  const status = getDueDateStatus(dueDate);

  const statusColors = {
    overdue: "bg-red-500 text-white",
    "due-soon": "bg-yellow-400 text-gray-900",
    "due-later": "bg-gray-200 text-gray-700",
  };

  return (
    <div>
      {!editMode && (
        <div className="flex items-center gap-2 flex-wrap">
          {dueDate && (
            <span
              className={`text-xs px-2 py-1 rounded font-medium inline-flex items-center gap-1.5 ${
                status === 'overdue' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                status === 'due-soon' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              <FontAwesomeIcon icon={faCalendar} className="text-xs" />
              {formatDueDate(dueDate)}
            </span>
          )}
          <button
            className="btn text-sm flex items-center gap-1.5"
            onClick={() => setEditMode(true)}
          >
            <FontAwesomeIcon icon={faCalendar} />
            {dueDate ? "Edit" : "Set date"}
          </button>
        </div>
      )}
      {editMode && (
        <div 
          className="rounded-lg p-4"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h5 
            className="font-semibold text-sm mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Due date
          </h5>
          <input
            type="datetime-local"
            defaultValue={dueDate ? dueDate.slice(0, 16) : ""}
            className="mb-3"
            id="due-date-input"
          />
          <div className="flex gap-2">
            <button
              className="btn primary text-sm flex-1"
              onClick={() => {
                const input = document.getElementById("due-date-input") as HTMLInputElement;
                if (input?.value) {
                  onSetDueDate(new Date(input.value).toISOString());
                }
                setEditMode(false);
              }}
            >
              Save
            </button>
            {dueDate && (
              <button
                className="btn text-sm"
                onClick={() => {
                  onSetDueDate(null);
                  setEditMode(false);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
          <button
            className="text-sm w-full text-center mt-3 py-2"
            style={{ color: 'var(--color-text-muted)' }}
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
