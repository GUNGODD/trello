"use client";
import { Presence } from "@/app/liveblocks.config";
import { useOthers } from "@liveblocks/react/suspense";
import { shallow } from "@liveblocks/client";

type Props = {
  presenceKey: keyof Presence;
  presenceValue: string;
};

export default function PresenceAvatars({
  presenceKey,
  presenceValue,
}: Props) {
  const others = useOthers(
    (users) => {
      return users.filter((u) => u.presence?.[presenceKey] === presenceValue);
    },
    shallow
  );

  return (
    <div className="flex gap-0.5 md:gap-1">
      {others.map((user) => (
        <div key={user.id}>
          <img
            className="size-6 md:size-8 rounded-full border-2"
            style={{ borderColor: 'var(--color-bg-secondary)' }}
            src={user.info.image}
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
}
