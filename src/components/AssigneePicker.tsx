"use client";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { useState } from "react";

type Props = {
  assignees: string[];
  onToggleAssignee: (email: string) => void;
};

export default function AssigneePicker({ assignees, onToggleAssignee }: Props) {
  const [editMode, setEditMode] = useState(false);
  const self = useSelf();
  const others = useOthers();

  const allUsers = [
    { email: self.info?.email || "", name: self.info?.name || "You", image: self.info?.image || "" },
    ...others.map((u) => ({
      email: u.info?.email || "",
      name: u.info?.name || "",
      image: u.info?.image || "",
    })),
  ];

  const uniqueUsers = allUsers.filter(
    (u, i, arr) => arr.findIndex((x) => x.email === u.email) === i
  );

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        {assignees.length > 0 && (
          <div className="flex -space-x-2">
            {assignees.map((email) => {
              const user = uniqueUsers.find((u) => u.email === email);
              return (
                <div
                  key={email}
                  className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden border-2"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    borderColor: 'var(--color-bg-secondary)',
                  }}
                  title={user?.name || email}
                >
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xs font-medium">
                      {(user?.name || email).charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <button
          className="btn text-sm flex items-center gap-1.5"
          onClick={() => setEditMode(!editMode)}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          {assignees.length > 0 ? "Edit" : "Assign"}
        </button>
      </div>
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
            Assign members
          </h5>
          {uniqueUsers.length === 0 && (
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              No members online. Invite members to the board first.
            </p>
          )}
          <div className="space-y-1">
            {uniqueUsers.map((user) => {
              const isAssigned = assignees.includes(user.email);
              return (
                <button
                  key={user.email}
                  className="w-full flex items-center gap-3 p-2 rounded-md text-left text-sm transition-colors"
                  style={{
                    backgroundColor: isAssigned ? 'var(--color-bg-hover)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isAssigned) e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isAssigned) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => onToggleAssignee(user.email)}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                  >
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span 
                        className="font-medium text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-medium truncate text-sm"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {user.name}
                    </div>
                    <div 
                      className="text-xs truncate"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {user.email}
                    </div>
                  </div>
                  {isAssigned && (
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
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
