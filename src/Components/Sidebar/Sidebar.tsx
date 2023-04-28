import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, Navigate } from "react-router-dom";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { FaBookmark, FaUser } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { MdAccountBox } from "react-icons/md";

interface UserDetailsProps {
  mode: string;
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ mode, loginState, setLoginState }: UserDetailsProps) => {
  return (
    <div
      className={
        mode === "dark"
          ? "  sidebar navbar-dark  animate__animated animate__backInLeft"
          : "navbar-light sidebar animate__animated animate__backInLeft"
      }
    >
      <Link
        to="/Posts"
        className={
          mode === "dark"
            ? "sidebar-link navbar-dark "
            : " sidebar-link navbar-light  "
        }
      >
        <AiFillHome /> Homepage
      </Link>

      {loginState === false ? (
        <div>
          {" "}
          <Link
            to="/user"
            className={
              mode === "dark"
                ? "sidebar-link navbar-dark "
                : " sidebar-link navbar-light  "
            }
          >
            {" "}
            <FaUser /> User
          </Link>
          <Link
            to="/bookmark"
            className={
              mode === "dark"
                ? "sidebar-link navbar-dark "
                : " sidebar-link navbar-light  "
            }
          >
            {" "}
            <FaBookmark /> Bookmark
          </Link>
          <Link
            to="/liked"
            className={
              mode === "dark"
                ? "sidebar-link navbar-dark "
                : " sidebar-link navbar-light  "
            }
          >
            {" "}
            <AiFillLike /> Liked
          </Link>
        </div>
      ) : (
        <div>
          {" "}
          <Link
            to="/login"
            className={
              mode === "dark"
                ? "sidebar-link navbar-dark "
                : " sidebar-link navbar-light  "
            }
          >
            {" "}
            <BiLogIn /> Login
          </Link>
          <Link
            to="/signup"
            className={
              mode === "dark"
                ? "sidebar-link navbar-dark "
                : " sidebar-link navbar-light  "
            }
          >
            {" "}
            <MdAccountBox /> Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
