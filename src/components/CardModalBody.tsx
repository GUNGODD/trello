"use client";
import { Card, Label } from "@/app/liveblocks.config";
import { BoardContext, BoardContextProps } from "@/components/BoardContext";
import ActivityLog from "@/components/ActivityLog";
import CancelButton from "@/components/CancelButton";
import CardDescription from "@/components/CardDescription";
import Checklist from "@/components/Checklist";
import CoverImagePicker from "@/components/CoverImagePicker";
import DeleteWithConfirmation from "@/components/DeleteWithConfirmation";
import DueDatePicker from "@/components/DueDatePicker";
import AssigneePicker from "@/components/AssigneePicker";
import LabelPicker from "@/components/LabelPicker";
import { faComments, faFileLines, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject, shallow } from "@liveblocks/client";
import {
  useMutation,
  useSelf,
  useStorage,
  useThreads,
} from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CardModalBody() {
  const router = useRouter();
  const params = useParams();
  const { threads } = useThreads({
    query: {
      metadata: {
        cardId: params.cardId.toString(),
      },
    },
  });
  const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
  const self = useSelf();
  const [editMode, setEditMode] = useState(false);

  const card = useStorage(
    (root) => {
      return root.cards.find((c) => c.id === params.cardId);
    },
    shallow
  );

  const updateCard = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get("cards").map((c) => c.toObject());
    const index = cards.findIndex((c) => c.id === cardId);
    const card = storage.get("cards").get(index);
    for (let updateKey in updateData) {
      card?.set(updateKey as keyof Card, updateData[updateKey]);
    }
  }, []);

  const deleteCard = useMutation(({ storage }, id) => {
    const cards = storage.get("cards");
    const cardIndex = cards.findIndex((c) => c.toObject().id === id);
    cards.delete(cardIndex);
  }, []);

  const logActivity = useMutation(({ storage }, action: string, target: string) => {
    const activity = storage.get("activity");
    if (activity) {
      activity.push(
        new LiveObject({
          id: Date.now().toString() + Math.random().toString(36).slice(2),
          userName: self?.info?.name || "Unknown",
          userImage: self?.info?.image || "",
          action,
          target,
          timestamp: Date.now(),
        })
      );
      while (activity.length > 50) {
        activity.delete(0);
      }
    }
  }, [self]);

  useEffect(() => {
    if (params.cardId && setOpenCard) {
      setOpenCard(params.cardId.toString());
    }
  }, [params, setOpenCard]);

  function handleDelete() {
    logActivity("deleted card", card?.name || "unknown");
    toast.success(`Card "${card?.name}" deleted`);
    deleteCard(params.cardId);
    if (setOpenCard) {
      setOpenCard(null);
    }
    router.back();
  }

  function handleNameChangeSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input.value;
      logActivity("renamed card to", newName);
      updateCard(params.cardId, { name: newName });
      toast.success("Card renamed");
      setEditMode(false);
    }
  }

  function handleToggleLabel(label: Label) {
    const currentLabels = card?.labels || [];
    const exists = currentLabels.find((l) => l.color === label.color);
    if (exists) {
      updateCard(params.cardId, {
        labels: currentLabels.filter((l) => l.color !== label.color),
      });
    } else {
      updateCard(params.cardId, {
        labels: [...currentLabels, { ...label, id: Date.now().toString() }],
      });
    }
  }

  function handleCreateLabel(label: Label) {
    const currentLabels = card?.labels || [];
    updateCard(params.cardId, {
      labels: [...currentLabels, label],
    });
  }

  function handleDeleteLabel(labelId: string) {
    const currentLabels = card?.labels || [];
    updateCard(params.cardId, {
      labels: currentLabels.filter((l) => l.id !== labelId),
    });
  }

  function handleSetDueDate(date: string | null) {
    updateCard(params.cardId, { dueDate: date });
  }

  function handleToggleAssignee(email: string) {
    const currentAssignees = card?.assignees || [];
    if (currentAssignees.includes(email)) {
      updateCard(params.cardId, {
        assignees: currentAssignees.filter((a) => a !== email),
      });
    } else {
      updateCard(params.cardId, {
        assignees: [...currentAssignees, email],
      });
    }
  }

  function handleAddChecklistItem(text: string) {
    const currentChecklist = card?.checklist || [];
    updateCard(params.cardId, {
      checklist: [
        ...currentChecklist,
        { id: Date.now().toString(), text, done: false },
      ],
    });
  }

  function handleToggleChecklistItem(id: string) {
    const currentChecklist = card?.checklist || [];
    updateCard(params.cardId, {
      checklist: currentChecklist.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      ),
    });
  }

  function handleDeleteChecklistItem(id: string) {
    const currentChecklist = card?.checklist || [];
    updateCard(params.cardId, {
      checklist: currentChecklist.filter((item) => item.id !== id),
    });
  }

  function handleSetCover(url: string | null) {
    updateCard(params.cardId, { coverImage: url });
  }

  return (
    <div className="p-6">
      {!editMode && (
        <div className="flex justify-between items-start mb-6">
          <h4 
            className="text-2xl font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {card?.name}
          </h4>
          <button
            className="p-2 rounded-md hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-text-muted)' }}
            onClick={() => setEditMode(true)}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {editMode && (
        <div className="mb-6">
          <form onSubmit={handleNameChangeSubmit} className="space-y-3">
            <input type="text" defaultValue={card?.name} autoFocus />
            <div className="flex gap-2">
              <button type="submit" className="btn text-sm flex-1">
                Save
              </button>
              <button 
                type="button" 
                className="btn text-sm flex-1" 
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
          <div className="mt-3">
            <DeleteWithConfirmation onDelete={() => handleDelete()} />
          </div>
        </div>
      )}
      {!editMode && (
        <div className="space-y-6">
          <div 
            className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6"
          >
            <div className="space-y-6">
              <div>
                <h2 
                  className="flex gap-2 items-center text-sm font-semibold uppercase tracking-wide mb-3"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <FontAwesomeIcon icon={faFileLines} />
                  Description
                </h2>
                <CardDescription />
              </div>
              <div>
                <h2 
                  className="flex gap-2 items-center text-sm font-semibold uppercase tracking-wide mb-3"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <FontAwesomeIcon icon={faComments} />
                  Comments
                </h2>
                <div>
                  {threads &&
                    threads.map((thread) => (
                      <div key={thread.id} className="mb-4">
                        <Thread thread={thread} id={thread.id} />
                      </div>
                    ))}
                  <div>
                    <Composer
                      metadata={{ cardId: params.cardId.toString() }}
                    />
                  </div>
                </div>
              </div>
              <ActivityLog />
            </div>
            <div className="space-y-4">
              <div>
                <h5 
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Labels
                </h5>
                <LabelPicker
                  currentLabels={card?.labels || []}
                  onToggleLabel={handleToggleLabel}
                  onCreateLabel={handleCreateLabel}
                  onDeleteLabel={handleDeleteLabel}
                />
              </div>
              <div>
                <h5 
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Due Date
                </h5>
                <DueDatePicker
                  dueDate={card?.dueDate || null}
                  onSetDueDate={handleSetDueDate}
                />
              </div>
              <div>
                <h5 
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Members
                </h5>
                <AssigneePicker
                  assignees={card?.assignees || []}
                  onToggleAssignee={handleToggleAssignee}
                />
              </div>
              <div>
                <h5 
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Cover
                </h5>
                <CoverImagePicker
                  coverImage={card?.coverImage || null}
                  onSetCover={handleSetCover}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 
              className="flex gap-2 items-center text-sm font-semibold uppercase tracking-wide mb-3"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <FontAwesomeIcon icon={faCheckSquare} />
              Checklist
            </h2>
            <Checklist
              items={card?.checklist || []}
              onAddItem={handleAddChecklistItem}
              onToggleItem={handleToggleChecklistItem}
              onDeleteItem={handleDeleteChecklistItem}
            />
          </div>
        </div>
      )}
    </div>
  );
}
