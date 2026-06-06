"use client";
import { BoardContext, BoardContextProps } from "@/components/BoardContext";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStorage } from "@liveblocks/react/suspense";
import { useContext, useState } from "react";

export default function BoardSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const cards = useStorage((root) =>
    root.cards?.map((c) => ({ ...c })) || []
  );

  const matchingCards = query
    ? cards.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!open) {
    return (
      <button
        className="btn text-sm flex items-center gap-1.5"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faSearch} />
        <span className="hidden sm:inline">Search</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search cards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-sm py-1.5 px-3 w-40 md:w-64"
          autoFocus
        />
        <button
          className="p-1.5 rounded-md transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          onClick={() => {
            setOpen(false);
            setQuery("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      {query && matchingCards.length > 0 && (
        <div 
          className="absolute top-full left-0 mt-1 rounded-lg w-64 max-h-60 overflow-y-auto z-30"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {matchingCards.slice(0, 10).map((card) => (
            <a
              key={card.id}
              href={`cards/${card.id}`}
              className="block px-3 py-2.5 text-sm transition-colors"
              style={{ 
                color: 'var(--color-text-primary)',
                borderBottom: '1px solid var(--color-border-light)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {card.name}
            </a>
          ))}
        </div>
      )}
      {query && matchingCards.length === 0 && (
        <div 
          className="absolute top-full left-0 mt-1 rounded-lg w-64 z-30 p-4 text-sm text-center"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            color: 'var(--color-text-muted)',
          }}
        >
          No cards found
        </div>
      )}
    </div>
  );
}
