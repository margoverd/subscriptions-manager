"use client";

import { useState, useRef, useEffect } from "react";
import ButtonLogout from "./ButtonLogout";
import Image from "next/image";
import { useSession } from "./SessionProvider";
import Icon from "./Icon";
import Link from "next/link";

export default function MenuAvatarPopover({ extraStyles }) {
  const session = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`relative ${extraStyles}`} ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-circle bg-base-300 hover:bg-base-200 overflow-hidden"
      >
        {user?.image ? (
          <Image
            width={45}
            height={45}
            src={user.image}
            alt={user?.name || "User avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          // Если картинки нет, показываем первую букву имени или иконку
          <div className="w-full h-full flex items-center justify-center text-lg bg-primary/40 text-primary-content shadow-none">
            {user?.name
              ? user.name[0].toUpperCase()
              : user.email[0].toUpperCase()}
          </div>
        )}
      </button>

      {/* Попап */}
      <div
        className={`absolute z-50 mt-2 right-0 w-64 bg-base-200 rounded-xl border border-white/20 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-2"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <div className="pt-4 pb-2">
          <div className="px-2">
            <div className="px-2.5">
              {user?.name ? (
                <div className="textarea-md">{user.name}</div>
              ) : (
                <></>
              )}
              <div
                className={`text-sm mb-4 ${user?.name ? "text-base-content/70" : "text-base-content"} `}
              >
                {user?.email || "user@email.com"}
              </div>
            </div>
            <Link
              href="/settings"
              className="px-3 py-2 w-full flex justify-between items-center rounded-lg border-none text-base-content/70 hover:text-base-content font-normal hover:bg-base-300 transition-colors cursor-pointer shadow-none mb-0.5"
            >
              <span className="text-sm">Settings</span>
              <span className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />
                <Icon name="setting" className="text-xl font-normal" />
              </span>
            </Link>

            {/* <button className="px-3 py-2 w-full flex justify-between items-center rounded-lg border-none text-base-content/70 hover:text-base-content font-normal hover:bg-base-300 transition-colors cursor-pointer shadow-none">
              <span className="text-sm">Snowfall</span>
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-primary"
              />
            </button> */}
          </div>

          <div className="divider my-2" />

          <div className="px-2">
            <ButtonLogout
              icon={true}
              extraStyles="px-3 justify-between w-full rounded-lg border-none text-base-content/70 sha hover:text-base-content font-normal hover:bg-error/10 shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
