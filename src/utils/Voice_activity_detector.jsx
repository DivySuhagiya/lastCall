import { useMicVAD } from "@ricky0123/vad-react";
import { MicIcon, MicOffIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Voice_activity_detector = ({ onTranscriptComplete }) => {
	const [transcript, setTranscript] = useState("");
	const [isRecognizing, setIsRecognizing] = useState(false);
	const recognitionRef = useRef(null);
	const isVADActiveRef = useRef(false); // Track VAD state

	// Initialize recognition once
	useEffect(() => {
		const recognition = new (window.SpeechRecognition ||
			window.webkitSpeechRecognition)();
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.onstart = () => {
			setIsRecognizing(true);
		};

		recognition.onend = () => {
			setIsRecognizing(false);
		};

		recognition.onerror = (event) => {
			console.error("Recognition error:", event.error);
			setIsRecognizing(false);
		};

		recognition.onresult = (event) => {
			// Only process results if VAD is active
			if (!isVADActiveRef.current) {
				return;
			}

			const current = event.resultIndex;
			const result = event.results[current];
			const transcriptText = event.results[current][0].transcript;
			setTranscript(transcriptText);

			// Save final transcript to parent
			if (result.isFinal) {
				console.log("Final transcript:", transcriptText);
				onTranscriptComplete(transcriptText);
			}
		};

		recognitionRef.current = recognition;

		return () => {
			if (recognitionRef.current) {
				try {
					recognitionRef.current.stop();
				} catch (error) {
					console.error("Failed to stop recognition:", error);
				}
			}
		};
	}, []);

	const vad = useMicVAD({
		model: "v5",
		getStream: async () => {
			return navigator.mediaDevices.getUserMedia({
				audio: {
					channelCount: 2,
					echoCancellation: true,
					noiseSuppression: true,
				},
			});
		},
		onSpeechStart: () => {
			// Only start recognition if VAD is active
			if (isVADActiveRef.current && !isRecognizing && recognitionRef.current) {
				try {
					recognitionRef.current.start();
				} catch (error) {
					console.error("Failed to start recognition:", error);
				}
			}
		},
		onSpeechEnd: (audio) => {
			if (isRecognizing && recognitionRef.current) {
				try {
					recognitionRef.current.stop();
				} catch (error) {
					console.error("Failed to stop recognition:", error);
				}
			}
		},
		startOnLoad: false,
		onnxWASMBasePath:
			"https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
		baseAssetPath:
			"https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.28/dist/",
	});

	// Handle VAD toggle
	const handleToggle = () => {
		if (vad.listening) {
			// Turning OFF
			isVADActiveRef.current = false;

			// Stop speech recognition immediately
			if (isRecognizing && recognitionRef.current) {
				try {
					recognitionRef.current.stop();
					setTranscript("");
				} catch (error) {
					console.error("Failed to stop recognition:", error);
				}
			}

			// Stop VAD
			vad.pause();
		} else {
			// Turning ON
			isVADActiveRef.current = true;
			vad.start();
		}
	};

	return (
		<>
			<div className="flex flex-col items-center">
				{!vad.listening && (
					<div className="bg-linear-to-l from-[#2A2A2A] to-[#474747] h-12 w-12 rounded-md flex items-center justify-center">
						<button
							onClick={handleToggle}
							className="flex items-center justify-center"
						>
							<MicOffIcon className="w-4 h-4 text-white" />
						</button>
					</div>
				)}
				{vad.listening && !vad.userSpeaking && (
					<div className="relative h-12 w-12 rounded-md flex items-center justify-center spin-container">
						<button
							onClick={handleToggle}
							className="relative flex items-center justify-center"
						>
							<MicIcon className="w-4 h-4 text-white" />
						</button>
					</div>
				)}
				{vad.listening && vad.userSpeaking && (
					<div className="relative h-12 w-12 rounded-md flex items-center justify-center spin-container-fast">
						<button
							onClick={handleToggle}
							className="relative flex items-center justify-center"
						>
							<MicIcon className="w-4 h-4 text-white" />
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Voice_activity_detector;
