"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Icon from "./Icon";

export default function ButtonDeleteAccount() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    // Стандартное подтверждение браузера (безопасность прежде всего)
    const confirmed = window.confirm(
      "Are you absolutely sure? This will delete all your data and account permanently. This action cannot be undone.",
    );

    if (!confirmed) return;

    setIsLoading(true);

    try {
      // Вызываем API для удаления (нам нужно будет создать этот роут)
      const response = await fetch("/api/user", { method: "DELETE" });

      if (response.ok) {
        toast.success("Account deleted. Goodbye!");
        // Разлогиниваем пользователя и редиректим на главную
        signOut({ callbackUrl: "/" });
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="btn btn-error btn-sm shadow-none flex items-center"
    >
      {isLoading ? "Deleting..." : "Delete"}
      <Icon name="trash-alt" className="" />
    </button>
  );
}
