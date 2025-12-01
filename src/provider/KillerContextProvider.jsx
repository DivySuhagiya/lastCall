import { useState } from "react";
import { KillerContext } from "../context/KillerContext";

export const KillerContextProvider = ({ children }) => {
	const [killer, setKiller] = useState(null);

	return (
		<KillerContext.Provider
			value={{
				killer,
				setKiller,
			}}
		>
			{children}
		</KillerContext.Provider>
	);
};
