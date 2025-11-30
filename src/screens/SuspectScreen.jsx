import React, { useContext, useState } from "react";
import SuspectScreenLeft from "../components/screens/SuspectScreen/SuspectScreenLeft";
import { SelectedSuspectContext } from "../context/SelectedSuspectContext";
import InterrogationScreen from "./InterrogationScreen";
import SuspectScreenRight from "../components/screens/SuspectScreen/SuspectScreenRight";
import { CurrentScreenContext } from "../context/CurrentScreenContext";

const SuspectScreen = () => {
	const { setSelectedSuspect } = useContext(SelectedSuspectContext);
	const { currentScreen, setCurrentScreen } = useContext(CurrentScreenContext);

	const [tabDetail, setTabDetail] = useState({});

	const handleTabSelection = (detail) => {
		setTabDetail(detail);
	};

	const handleInterrogationStart = () => {
		setSelectedSuspect({
			id: 1,
			nickname: "Amelia",
			name: "Amelia Von Hess",
			role: "Victim's new wife",
		});
		console.log("handleInterrogationStart");
		setCurrentScreen("interrogationScreen");
	};

	return (
		<>
			{currentScreen === "suspectScreen" && (
				<div className="h-screen w-screen p-4 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 bg-[url('/LastCall_BG.png')] bg-cover bg-center">
					<SuspectScreenLeft
						onSelect={handleTabSelection}
						onInterrogationStart={handleInterrogationStart}
					/>

					<div className="w-full md:w-2/3 lg:w-3/4 flex items-center justify-center h-full">
						<SuspectScreenRight tabDetail={tabDetail} />
					</div>
				</div>
			)}
		</>
	);
};

export default SuspectScreen;
