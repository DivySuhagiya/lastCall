import { useContext, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, VolumeIcon } from "../utils/Svg";
import { SelectedSuspectContext } from "../context/SelectedSuspectContext";
import AutoPlayModal from "../utils/AutoPlayModal";

const BackgroundMusic = () => {
	//--Selected Suspect Context
	const { selectedSuspect } = useContext(SelectedSuspectContext);

	// --- Audio ---
	const audioSrc = "/audios/intro.mp3";
	// ---

	// State for audio
	const [isPlaying, setIsPlaying] = useState(true);
	const [volume, setVolume] = useState(0.5); // Default volume 50%
	const audioRef = useRef(null);

	// --- NEW STATE for autoplay modal ---
	const [showAutoplayModal, setShowAutoplayModal] = useState(false);

	// Audio play/pause handler
	const togglePlayPause = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current
				.play()
				.catch((e) => console.error("Audio play failed:", e));
		}
	};

	// Volume change handler
	const handleVolumeChange = (e) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		audioRef.current.volume = newVolume;
	};

	// --- NEW Handler to enable audio from modal ---
	const handleEnableAudio = () => {
		audioRef.current
			.play()
			.catch((e) => console.error("Audio play failed again:", e));
		// onPlay event will set isPlaying(true)
		setShowAutoplayModal(false);
	};

	// Effect to set initial volume when audio element is ready
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;

			if (isPlaying) {
				const playPromise = audioRef.current.play();
				if (playPromise !== undefined) {
					playPromise.catch((error) => {
						// Autoplay was prevented.
						console.warn("Audio autoplay failed:", error);
						setIsPlaying(false);
						// Check if it's the specific error for autoplay policy
						if (error.name === "NotAllowedError") {
							setShowAutoplayModal(true); // Show modal
						}
					});
				}
			}
		}
	}, []);

	//Pause music when suspect is selected
	useEffect(() => {
		if (selectedSuspect) {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	}, [selectedSuspect]);

	return (
		<>
			{/* --- NEW: Render the modal if showAutoplayModal is true --- */}
			{showAutoplayModal && (
				<AutoPlayModal
					onEnable={handleEnableAudio}
					onClose={() => {
						setShowAutoplayModal(false);
						console.log("Modal closed by user");
					}}
				/>
			)}

			<style>
				{`/* Simple styling for the range input */
          input[type=range] {
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            cursor: pointer;
          }
          input[type=range]:focus {
            outline: none;
          }
          /* Thumb */
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            background-color: #fff;
            border-radius: 50%;
            margin-top: -6px; /* Center thumb on track */
          }
          input[type=range]::-moz-range-thumb {
            height: 16px;
            width: 16px;
            background-color: #fff;
            border-radius: 50%;
            border: none;
          }
          /* Track */
          input[type=range]::-webkit-slider-runnable-track {
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
          }
          input[type=range]::-moz-range-track {
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
          }`}
			</style>

			<audio
				ref={audioRef}
				src={audioSrc}
				loop
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onEnded={() => setIsPlaying(false)} // Sync state if music ends
			/>

			<div className="absolute top-8 right-8 flex items-center gap-4 z-20">
				{/* Play/Pause Button */}
				<button
					onClick={togglePlayPause}
					className="bg-black/30 backdrop-blur-sm border border-white/20 text-white/70 rounded-full p-3 
                       hover:bg-white/20 hover:text-white transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-white/50"
					aria-label={isPlaying ? "Pause music" : "Play music"}
				>
					{isPlaying ? <PauseIcon /> : <PlayIcon />}
				</button>

				{/* Volume Controls */}
				<div className="flex items-center group">
					<VolumeIcon />
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						value={volume}
						onChange={handleVolumeChange}
						className="w-0 opacity-0 transition-all duration-300 ease-in-out 
                         group-hover:w-24 group-hover:opacity-100
                         ml-2"
						aria-label="Volume control"
					/>
				</div>
			</div>
		</>
	);
};

export default BackgroundMusic;
