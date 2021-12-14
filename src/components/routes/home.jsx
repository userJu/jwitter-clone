import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Jweet from "./homeComp/jweet";
import { database } from "../../fBase";

const Home = () => {
  const [jweets, setJweets] = useState("");

  const onChange = (e) => {
    console.log(e.target.value);
    setJweets(e.target.vaule);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(database, "users"), {
        text: { jweets },
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <h2>Show Your Jweet</h2>
      <form onSubmit={onSubmit} action="">
        <input onChange={onChange} value={jweets} type="text" />
        <button>Jweet</button>
      </form>
      <Jweet />
    </>
  );
};

export default Home;
