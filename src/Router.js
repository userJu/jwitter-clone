import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/routes/home";
import Profile from "./components/routes/profile";
import LoginForm from "./components/loginForm";
import Navigation from "./components/navigation";

const AppRouter = ({ userInit }) => {
  return (
    <>
      <Router>
        {userInit ? <Navigation userInit={userInit} /> : null}
        <Routes>
          <Route path="/" element={<LoginForm userInit={userInit} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
