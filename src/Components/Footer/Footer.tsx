import React from "react";
import "./Footer.css";

import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

interface UserDetailsProps {
  mode: string;
}

const Footer = ({ mode }: UserDetailsProps) => {
  return (
    <div
      className={
        mode === "dark"
          ? "footer-div navbar-dark "
          : "footer-div navbar-light  "
      }
    >
      <p>{`Made   with   </>   by   Ayush  Prakash `}</p>
      <div className="personal-tags">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/ayush-prakash-6658b11b5/"
          className="links-tags nav-links"
        >
          <AiFillLinkedin />
        </a>
        <a
          target="_blank"
          href="https://github.com/ayush65"
          className="links-tags nav-links"
        >
          <AiFillGithub />
        </a>
      </div>
      <p>© 2023 </p>
    </div>
  );
};

export default Footer;
