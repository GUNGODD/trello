"use client";
import { Card } from "@/app/liveblocks.config";
import { useMutation } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import { toast } from "sonner";
import uniqid from "uniqid";

export default function NewCardForm({ columnId }: { columnId: string }) {
  const addCard = useMutation(({ storage }, cardName) => {
    return storage
      .get("cards")
      .push(
        new LiveObject<Card>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
          labels: [],
          dueDate: null,
          assignees: [],
          checklist: [],
          coverImage: null,
          description: '',
          priority: 'MODERATE',
          status: 'Pending',
          commentsCount: 0,
          attachmentsCount: 0,
        })
      );
  }, [columnId]);

  function handleNewCardFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const cardName = input?.value;
      if (cardName.trim()) {
        addCard(cardName);
        toast.success(`Card "${cardName}" created`);
        input.value = "";
      }
    }
  }

  return (
    <form onSubmit={handleNewCardFormSubmit} className="mt-3">
      <input 
        type="text" 
        placeholder="+ Add a card..." 
        className="w-full text-sm py-2.5 px-3 bg-transparent border border-transparent hover:border-black/5 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/[0.02] text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-gray-950 focus:border-purple-500/50 focus:shadow-md"
      />
    </form>
  );
}
