import { useState } from "react";

//context
import { SelectedSuspectContext } from "./context/SelectedSuspectContext";
import { LoadingContext } from "./context/LoadingContext";

//screens
import StartScreen from "./screens/StartScreen";

import { CurrentScreenProvider } from "./provider/CurrentScreenProvider";
import { Lipsync } from "wawa-lipsync";

export const lipsyncManager = new Lipsync({});

const App = () => {
	const [selectedSuspect, setSelectedSuspect] = useState("");
	const [loading, setLoading] = useState(false);

	return (
		<>
			<CurrentScreenProvider>
				<SelectedSuspectContext.Provider
					value={{ selectedSuspect, setSelectedSuspect }}
				>
					<LoadingContext.Provider value={{ loading, setLoading }}>
						<StartScreen />
					</LoadingContext.Provider>
				</SelectedSuspectContext.Provider>
			</CurrentScreenProvider>
		</>
	);
};

export default App;
