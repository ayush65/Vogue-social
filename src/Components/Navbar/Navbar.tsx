/** @format */

import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

import { FaSun, FaMoon } from "react-icons/fa";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar";

type LoginState = boolean;

type NavbarProps = {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  loginState: boolean;
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ setMode, mode, setLoginState, loginState }: NavbarProps) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  function toggleMode() {
    setMode((prevMode: string) => (prevMode === "light" ? "dark" : "light"));
  }

  const handleLogout = () => {
    setLoginState(true);
  };

  useEffect(() => {
    const LoginState = JSON.stringify(loginState);

    localStorage.setItem("LoginSocial", LoginState);
  }, [loginState]);

  return (
    <nav
      className={
        mode === "dark" ? "navbar navbar-dark " : " navbar navbar-light  "
      }
    >
      <div className="navbar-hamburger">
        {" "}
        {show ? (
          <ImCross
            className="animate__animated animate__backInDown"
            onClick={() => setShow(false)}
          />
        ) : (
          <GiHamburgerMenu
            className="animate__animated animate__backInDown"
            onClick={() => setShow(true)}
          />
        )}
      </div>
      {show ? (
        <Sidebar
          mode={mode}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      ) : null}
      <div style={{ display: "flex" }}>
        <h1 className="navbar-logo  "> Vogue Social</h1>
      </div>

      <div className="nav-links-container">
        <a onClick={toggleMode} className="nav-links">
          {mode === "light" ? (
            <FaMoon className="animate__animated animate__backInDown" />
          ) : (
            <FaSun className="animate__animated animate__backInDown" />
          )}
        </a>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
