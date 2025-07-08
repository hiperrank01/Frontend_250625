import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full py-4">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};
