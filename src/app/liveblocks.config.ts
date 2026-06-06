import { LiveList, LiveObject } from "@liveblocks/client";

export type Label = {
  id: string;
  name: string;
  color: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

export type ActivityEntry = {
  id: string;
  userName: string;
  userImage: string;
  action: string;
  target: string;
  timestamp: number;
};

export type Priority = "LOW" | "MODERATE" | "HIGH" | "ON BOARDING";
export type Status = "Pending" | "Under Review" | "In Progress" | "In Correction";

export type Column = {
  name: string;
  id: string;
  index: number;
};

export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
  labels: Label[];
  dueDate: string | null;
  assignees: string[];
  checklist: ChecklistItem[];
  coverImage: string | null;
  description: string;
  priority: Priority;
  status: Status;
  commentsCount: number;
  attachmentsCount: number;
};

export type Presence = {
  boardId?: null | string;
  cardId?: null | string;
};

export type ThreadMetadata = {
  cardId: string;
};

declare global {
  interface Liveblocks {
    Presence: Presence;
    Storage: {
      columns: LiveList<LiveObject<Column>>;
      cards: LiveList<LiveObject<Card>>;
      activity: LiveList<LiveObject<ActivityEntry>>;
    };
    UserMeta: {
      id: string;
      info: {
        name: string;
        email: string;
        image: string;
      };
    };
    ThreadMetadata: ThreadMetadata;
  }
}

export {};
