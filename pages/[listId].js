import Head from "next/head";
import Script from "next/script";
import React from "react";
import TaskList from "../components/TaskList";
import { getListData } from "../firebase";

export default function PublicList({ listData, tasks }) {
  return (
    <>
      <Head>
        <title>{listData.title}</title>
      </Head>
      <TaskList data={listData} tasks={tasks} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { listId } = context.query;
  let listData = await getListData(listId);

  if (listData) {
    delete listData["createdAt"]; // remove dates due to serialization problem
    delete listData["modifiedAt"];

    let tasks = listData["tasks"];
    // order tasks by createdAt
    tasks = Object.values(tasks).sort((a, b) => {
      return a.createdAt.seconds - b.createdAt.seconds;
    });

    Object.values(tasks).forEach((task) => {
      delete task["createdAt"];
      delete task["modifiedAt"];
    });
    delete listData["tasks"]; // remove tasks due to serialization problem

    return { props: { listData, tasks } };
  } else {
    return { notFound: true };
  }
}
