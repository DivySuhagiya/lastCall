/* eslint-disable no-unused-vars */

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { VISEMES } from "wawa-lipsync";
import { lipsyncManager } from "../../../../App";
import { Kokoro_API } from "../../../../api/Kokoro-api";
import { Agent_API, CreateSession_API } from "../../../../api/Agent-api";
import { KillerContext } from "../../../../context/KillerContext";

let setupMode = false;

export function Lucian(props) {
	const { nodes, materials, scene } = useGLTF("/models/Lucian.glb");

	const [audioElement] = useState(() => new Audio());
	const [sessionId, setSessionId] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		setSessionId(props.sessionId);
		setUserId(props.userId);
	}, []);
	const fetchAndPlayStreaming = async (inputText) => {
		if (!inputText) return;

		const mediaSource = new MediaSource();
		audioElement.src = URL.createObjectURL(mediaSource);

		if (lipsyncManager.connectAudio) {
			lipsyncManager.connectAudio(audioElement);
		}

		mediaSource.addEventListener("sourceopen", async () => {
			try {
				const res = await Agent_API({
					target: "Lucian",
					inputText: inputText,
					sessionId: sessionId,
					userId: userId,
				});
				const agentResponse = res.responses[0].text;

				const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

				const response = await Kokoro_API(agentResponse);

				const reader = response.body.getReader();
				const queue = [];
				let isUpdating = false;

				// Helper to process the queue
				const processQueue = () => {
					if (!isUpdating && queue.length > 0 && !sourceBuffer.updating) {
						isUpdating = true;
						const chunk = queue.shift();
						try {
							sourceBuffer.appendBuffer(chunk);
						} catch (e) {
							console.error("Buffer append error:", e);
						}
					}
				};

				sourceBuffer.addEventListener("updateend", () => {
					isUpdating = false;
					processQueue();

					// Start playing as soon as we have the first chunk
					if (audioElement.paused && sourceBuffer.buffered.length > 0) {
						audioElement
							.play()
							.catch((e) => console.log("Autoplay prevented", e));
					}
				});

				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						// End of stream
						if (!sourceBuffer.updating) mediaSource.endOfStream();
						break;
					}

					queue.push(value);
					processQueue();
				}
			} catch (e) {
				console.error("Stream error:", e);
				// Clean up
				if (mediaSource.readyState === "open") {
					mediaSource.endOfStream();
				}
			}
		});
	};

	useEffect(() => {
		if (props.text) {
			fetchAndPlayStreaming(props.text);
		}
	}, [props.text]);

	const { animations } = useGLTF("/animations/Lucian_Idle_Animation.glb");

	const group = useRef();
	const { actions, mixer } = useAnimations(animations, group);
	const [animation, setAnimation] = useState(
		animations.find((a) => a.name === "Idle") ? "Idle" : animations[0].name
	);

	useEffect(() => {
		actions[animation]
			?.reset()
			.fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
			.play();
		return () => actions[animation]?.fadeOut(0.5);
	}, [animation, actions, mixer]);

	const lerpMorphTarget = (target, value, speed = 0.1) => {
		scene.traverse((child) => {
			if (child.isSkinnedMesh && child.morphTargetDictionary) {
				const index = child.morphTargetDictionary[target];
				if (
					index === undefined ||
					child.morphTargetInfluences[index] === undefined
				) {
					return;
				}
				child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
					child.morphTargetInfluences[index],
					value,
					speed
				);
			}
		});
	};

	const [blink, setBlink] = useState(false);
	const [winkLeft, setWinkLeft] = useState(false);
	const [winkRight, setWinkRight] = useState(false);

	useFrame(() => {
		lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
		lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);

		if (setupMode) return;

		lipsyncManager.processAudio();
		const viseme = lipsyncManager.viseme;
		const state = lipsyncManager.state;

		lerpMorphTarget(viseme, 1, state === "vowel" ? 0.2 : 0.4);

		Object.values(VISEMES).forEach((value) => {
			if (viseme === value) return;
			lerpMorphTarget(value, 0, state === "vowel" ? 0.1 : 0.2);
		});
	});

	useEffect(() => {
		let blinkTimeout;
		const nextBlink = () => {
			blinkTimeout = setTimeout(() => {
				setBlink(true);
				setTimeout(() => {
					setBlink(false);
					nextBlink();
				}, 200);
			}, THREE.MathUtils.randInt(1000, 5000));
		};
		nextBlink();
		return () => clearTimeout(blinkTimeout);
	}, []);

	return (
		<group {...props} dispose={null} ref={group}>
			<primitive object={nodes.Hips} />
			<skinnedMesh
				name="Wolf3D_Body"
				geometry={nodes.Wolf3D_Body.geometry}
				material={materials.Wolf3D_Body}
				skeleton={nodes.Wolf3D_Body.skeleton}
			/>
			<skinnedMesh
				name="Wolf3D_Outfit_Bottom"
				geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
				material={materials.Wolf3D_Outfit_Bottom}
				skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
			/>
			<skinnedMesh
				name="Wolf3D_Outfit_Footwear"
				geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
				material={materials.Wolf3D_Outfit_Footwear}
				skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
			/>
			<skinnedMesh
				name="Wolf3D_Outfit_Top"
				geometry={nodes.Wolf3D_Outfit_Top.geometry}
				material={materials.Wolf3D_Outfit_Top}
				skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
			/>
			<skinnedMesh
				name="Wolf3D_Hair"
				geometry={nodes.Wolf3D_Hair.geometry}
				material={materials.Wolf3D_Hair}
				skeleton={nodes.Wolf3D_Hair.skeleton}
			/>
			<skinnedMesh
				name="EyeLeft"
				geometry={nodes.EyeLeft.geometry}
				material={materials.Wolf3D_Eye}
				skeleton={nodes.EyeLeft.skeleton}
				morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
				morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
			/>
			<skinnedMesh
				name="EyeRight"
				geometry={nodes.EyeRight.geometry}
				material={materials.Wolf3D_Eye}
				skeleton={nodes.EyeRight.skeleton}
				morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
				morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
			/>
			<skinnedMesh
				name="Wolf3D_Head"
				geometry={nodes.Wolf3D_Head.geometry}
				material={materials.Wolf3D_Skin}
				skeleton={nodes.Wolf3D_Head.skeleton}
				morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
				morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
			/>
			<skinnedMesh
				name="Wolf3D_Teeth"
				geometry={nodes.Wolf3D_Teeth.geometry}
				material={materials.Wolf3D_Teeth}
				skeleton={nodes.Wolf3D_Teeth.skeleton}
				morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
				morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
			/>
		</group>
	);
}

useGLTF.preload("/models/Lucian.glb");
useGLTF.preload("/animations/Lucian_Idle_Animation.glb");
