import React from "react";
import { FaFacebookMessenger, FaGithub, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-neutral text-neutral-content items-center p-4 ">
      <div className="max-w-6xl mx-auto footer sm:footer-horizontal">
        <aside className="grid-flow-col items-center">
          <img src="/nav-logo.png" alt="logo" />
          <p>SonarBangla Travels © {new Date().getFullYear()} </p>
        </aside>
        <nav className="grid-flow-col gap-2 text-2xl md:place-self-center md:justify-self-end">
          <a
            className="cursor-pointer"
            href="https://web.facebook.com/web.developer.tamim/"
            target="_blank"
          >
            <FaFacebookMessenger />
          </a>
          <a className="cursor-pointer" target="_blank" href="https://wa.me/+8801720911179">
            <FaWhatsapp></FaWhatsapp>
          </a>
          <a className="cursor-pointer" target="_blank" href="https://github.com/toimurhasan/">
            <FaGithub />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
