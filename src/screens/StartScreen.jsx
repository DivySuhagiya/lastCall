import React, { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { CurrentScreenContext } from "../context/CurrentScreenContext";
import SuspectScreen from "./SuspectScreen";
import InterrogationScreen from "./InterrogationScreen";
import BackgroundMusic from "../components/BackgroundMusic";

const StartScreen = () => {
	const { loading, setLoading } = useContext(LoadingContext);
	const { currentScreen, setCurrentScreen } = useContext(CurrentScreenContext);

	const gameFont = "'Special Elite', monospace";

	const handleStartGame = () => {
		setLoading(true);
		setTimeout(() => {
			setCurrentScreen("suspectScreen");
			setLoading(false);
		}, 1000);
	};

	return (
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
                       transition-all duration-300 ease-in-out transform hover:scale-105"
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
