import { useState, useEffect } from "react";

const Modal = ({ open, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // закрытие модалки по Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // блокируем прокрутку body
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay + Modal wrapper */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 ${
          isClosing ? "animate-fadeOut" : "animate-fadeIn"
        }`}
        onClick={handleClose} // клик по фону
      >
        {/* сама модалка */}
        <div
          className={`bg-base-200 rounded-xl shadow-xl w-full max-w-md relative px-4 py-6 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-rounded scrollbar-thumb-base-content/30 scrollbar-track-transparent ${isClosing ? "animate-slideDown" : "animate-slideUp"}`}
          onClick={(e) => e.stopPropagation()} // блокируем клик внутри модалки
        >
          <button
            className="absolute top-7 left-4 text-sm"
            onClick={handleClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
