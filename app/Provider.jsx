import React from "react";
import Header from "./components/Header";

const Provider = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Provider;
