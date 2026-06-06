"use client";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import PresenceAvatars from "@/components/PresenceAvatars";
import { RoomInfo } from "@liveblocks/node";
import Link from "next/link";

function getContrastColor(background: string): string {
  if (!background) return 'var(--color-text-primary)';

  if (background.startsWith('http') || background.startsWith('/') || background.startsWith('data:')) {
    return 'white';
  }

  const hex = background.replace('#', '');
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 180 ? '#1a1d21' : 'white';
  }

  return 'white';
}

export default function BoardsTiles({ boards }: { boards: RoomInfo[] }) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {boards?.length > 0 &&
        boards.map((board) => {
          const bgValue = (board.metadata.background as string) || '';
          const isImageBg = bgValue.startsWith('http') || bgValue.startsWith('/') || bgValue.startsWith('data:');

          return (
            <Link
              className="relative block rounded-lg overflow-hidden transition-all duration-150 hover:shadow-lg group"
              href={`/boards/${board.id}`}
              key={board.id}
              style={{
                backgroundColor: isImageBg || !bgValue ? 'var(--color-bg-tertiary)' : bgValue,
                backgroundImage: isImageBg ? `url(${bgValue})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {isImageBg && (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors z-0" />
              )}
              <div className="relative z-10 px-6 py-12 min-h-[140px] flex items-center justify-center">
                <span
                  className="text-lg font-semibold text-center"
                  style={{
                    color: getContrastColor(bgValue),
                    textShadow: isImageBg ? '0 1px 3px rgba(0,0,0,0.6)' : 'none',
                  }}
                >
                  {board.metadata.boardName}
                </span>
              </div>
              <RoomProvider
                id={board.id}
                initialPresence={{}}
                initialStorage={{
                  columns: new LiveList([]),
                  cards: new LiveList([]),
                  activity: new LiveList([]),
                }}
              >
                <ClientSideSuspense fallback={<div />}>
                  <div className="absolute bottom-3 right-3">
                    <PresenceAvatars
                      presenceKey={"boardId"}
                      presenceValue={board.id}
                    />
                  </div>
                </ClientSideSuspense>
              </RoomProvider>
            </Link>
          )
        })}
    </div>
  );
}
