// src/utils/CreateWavHeader.js

export function createWavHeader(
	dataLength,
	sampleRate = 24000,
	numChannels = 1,
	bitsPerSample = 16
) {
	const header = new ArrayBuffer(44);
	const view = new DataView(header);

	// "RIFF" chunk descriptor
	view.setUint32(0, 0x52494646, false); // "RIFF" in big-endian
	view.setUint32(4, 36 + dataLength, true); // File size - 8 bytes
	view.setUint32(8, 0x57415645, false); // "WAVE" in big-endian

	// "fmt " sub-chunk
	view.setUint32(12, 0x666d7420, false); // "fmt " in big-endian
	view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
	view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
	view.setUint16(22, numChannels, true); // NumChannels
	view.setUint32(24, sampleRate, true); // SampleRate
	view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true); // ByteRate
	view.setUint16(32, numChannels * (bitsPerSample / 8), true); // BlockAlign
	view.setUint16(34, bitsPerSample, true); // BitsPerSample

	// "data" sub-chunk
	view.setUint32(36, 0x64617461, false); // "data" in big-endian
	view.setUint32(40, dataLength, true); // Subchunk2Size (data length)

	return new Uint8Array(header);
}
