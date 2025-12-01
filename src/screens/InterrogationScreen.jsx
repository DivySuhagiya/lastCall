import { useContext, useEffect, useState } from "react";

import EvidenceScreen from "../components/screens/InterrogationScreen/EvidenceScreen";
import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/screens/InterrogationScreen/Experience";
import { Loader } from "lucide-react";
import Voice_activity_detector from "../utils/Voice_activity_detector";
import { SelectedSuspectContext } from "../context/SelectedSuspectContext";
import { LoadingContext } from "../context/LoadingContext";
import { useProgress } from "@react-three/drei";
import { SuspectList } from "../utils/TabList";
import { KillerContext } from "../context/KillerContext";

const gameFont = "'Special Elite', monospace";

const InterrogationScreen = () => {
	const [evidenceScreen, setEvidenceScreen] = useState(false);
	const [transcript, setTranscript] = useState("");

	const { selectedSuspect } = useContext(SelectedSuspectContext);
	const { killer } = useContext(KillerContext);

	const { loading } = useContext(LoadingContext);

	const [userSelectedKiller, setUserSelectedKiller] = useState(null);

	const handleStart = () => {
		window.location.reload();
	};

	const checkKiller = (suspect) => {
		setUserSelectedKiller(suspect);
	};

	const CustomLoader = () => {
		return (
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<Loader className="w-12 h-12 text-white animate-spin" />
					<p className="text-white text-lg font-semibold">
						Loading {selectedSuspect.nickname}...
					</p>
				</div>
			</div>
		);
	};

	function LoaderWrapper() {
		const { active } = useProgress();
		const [isLoading, setIsLoading] = useState(true);

		useEffect(() => {
			if (active) {
				setIsLoading(true);
			} else {
				const timer = setTimeout(() => setIsLoading(false), 100);
				return () => clearTimeout(timer);
			}
		}, [active]);

		return (
			<div
				className={`${
					isLoading
						? "opacity-100 bg-transparent"
						: "pointer-events-none opacity-0"
				}`}
			>
				<CustomLoader />
			</div>
		);
	}


	useEffect(() => {
		setTranscript("");
	}, [selectedSuspect]);

	const handleEvidenceScreen = () => {
		setEvidenceScreen(false);
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!e.shiftKey) return;

			if (e.key === "e" || e.key === "E") {
				setEvidenceScreen((prev) => !prev);
			}
		};

		// Add event listener to window
		window.addEventListener("keydown", handleKeyDown);

		// Cleanup function to remove listener
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
	return (
		<>
			<div className="relative h-screen">
				<Canvas
					camera={{
						position: [-0.5, 0, 0.67],
						rotation: [0, -Math.PI / 2, 0],
						rotateOnAxis: [10, 0, 0],
						fov: 30,
					}}
				>
					<color attach="background" args={["#ececec"]} />
					<Experience text={transcript} key={selectedSuspect.nickname} />
				</Canvas>

				{loading && <CustomLoader />}

				{evidenceScreen && (
					<div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-20">
						<EvidenceScreen onClose={handleEvidenceScreen} />
					</div>
				)}

				<div className="absolute bottom-10 left-0 right-0 z-10">
					<Voice_activity_detector
						onTranscriptComplete={(value) => setTranscript(value)}
					/>
				</div>

				<div className="w-full md:w-1/4 lg:w-1/6 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex flex-col h-full max-h-[50vh] absolute z-10 top-10 right-10 gap-2">
					<h2
						className="text-3xl font-bold text-indigo-300 text-center mb-6 tracking-widest"
						style={{ fontFamily: gameFont }}
					>
						Select Killer
					</h2>
					{SuspectList.map((suspect) => (
						<button
							key={suspect.Id}
							className="w-full text-left p-4 rounded-lg transition-all duration-200 border-2 bg-gray-800/60 border-gray-700 hover:bg-gray-700/80 hover:border-gray-500"
							onClick={() => checkKiller(suspect.Nickname)}
						>
							<h3
								className="text-xl font-bold text-white"
								style={{ fontFamily: gameFont }}
							>
								{suspect.Nickname}
							</h3>
						</button>
					))}
				</div>

				{userSelectedKiller && (
					<div className="z-10 absolute top-0 left-0 h-screen w-screen p-4 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 bg-[url('/LastCall_BG.png')] bg-cover bg-center">
						<div className="flex justify-center items-center mt-[20%] flex-col gap-20">
							<h1
								className="text-2xl sm:text-7xl md:text-8xl font-bold text-white"
								style={{
									fontFamily: gameFont,
									textShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
								}}
							>
								{userSelectedKiller === killer
									? "You Won 🏅"
									: "You Lost 🤙"}
							</h1>

							<button
								className="bg-black/30 backdrop-blur-sm border border-white/20 text-white 
							px-10 py-4 rounded-lg text-2xl font-bold tracking-wider
                       uppercase shadow-lg shadow-black/50
                       hover:bg-white hover:text-black hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-white/50
                       transition-all duration-300 ease-in-out transform hover:scale-105"
								onClick={handleStart}
								style={{ fontFamily: gameFont }}
								disabled={loading}
							>
								HomePage
							</button>
						</div>
					</div>
				)}
			</div>
			<LoaderWrapper />
		</>
	);
};

export default InterrogationScreen;
