export const GeneralDetails = {
	Id: "General_Details",
	IncidentDate: "October 26, 2025",
	IncidentLocation: "The Von Hess Estate, Private Wine Cellar",
	Victim: "Baron Alistair Von Hess (Age 68)",
	CauseOfDeath: "Poisoning (Acute Nightshade Intoxication)",
	TimeOfDeath: "Approx. 9:00 PM",
	MissionBriefing:
		"The Baron was found dead in his locked wine cellar following a private tasting. Three individuals were present with him. Security logs confirm no one else entered or left. One of them is the killer.",
	Accusation:
		"You have one round to interrogate the suspects, review the evidence, and make your accusation.",
};

export const SuspectList = [
	{
		Id: 1,
		Nickname: "Amelia",
		Name: "Amelia Von Hess",
		Role: "Victim's new wife",
		Relationship: "Married to the Baron for 18 months.",
		Profile: "Former Art Historian. Young, poised, and pragmatic.",
		Hobbies:
			"Collector of antique jewelry. Classical pianist. Rarely participates in outdoor activities; prefers the climate-controlled manor.",
		PrimaryInvestigation:
			"Seems cold, perhaps overwhelmed by the Baron's lifestyle",
	},
	{
		Id: 2,
		Nickname: "Lucian",
		Name: "Dr. Lucian",
		Role: "The Physician & Old Friend.",
		Relationship: "Known the Baron for 40 years. His personal doctor.",
		Profile: "Highly intellectual, pompous, and academically arrogant.",
		Hobbies:
			"Toxicology research. Translating Latin medical texts. Bird watching (strictly from the patio/balcony).",
		PrimaryInvestigation:
			"Seems anxious beneath the arrogance. Very defensive about his professional reputation.",
	},
	{
		Id: 3,
		Nickname: "Sebastian",
		Name: "Sebastian",
		Role: "The Estranged Son.",
		Relationship: "Only child. Disowned by the Baron multiple times.",
		Profile:
			"Volatile, artistic, and outdoorsy. Rejects the family's 'stuffy' lifestyle.",
		Hobbies:
			"Landscape sketching. Enthusiastic gardener (manages the estate's wilder grounds). Tracking local wildlife.",
		PrimaryInvestigation:
			"Known to wear heavy-tread hiking/gardening boots. Openly hostile towards his father.",
	},
];
