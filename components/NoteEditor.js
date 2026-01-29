"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Icon from "./Icon";

const NoteEditor = ({ subId, initialNote }) => {
  const [note, setNote] = useState(initialNote || "");
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  const saveNote = async (newValue) => {
    setStatus("Saving...");
    try {
      await axios.patch(`/api/sub`, {
        id: subId,
        note: newValue,
      });
      setStatus("Saved!");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      setStatus("Error saving");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsEditing(false);
      }
    };
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) return;
    const delayDebounceFn = setTimeout(() => {
      if (note !== initialNote) {
        saveNote(note);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [note]);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  // Функция для рендеринга текста с кликабельными ссылками
  const renderNoteWithLinks = (text) => {
    if (!text) return null;

    return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
      if (/https?:\/\/[^\s]+/.test(part)) {
        let short = part;
        try {
          const url = new URL(part);
          // Обрезаем путь, если он длиннее 8 символов (как в запросе)
          const path =
            url.pathname.length > 1 ? url.pathname.slice(0, 8) + "..." : "";
          short = `${url.origin}${path}`;
        } catch {
          // фолбек для кривых ссылок
        }

        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {short}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="relative group" ref={containerRef}>
      <p className="text-base mb-2 font-normal text-base-content/70">Note:</p>

      <div className="relative">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={7}
            className="text-base-content/90 whitespace-pre-line break-all w-full bg-base-200 border border-base-content/30 rounded-xl h-full p-4 text-xs focus:outline-none ring-1 ring-base-content/10 shadow-inner animate-in fade-in duration-200"
            placeholder="Add a comment or reminder..."
          />
        ) : (
          <div className="text-base-content/90 whitespace-pre-line [word-break:break-word] overflow-wrap-anywhere w-full bg-base-200 border border-base-100 rounded-xl min-h-36.5 p-4 text-xs transition-all">
            {note ? (
              renderNoteWithLinks(note)
            ) : (
              <span className="text-base-content/20 italic select-none">
                No notes yet...
              </span>
            )}
          </div>
        )}

        {!isEditing && (
          <button
            type="button"
            onClick={handleEditClick}
            className="absolute top-2 right-3 p-1 rounded-lg text-base-content/50 hover:text-base-content hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
            title="Edit note"
          >
            <Icon name="edit-alt" className="text-md" />
          </button>
        )}
      </div>

      <div className="h-2 px-1">
        {status && (
          <p className="text-[10px] text-base-content/40 italic">{status}</p>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
