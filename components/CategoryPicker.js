"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Icon from "./Icon";

const CategoryPicker = ({
  selectedCategories,
  setSelectedCategories,
  onCategoriesChange,
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const notifyParent = (updatedList) => {
    if (onCategoriesChange) {
      onCategoriesChange(updatedList);
    }
  };

  // 1. Загрузка категорий при открытии
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
        notifyParent(res.data);
      } catch (e) {
        toast.error("Failed to load categories");
      } finally {
        setIsFetching(false);
      }
    };
    fetchCategories();
  }, []);

  // 2. Добавление категории
  const addCategory = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!newCategoryName.trim() || isAdding) return;

    setIsAdding(true);
    setEditingId(null);
    try {
      const res = await axios.post("/api/categories", {
        name: newCategoryName,
      });
      const updatedList = [res.data, ...categories];

      setCategories(updatedList);
      notifyParent(updatedList);

      setNewCategoryName("");
      toast.success("Category created");
    } catch (e) {
      toast.error("Error creating category");
    } finally {
      setIsAdding(false);
    }
  };

  // 3. Сохранение редактирования
  const saveEdit = async (id) => {
    if (!editValue.trim()) return;
    setIsSaving(true);
    try {
      const res = await axios.patch("/api/categories", { id, name: editValue });
      const updatedList = categories.map((c) => (c._id === id ? res.data : c));

      notifyParent(updatedList);
      setCategories(updatedList);

      setEditingId(null);

      toast.success("Updated");
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Удаление категории
  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      await axios.delete("/api/categories", { data: { id } });

      // Находим имя удаляемой категории перед тем как убрать её из списка
      const categoryToDelete = categories.find((c) => c._id === id);

      const updatedList = categories.filter((c) => c._id !== id);

      setCategories(updatedList);
      notifyParent(updatedList);

      // Убираем из выбранных, если она там была
      if (categoryToDelete) {
        setSelectedCategories((prev) =>
          prev.filter((name) => name !== categoryToDelete.name),
        );
      }
      toast.success("Deleted");
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const toggleSelect = (name) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  return (
    <div className="w-[280px] bg-[#222222] rounded-xl shadow-2xl border border-white/10 text-base-content flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden">
      {/* ВЕРХНЯЯ ЧАСТЬ */}
      <div className="flex gap-2 p-2">
        <input
          type="text"
          placeholder="New category..."
          className="input input-md rounded-lg flex-1 border border-transparent shadow-none 
            bg-[#333333] text-sm transition-all duration-200
            focus:outline-none focus:bg-base-200 focus:border-white/20"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              addCategory(e);
            }
          }}
        />
        <button
          type="button"
          onClick={addCategory}
          disabled={isAdding || !newCategoryName.trim()}
          className="btn btn-sm shadow-none disabled:bg-primary/70 disabled:text-base-content/70 btn-primary rounded-lg h-10 w-10 min-h-8 p-0 cursor-pointer"
        >
          {isAdding ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Icon name="plus" className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="divider my-0 h-0"></div>

      {/* СПИСОК КАТЕГОРИЙ */}
      <div className="p-2 max-h-37 overflow-y-auto flex flex-col gap-1 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 scrollbar-thumb-rounded-full">
        {isFetching ? (
          <div className="flex justify-center p-4">
            <span className="loading loading-dots loading-sm opacity-20"></span>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-xs text-base-content/30 py-4">
            No categories yet
          </div>
        ) : (
          categories.map((category) => {
            const isEditing = editingId === category._id;
            const isSelected = selectedCategories.includes(category.name);

            return (
              <div
                key={category._id}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(category.name);
                }}
                className={`group flex items-center gap-1 justify-between py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                  isEditing ? "px-0" : "px-3 hover:bg-white/5"
                }`}
              >
                {isEditing ? (
                  <div className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-top-1 duration-200">
                    <input
                      type="text"
                      className="input input-sm input-bordered flex-1 focus:outline-none bg-base-200"
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.stopPropagation();
                          saveEdit(category._id);
                        } else if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => saveEdit(category._id)}
                      className="text-[10px] uppercase font-bold text-success hover:underline px-1 cursor-pointer"
                    >
                      {isSaving ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="text-xs text-base-content/30 px-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className={`flex-1 truncate text-sm transition-colors ${
                        isSelected
                          ? "text-base-content font-medium"
                          : "text-base-content/70 group-hover:text-base-content"
                      }`}
                    >
                      <div className="flex items-center content-center gap-0">
                        <div
                          className={`flex items-center content-center overflow-hidden transition-all duration-300 ease-out ${
                            isSelected ? "w-4 opacity-100" : "w-0 opacity-0"
                          }`}
                        >
                          <Icon
                            name="check"
                            className={`text-base-content text-sm transition-transform duration-300 ease-out ${
                              isSelected ? "translate-x-0" : "-translate-x-2"
                            } `}
                          />
                        </div>
                        {category.name}
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(category._id);
                          setEditValue(category.name);
                        }}
                        className="text-base-content/30 group-hover:text-base-content hover:text-info transition-colors cursor-pointer"
                      >
                        <Icon name="edit" className="text-lg" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCategory(category._id);
                        }}
                        className="text-base-content/30 group-hover:text-base-content hover:text-error transition-colors cursor-pointer"
                      >
                        <Icon name="trash" className="text-lg" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryPicker;
