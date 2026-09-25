"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Icon from "./Icon";

export default function ButtonDownloadData({ subscriptions }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    try {
      // Создаем JSON из данных
      const dataStr = JSON.stringify(subscriptions, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      // Создаем временную ссылку для скачивания
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "my_subscriptions_data.json";

      // Симулируем клик и удаляем ссылку
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Data downloaded successfully!");
    } catch (e) {
      toast.error("Failed to download data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="btn btn-outline btn-sm"
    >
      {isLoading ? "Preparing..." : "Download"}
      <Icon name="export" className="ml-1" />
    </button>
  );
}
