import Image from "next/image";
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { BiSun, BiMoon } from "react-icons/bi";
import Link from "next/link";

export default function TaskList({ data, tasks }) {
  console.log(data);

  const author = data.profiles.find((profile) => profile.id === data.author);

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const changeThemeHandler = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  console.log(theme);

  return (
    <div className="w-screen h-screen sm:pt-16 dark:bg-gray-900">
      <div className="w-full max-w-xl p-6 sm:p-8 sm:rounded-2xl mx-auto sm:border-2 border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <h1
            onClick={() => localStorage.removeItem("theme")}
            className="w-full truncate text-3xl font-semibold dark:text-white"
          >
            {data.title}
          </h1>
          <button
            onClick={changeThemeHandler}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex-none text-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 grid place-items-center"
          >
            {theme === "dark" ? <BiSun /> : <BiMoon />}
          </button>
        </div>
        <p className="w-full font-medium text-gray-600 dark:text-gray-400">
          {data.notes}
        </p>
        <div className="flex items-center gap-2 border-y-2 border-gray-100 dark:border-gray-800 py-2 my-2">
          <div
            className={`${
              !author.photoURL && "bg-accent font-semibold text-white"
            } grid h-8 w-8 flex-none cursor-pointer place-items-center overflow-hidden rounded-lg relative`}
          >
            {author.photoURL ? (
              <Image src={author.photoURL} alt="pfp" layout="fill"></Image>
            ) : (
              author.displayName[0]
            )}
          </div>
          <div className={`flex-auto truncate text-sm`}>
            <p className="truncate font-medium text-gray-700 dark:text-gray-300">{`${author.displayName}`}</p>
            <p className="-mt-1 truncate text-gray-500">{author.email}</p>
          </div>
        </div>
        {tasks.length ? (
          <div className="flex flex-col gap-0.5 -mx-2">
            {Object.values(tasks).map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="font-medium text-gray-700 dark:text-gray-300">
            No tasks
          </p>
        )}
      </div>
      <Link href="https://focaltasks.com/">
        <div className="w-[160px] rounded-lg cursor-pointer py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 mx-auto flex justify-center text-gray-500 dark:text-gray-400 items-center gap-2 mt-8">
          <div className="dark:hidden h-12">
            <Image
              src="/logo-small-light.png"
              alt="logo"
              width={48}
              height={48}
            />
          </div>
          <div className="hidden dark:block h-12">
            <Image
              src="/logo-small-dark.png"
              alt="logo"
              width={48}
              height={48}
            />
          </div>
          <p className="mr-0.5">
            Made with <br />
            <span className="block -mt-1.5 font-semibold">FocalTasks</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
