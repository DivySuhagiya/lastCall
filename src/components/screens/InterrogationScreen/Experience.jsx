import { Environment, OrbitControls } from "@react-three/drei";
import { Amelia } from "./Avatars/Amelia";
import { Room } from "./Room/Room";
import { Lucian } from "./Avatars/Lucian";
import { Sebastian } from "./Avatars/Sebastian";
import { useContext, useEffect, useState } from "react";
import { SelectedSuspectContext } from "../../../context/SelectedSuspectContext";
import { SuspectNavigationButtons } from "../../3d/SuspectNavigationButtons";

export const Experience = ({ text }) => {
	const { selectedSuspect, setSelectedSuspect } = useContext(
		SelectedSuspectContext
	);
	console.log("text from experience", text);

	const [aiResponse, setAiResponse] = useState("");

	useEffect(() => {
		if (text) {
			setAiResponse(text);
		}
	}, [text]);

	const suspects = [
		{ nickname: "Dr. Lucian", component: Lucian },
		{ nickname: "Amelia", component: Amelia },
		{ nickname: "Sebastian", component: Sebastian },
	];

	const currentIndex = suspects.findIndex(
		(s) => s.nickname === selectedSuspect.nickname
	);

	const handleNext = () => {
		const nextIndex = (currentIndex + 1) % suspects.length;
		setSelectedSuspect(suspects[nextIndex]);
	};

	const handlePrevious = () => {
		const prevIndex = (currentIndex - 1 + suspects.length) % suspects.length;
		setSelectedSuspect(suspects[prevIndex]);
	};

	// Get current avatar component
	const CurrentAvatar = suspects[currentIndex]?.component || Amelia;

	return (
		<>
			<Room position={[-0.08, -1, -0.05]} />

			<CurrentAvatar
				key={selectedSuspect.nickname}
				position={[2.51, -2.3, 0.6]}
				scale={1.5}
				rotation={[0, -Math.PI / 2, 0]}
				text={aiResponse}
			/>

			<SuspectNavigationButtons
				onNext={handleNext}
				onPrevious={handlePrevious}
				currentSuspect={selectedSuspect.nickname}
			/>

			<Environment preset="sunset" />
		</>
	);
};
