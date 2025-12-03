export const getEvidenceList = (currentStory) => {
	if (!currentStory?.generated_story?.character_details) {
		return [];
	}

	return currentStory.generated_story.evidences.map((evidence, index) => {
		const url = currentStory?.generated_story?.generated_image_urls?.urls.find(
			(url) => url.name === evidence.name
		);


		return {
			id: `evidence-${index}`,
			title: evidence.name,
			description: evidence.description,
			imageUrl:
				url?.url || "https://placehold.co/1920x1080@2x.png?text=Image+Generation+Is+Out+Of+Budget&font=roboto",
		};
	});
};
