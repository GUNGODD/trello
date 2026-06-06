"use client";
import { updateBoard } from "@/app/actions/boardActions";
import { useRedo, useUndo, useUpdateMyPresence } from "@liveblocks/react/suspense";
import BoardBackground from "@/components/BoardBackground";
import BoardSearch from "@/components/BoardSearch";
import { BoardContextProvider } from "@/components/BoardContext";
import Columns from "@/components/Columns";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import NotificationsPanel from "@/components/NotificationsPanel";
import { BoardProgress } from "@/components/BoardProgress";
import PresenceAvatars from "@/components/PresenceAvatars";
import { 
  faCog, 
  faRedo, 
  faUndo,
  faChevronDown,
  faStar,
  faLock,
  faTableColumns,
  faShare,
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Board({ id, name, background }: { id: string; name: string; background?: string }) {
  const [renameMode, setRenameMode] = useState(false);
  const router = useRouter();
  const updateMyPresence = useUpdateMyPresence();
  const undo = useUndo();
  const redo = useRedo();

  useEffect(() => {
    updateMyPresence({ boardId: id });
    return () => {
      updateMyPresence({ boardId: null });
    };
  }, [id, updateMyPresence]);

  useEffect(() => {
    if (background) {
      if (background.startsWith("http") || background.startsWith("/") || background.startsWith("data:")) {
        document.body.style.backgroundImage = `url(${background})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundColor = "";
      } else {
        document.body.style.backgroundColor = background;
        document.body.style.backgroundImage = "none";
      }
    } else {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "";
    }
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
    };
  }, [background]);

  async function handleNameSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input.value;
      await updateBoard(id, { metadata: { boardName: newName } });
      setRenameMode(false);
      router.refresh();
    }
  }

  return (
    <BoardContextProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Board header with glassmorphism */}
        <div className="relative mb-6 -mx-4 md:-mx-8 -mt-4 md:-mt-8">
          {/* Background */}
          <div 
            className="absolute inset-0 rounded-b-3xl"
            style={background && !background.startsWith("http") ? { 
              backgroundColor: background,
              boxShadow: `0 20px 60px -15px ${background}40`
            } : { 
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-b-3xl" />
          
          {/* Content */}
          <div className="relative px-4 md:px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left Section: Board Title & Key Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                {!renameMode && (
                  <h1
                    className="text-xl font-bold cursor-pointer hover:bg-white/10 dark:hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-all text-gray-900 dark:text-white flex items-center gap-1.5"
                    style={background ? { 
                      color: 'white',
                      textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                    } : {}}
                    onClick={() => setRenameMode(true)}
                  >
                    {name}
                  </h1>
                )}
                {renameMode && (
                  <form onSubmit={handleNameSubmit} className="flex gap-2">
                    <input 
                      type="text" 
                      defaultValue={name} 
                      autoFocus 
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <button type="submit" className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20 transition-all">
                      Save
                    </button>
                  </form>
                )}

                {/* Columns/Board Dropdown */}
                <button className={`p-2 rounded-lg text-sm transition-all flex items-center gap-1.5 border ${
                  background 
                    ? 'hover:bg-white/10 border-white/10 text-white' 
                    : 'hover:bg-black/5 border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300'
                }`}>
                  <FontAwesomeIcon icon={faTableColumns} />
                  <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" />
                </button>

                {/* Star Icon */}
                <button className={`p-2 rounded-lg text-sm transition-all border ${
                  background 
                    ? 'hover:bg-white/10 border-white/10 text-white' 
                    : 'hover:bg-black/5 border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300'
                }`}>
                  <FontAwesomeIcon icon={faStar} />
                </button>

                {/* Lock Icon */}
                <button className={`p-2 rounded-lg text-sm transition-all flex items-center gap-1.5 border ${
                  background 
                    ? 'hover:bg-white/10 border-white/10 text-white' 
                    : 'hover:bg-black/5 border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300'
                }`}>
                  <FontAwesomeIcon icon={faLock} />
                  <span className="text-xs font-semibold hidden md:inline">Private</span>
                </button>

                {/* Share Button */}
                <button className="flex items-center gap-1.5 px-3 py-2 bg-white text-gray-800 hover:bg-gray-100 text-sm font-semibold rounded-lg shadow-sm transition-colors border border-gray-200">
                  <FontAwesomeIcon icon={faShare} className="text-xs" />
                  <span className="text-xs font-bold">Share</span>
                </button>

                {/* Settings Ellipsis menu */}
                <Link
                  className={`p-2 rounded-lg text-sm transition-all border ${
                    background 
                      ? 'hover:bg-white/10 border-white/10 text-white' 
                      : 'hover:bg-black/5 border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300'
                  }`}
                  href={`/boards/${id}/settings`}
                  title="Board Settings"
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </Link>
              </div>
              
              {/* Right Section: Member Avatars, Search, Undo/Redo & Background */}
              <div className="flex gap-2 items-center flex-wrap">
                {/* Presence Avatars */}
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg p-1">
                  <PresenceAvatars presenceKey="boardId" presenceValue={id} />
                </div>

                <BoardSearch />
                
                {/* Undo/Redo */}
                <div className={`flex gap-0.5 backdrop-blur-xl rounded-lg p-0.5 border ${
                  background 
                    ? 'bg-white/5 border-white/10 text-white' 
                    : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300'
                }`}>
                  <button 
                    className="btn text-sm p-1.5 bg-transparent hover:bg-white/10 border-0"
                    onClick={() => undo()} 
                    title="Undo"
                    style={{ 
                      color: background ? 'white' : 'inherit',
                    }}
                  >
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                  <button 
                    className="btn text-sm p-1.5 bg-transparent hover:bg-white/10 border-0"
                    onClick={() => redo()} 
                    title="Redo"
                    style={{ 
                      color: background ? 'white' : 'inherit',
                    }}
                  >
                    <FontAwesomeIcon icon={faRedo} />
                  </button>
                </div>
                
                <NotificationsPanel />
                <BoardBackground boardId={id} currentBackground={background || ""} />
              </div>
            </div>
          </div>
        </div>

        {/* Board progress */}
        <BoardProgress />
        
        {/* Columns */}
        <Columns />
        
        {/* Keyboard shortcuts */}
        <KeyboardShortcuts />
      </motion.div>
    </BoardContextProvider>
  );
}
