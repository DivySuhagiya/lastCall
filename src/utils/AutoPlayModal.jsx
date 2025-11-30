import React from "react";

const AutoPlayModal = ({ onEnable, onClose }) => {
	const gameFont = "'Special Elite', monospace";

	return (
		<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
			<div
				className="bg-gray-900 border-2 border-indigo-500 rounded-lg shadow-2xl p-8 max-w-md w-full"
				style={{ fontFamily: gameFont }}
			>
				<h3 className="text-3xl text-indigo-300 font-bold text-center tracking-wider mb-6">
					Enable Audio?
				</h3>
				<p className="text-white/80 text-center text-lg mb-8">
					Your browser has blocked the audio. Would you like to enable the
					background music?
				</p>
				<div className="flex justify-center gap-6">
					<button
						onClick={onClose}
						className="bg-black/30 backdrop-blur-sm border border-white/20 text-white 
                       px-8 py-3 rounded-lg text-xl font-bold tracking-wider
                       hover:bg-gray-700
                       transition-all duration-300"
					>
						No
					</button>
					<button
						onClick={onEnable}
						className="bg-indigo-600 text-white 
                       px-8 py-3 rounded-lg text-xl font-bold tracking-wider
                       hover:bg-indigo-700
                       transition-all duration-300"
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

export default AutoPlayModal;
