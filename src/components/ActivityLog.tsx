"use client";
import { ActivityEntry } from "@/app/liveblocks.config";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStorage } from "@liveblocks/react/suspense";
import { useState } from "react";

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ActivityLog() {
  const [open, setOpen] = useState(false);
  const activity = useStorage(
    (root) =>
      root.activity
        ?.map((a) => ({ ...a }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20) || []
  );

  return (
    <div 
      className="pt-4"
      style={{ borderTop: '1px solid var(--color-border-light)' }}
    >
      <button
        className="flex items-center gap-2 text-sm font-semibold mb-3"
        style={{ color: 'var(--color-text-secondary)' }}
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faClock} />
        Activity {open ? "▴" : "▾"}
      </button>
      {open && (
        <div className="max-h-60 overflow-y-auto space-y-3">
          {activity.length === 0 && (
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              No activity yet
            </p>
          )}
          {activity.map((entry: ActivityEntry) => (
            <div
              key={entry.id}
              className="flex items-start gap-2 text-sm"
            >
              <img
                src={entry.userImage}
                alt={entry.userName}
                className="w-6 h-6 rounded-full shrink-0"
              />
              <div>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {entry.userName}
                </span>{" "}
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {entry.action}
                </span>{" "}
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {entry.target}
                </span>
                <div 
                  className="text-xs"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {timeAgo(entry.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
