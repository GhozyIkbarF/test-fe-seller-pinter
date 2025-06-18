"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
  Bold,
  Image as ImageIcon,
  Italic,
  Undo2,
  Redo2,
  Minus
} from "lucide-react";

export default function TiptapEditor({
  onChange,
  content = "",
}: {
  onChange?: (value: string) => void;
  content?: string;
}) {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit.configure({ history: {} }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount.configure({
        limit: 1000,
      }),
      Placeholder.configure({
        placeholder: "Type a content...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] prose prose-sm sm:prose lg:prose-lg focus:outline-none p-4 bg-transparent border border-gray-200 text-black",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div>
      <div className="flex items-center gap-4 bg-white border border-gray-300 rounded-t-md p-4 ">
        <div className="space-x-1">
          <button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className={cn(
              "disabled:opacity-50",
              !editor?.can().undo() && "cursor-not-allowed"
            )}
          >
            <Undo2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className={cn(
              "disabled:opacity-50",
              !editor?.can().redo() && "cursor-not-allowed"
            )}
          >
            <Redo2 className="size-4" />
          </button>
        </div>
        <div className="space-x-1">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={
              editor?.isActive("bold") ? "text-blue-500 font-bold" : ""
            }
          >
            <Bold className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={
              editor?.isActive("italic") ? "text-blue-500 font-bold" : ""
            }
          >
            <Italic className="size-4" />
          </button>
        </div>
        <Minus className="size-6 text-gray-200 rotate-90" />
        <div>
          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .setImage({ src: prompt("Enter image URL") || "" })
                .run()
            }
          >
            <ImageIcon className="size-4" />
          </button>
        </div>
        <Minus className="size-6 text-gray-200 rotate-90" />
        <div className="space-x-1">
          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={
              editor?.isActive({ textAlign: "left" })
                ? "text-blue-500 font-bold"
                : ""
            }
          >
            <AlignLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={
              editor?.isActive({ textAlign: "center" })
                ? "text-blue-500 font-bold"
                : ""
            }
          >
            <AlignCenter className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={
              editor?.isActive({ textAlign: "right" })
                ? "text-blue-500 font-bold"
                : ""
            }
          >
            <AlignRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().setTextAlign("justify").run()
            }
            className={
              editor?.isActive({ textAlign: "justify" })
                ? "text-blue-500 font-bold"
                : ""
            }
          >
            <AlignJustify className="size-4" />
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />
      <div className="rounded-b-md bg-white py-6 px-4 gap-2">
        <span>{editor ? editor.storage.characterCount.words() : 0} words</span>
      </div>
    </div>
  );
}
