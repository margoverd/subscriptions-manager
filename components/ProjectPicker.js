"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Icon from "./Icon";

const ProjectPicker = ({ selectedProjects, setSelectedProjects }) => {
  const [newProjectName, setNewProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // 1. Загрузка проектов при открытии
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (e) {
        toast.error("Failed to load projects");
      } finally {
        setIsFetching(false);
      }
    };
    fetchProjects();
  }, []);

  // 2. Добавление проекта
  const addProject = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!newProjectName.trim() || isAdding) return;

    setIsAdding(true);
    setEditingId(null);
    try {
      const res = await axios.post("/api/projects", { name: newProjectName });
      setProjects([res.data, ...projects]);
      setNewProjectName("");
      toast.success("Project created");
    } catch (e) {
      toast.error("Error creating project");
    } finally {
      setIsAdding(false);
    }
  };

  // 3. Сохранение редактирования
  const saveEdit = async (id) => {
    if (!editValue.trim()) return;
    setIsSaving(true);
    try {
      const res = await axios.patch("/api/projects", { id, name: editValue });
      setProjects(projects.map((p) => (p._id === id ? res.data : p)));
      setEditingId(null);
      toast.success("Updated");
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Удаление проекта
  const deleteProject = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete("/api/projects", { data: { id } });
      setProjects(projects.filter((p) => p._id !== id));
      // Убираем из выбранных, если он там был
      setSelectedProjects((prev) =>
        prev.filter((name) => name !== projects.find((p) => p._id === id).name),
      );
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const toggleSelect = (name) => {
    setSelectedProjects((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  return (
    <div className="w-[280px] bg-[#222222] rounded-xl shadow-2xl border border-white/10 text-base-content flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden">
      {/* ВЕРХНЯЯ ЧАСТЬ */}
      <div className="flex gap-2 p-2">
        <input
          type="text"
          placeholder="New project..."
          className="input input-md rounded-lg flex-1 border border-trasparent shadow-none 
            bg-[#333333] text-sm transition-all duration-200
            focus:outline-none focus:bg-base-200 focus:border-white/20"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              addProject(e);
            }
          }}
        />
        <button
          type="button"
          onClick={addProject}
          disabled={isAdding || !newProjectName.trim()}
          className="btn btn-sm shadow-none disabled:bg-primary/70 disabled:text-base-content/70 btn-primary rounded-lg h-10 w-10 min-h-8 p-0 cursor-pointer"
        >
          {isAdding ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Icon name="plus" className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="divider my-0 h-0 opacity-10"></div>

      {/* СПИСОК ПРОЕКТОВ */}
      <div className="p-2 max-h-37 overflow-y-auto flex flex-col gap-1 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 scrollbar-thumb-rounded-full">
        {isFetching ? (
          <div className="flex justify-center p-4">
            <span className="loading loading-dots loading-sm opacity-20"></span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-xs text-base-content/30 py-4">
            No projects yet
          </div>
        ) : (
          projects.map((project) => {
            const isEditing = editingId === project._id;
            const isSelected = selectedProjects.includes(project.name);

            return (
              <div
                key={project._id}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(project.name);
                }}
                className={`group flex items-center gap-1 justify-between py-1 rounded-lg transition-all duration-200 cursor-pointer ${isEditing ? "px-0" : "px-3 hover:bg-white/5"}`}
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
                          saveEdit(project._id);
                        } else if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => saveEdit(project._id)}
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
                      className={`flex-1 truncate text-sm transition-colors
                        ${
                          isSelected
                            ? "text-base-content font-medium"
                            : "text-base-content/70 group-hover:text-base-content"
                        }
                      `}
                    >
                      <div className="flex items-center content-center gap-0">
                        <div
                          className={`flex items-center content-center overflow-hidden transition- duration-300 ease-out ${isSelected ? "w-4 opacity-100" : "w-0 opacity-0"}`}
                        >
                          <Icon
                            name="check"
                            className={`text-base-content text-sm transition-transform duration-300 ease-out ${isSelected ? "translate-x-0" : "-translate-x-2"} `}
                          />
                        </div>

                        {project.name}
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(project._id);
                          setEditValue(project.name);
                        }}
                        className="text-base-content/30 group-hover:text-base-content hover:text-error transition-colors cursor-pointer"
                      >
                        <Icon name="edit" className="text-lg" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project._id);
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

export default ProjectPicker;
