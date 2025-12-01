export const GeneralDetails = {
	Id: "General_Details",
	IncidentDate: "November 26, 2025",
	IncidentLocation: "The Von Hess Estate, Private Wine Cellar",
	Victim: "Baron Alistair Von Hess (Age 68)",
	CauseOfDeath: "Disputed (Toxicology & Autopsy Pending)",
	TimeOfDeath: "Approx. 9:00 PM",
	MissionBriefing:
		"The Baron was found dead on chair. The physical evidence is confusing—conflicting clues point in different directions. You must interrogate the suspects to find the contradiction.",
	Accusation:
		"You have one round to interrogate the suspects, review the evidence, and make your accusation. Be careful: the killer is lying, but the evidence never lies... if you read it correctly.",
};

export const SuspectList = [
	{
		Id: 1,
		Nickname: "Amelia",
		Name: "Amelia Von Hess",
		Role: "The Trophy Wife",
		Relationship: "Married to the Baron for 18 months.",
		Profile: "Former Art Historian. Young, poised, and pragmatically cold.",
		Hobbies: "Antique jewelry, Classical piano, Ignoring her stepson.",
		PrimaryInvestigation:
			"Admitted to serving the wine at 8:15 PM. claims she went straight to her room.",
	},
	{
		Id: 2,
		Nickname: "Lucian",
		Name: "Dr. Lucian",
		Role: "The Desperate Physician",
		Relationship: "The Baron's oldest friend and personal doctor.",
		Profile:
			"Intellectual, pompous, and visibly anxious. Over-explains medical details.",
		Hobbies: "Toxicology, Latin translation, Gambling (badly).",
		PrimaryInvestigation:
			"Found the body at 8:50 PM. Claims he tried to save him but couldn't.",
	},
	{
		Id: 3,
		Nickname: "Sebastian",
		Name: "Sebastian Von Hess",
		Role: "The Estranged Son",
		Relationship: "Disowned son. Hated his father, but needed his money.",
		Profile:
			"Volatile, aggressive, and sarcastic. Wears heavy gardening boots.",
		Hobbies: "Landscape sketching, Nightshade cultivation, Drinking.",
		PrimaryInvestigation:
			"Admitted to shouting at the Baron at 8:30 PM. Claims he left him alive and angry.",
	},
];
