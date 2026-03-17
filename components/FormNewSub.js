"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import axios from "axios";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import Icon from "./Icon";
import CategoryPicker from "./CategoryPicker";

const FormNewSub = ({ onClose }) => {
  const [showMore, setShowMore] = useState(false);

  const [unit, setUnit] = useState("/mo");
  const [open, setOpen] = useState(false);
  const units = ["/mo", "/y", "/wk"];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [isCatsLoading, setIsCatsLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [icon, setIcon] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dropdownRef = useRef(null);
  const emojiRef = useRef(null);
  const starterEmojis = [
    "🚀",
    "⚡",
    "🎬",
    "🕹️",
    "🍿",
    "🎧",
    "☁️",
    "🍕",
    "☘",
    "🎨",
  ];

  // --- ЛОГИКА РАСЧЕТА ДАТЫ ---
  const calculateNextCharge = (selectedUnit) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    if (selectedUnit === "/mo") {
      const currentDay = date.getDate();
      // 1. Устанавливаем 1е число, чтобы избежать прыжка через месяц при расчете
      date.setDate(1);
      // 2. Переходим на следующий месяц
      date.setMonth(date.getMonth() + 1);
      // 3. Пытаемся вернуть исходное число
      // getMonth() здесь вернет уже новый месяц, а setDate проверит, есть ли там столько дней
      const daysInNextMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      ).getDate();
      date.setDate(Math.min(currentDay, daysInNextMonth));
    } else if (selectedUnit === "/y") {
      // Для года просто меняем год
      date.setFullYear(date.getFullYear() + 1);
    } else if (selectedUnit === "/wk") {
      // Для недели оставляем +7 дней
      date.setDate(date.getDate() + 7);
    }

    return date.toISOString();
  };
  // ---------------------------

  useEffect(() => {
    // Ставим рандомную иконку при загрузке формы
    const randomEmoji =
      starterEmojis[Math.floor(Math.random() * starterEmojis.length)];
    setIcon(randomEmoji);

    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const categoryRef = useRef(null);

  // Переключение проектов (множественный выбор)
  const toggleCategory = (category) => {
    const catId = typeof category === "object" ? category._id : category;

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((p) => p !== category)
        : [...prev, category],
    );
  };

  // Если поповер открыт и клик был НЕ по нему
  useEffect(() => {
    function handleClickOutside(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        // Проверяем, чтобы клик не был по самой кнопке "плюс",
        setShowCategoryPicker(false);
      }

      // Проверки emoji, dropdown
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategoryPicker]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setAllCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setIsCatsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const finalNextCharge = calculateNextCharge(unit);

    try {
      const data = await axios.post("/api/sub", {
        icon,
        name,
        price: Number(price),
        unit,
        nextCharge: finalNextCharge,
        categories: selectedCategories,
        note,
      });

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999,
      });

      toast.success("Subscription added! 🎉");

      if (onClose) onClose({});
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1 max-w-lg">
      {/* Icon Upload Area with Emoji Picker Popover */}
      <fieldset className="fieldset relative" ref={emojiRef}>
        <div
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-lg cursor-pointer transition relative overflow-hidden border-base-content/40 bg-base-300 hover:border-base-content bg-[url('/emoji-bg.png')] bg-auto bg-center`}
        >
          <span className="text-4xl mb-2 drop-shadow-md">{icon}</span>
          <p className="font-regular text-lg text-base-content">
            Click to change icon
          </p>
        </div>

        {/* Эмодзи Поповер */}
        {showEmojiPicker && (
          <div className="absolute z-100 left-1/2 -translate-x-1/2 top-full mt-2 shadow-2xl border border-white/10 rounded-xl overflow-hidden animate-popDown">
            <EmojiPicker
              theme="dark"
              onEmojiClick={(emojiData) => {
                setIcon(emojiData.emoji);
                setShowEmojiPicker(false);
              }}
              autoFocusSearch={false}
              skinTonesDisabled
              width={320}
              height={400}
            />
          </div>
        )}
      </fieldset>

      {/* Title and Price */}
      <div className="grid grid-cols-2 gap-2">
        {/* Title */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal mb-0 pb-0 ">
            Title
          </legend>
          <input
            type="text"
            className="input input-bordered w-full bg-base-300 focus:outline-none capitalize"
            placeholder="Name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </fieldset>

        {/* Price */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal mb-0 pb-0">
            Price
          </legend>

          <div className="relative flex items-center gap-2">
            <input
              type="number"
              className="input input-bordered w-full bg-base-300 focus:outline-none"
              placeholder="0.00 €"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />

            {/* Dropdown */}
            <div
              ref={dropdownRef}
              className="absolute right-0 top-0 h-full flex items-center pr-3"
            >
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-transparent hover:bg-base-100 transition text-base-content/70 cursor-pointer"
              >
                {unit}
                <svg
                  width="7"
                  height="4"
                  viewBox="0 0 7 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M5.89167 0.175C5.65833 -0.0583333 5.30833 -0.0583333 5.075 0.175L3.03333 2.21667L0.991667 0.175C0.758333 -0.0583333 0.408333 -0.0583333 0.175 0.175C-0.0583333 0.408333 -0.0583333 0.758334 0.175 0.991667L2.625 3.44167C2.74167 3.55833 2.85833 3.61667 3.03333 3.61667C3.20833 3.61667 3.325 3.55833 3.44167 3.44167L5.89167 0.991667C6.125 0.758334 6.125 0.408333 5.89167 0.175Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                </svg>
              </button>

              {open && (
                <ul className="absolute right-0 top-full mt-1 w-20 bg-base-300 rounded-md shadow z-50">
                  {units.map((u) => (
                    <li key={u}>
                      <button
                        type="button"
                        onClick={() => {
                          setUnit(u);
                          setOpen(false);
                        }}
                        className="w-full cursor-pointer rounded-md text-left px-3 py-1 text-sm hover:bg-base-100 transition"
                      >
                        {u}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </fieldset>
      </div>

      {/* Divider */}
      <div
        className="divider my-3 cursor-pointer select-none"
        onClick={() => setShowMore(!showMore)}
      >
        <span className="flex items-center gap-1 text-sm text-gray-500">
          {showMore ? "Less options" : "More options"}
          <Icon
            name="angle-down"
            className={`transform transition-transform duration-300 fill-base-content ${
              showMore ? "-rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </div>

      {/* Hidden block */}
      <div
        className={`transition-all duration-500 ease-in-out ${showMore ? "" : "overflow-hidden"} ${
          showMore ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Categories */}
        <fieldset className="fieldset relative">
          <legend className="fieldset-legend text-sm font-normal mb-0 pb-0">
            Categories
          </legend>

          <div className="flex flex-wrap items-center gap-2 min-h-8">
            {isCatsLoading ? (
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs text-base-content/50 font-light">
                  Loading categories
                </span>
                <span className="loading loading-dots loading-xs text-base-content/30"></span>
              </div>
            ) : (
              <>
                {allCategories.map((cat) => {
                  const isActive = selectedCategories.includes(cat._id);
                  return (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => toggleCategory(cat._id)}
                      className={`relative text-sm px-1.5 py-0.5 rounded-lg transition-all border cursor-pointer
                      ${
                        isActive
                          ? "bg-base-200 border-base-content text-base-content"
                          : "bg-base-200 border-base-content/40 text-base-content/40"
                      }
                    `}
                    >
                      {cat.name}
                    </button>
                  );
                })}

                <button
                  className="flex items-center justify-center rounded-full bg-base-200 border border-base-content/70 hover:border-base-content transition w-6 h-6 cursor-pointer"
                  aria-label="Add category"
                  type="button"
                  onClick={() => setShowCategoryPicker(!showCategoryPicker)}
                >
                  <Icon name="plus" className="text-base-content" />
                </button>
              </>
            )}
          </div>

          {showCategoryPicker && (
            <div
              ref={categoryRef}
              className="animate-popUp absolute z-110 left-1/2 -translate-x-1/2 bottom-full mb-4 shadow-2xl"
            >
              <CategoryPicker
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                onCategoriesChange={(updatedList) =>
                  setAllCategories(updatedList)
                }
              />
            </div>
          )}
        </fieldset>

        {/* Note */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-sm font-normal mb-0 pb-0">
            Note
          </legend>
          <textarea
            className="textarea textarea-bordered w-full bg-base-300 focus:outline-none"
            placeholder="Renewal terms or cancellation link..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </fieldset>
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary w-full mt-2 font-normal">
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <Icon name="plus" className="text-base-content text-xl" />
        )}
        Add New Subscription
      </button>
    </form>
  );
};

export default FormNewSub;
