/* eslint-disable no-unused-vars */

import React, { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { CurrentScreenContext } from "../context/CurrentScreenContext";
import SuspectScreen from "./SuspectScreen";
import InterrogationScreen from "./InterrogationScreen";
import BackgroundMusic from "../components/BackgroundMusic";
import { CreateSession_API, CreateStory_API } from "../api/Agent-api";
import { CurrentStoryContext } from "../context/CurrentStoryContext";
import { Loader } from "lucide-react";

const StartScreen = () => {
	const { loading, setLoading } = useContext(LoadingContext);
	const { currentScreen, setCurrentScreen } = useContext(CurrentScreenContext);
	const { setCurrentStory } = useContext(CurrentStoryContext);

	const [sessionId, setSessionId] = useState("");
	const [userId, setUserId] = useState("");
	const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

	const gameFont = "'Special Elite', monospace";

	const initializingMessages = [
		"Initializing Story...",
		"Initializing Suspects...",
		"Generating Evidence...",
	];

	// Cycle through loading messages
	useEffect(() => {
		if (!loading) {
			setCurrentMessageIndex(0);
			return;
		}

		const interval = setInterval(() => {
			setCurrentMessageIndex(
				(prevIndex) => (prevIndex + 1) % initializingMessages.length
			);
		}, 1500); // Change message every 1.5 seconds

		return () => clearInterval(interval);
	}, [loading, initializingMessages.length]);

	const handleStartGame = async () => {
		setLoading(true);
		setCurrentMessageIndex(0);

		try {
			const res = await CreateSession_API();
			setSessionId(res.session_id);
			setUserId(res.user_id);

			const story = await CreateStory_API({
				sessionId: res.session_id,
				userId: res.user_id,
			});

			console.log(story);
			setCurrentStory(story);

			setTimeout(() => {
				setCurrentScreen("suspectScreen");
				setLoading(false);
			}, 1000);
		} catch (error) {
			console.error("Error starting game:", error);
			setLoading(false);
		}
	};

	return loading ? (
		<div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<Loader className="w-12 h-12 text-white animate-spin" />
				<p
					className="text-white text-lg font-semibold animate-pulse"
					style={{ fontFamily: gameFont }}
				>
					{initializingMessages[currentMessageIndex]}
				</p>
			</div>
		</div>
	) : (
		<>
			{currentScreen !== "interrogationScreen" && <BackgroundMusic />}

			{currentScreen === "start" && (
				<div className="h-screen w-screen text-white flex flex-col justify-between items-center p-8 sm:p-12 bg-[url('/LastCall_BG.png')] bg-cover bg-center">
					{/* Top Text */}
					<h1
						className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-center"
						style={{
							fontFamily: gameFont,
							textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
						}}
					>
						YOUR CONFESSION BEGINS.
					</h1>

					{/* Game Title */}
					<div className="text-center">
						<h1
							className="text-2xl sm:text-7xl md:text-8xl font-bold text-white"
							style={{
								fontFamily: gameFont,
								textShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
							}}
						>
							Last Call
						</h1>
					</div>

					{/* Start Game Button */}
					<div className="text-center">
						<button
							className="bg-black/30 backdrop-blur-sm border border-white/20 text-white 
                       px-10 py-4 rounded-lg text-2xl font-bold tracking-wider
                       uppercase shadow-lg shadow-black/50
                       hover:bg-white hover:text-black hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-white/50
                       transition-all duration-300 ease-in-out transform hover:scale-105
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
							onClick={handleStartGame}
							style={{ fontFamily: gameFont }}
							disabled={loading}
						>
							Start Game
						</button>
					</div>
				</div>
			)}

			{/* Suspect Screen */}
			{currentScreen === "suspectScreen" && <SuspectScreen />}

			{/* Interrogation Screen */}
			{currentScreen === "interrogationScreen" && <InterrogationScreen />}
		</>
	);
};

export default StartScreen;
