import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    to: "/",
    text: "Home"
  },
  {
    to: "/wordfind",
    text: "Wordfind"
  }
];

const isCurrent = (to, current) => {
  if (to === "/" && current === to) {
    return true;
  } else if (to !== "/" && current.includes(to)) {
    return true;
  }

  return false;
};

const HeaderLink = ({ to, text, current }) => (
  <li className={isCurrent(to, current) ? "current" : ""}>
    <Link to={to}>{text}</Link>
  </li>
);

export default ({ isAuthenticated, current }) => (
  <header id="header">
    <ul id="links">
      {links.map((link, index) => (
        <HeaderLink key={index} current={current} {...link} />
      ))}
    </ul>
  </header>
);
