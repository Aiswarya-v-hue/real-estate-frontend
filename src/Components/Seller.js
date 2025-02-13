import React, { useState } from "react";
import houseImg from "../images/sellerhomeimg.png"; // Ensure the path is correct
import "../Styles/sellerform.css"; // Import custom styles

function Seller() {
  const [activeTab, setActiveTab] = useState("tenants");

  const tabContent = {
    tenants: {
      title: "We make it easy for tenants and landlords.",
      description:
        "Whether it’s selling your current home, getting financing, or buying a new home, we make it easy and efficient. The best part? You’ll save a bunch of money and time with our services.",
    },
    landlords: {
      title: "We make it easy for tenants and landlords.",
      description:
        "List your property and connect with verified tenants instantly. Enjoy an easy, secure, and fast process with our platform.",
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 text-center">
        
        {/* Image Section with Floating Text */}
        <div className="home-container">
          <img src={houseImg} alt="House" className="home-image" />
          <div className="overlay-box">
            <span className="title">Find the best deal</span>
            <p className="subtitle">Browse thousands of properties</p>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="arrange">
          <div className="buttdesign">
        <div className="button">
          {["tenants", "landlords"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "tenants" ? "For tenants" : "For landlords"}
            </button>
          ))}
        </div>
        </div>

        {/* Content Section */}
        <h2 className="text-xl font-bold text-gray-900">{tabContent[activeTab].title}</h2>
        <p className="text-gray-600 mt-2">{tabContent[activeTab].description}</p>

        {/* Button */}
        <button className="mt-4 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300">
          See more →
        </button>
      </div>
      </div>
    </div>

  );
}

export default Seller;
