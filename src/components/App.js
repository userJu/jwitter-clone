import React, { useEffect, useState } from "react";
import AppRouter from "../Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [userInit, setUserInit] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUserInit(true);
      } else {
        console.log("not user init");
        setUserInit(false);
      }
    });
  }, []);
  return (
    <>
      <AppRouter userInit={userInit} />
    </>
  );
}

export default App;
