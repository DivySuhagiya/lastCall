// src/context/CurrentScreenProvider.jsx
import React, { useState } from "react";
import { CurrentScreenContext } from "../context/CurrentScreenContext";

export const CurrentScreenProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("start");

  // helpful debug log (remove in production)
  console.log("CurrentScreenProvider render:", currentScreen);

  return (
    <CurrentScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};
