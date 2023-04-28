import React, { useState, useEffect } from "react";
import "./UserDetails.css";
import image from "../../assets/User-Profile.png";
import { Link, Navigate } from "react-router-dom";

export interface Notes {
  id: string;
  bg: string;
  name: string;
  email: string;
  image: string;
  password: string;
  dp: string;
  bio: string;
}
interface UserDetailsProps {
  mode: string;
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
  array: any;
  setArray: any;
  user: any;
  setUser: any;
}

const UserDetails = ({
  mode,
  loginState,
  setLoginState,
  array,
  setArray,
  user,
  setUser,
}: UserDetailsProps) => {
  const handleLogout = () => {
    setLoginState(true);
    setUser({
      id: "",
      name: "",
      bg: "",
      email: "",
      image: "",
      password: "",
      dp: "",
      bio: user.bio,
    });
  };

  return (
    <div>
      {loginState === true ? (
        <div
          className={
            mode === "dark"
              ? " dark-background  user-details-container align-center"
              : "light-background user-details-container"
          }
        >
          {" "}
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="dp"
            className="img-class-post"
          />
          <h4>User Not Logged In</h4>
          <Link to="/login" className="follow-btn btn-link">
            Login
          </Link>
        </div>
      ) : (
        <div
          className={
            mode === "dark"
              ? " dark-background  user-details-container "
              : "light-background user-details-container"
          }
        >
          {" "}
          <img src={user.bg} className="img-bg-class"></img>
          <img src={user.dp} className="img-class"></img>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
          <p>{user?.bio}</p>
          <button className="follow-btn" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
