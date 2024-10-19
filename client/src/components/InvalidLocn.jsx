import React from "react";

const ErrorCard = ({ message }) => {
  return (
    <div className="h-screen bg-blue-950">
      <header className="pt-8 pl-8">
        {/* <h1 className="text-3xl font-bold text-white">Treasure Hunt</h1> */}
        <h1 className="text-3xl font-bold mb-4 text-white">Treasure Hunt Event</h1>
      </header>
      <div className="flex items-center justify-center h-5/6">
        <div className="bg-red-700 text-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-xl">{message}</p>
        </div>
      </div>
      <footer className="text-center bg-blue-950 text-white p-1">
        <p>2024 Treasure Hunt</p>
      </footer>
    </div>
  );
};

const ErrorMsg = () => {
  return (
    <ErrorCard message="You are at the wrong checkpoint or missed a hint!" />
  );
};

export default ErrorMsg;
