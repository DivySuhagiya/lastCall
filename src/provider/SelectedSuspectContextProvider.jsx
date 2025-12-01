import React, { useState } from "react";
import { SelectedSuspectContext } from "../context/SelectedSuspectContext";

export const SelectedSuspectContextProvider = ({ children }) => {
	const [selectedSuspect, setSelectedSuspect] = useState("");

	return (
		<SelectedSuspectContext.Provider
			value={{ selectedSuspect, setSelectedSuspect }}
		>
			{children}
		</SelectedSuspectContext.Provider>
	);
};
