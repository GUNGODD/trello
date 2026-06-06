"use client";

import { useMutation } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function NewColumnForm() {
  const [isEditing, setIsEditing] = useState(false);
  const addColumn = useMutation(({ storage }, columnName) => {
    return storage.get("columns").push(
      new LiveObject({
        name: columnName,
        id: uniqid.time(),
        index: 9999,
      })
    );
  }, []);

  function handleNewColumn(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const columnName = input?.value;
      if (columnName.trim()) {
        addColumn(columnName.trim());
        toast.success(`Column "${columnName}" created`);
        input.value = "";
        setIsEditing(false);
      }
    }
  }

  if (!isEditing) {
    return (
      <div className="w-80 shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="w-full text-left py-3 px-4 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 text-white font-bold text-sm rounded-xl transition-all duration-200 backdrop-blur-md flex items-center gap-2 shadow-sm border border-white/10"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Add another list
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleNewColumn} 
      className="w-80 shrink-0 bg-[#f1f2f4] dark:bg-gray-900 rounded-2xl p-3 shadow-md border border-black/5 dark:border-white/10 h-fit"
    >
      <input 
        type="text" 
        placeholder="Enter list title..." 
        autoFocus
        className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#0c66e4] focus:ring-2 focus:ring-[#0c66e4]/20 transition-all"
      />
      <div className="flex items-center gap-2 mt-3">
        <button 
          type="submit" 
          className="bg-[#0c66e4] hover:bg-[#0055cc] active:scale-[0.97] text-white text-xs font-bold px-3 py-2 rounded-lg transition-all border-0 shadow-sm"
        >
          Add list
        </button>
        <button 
          type="button" 
          onClick={() => setIsEditing(false)}
          className="p-2 text-gray-500 hover:text-gray-800 dark:text-white/60 dark:hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="text-sm" />
        </button>
      </div>
    </form>
  );
}
