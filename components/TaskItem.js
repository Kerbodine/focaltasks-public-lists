import React from "react";
import { HiFlag } from "react-icons/hi";

export default function TaskItem({ task }) {
  const getDueInDays = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    if (Math.abs(diffDays) > 99) {
      return dueDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else if (diffDays < -1) {
      return `${Math.abs(diffDays)} days ago`;
    } else if (diffDays === -1) {
      return "Yesterday";
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else {
      return `${diffDays} days`;
    }
  };

  return (
    <div className="w-full h-10 flex rounded-lg overflow-hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer gap-2 transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        readOnly
        className="h-6 w-6 flex-none cursor-pointer rounded-md border-2 border-gray-300 bg-transparent text-2xl text-accent transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 dark:border-gray-600 dark:checked:border-none"
      />
      <input
        className={`h-6 w-full flex-auto truncate bg-transparent font-medium placeholder-gray-300 outline-none transition-colors dark:placeholder-gray-600 ${
          task.completed
            ? `text-gray-400 dark:text-gray-500 line-through`
            : "text-gray-600 dark:text-gray-300"
        } ${task.title === "" && "no-underline"}`}
        placeholder="Task title"
        readOnly
        value={task.title}
      />
      {task.dueDate && (
        <div className="mr-2 flex h-6 items-center rounded-md bg-gray-100 px-1 text-sm font-medium text-gray-600 dark:bg-gray-800">
          <span className="text-lg text-gray-500 dark:text-gray-400">
            <HiFlag />
          </span>
          <p className="mr-1 whitespace-nowrap text-gray-500 dark:text-gray-400">{`${getDueInDays()}`}</p>
        </div>
      )}
    </div>
  );
}
