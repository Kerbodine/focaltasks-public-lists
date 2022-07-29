import { initializeApp } from "firebase/app";
import {
  collectionGroup,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getListData = async (listId) => {
  const lisRef = query(
    collectionGroup(db, "Lists"),
    where("id", "==", listId),
    where("public", "==", true)
  );
  const allLists = await getDocs(lisRef);
  let listData;
  allLists.docs.forEach((list) => {
    listData = list.data();
  });
  return listData;
};
