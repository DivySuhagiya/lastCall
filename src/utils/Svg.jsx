const PlayIcon = () => (
	<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
		<path d="M8 5v14l11-7z" />
	</svg>
);

const PauseIcon = () => (
	<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
		<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
	</svg>
);

const VolumeIcon = () => (
	<svg
		className="w-6 h-6 text-white/70 group-hover:text-white transition-colors"
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
	</svg>
);

const SendIcon = () => (
	<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
		<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
	</svg>
);

const ChevronLeftIcon = () => (
	<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
		<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
	</svg>
);
const ChevronRightIcon = () => (
	<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
		<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
	</svg>
);

export {
	PlayIcon,
	PauseIcon,
	VolumeIcon,
	SendIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
};
