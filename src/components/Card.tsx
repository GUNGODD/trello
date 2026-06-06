"use client";
import { Card as CardType, ChecklistItem, Label, Priority, Status } from "@/app/liveblocks.config";
import { BoardContext } from "@/components/BoardContext";
import { CardPreview } from "@/components/CardPreview";
import { QuickActions } from "@/components/QuickActions";
import { formatDueDate, getDueDateStatus } from "@/components/DueDatePicker";
import PresenceAvatars from "@/components/PresenceAvatars";
import { faCalendar, faCheckSquare, faComment } from "@fortawesome/free-regular-svg-icons";
import { faPaperclip, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@liveblocks/react/suspense";
import { toast } from "sonner";

const priorityColors: Record<Priority, string> = {
  LOW: 'bg-green-500',
  MODERATE: 'bg-orange-500',
  HIGH: 'bg-red-500',
  'ON BOARDING': 'bg-blue-500',
};

const priorityTextColors: Record<Priority, string> = {
  LOW: 'text-green-600 dark:text-green-400',
  MODERATE: 'text-orange-600 dark:text-orange-400',
  HIGH: 'text-red-600 dark:text-red-400',
  'ON BOARDING': 'text-blue-600 dark:text-blue-400',
};

const statusColors: Record<Status, string> = {
  'Pending': 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20',
  'Under Review': 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-500/20',
  'In Progress': 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20',
  'In Correction': 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-100 dark:border-yellow-500/20',
};

export default function Card({
  id,
  name,
  labels,
  dueDate,
  assignees,
  checklist,
  coverImage,
  description,
  priority = 'MODERATE',
  status = 'Pending',
  commentsCount = 0,
  attachmentsCount = 0,
}: {
  id: string;
  name: string;
  labels?: Label[];
  dueDate?: string | null;
  assignees?: string[];
  checklist?: ChecklistItem[];
  coverImage?: string | null;
  description?: string;
  priority?: Priority;
  status?: Status;
  commentsCount?: number;
  attachmentsCount?: number;
}) {
  const params = useParams();
  const router = useRouter();
  const { openCard, showLabelNames, setShowLabelNames } = useContext(BoardContext);
  const [showPreview, setShowPreview] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (params.cardId && !openCard) {
      const { boardId, cardId } = params;
      router.push(`/boards/${boardId}/cards/${cardId}`);
    }
    if (!params.cardId && openCard) {
      router.push(`/boards/${params.boardId}`);
    }
  }, [params.cardId, params.boardId, openCard, router]);

  const dueDateStatus = getDueDateStatus(dueDate || null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowPreview(false);
  };

  const deleteCard = useMutation(({ storage }, id) => {
    const cards = storage.get("cards");
    const cardIndex = cards.findIndex((c) => c.toObject().id === id);
    if (cardIndex !== -1) {
      cards.delete(cardIndex);
    }
  }, []);

  const handleDeleteQuick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteCard(id);
    toast.success("Card deleted");
  };

  const toggleLabelNames = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (setShowLabelNames) {
      setShowLabelNames(!showLabelNames);
    }
  };

  const cardData: CardType = {
    id,
    name,
    labels: labels || [],
    dueDate: dueDate || null,
    assignees: assignees || [],
    checklist: checklist || [],
    description: description || '',
    index: 0,
    columnId: '',
    coverImage: coverImage || null,
    priority,
    status,
    commentsCount,
    attachmentsCount,
  };

  const completedChecklist = checklist?.filter(i => i.done).length || 0;
  const totalChecklist = checklist?.length || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="relative"
    >
      <Link
        href={`/boards/${params.boardId}/cards/${id}`}
        className="relative block my-2 rounded-xl overflow-hidden transition-all duration-300 group border border-white/20 dark:border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Priority top border & Quick delete */}
        <div className="flex justify-between items-center pr-3">
          <div className={`h-1.5 w-24 ${priorityColors[priority]}`} />
          <button
            onClick={handleDeleteQuick}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500 text-xs"
            title="Delete Card"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        
        {/* Priority badge */}
        <div className="px-4 pt-1 pb-1">
          <span className={`text-xs font-semibold uppercase tracking-wider ${priorityTextColors[priority]}`}>
            {priority}
          </span>
        </div>

        {/* Cover image */}
        {coverImage && (
          <div className="relative h-32 w-full overflow-hidden">
            <img 
              src={coverImage} 
              alt="cover" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}
        
        {/* Card content */}
        <div className="p-4">
          {/* Card name */}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {name || <span className="text-gray-400 dark:text-gray-500 italic font-medium">Unnamed Card</span>}
          </h3>
          
          {/* Description preview */}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
              {description}
            </p>
          )}
          
          {/* Labels */}
          {labels && labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3" onClick={toggleLabelNames}>
              {labels.map((label) => (
                <span
                  key={label.id}
                  className={`inline-block transition-all duration-300 font-semibold cursor-pointer ${
                    showLabelNames 
                      ? "text-[9px] px-2 py-0.5 rounded text-white shadow-sm hover:brightness-110" 
                      : "h-2 w-8 rounded hover:brightness-110"
                  }`}
                  style={{ backgroundColor: label.color }}
                  title={label.name}
                >
                  {showLabelNames ? label.name : ""}
                </span>
              ))}
            </div>
          )}

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-3">
            {/* Left: avatars + status */}
            <div className="flex items-center gap-2">
              {/* Member avatars */}
              {assignees && assignees.length > 0 && (
                <div className="flex -space-x-1.5">
                  {assignees.slice(0, 3).map((email) => (
                    <div
                      key={email}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-[10px] font-medium"
                      title={email}
                    >
                      {email.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Status badge */}
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[status]}`}>
                {status}
              </span>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
              {commentsCount > 0 && (
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faComment} className="text-[10px]" />
                  {commentsCount}
                </span>
              )}
              {attachmentsCount > 0 && (
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faPaperclip} className="text-[10px]" />
                  {attachmentsCount}
                </span>
              )}
              {totalChecklist > 0 && (
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faList} className="text-[10px]" />
                  {completedChecklist}/{totalChecklist}
                </span>
              )}
            </div>
            
            {/* Due date */}
            {dueDate && dueDateStatus && (
              <span className={`text-xs flex items-center gap-1 ${
                dueDateStatus === 'overdue' ? 'text-red-500' :
                dueDateStatus === 'due-soon' ? 'text-orange-500' :
                'text-gray-400 dark:text-gray-500'
              }`}>
                <FontAwesomeIcon icon={faCalendar} className="text-[10px]" />
                {formatDueDate(dueDate)}
              </span>
            )}
          </div>
        </div>
        
        {/* Presence avatars */}
        <div className="absolute bottom-3 right-3">
          <PresenceAvatars presenceKey={"cardId"} presenceValue={id} />
        </div>
      </Link>
      
      {/* Card preview */}
      <CardPreview card={cardData} isVisible={showPreview} />
    </motion.div>
  );
}
