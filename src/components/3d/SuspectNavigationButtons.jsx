import { Text, RoundedBox } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

export const SuspectNavigationButtons = ({
	onNext,
	onPrevious,
	currentSuspect,
}) => {
	const [hoveredPrev, setHoveredPrev] = useState(false);
	const [hoveredNext, setHoveredNext] = useState(false);

	return (
		<group>
			{/* Previous Button */}
			<group position={[2.51, 0.0, 0.05]} rotation={[0, -Math.PI / 2, 0]} scale={0.5}>
				<RoundedBox
					args={[0.4, 0.4, 0.1]}
					radius={0.05}
					onPointerEnter={() => setHoveredPrev(true)}
					onPointerLeave={() => setHoveredPrev(false)}
					onClick={onPrevious}
				>
					<meshStandardMaterial color={hoveredPrev ? "#4a5568" : "#2d3748"} />
				</RoundedBox>
				<Text
					position={[0, 0, 0.06]}
					fontSize={0.2}
					color="white"
					anchorX="center"
					anchorY="middle"
				>
					◀
				</Text>
			</group>

			{/* Suspect Name Display */}
			<group  position={[2.51, 0.65, 0.67]} rotation={[0, -Math.PI / 2, 0]} scale={0.5}>
				<RoundedBox args={[1.5, 0.4, 0.1]} radius={0.05}>
					<meshStandardMaterial color="#1a202c" opacity={0.8} transparent />
				</RoundedBox>
				<Text
					position={[0, 0, 0.06]}
					fontSize={0.15}
					color="white"
					anchorX="center"
					anchorY="middle"
					maxWidth={1.3}
				>
					{currentSuspect}
				</Text>
			</group>

			{/* Next Button */}
			<group  position={[2.51, 0.0, 1.3]} rotation={[0, -Math.PI / 2, 0]} scale={0.5}>
				<RoundedBox
					args={[0.4, 0.4, 0.1]}
					radius={0.05}
					onPointerEnter={() => setHoveredNext(true)}
					onPointerLeave={() => setHoveredNext(false)}
					onClick={onNext}
				>
					<meshStandardMaterial color={hoveredNext ? "#4a5568" : "#2d3748"} />
				</RoundedBox>
				<Text
					position={[0, 0, 0.06]}
					fontSize={0.2}
					color="white"
					anchorX="center"
					anchorY="middle"
				>
					▶
				</Text>
			</group>
		</group>
	);
};
