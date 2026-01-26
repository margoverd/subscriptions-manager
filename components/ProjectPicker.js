"use client";
import { useState } from "react";
import Icon from "./Icon";

const ProjectPicker = ({ selectedProjects, setSelectedProjects }) => {
  // Временные стейты для демонстрации каркаса
  const [newProjectName, setNewProjectName] = useState("");
  const [projects, setProjects] = useState([
    { _id: "1", name: "Project 1" },
    { _id: "2", name: "Project 2" },
    { _id: "3", name: "Project 3" },
    { _id: "4", name: "Project 4" },
  ]);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="w-[280px] bg-[#222222] rounded-xl shadow-2xl border border-white/10 text-base-content flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden">
      {/* ВЕРХНЯЯ ЧАСТЬ: Инпут и Плюс */}
      <div className="flex gap-2 p-2">
        <input
          type="text"
          placeholder="New project..."
          className="input rounded-lg flex-1 border-none shadow-none focus:outline-none bg-[#333333]"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button
          type="button"
          className="flex align-middle content-center btn btn-sm shadow-none btn-primary rounded-lg h-10 w-10"
        >
          <Icon name="plus" className="w-4 h-4" />
        </button>
      </div>
      <div className="divider my-0 h-0"></div>
      {/* НИЖНЯЯ ЧАСТЬ: Список проектов */}
      <div
        className="p-2 max-h-[148px] overflow-y-auto flex flex-col gap-1 pr-1 scrollbar-thin 
                scrollbar-thumb-white/10 
                scrollbar-track-transparent 
                hover:scrollbar-thumb-white/20 
                scrollbar-thumb-rounded-full"
      >
        {projects.map((project) => {
          const isEditing = editingId === project._id;

          return (
            <div
              key={project._id}
              className={`flex items-center gap-1 justify-between py-1 rounded-lg transition-all duration-200 ${
                isEditing ? "px-0 bg-transparent" : "px-3 hover:bg-base-100"
              }`}
            >
              {isEditing ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    className="input input-sm input-bordered flex-1 focus:outline-none bg-base-200"
                    autoFocus
                    defaultValue={project.name}
                  />
                  <button
                    type="button"
                    className="text-xs text-success hover:underline px-1 cursor-pointer"
                  >
                    Save
                  </button>
                  {/* Можно добавить кнопку отмены (крестик), если захочешь */}
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-xs text-base-content/30 hover:text-error px-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-1 cursor-pointer">
                    <span className="text-sm truncate">{project.name}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(project._id);
                        // Здесь потом добавишь setEditValue(project.name);
                      }}
                      className="text-base-content/50 hover:text-accent transition-colors cursor-pointer p-0"
                    >
                      <Icon name="edit" className="text-lg" />
                    </button>
                    <button
                      type="button"
                      className="text-base-content/50 hover:text-error transition-colors cursor-pointer p-0"
                    >
                      <Icon name="trash" className="text-lg" />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPicker;
