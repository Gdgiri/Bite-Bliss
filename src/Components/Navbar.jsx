import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../Redux/Slice/userSlice";
import { FaUserCheck } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai"; // Import the profile icon

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const getActiveLink = () => {
    switch (location.pathname) {
      case "/about":
        return "about";
      case "/recipe":
        return "recipe";
      case "/gallery":
        return "gallery";
      case "/contact":
        return "contact";
      default:
        return "home"; // This will be set to "home" for the root path
    }
  };

  const [activeLink, setActiveLink] = useState(getActiveLink());

  useEffect(() => {
    setActiveLink(getActiveLink());
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    dispatch(logOut()); // Call the logOut thunk
    navigate("/login"); // Redirect to login
    window.location.reload(); // Optionally refresh the page to update state
  };

  const handleProfile = () => {
    navigate("/profile");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 sm:justify-center md:justify-between">
        {/* Brand Name */}
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

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            className="bg-heads1 text-2xl text-white font-bold px-4 py-2 rounded-lg shadow-lg"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoMdClose /> : <CiMenuBurger />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`hidden md:flex space-x-4`}>
          {["", "about", "recipe", "gallery", "contact"].map((link) => (
            <Link
              key={link}
              to={`/${link}`}
              onClick={() => handleLinkClick(link === "" ? "home" : link)}
              className={`${
                activeLink === (link === "" ? "home" : link)
                  ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                  : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
              }`}
            >
              {link === ""
                ? "Home"
                : link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
            <div className="flex flex-col items-center space-y-2 p-4">
              {["", "about", "recipe", "gallery", "contact"].map((link) => (
                <Link
                  key={link}
                  to={`/${link}`}
                  onClick={() => handleLinkClick(link === "" ? "home" : link)}
                  className={`${
                    activeLink === (link === "" ? "home" : link)
                      ? "bg-white text-heads1 font-bold px-4 py-2 rounded-lg shadow-lg"
                      : "bg-gray-100 text-black hover:text-heads font-bold px-4 py-2 rounded-lg shadow-lg"
                  } text-center`}
                >
                  {link === ""
                    ? "Home"
                    : link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center bg-heads1 text-white font-bold px-4 py-2 rounded-lg shadow-lg"
                  >
                    {/* Show profile icon */}
                    <AiOutlineUser className="text-2xl" />
                    <span className="ml-2">{user.username}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 transform transition-all duration-300 scale-105">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={handleProfile}
                            className="block w-full text-center px-4 py-2 text-gray-700 hover:text-white hover:bg-heads"
                          >
                            <span className="flex items-center">
                              <FaUserCheck className="mr-2" />
                              Profile
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleLogoutClick}
                            className="block w-full text-center px-4 py-2 text-gray-700 hover:text-white hover:bg-heads"
                          >
                            <span className="flex items-center">
                              <RiLogoutCircleLine className="mr-2" />
                              Logout
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center bg-heads1 text-xl text-white font-bold px-4 py-2 rounded-lg shadow-lg"
                >
                  <RiLoginCircleLine className="text-2xl" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Login/Profile Button */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          {isAuthenticated ? (
            <>
              <button
                onClick={handleProfileClick}
                className="flex items-center bg-heads1 text-white font-bold px-4 py-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                {/* Show profile icon */}
                <AiOutlineUser className="text-2xl" />
                <span className="ml-2">{user.username}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 transform transition-all duration-300 scale-105">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={handleProfile}
                        className="block w-full px-4 py-2 text-gray-700 hover:text-white hover:bg-heads text-center"
                      >
                        <span className="flex items-center">
                          <FaUserCheck className="mr-2" />
                          Profile
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogoutClick}
                        className="block w-full px-4 py-2 text-gray-700 hover:text-white hover:bg-heads text-center"
                      >
                        <span className="flex items-center">
                          <RiLogoutCircleLine className="mr-2" />
                          Logout
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="flex items-center bg-heads1 text-xl text-white font-bold px-4 py-2 rounded-lg shadow-lg"
            >
              <RiLoginCircleLine className="text-2xl" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
