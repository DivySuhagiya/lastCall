const SuspectScreenRight = ({ tabDetail }) => {
	const gameFont = "'Special Elite', monospace";

	return (
		<div
			className="w-full max-w-lg h-[90vh] max-h-[700px] bg-black/70 backdrop-blur-md 
                 border border-gray-600 rounded-3xl shadow-2xl 
                 flex flex-col overflow-hidden"
		>
			{/* General Details */}

			{tabDetail.Id === "general" && (
				<>
					<div className="bg-gray-800/80 p-4 border-b border-gray-700">
						<h3
							className="text-xl font-bold text-center text-white"
							style={{ fontFamily: gameFont }}
						>
							General Details
						</h3>
					</div>

					<div className="grow p-4 overflow-y-auto space-y-4">
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							Victim: {tabDetail.victim}
						</p>
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							Location: {tabDetail.location}
						</p>
					</div>
				</>
			)}

			{tabDetail.Id !== "general" && (
				<>
					<div className="bg-gray-800/80 p-4 border-b border-gray-700">
						<h3
							className="text-xl font-bold text-center text-white"
							style={{ fontFamily: gameFont }}
						>
							General Details of {tabDetail.Nickname}
						</h3>
					</div>

					<div className="grow p-4 overflow-y-auto space-y-4">
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							{tabDetail.Name}
						</p>
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							{tabDetail.Role}
						</p>
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							{tabDetail.Relationship}
						</p>
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							{tabDetail.Profile}
						</p>
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							{tabDetail.Hobbies}
						</p>
						<p className="text-lg text-white" style={{ fontFamily: gameFont }}>
							{tabDetail.PrimaryInvestigation}
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default SuspectScreenRight;
