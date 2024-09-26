"use client";
import React from "react";
import { SpinnerCircularSplit } from "spinners-react"; // Install spinners-react package
import { useEffect } from "react";

const Loading = ({ message }) => {
  useEffect(() => {
    // Optional: Add any effect when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <SpinnerCircularSplit
        size={60}
        thickness={180}
        speed={100}
        color="rgba(76, 175, 80, 1)"
        secondaryColor="rgba(76, 175, 80, 0.3)"
      />
      <p className="mt-4 text-lg text-gray-600">
        {message || "Loading, please wait..."}
      </p>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default Loading;
