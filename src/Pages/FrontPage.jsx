import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner"; // Import the ThreeCircles component
import { SiIfood } from "react-icons/si"; // Import the SiIfood icon

const FrontPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [imageLoading, setImageLoading] = useState(true); // State to track image loading

  // Effect to simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an API call delay
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      navigate("/recipe");
    }, 1000);
    return () => clearTimeout(timeoutId); // Cleanup
  };

  const handleImageLoad = () => {
    setImageLoading(false); // Set image loading to false when the image is loaded
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lavender p-8">
      {loading ? ( // Show spinner while loading
        <div className="flex items-center justify-center min-h-screen">
          <ThreeCircles
            height="100"
            width="100"
            color="#D6883C"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container mx-auto flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Left Side - Text Content */}
          <div className="flex-1 p-8 text-left shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <h1 className="text-5xl font-bold text-rose mb-6">
              Discover Delicious Recipes for Every Occasion
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              Welcome to our culinary haven! Here, you’ll find a collection of
              delightful recipes that are easy to follow and bursting with
              flavor. Whether you're a beginner or a seasoned chef, there's
              something for everyone.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              From quick weeknight dinners to elegant dishes for special
              occasions, our recipes are designed to inspire creativity in the
              kitchen. Get ready to impress your family and friends with meals
              that not only taste great but also look stunning!
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Explore our categories to find your next favorite dish, and don't
              forget to upload your own recipes to share your culinary creations
              with the community!
            </p>

            <div className="mt-5 flex items-center justify-center">
              <button
                className={`text-white text-2xl bg-heads1 hover:bg-heads font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-rosy"
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onClick={handleClick}
                disabled={loading} // Disable the button if loading
              >
                <SiIfood className="inline mr-2" /> {/* Icon before text */}
                {loading ? "Navigating..." : "Explore Recipes"}
              </button>
            </div>
          </div>

          {/* Right Side - Image Content */}
          <div className="flex-1 p-5 flex justify-center items-center">
            {imageLoading && (
              <div className="flex items-center justify-center min-h-screen">
                <ThreeCircles
                  height="100"
                  width="100"
                  color="#D6883C"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            <img
              src="https://i.pinimg.com/236x/3d/3f/a7/3d3fa79abc94829244006cbda86c0473.jpg"
              alt="Recipe Illustration"
              className={`w-full md:w-2/4 h-auto object-cover rounded-r-xl shadow-xl transition-transform duration-300 transform hover:scale-105 ${
                imageLoading ? "hidden" : "block"
              }`} // Make image responsive
              onLoad={handleImageLoad} // Set image loading to false on load
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
