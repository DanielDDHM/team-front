import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "@firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyATIQj7XOn_MLUrMssne_hEdzWIYtXrL94",
  authDomain: "osae-dcce8.firebaseapp.com",
  projectId: "osae-dcce8",
  storageBucket: "osae-dcce8.appspot.com",
  messagingSenderId: "442234009384",
  appId: "1:442234009384:web:2868ee325adbc8502c021d",
  measurementId: "G-2YGSNXCXPR",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getFirebaseToken = async () => {
  let currentToken = "";

  try {
    currentToken = await getToken(messaging, {
      vapidKey:
        "BJhyxmvL6u1niXl6zl8BTQLhtghRR8vkTH6UYlFQbBRgMH_hewokiOgrGYdU0lx8fYp3ijtYM2WdJBNzfS27aao",
    });
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }

  return currentToken;
};
