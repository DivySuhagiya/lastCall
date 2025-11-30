import { useEffect, useState } from "react";
import { SuspectList, GeneralDetails } from "../../../utils/TabList";

const SuspectScreenLeft = ({ onSelect, onInterrogationStart }) => {
	const gameFont = "'Special Elite', monospace";

	const [selectedTabId, setSelectedTabId] = useState(GeneralDetails.Id);

	const handleSelect = (suspect) => {
		setSelectedTabId(suspect.Id);
	};

	useEffect(() => {
		const generalDetails = GeneralDetails;
		onSelect(generalDetails);
	}, []);

	return (
		<>
			<div className="w-full md:w-1/3 lg:w-1/4 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex flex-col h-full max-h-[90vh]">
				{/* General Details */}
				<h2
					className="text-3xl font-bold text-indigo-300 text-center mb-6 tracking-widest"
					style={{ fontFamily: gameFont }}
				>
					GENERAL DETAILS
				</h2>

				<button
					onClick={() => {
						onSelect(GeneralDetails);
						handleSelect(GeneralDetails);
					}}
					className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
						selectedTabId === GeneralDetails.Id
							? "bg-indigo-600/50 border-indigo-400 shadow-lg"
							: "bg-gray-800/60 border-gray-700 hover:bg-gray-700/80 hover:border-gray-500"
					}`}
				>
					<h3
						className="text-xl font-bold text-white"
						style={{ fontFamily: gameFont }}
					>
						General Details
					</h3>
				</button>

				{/* Suspect List */}
				<h2
					className="text-3xl font-bold text-indigo-300 text-center mb-6 tracking-widest mt-4"
					style={{ fontFamily: gameFont }}
				>
					SUSPECTS
				</h2>
				<ul className="space-y-2 overflow-y-auto grow">
					{SuspectList.map((suspect) => {
						const isSelected = selectedTabId === suspect.Id;
						return (
							<li key={suspect.Id}>
								<button
									onClick={() => {
										onSelect(suspect);
										handleSelect(suspect);
									}}
									className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
										isSelected
											? "bg-indigo-600/50 border-indigo-400 shadow-lg"
											: "bg-gray-800/60 border-gray-700 hover:bg-gray-700/80 hover:border-gray-500"
									}`}
								>
									<h3
										className="text-xl font-bold text-white"
										style={{ fontFamily: gameFont }}
									>
										{suspect.Nickname}
									</h3>
									<p className="text-sm text-gray-300">{suspect.Role}</p>
								</button>
							</li>
						);
					})}
				</ul>

				<button
					type="button"
					onClick={onInterrogationStart}
					className="mt-4 w-full text-center bg-gray-700/80 hover:bg-gray-600/80 text-indigo-300 py-3 rounded-lg"
					style={{ fontFamily: gameFont }}
				>
					Start Interrogation
				</button>
			</div>
		</>
	);
};

export default SuspectScreenLeft;
