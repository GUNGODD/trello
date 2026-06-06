"use client";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=150&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=150&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=150&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=150&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=150&fit=crop",
];

type Props = {
  coverImage: string | null;
  onSetCover: (url: string | null) => void;
};

export default function CoverImagePicker({ coverImage, onSetCover }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  return (
    <div>
      {!editMode && (
        <div>
          <button
            className="btn text-sm flex items-center gap-1.5 w-full justify-center"
            onClick={() => setEditMode(true)}
          >
            <FontAwesomeIcon icon={faImage} />
            {coverImage ? "Change cover" : "Add cover"}
          </button>
        </div>
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
            Cover image
          </h5>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {PRESET_IMAGES.map((url) => (
              <button
                key={url}
                className="h-14 rounded-md overflow-hidden transition-transform hover:scale-105"
                style={{
                  boxShadow: coverImage === url 
                    ? '0 0 0 2px var(--color-accent)' 
                    : 'none',
                }}
                onClick={() => {
                  onSetCover(url);
                  setEditMode(false);
                }}
              >
                <img src={url} alt="cover" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div 
            className="pt-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <input
              type="text"
              placeholder="Or paste image URL..."
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="text-sm mb-2"
            />
            <button
              className="btn primary text-sm w-full"
              onClick={() => {
                if (customUrl) {
                  onSetCover(customUrl);
                  setCustomUrl("");
                  setEditMode(false);
                }
              }}
            >
              Set custom URL
            </button>
          </div>
          {coverImage && (
            <button
              className="btn red text-sm w-full mt-2 flex items-center justify-center gap-1.5"
              onClick={() => {
                onSetCover(null);
                setEditMode(false);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
              Remove cover
            </button>
          )}
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
