import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { Button } from "flowbite-react"; // Ensure Flowbite is installed
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to track mobile menu visibility
  const location = useLocation(); // Get the current route

  // Set the active link based on the current location path
  const getActiveLink = () => {
    switch (location.pathname) {
      case "/about":
        return "about";
      case "/portfolio":
        return "portfolio";
      case "/gallery":
        return "gallery";
      case "/contact":
        return "contact";
      default:
        return "home";
    }
  };

  const [activeLink, setActiveLink] = useState(getActiveLink());

  useEffect(() => {
    setActiveLink(getActiveLink());
  }, [location]); // Update the active link whenever the route changes

  const handleLinkClick = (link) => {
    setActiveLink(link); // Set the active link state
    setMobileMenuOpen(false); // Close mobile menu on link click
  };

  const LoginPage = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 sm:justify-center md:justify-between">
        {/* Left Side - Brand Name */}
        <div className="text-xl font-bold text-gray-800">
          <a href="/">
            <span
              className="text-2xl text-pink"
              style={{
                color: "#C57844",
                fontFamily: "'Tangerine', cursive",
                fontSize: "40px",
                fontWeight: "800",
                fontStyle: "normal",
              }}
            >
              Bite
            </span>
            <span> Bliss</span>
          </a>
        </div>

        {/* Right Side - Toggle Button for Mobile View */}
        <div className="md:hidden">
          <button
            className="bg-heads1 text-2xl text-white font-bold px-4 py-2 rounded-lg shadow-lg "
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
          >
            {isMobileMenuOpen ? <IoMdClose /> : <CiMenuBurger />}
          </button>
        </div>

        {/* Center - Navigation Links */}
        <div className={`hidden md:flex space-x-4`}>
          <Link
            to="/"
            onClick={() => handleLinkClick("home")}
            className={`${
              activeLink === "home"
                ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                : "bg-gray-100 text-#D6883C hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => handleLinkClick("about")}
            className={`${
              activeLink === "about"
                ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
            }`}
          >
            About
          </Link>
          <Link
            to="/portfolio"
            onClick={() => handleLinkClick("portfolio")}
            className={`${
              activeLink === "portfolio"
                ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
            }`}
          >
            Recipes
          </Link>
          <Link
            to="/gallery"
            onClick={() => handleLinkClick("gallery")}
            className={`${
              activeLink === "gallery"
                ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
            }`}
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            onClick={() => handleLinkClick("contact")}
            className={`${
              activeLink === "contact"
                ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
            <div className="flex flex-col items-center space-y-2 p-4">
              <Link
                to="/"
                onClick={() => handleLinkClick("home")}
                className={`${
                  activeLink === "home"
                    ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                    : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
                } text-center`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => handleLinkClick("about")}
                className={`${
                  activeLink === "about"
                    ? " bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                    : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
                } text-center`}
              >
                About
              </Link>
              <Link
                to="/portfolio"
                onClick={() => handleLinkClick("portfolio")}
                className={`${
                  activeLink === "portfolio"
                    ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                    : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
                } text-center`}
              >
                Recipes
              </Link>
              <Link
                to="/gallery"
                onClick={() => handleLinkClick("gallery")}
                className={`${
                  activeLink === "gallery"
                    ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                    : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
                } text-center`}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                onClick={() => handleLinkClick("contact")}
                className={`${
                  activeLink === "contact"
                    ? "bg-white text-heads10 font-bold px-4 py-2 rounded-lg shadow-lg"
                    : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
                } text-center`}
              >
                Contact
              </Link>

              <button
                onClick={LoginPage}
                className="flex items-center space-x-2  bg-heads1 text-xl text-white font-bold px-4 py-2 rounded-lg shadow-lg"
              >
                <span className="text-2xl">
                  <RiLoginCircleLine />
                </span>

                <span>Login</span>
              </button>
            </div>
          </div>
        )}

        <div className="hidden md:block">
          <Button
            color=""
            onClick={LoginPage}
            style={{ color: "#C57844" }}
            className="flex items-center space-x-2 "
          >
            <span className="text-2xl">
              <RiLoginCircleLine />
            </span>
            <span className="font-extrabold">Login</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
