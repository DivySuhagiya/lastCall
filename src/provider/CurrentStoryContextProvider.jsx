import { useState } from "react";
import { CurrentStoryContext } from "../context/CurrentStoryContext";

export const CurrentStoryContextProvider = ({ children }) => {
	const [currentStory, setCurrentStory] = useState({
		generated_story: {
			victim: "Arthur Pendelton",
			killer: "Eleanor Vance",
			story:
				"Arthur Pendelton, a wealthy and ruthless businessman, was found dead in his study. Arthur had a long history of exploiting those around him. His business partner, Marcus Thorne, had been on the verge of bankruptcy due to Arthur's shady dealings. Arthur's estranged son, Julian Pendelton, had been cut off financially and threatened to expose his father's illegal activities. Eleanor Vance, Arthur's personal assistant, had been subjected to years of abuse and harassment. She was the only one who knew Arthur's deepest secrets and had access to his private affairs. Arthur was killed by a single blow to the head with a heavy object. Eleanor, driven by years of pent-up rage and a desire for revenge, finally snapped. She used a antique letter opener, a treasured item of Arthur's, to end his life during a late-night argument. She then meticulously cleaned the scene, attempting to frame Julian, who had a volatile relationship with his father.",
			location:
				"Arthur Pendelton's opulent mansion, specifically his private study",
			character_details: [
				{
					name: "Eleanor Vance",
					gender: "female",
					description:
						"Arthur's long-suffering personal assistant. Quiet, observant, and seemingly devoted to Arthur, but harbors deep resentment and a hidden strength.",
				},
				{
					name: "Marcus Thorne",
					gender: "male",
					description:
						"Arthur's ambitious but increasingly desperate business partner. Facing financial ruin, he had a strong motive to see Arthur gone.",
				},
				{
					name: "Julian Pendelton",
					gender: "male",
					description:
						"Arthur's estranged and rebellious son. Known for his temper and public disagreements with his father, he had a strained relationship and financial dependence on Arthur.",
				},
			],
			evidences: [
				{
					name: "The Antique Letter Opener",
					description:
						"A decorative, heavy letter opener found wiped clean but concealed beneath a rug near the study door. It is a treasured item of Arthur's, known for its sharp point and ornate handle. Eleanor gifted it to Arthur years ago. A faint smudge of a specific, rare perfume, only worn by Eleanor, is detected on the underside of the handle.",
				},
				{
					name: "A Torn Photograph",
					description:
						"A photograph found crumpled in Julian's jacket pocket. It is torn in half, showing Julian in an argument with Arthur. The other half, which would likely show Arthur's expression, is missing, suggesting it was deliberately removed. The torn edges, however, are remarkably clean, indicating a precise tear, not a violent rip.",
				},
				{
					name: "A Discarded Silk Scarf",
					description:
						"A small, blood-stained silk scarf discovered in the garden waste bin. It is a shade of deep crimson, matching the color of Arthur's favorite tie, which he was seen wearing earlier that evening. Microscopic analysis reveals traces of Eleanor's perfume and fibers consistent with the upholstery of her personal car.",
				},
			],
		},
		generated_instructions: {
			scenarios: [
				{
					name: "Eleanor Vance",
					scenario:
						"[ROLE: You are the killer.] [KEY FACTS YOU MUST REMEMBER] - You killed Arthur Pendelton with an antique letter opener. - You resented Arthur for years of abuse and harassment. - You attempted to frame Julian Pendelton for the murder. - A rare perfume you wear was found on the letter opener. - A silk scarf with your perfume and car fibers was found in the garden. [HOW TO TALK ABOUT IT] - Maintain a calm and composed demeanor, but show flashes of your hidden strength when pressured. - Express your disdain for Arthur's character subtly, focusing on his manipulative nature and the suffering he caused. - Deny any involvement, but hint that Arthur made many enemies. - Example tone: \"Arthur was a difficult man, but to accuse me? That's preposterous. I merely did my job.\"",
				},
				{
					name: "Marcus Thorne",
					scenario:
						"[ROLE: You are a business partner with a motive.] [KEY FACTS YOU MUST REMEMBER] - Arthur Pendelton's shady dealings pushed you to the brink of bankruptcy. - You had a strong financial motive to see Arthur dead. - You were aware of Arthur's ruthless business practices. - You were not present at the time of the murder, but your desperation was palpable. [HOW TO TALK ABOUT IT] - Act stressed and worried about your financial situation, but try to appear cooperative. - Express anger and frustration towards Arthur's business methods, but avoid direct accusations. - Hint that Arthur had many enemies due to his actions. - Example tone: \"Arthur's methods were... unorthodox. They put me in a very difficult position. But I certainly didn't kill him.\"",
				},
				{
					name: "Julian Pendelton",
					scenario:
						"[ROLE: You are the estranged son, framed for the murder.] [KEY FACTS YOU MUST REMEMBER] - You had a volatile and estranged relationship with your father, Arthur Pendelton. - You were cut off financially by Arthur and threatened to expose him. - A torn photograph of you arguing with Arthur was found in your pocket. - You have a temper and a history of public disagreements with your father. - You are being framed for the murder. [HOW TO TALK ABOUT IT] - Be defensive and prone to outbursts, reflecting your temper. - Express anger towards your father's memory, but deny any involvement in his death. - Emphasize your strained relationship and financial troubles as reasons for Arthur's actions against you. - Example tone: \"Yes, my father and I fought! He ruined lives, including mine! But kill him? Never! This is all a setup!\"",
				},
			],
		},
		generated_image_evidences: {
			prompts: [
				{
					name: "The Antique Letter Opener",
					image_prompt:
						"A dimly lit, close-up shot of an ornate, antique letter opener with a heavy, decorative handle. It is partially concealed beneath a dark, Persian rug near a study door. A faint, almost imperceptible smudge is visible on the underside of the handle. The overall mood is one of hidden danger and secrecy.",
				},
				{
					name: "A Torn Photograph",
					image_prompt:
						"A close-up of a torn photograph, crumpled and slightly creased, lying in the pocket of a man's dark jacket. The torn edge is unnaturally clean, revealing a fragment of a man's face (Julian) in an angry gesture, facing away from the camera. The other half of the photograph, which would show the other person's face (Arthur), is missing. The background suggests an indoor setting.",
				},
				{
					name: "A Discarded Silk Scarf",
					image_prompt:
						"A small, blood-stained crimson silk scarf is depicted lying discarded in a weathered metal garden waste bin. A few dark green leaves are scattered around it. The scarf appears slightly damp, and the bloodstain is a deep, dark red. The lighting should evoke a sense of disposal and the late hour.",
				},
			],
		},
		generated_image_urls:
			'{"urls": [{"name": "The Antique Letter Opener", "url": "https://example.com/letter_opener.jpg"}, {"name": "A Torn Photograph", "url": "https://example.com/torn_photo.jpg"}, {"name": "A Discarded Silk Scarf", "url": "https://example.com/silk_scarf.jpg"}]}',
	});

	return (
		<CurrentStoryContext.Provider value={{ currentStory, setCurrentStory }}>
			{children}
		</CurrentStoryContext.Provider>
	);
};
