//context providers
import { CurrentScreenContextProvider } from "./provider/CurrentScreenContextProvider";
import { CurrentStoryContextProvider } from "./provider/CurrentStoryContextProvider";
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
				<CurrentStoryContextProvider>
					<SelectedSuspectContextProvider>
						<LoadingContextProvider>
							<StartScreen />
						</LoadingContextProvider>
					</SelectedSuspectContextProvider>
				</CurrentStoryContextProvider>
			</CurrentScreenContextProvider>
		</>
	);
};

export default App;
