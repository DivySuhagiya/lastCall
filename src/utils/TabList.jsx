import { Amelia } from "../components/screens/InterrogationScreen/Avatars/Amelia";
import { Lucian } from "../components/screens/InterrogationScreen/Avatars/Lucian";
import { Sebastian } from "../components/screens/InterrogationScreen/Avatars/Sebastian";
/**
 * Transforms story context data into a structured suspect list
 * @param {Object} currentStory - The current story object from CurrentStoryContext
 * @returns {Array} Array of suspect objects with structured data
 */
export const getSuspectListFromStory = (currentStory) => {
	if (!currentStory?.generated_story?.character_details) {
		return [];
	}

	return currentStory.generated_story.character_details.map(
		(character, index) => {
			// Find matching scenario instruction
			const scenario = currentStory?.generated_scenarios?.scenarios?.find(
				(s) => s.name === character.name
			);

			let avatarComponent;
			if (character.gender === "female") {
				avatarComponent = Amelia;
			} else {
				// For males, alternate between Lucian and Sebastian
				const maleIndex = currentStory.generated_story.character_details
					.slice(0, index)
					.filter((c) => c.gender === "male").length;
				avatarComponent = maleIndex === 0 ? Lucian : Sebastian;
			}

			return {
				Id: `suspect-${index}`,
				Nickname: character.name,
				Role: character.description,
				gender: character.gender,
				instruction: scenario?.scenario || "",
				component: avatarComponent,
				fullDetails: {
					...character,
					scenario: scenario?.scenario,
				},
			};
		}
	);
};

/**
 * Extracts general details from story context
 * @param {Object} currentStory - The current story object from CurrentStoryContext
 * @returns {Object} General details object
 */
export const getGeneralDetailsFromStory = (currentStory) => {
	return {
		Id: "general",
		victim: currentStory?.generated_story?.victim,
		location: currentStory?.generated_story?.location,
		story: currentStory?.generated_story?.story,
		evidences: currentStory?.generated_story?.evidences || [],
		killer: currentStory?.generated_story?.killer,
	};
};
