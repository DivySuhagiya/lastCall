import React, { useState } from "react";
import { LoadingContext } from "../context/LoadingContext";

export const LoadingContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};
