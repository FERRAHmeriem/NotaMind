"use client";
import { useEffect, useState } from "react";

export default function ResponsiveGuard({ children }) {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 1024) {
        // anything smaller than "laptop"
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isAllowed) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center p-6 bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Not Available</h1>
          <p className="text-gray-600">
            The mobile/tablet version of this website is not available yet.  
            Please use a laptop or desktop.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
