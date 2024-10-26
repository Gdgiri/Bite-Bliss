import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg py-14 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-16">
        {/* Left Side - Copyright */}
        <div className="text-sm text-black md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Bite Bliss. All rights reserved.
        </div>

        {/* Center - Footer Links */}
        <div className="my-4 md:my-0 flex justify-center md:flex-grow">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-heads1 font-bold"
                    : "text-gray-700 hover:text-heads transition-colors"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy-policy"
                className={({ isActive }) =>
                  isActive
                    ? "text-heads1 font-bold"
                    : "text-gray-700 hover:text-heads transition-colors"
                }
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/licensing"
                className={({ isActive }) =>
                  isActive
                    ? "text-heads1 font-bold"
                    : "text-gray-700 hover:text-heads transition-colors"
                }
              >
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-heads1 font-bold"
                    : "text-gray-700 hover:text-heads transition-colors"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=giridharan831@gmail.com"
            aria-label="Gmail"
            className="text-red-600 hover:text-red-600 transition-transform transform hover:scale-125"
          >
            <SiGmail className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/Gdgiri"
            aria-label="GitHub"
            className="text-gray-900 hover:text-gray-900 transition-transform transform hover:scale-125"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/giridharan-sivaramakrishnan-91353b333"
            aria-label="LinkedIn"
            className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-125"
          >
            <FaLinkedinIn className="w-6 h-6" />
          </a>
          <a
            href="https://wa.me/9715424895"
            aria-label="WhatsApp"
            className="text-green-600 hover:text-green-600 transition-transform transform hover:scale-125"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
