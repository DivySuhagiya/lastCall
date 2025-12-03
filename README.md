# Last Call: 3D Immersive Frontend 🕵️‍♂️🎭

> **Powered by:** React, React Three Fiber (R3F), & Drei

This is the frontend client for **Last Call**, a procedural murder mystery game. It renders a high-fidelity 3D interrogation room where players interact with AI suspects in real-time.

The application handles **3D rendering**, **Audio Streaming (TTS)**, **Lip-Sync Animation**, and **Voice Activity Detection** to create a seamless "face-to-face" investigative experience.

---

## ✨ Key Features

- **Immersive 3D Environment**: Built with **React Three Fiber**, featuring a fully modeled interrogation room and dynamic camera angles.
- **Real-Time Lip Sync**: Uses **Wawa Sensei Lipsync** to map incoming TTS audio streams to 3D facial morph targets (visemes) instantly.
- **Dynamic Suspects**: Renders three distinct characters (Amelia, Sebastian, Lucian) with unique idle animations and emotional states.
- **Procedural Evidence Locker**: A visual inventory system that displays AI-generated clues based on the current story generation.
- **Audio Streaming**: Custom audio buffering logic in `Kokoro-api.js` and inside all character `Avatar.jsx` to handle low-latency voice responses.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **3D Engine**: React Three Fiber (Three.js)
- **Helpers**: @react-three/drei
- **Styling**: Tailwind CSS (implied by `index.css`)
- **State Management**: React Context API (`/context`)
- **Audio**: Web Audio API

---

## 📂 Project Structure

```text
src/
├── api/                    # API clients for Backend & TTS services
│   ├── Agent-api.js        # Communicates with Python Game Engine
│   └── Kokoro-api.js       # Handles TTS Audio Streaming
├── components/
│   ├── 3d/                 # R3F Components (Canvas, Lights, Controls)
│   └── screens/            # 2D UI Overlays (Evidence, Start Screen)
│       ├── InterrogationScreen/
│       │   ├── Avatars/    # 3D Character Models (Amelia, Lucian, Sebastian)
│       │   └── Room/       # The Interrogation Room Environment
│       └── SuspectScreen/  # Character Selection UI
├── context/                # Global State (Current Story, Loading Status)
├── hooks/                  # Custom Hooks (if any)
└── utils/                  # Helpers (LipSync Logic, Audio Headers)

public/
├── models/                 # GLB/GLTF 3D Assets
├── animations/             # Character Animations
└── audios/                 # Background Music & SFX
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 1. Installation

Navigate to the frontend directory:

```bash
git clone https://github.com/DivySuhagiya/lastCall.git
cd lastCall
```

Install dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root of the frontend directory:

```bash
touch .env
```

Add the following variables (ensure these match your backend URLs):

```env
# URL of your Python Game Engine (FastAPI)
VITE_GEMINI_URL=http://localhost:8000

# URL of your TTS Service (Kokoro)
# If using a local container or a cloud endpoint
# To use kokoro you need to clone https://github.com/remsky/Kokoro-FastAPI.git this repo and run docker container
VITE_KOKORO_URL=http://localhost:8880
```

### 3. Running the Development Server

Start the Vite server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🎮 Controls & Interaction

- **Typing/Speaking**: Use the chat input box to ask questions.
- **Switching Suspects**: Click the navigation buttons to rotate the camera to different suspects.
- **Evidence Locker**: Press `Shift + E` (or use the UI button) to view the procedurally generated clues.
- **Start New Game**: On the main menu, click "Start" to trigger the Story Engine (this generates a fresh plot).

---

## ⚠️ Common Issues

### 1. "Audio Context was not allowed to start"

Browsers block audio until the user interacts with the page. Ensure you click the "Start Game" button or interact with the UI before the AI speaks.

### 2. 3D Models Not Loading

Ensure your `.glb` files are correctly placed in `public/models/`. The path in your components should look like `/models/Amelia.glb`.

### 3. CORS Errors

If you see CORS errors in the console, check your Backend `.env` file and ensure `FRONTEND_URL` is set to `http://localhost:5173`.

---

## 📄 License

MIT License
