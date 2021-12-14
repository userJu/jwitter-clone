import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { fireLogin } from "../fBase";
import Home from "./routes/home";
import Navigation from "./navigation";

const LoginForm = ({ userInit }) => {
  const [createUser, setCreateUser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (createUser) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setCreateUser(false);
        }
      );
    } else {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
        }
      );
    }
  };
  const loginOtherWay = (e) => {
    const auth = getAuth();
    if (e.target.name === "google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((error) => {
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } else if (e.target.name === "github") {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((error) => {
          const credential = GithubAuthProvider.credentialFromError(error);
        });
    }
  };
  const toggleAccount = () => {
    setCreateUser(!createUser);
  };

  return (
    <>
      {userInit ? (
        <Navigation />
      ) : (
        <>
          <h1 onClick={toggleAccount}>
            {createUser ? "New account" : "Login"}
          </h1>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={email}
              type="text"
              name="email"
              placeholder="Email"
            />
            <input
              onChange={onChange}
              value={password}
              type="text"
              name="password"
              placeholder="Password"
            />
            <button>{createUser ? "New account" : "Login"}</button>
          </form>
          {createUser ? null : (
            <>
              <button onClick={loginOtherWay} name="google">
                Google Login
              </button>
              <button onClick={loginOtherWay} name="github">
                Github Login
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default LoginForm;
