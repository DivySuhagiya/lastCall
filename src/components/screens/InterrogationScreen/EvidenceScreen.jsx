import React, { useContext, useState } from "react";
import { getEvidenceList } from "../../../utils/EvidenceList";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../utils/Svg";
import { CurrentStoryContext } from "../../../context/CurrentStoryContext";

const EvidenceScreen = ({ onClose }) => {
	const { currentStory } = useContext(CurrentStoryContext);

	const [selectedEvidenceIndex, setSelectedEvidenceIndex] = useState(0);
	let EvidenceList = getEvidenceList(currentStory);

	const selectedEvidence = EvidenceList[selectedEvidenceIndex];

	const handleNext = () => {
		setSelectedEvidenceIndex(
			(prevIndex) => (prevIndex + 1) % EvidenceList.length
		);
	};

	const handlePrev = () => {
		setSelectedEvidenceIndex(
			(prevIndex) => (prevIndex - 1 + EvidenceList.length) % EvidenceList.length
		);
	};

	const gameFont = "'Special Elite', monospace";

	return (
		<div className="h-screen w-screen p-4 sm:p-8 flex flex-col justify-center items-center gap-8">
			{/* Back Button */}
			<div className="w-full max-w-6xl flex justify-start">
				<button
					onClick={onClose}
					className="bg-gray-700/80 hover:bg-gray-600/80 text-indigo-300 py-3 px-6 rounded-lg"
					style={{ fontFamily: gameFont }}
				>
					&larr; Back to Investigation
				</button>
			</div>

			{/* Main Content Area */}
			<div className="w-full max-w-6xl h-[75vh] flex flex-col md:flex-row gap-6 p-6 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg">
				{/* Left Column: Image Carousel */}
				<div className="w-full md:w-3/5 h-full flex flex-col items-center justify-center bg-black/50 rounded-lg p-4">
					<div className="relative w-full h-full flex items-center justify-center">
						{/* Image */}
						<img
							src={selectedEvidence.imageUrl}
							alt={selectedEvidence.title}
							className="max-w-full max-h-full object-contain rounded-lg shadow-lg border-2 border-gray-700"
						/>
						{/* Prev Button */}
						<button
							onClick={handlePrev}
							className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white/70 hover:text-white hover:bg-black/80 rounded-full p-2 m-2 transition"
						>
							<ChevronLeftIcon />
						</button>
						{/* Next Button */}
						<button
							onClick={handleNext}
							className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white/70 hover:text-white hover:bg-black/80 rounded-full p-2 m-2 transition"
						>
							<ChevronRightIcon />
						</button>
					</div>
					<p
						className="text-gray-300 text-lg mt-4"
						style={{ fontFamily: gameFont }}
					>
						Evidence {selectedEvidenceIndex + 1} of {EvidenceList.length}
					</p>
				</div>

				{/* Right Column: Evidence Details */}
				<div className="w-full md:w-2/5 h-full bg-gray-800/60 border border-gray-700 rounded-lg p-6 overflow-y-auto">
					<h2
						className="text-4xl font-bold text-indigo-300 mb-6 tracking-wider"
						style={{ fontFamily: gameFont }}
					>
						{selectedEvidence.title}
					</h2>
					<p className="text-white/90 text-lg leading-relaxed">
						{selectedEvidence.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default EvidenceScreen;
