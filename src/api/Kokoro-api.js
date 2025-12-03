export const Kokoro_API = async (inputText, voice) => {
	const response = await fetch(
		`${import.meta.env.VITE_KOKORO_URL}/v1/audio/speech`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "kokoro",
				input: inputText,
				voice: voice,
				speed: 1.0,
				volume: 1.0,
				pitch: 1.0,
			}),
		}
	);

	return response;
};
