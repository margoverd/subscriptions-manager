"use client";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";

export default function HamburgerAnimated({ extraStyle }) {
  const [active, setActive] = useState(false);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (active) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Очистка при размонтировании
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [active]);

  return (
    <>
      {/* Бургер-иконка */}
      <button
        onClick={() => setActive(!active)}
        className={`w-5 h-5 flex flex-col items-center justify-center transition-transform duration-300 relative z-50 cursor-pointer ${
          active ? "rotate-45 delay-[600ms]" : ""
        } ${extraStyle}`}
      >
        {/* Line 1 */}
        <span
          className={`block w-[20px] h-[1px] bg-gray-200 transition-all duration-300 ${
            active ? "translate-y-[6px] delay-[300ms]" : ""
          }`}
        ></span>

        {/* Line 2 */}
        <span
          className={`block w-[20px] h-[1px] bg-gray-200 my-1.5 transform origin-center transition-transform duration-300 ease-in-out ${
            active ? "scale-x-0" : "scale-x-100"
          }`}
          style={{ willChange: "transform" }}
        />

        {/* Line 3 */}
        <span
          className={`block w-[20px] h-[1px] bg-gray-200 transition-all duration-300 ${
            active ? "translate-y-[-7px] rotate-90 delay-[300ms]" : ""
          }`}
        ></span>
      </button>

      {/* Оверлей */}
      {active && (
        <div
          onClick={() => setActive(false)}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        />
      )}

      {/* Выдвижное меню */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-base-200 z-40 transition-transform duration-300 ${
          active ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Navigation extraStyles={`flex flex-col items-start pt-20 pl-5`} />
      </div>
    </>
  );
}
