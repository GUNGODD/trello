"use client";
import { ActivityEntry } from "@/app/liveblocks.config";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStorage } from "@liveblocks/react/suspense";
import { useSelf } from "@liveblocks/react/suspense";
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

export default function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const self = useSelf();
  const myEmail = self?.info?.email || "";

  const activity = useStorage(
    (root) =>
      root.activity
        ?.map((a) => ({ ...a }))
        .filter((a: ActivityEntry) => {
          if (a.action.includes("assigned") && a.target.includes(myEmail)) return true;
          if (a.action.includes("mentioned")) return true;
          return false;
        })
        .sort((a: ActivityEntry, b: ActivityEntry) => b.timestamp - a.timestamp)
        .slice(0, 15) || []
  );

  return (
    <div className="relative">
      <button
        className="btn text-sm flex items-center gap-1.5 relative"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faBell} />
        {activity.length > 0 && (
          <span 
            className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center font-medium"
            style={{
              backgroundColor: 'var(--color-danger)',
              color: 'white',
            }}
          >
            {activity.length > 9 ? "9+" : activity.length}
          </span>
        )}
      </button>
      {open && (
        <div 
          className="absolute top-full right-0 mt-1 rounded-lg w-72 max-h-80 overflow-y-auto z-30"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div 
            className="p-3"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <h5 
              className="font-semibold text-sm"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Notifications
            </h5>
          </div>
          {activity.length === 0 && (
            <div 
              className="p-4 text-sm text-center"
              style={{ color: 'var(--color-text-muted)' }}
            >
              No notifications
            </div>
          )}
          {activity.map((entry: ActivityEntry) => (
            <div
              key={entry.id}
              className="flex items-start gap-3 p-3"
              style={{ borderBottom: '1px solid var(--color-border-light)' }}
            >
              <img
                src={entry.userImage}
                alt={entry.userName}
                className="w-8 h-8 rounded-full shrink-0"
              />
              <div className="text-sm">
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
                  className="text-xs mt-0.5"
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
