import { generateUUID } from "three/src/math/MathUtils.js";

export const CreateSession_API = async ({ target, killer }) => {
	const id = generateUUID();
	const response = await fetch(
		`${import.meta.env.VITE_GEMINI_URL}/create_session`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: "user_" + id,
				session_id: id,
				target: target,
				killer: killer,
			}),
		}
	);

	const data = await response.json();
	return data;
};

export const Agent_API = async ({ inputText, sessionId, userId }) => {
	const response = await fetch(`${import.meta.env.VITE_GEMINI_URL}/chat`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			app_name: "lastCall",
			user_id: userId,
			session_id: sessionId,
			message: inputText,
		}),
	});

	const data = await response.json();
	return data;
};

export const EndSession_API = async ({ sessionId, userId }) => {
	const response = await fetch(
		`${import.meta.env.VITE_GEMINI_URL}/delete_session`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: userId,
				session_id: sessionId,
			}),
		}
	);

	const data = await response.json();
	return data;
};
