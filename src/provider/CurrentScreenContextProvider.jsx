// src/context/CurrentScreenProvider.jsx
import React, { useState } from "react";
import { CurrentScreenContext } from "../context/CurrentScreenContext";

export const CurrentScreenContextProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("start");

  return (
    <CurrentScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};
