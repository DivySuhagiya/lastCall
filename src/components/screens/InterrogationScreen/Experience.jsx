import { Environment } from "@react-three/drei";
import { Amelia } from "./Avatars/Amelia";
import { Room } from "./Room/Room";
import { useContext, useEffect, useState } from "react";
import { SelectedSuspectContext } from "../../../context/SelectedSuspectContext";
import { SuspectNavigationButtons } from "../../3d/SuspectNavigationButtons";
import { CreateSession_API, EndSession_API } from "../../../api/Agent-api";
import { CurrentStoryContext } from "../../../context/CurrentStoryContext";
import { getSuspectListFromStory } from "../../../utils/TabList";

export const Experience = ({ text }) => {
	const { selectedSuspect, setSelectedSuspect } = useContext(
		SelectedSuspectContext
	);

	const { currentStory } = useContext(CurrentStoryContext);

	const [aiResponse, setAiResponse] = useState("");
	const [sessionId, setSessionId] = useState(null);
	const [userId, setUserId] = useState(null);

	const suspects = getSuspectListFromStory(currentStory);

	const createSession = async () => {
		const res = await CreateSession_API();
		setSessionId(res.session_id);
		setUserId(res.user_id);
	};

	const handleEndSession = async () => {
		const res = await EndSession_API({ sessionId: sessionId, userId: userId });
		console.log(res);
	};

	useEffect(() => {
		if (text) {
			setAiResponse(text);
		}
	}, [text]);

	const currentIndex = suspects.findIndex(
		(s) => s.Nickname === selectedSuspect.Nickname
	);

	const handleNext = () => {
		const nextIndex = (currentIndex + 1) % suspects.length;
		setSelectedSuspect(suspects[nextIndex]);
		handleEndSession();
	};

	const handlePrevious = () => {
		const prevIndex = (currentIndex - 1 + suspects.length) % suspects.length;
		setSelectedSuspect(suspects[prevIndex]);
		handleEndSession();
	};

	// Get current avatar component
	const CurrentAvatar = suspects[currentIndex]?.component || Amelia;

	useEffect(() => {
		createSession();
	}, [CurrentAvatar]);

	return (
		<>
			<Room position={[-0.08, -1, -0.05]} />

			<CurrentAvatar
				key={selectedSuspect.Nickname}
				position={[2.51, -2.3, 0.6]}
				scale={1.5}
				rotation={[0, -Math.PI / 2, 0]}
				text={aiResponse}
				sessionId={sessionId}
				userId={userId}
				instruction={selectedSuspect.instruction}
				character_name={selectedSuspect.Nickname}
				victim_name={currentStory?.generated_story.victim}
			/>

			<SuspectNavigationButtons
				onNext={handleNext}
				onPrevious={handlePrevious}
				currentSuspect={selectedSuspect.Nickname}
			/>

			<Environment preset="sunset" />
		</>
	);
};
