"use client";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { faBold, faHeading, faItalic, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export default function DescriptionEditor({ cardId }: { cardId: string }) {
  const liveblocks = useLiveblocksExtension({
    field: cardId,
  });

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Task description...",
      }),
      Underline,
    ],
    immediatelyRender: false,
  });

  return (
    <div>
      <div className="flex gap-1 mb-1 mt-2 editor-buttons">
        <button
          className={editor?.isActive("bold") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          className={editor?.isActive("italic") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          className={editor?.isActive("underline") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button
          className={editor?.isActive("heading") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <FontAwesomeIcon icon={faHeading} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
