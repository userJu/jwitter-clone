import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userInit }) => {
  return (
    <>
      <button>
        <Link to="/Home">Home</Link>
      </button>
      <button>
        <Link to="/profile">Profile</Link>
      </button>
    </>
  );
};
export default Navigation;
