//context providers
import { CurrentScreenContextProvider } from "./provider/CurrentScreenContextProvider";
import { KillerContextProvider } from "./provider/KillerContextProvider";
import { LoadingContextProvider } from "./provider/LoadingContextProvider";
import { SelectedSuspectContextProvider } from "./provider/SelectedSuspectContextProvider";

//screens
import StartScreen from "./screens/StartScreen";
import { Lipsync } from "wawa-lipsync";

export const lipsyncManager = new Lipsync({});

const App = () => {
	return (
		<>
			<CurrentScreenContextProvider>
				<KillerContextProvider>
					<SelectedSuspectContextProvider>
						<LoadingContextProvider>
							<StartScreen />
						</LoadingContextProvider>
					</SelectedSuspectContextProvider>
				</KillerContextProvider>
			</CurrentScreenContextProvider>
		</>
	);
};

export default App;
