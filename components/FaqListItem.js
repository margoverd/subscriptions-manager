"use client";
import { useState } from "react";

const FaqListItem = ({ qa }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      key={qa.question}
      className={`${
        isOpen ? "bg-base-100" : "bg-base-200"
      } not-last:mb-4 border-1 rounded py-4 px-8 transition-colors duration-300`}
    >
      {/* 1. Clickable question */}
      <button
        className="font-extrabold w-full text-left flex justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{qa.question}</p>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {/* 2. Answer with smooth transition */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-4" : "max-h-0"
        }`}
      >
        <p>{qa.answer}</p>
      </div>
    </li>
  );
};

export default FaqListItem;
