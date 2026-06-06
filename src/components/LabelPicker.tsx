"use client";
import { Label } from "@/app/liveblocks.config";
import { faCheck, faTag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const LABEL_COLORS = [
  { name: "Green", value: "#61bd4f" },
  { name: "Yellow", value: "#f2d600" },
  { name: "Orange", value: "#ff9f1a" },
  { name: "Red", value: "#eb5a46" },
  { name: "Purple", value: "#c377e0" },
  { name: "Blue", value: "#0079bf" },
  { name: "Sky", value: "#00c2e0" },
  { name: "Pink", value: "#ff78cb" },
  { name: "Black", value: "#344563" },
];

type Props = {
  currentLabels: Label[];
  onToggleLabel: (label: Label) => void;
  onCreateLabel: (label: Label) => void;
  onDeleteLabel: (labelId: string) => void;
};

export default function LabelPicker({
  currentLabels,
  onToggleLabel,
  onCreateLabel,
  onDeleteLabel,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState(LABEL_COLORS[0].value);

  function handleCreate() {
    if (!newLabelName.trim()) return;
    onCreateLabel({
      id: Date.now().toString(),
      name: newLabelName.trim(),
      color: newLabelColor,
    });
    setNewLabelName("");
    setEditMode(false);
  }

  function isSelected(color: string) {
    return currentLabels.some((l) => l.color === color);
  }

  return (
    <div>
      {!editMode && (
        <>
          <div className="flex flex-wrap gap-1 mb-2">
            {currentLabels.map((label) => (
              <span
                key={label.id}
                className="text-white text-xs px-2 py-0.5 rounded font-medium"
                style={{ backgroundColor: label.color }}
              >
                {label.name}
              </span>
            ))}
          </div>
          <button
            className="btn text-sm w-full flex items-center gap-2 justify-center"
            onClick={() => setEditMode(true)}
          >
            <FontAwesomeIcon icon={faTag} />
            {currentLabels.length > 0 ? 'Edit Labels' : 'Add Labels'}
          </button>
        </>
      )}
      {editMode && (
        <div 
          className="rounded-lg p-4 mt-2"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h5 
            className="font-semibold text-sm mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Labels
          </h5>
          <div className="space-y-2 mb-4">
            {LABEL_COLORS.map((color) => {
              const existing = currentLabels.find((l) => l.color === color.value);
              return (
                <div
                  key={color.value}
                  className="flex items-center gap-2"
                >
                  <button
                    className="flex-1 flex items-center gap-2 px-3 py-2 rounded text-white text-sm font-medium relative transition-opacity hover:opacity-90"
                    style={{ backgroundColor: color.value }}
                    onClick={() => {
                      if (existing) {
                        onDeleteLabel(existing.id);
                      } else {
                        onToggleLabel({
                          id: Date.now().toString(),
                          name: color.name,
                          color: color.value,
                        });
                      }
                    }}
                  >
                    <span>{existing ? existing.name : color.name}</span>
                    {existing && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="absolute right-3"
                      />
                    )}
                  </button>
                  {existing && (
                    <button
                      className="p-2 rounded hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--color-danger)' }}
                      onClick={() => onDeleteLabel(existing.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div 
            className="pt-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <h6 
              className="text-xs font-semibold mb-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Create custom label
            </h6>
            <input
              type="text"
              placeholder="Label name"
              value={newLabelName}
              onChange={(e) => setNewLabelName(e.target.value)}
              className="mb-2 text-sm"
            />
            <div className="flex gap-1.5 mb-3 flex-wrap">
              {LABEL_COLORS.map((color) => (
                <button
                  key={color.value}
                  className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color.value,
                    boxShadow: newLabelColor === color.value 
                      ? '0 0 0 2px var(--color-bg-secondary), 0 0 0 4px var(--color-text-primary)' 
                      : 'none',
                  }}
                  onClick={() => setNewLabelColor(color.value)}
                />
              ))}
            </div>
            <button
              className="btn primary text-sm w-full"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
          <button
            className="text-sm w-full text-center mt-3 py-2"
            style={{ color: 'var(--color-text-muted)' }}
            onClick={() => setEditMode(false)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
