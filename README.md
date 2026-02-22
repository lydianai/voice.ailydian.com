<div align="center">

# LyDian Voice

<p><em>Turkish Voice Assistant PWA with Wake-Word Detection and Conversational Memory</em></p>

<p>
  <a href="#overview"><img src="https://img.shields.io/badge/Docs-Overview-blue?style=for-the-badge" alt="Overview"></a>
  <a href="#architecture"><img src="https://img.shields.io/badge/Docs-Architecture-purple?style=for-the-badge" alt="Architecture"></a>
  <a href="#key-features"><img src="https://img.shields.io/badge/Docs-Features-green?style=for-the-badge" alt="Features"></a>
  <a href="#getting-started"><img src="https://img.shields.io/badge/Docs-Setup-orange?style=for-the-badge" alt="Setup"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Live-success?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/PWA-Installable-blue?style=flat-square" alt="PWA">
  <img src="https://img.shields.io/badge/Turkish-TTS-green?style=flat-square" alt="Turkish TTS">
  <img src="https://img.shields.io/badge/Wake_Word-Hey_Lydian-orange?style=flat-square" alt="Wake Word">
</p>

<table>
<tr>
<td width="50%">

**Platform Highlights**
- "Hey Lydian" wake-word activation via Web Speech API
- 5-message conversational memory for context continuity
- Premium Turkish TTS with configurable voice parameters
- Full PWA compliance - installable on iOS, Android, and desktop

</td>
<td width="50%">

**Technical Excellence**
- Browser-native HTML5, CSS3, Vanilla JavaScript stack
- Web Audio API AnalyserNode for real-time waveform visualization
- Vercel Serverless Functions for intelligence engine proxy
- Exponential backoff retry logic for network resilience

</td>
</tr>
</table>

</div>

---

## Overview

LyDian Voice is a browser-native voice assistant Progressive Web App (PWA) built with Web Speech API and Web Audio API. It activates on the "Hey Lydian" wake word, processes natural language queries, and responds in Turkish using premium text-to-speech voices. The app features a 5-message conversational memory system, real-time audio visualization, and exponential backoff retry logic for robust operation.

---

## Architecture

```mermaid
graph LR
    subgraph "Input Pipeline"
        A[Microphone] --> B[Wake Word Detector]
        B -->|"Hey Lydian"| C[Speech Recognition]
        C --> D[Text Transcript]
    end
    subgraph "Processing"
        D --> E[Context Manager - 5 Messages]
        E --> F[Intelligence Engine]
        F --> G[Response Generator]
    end
    subgraph "Output Pipeline"
        G --> H[Turkish TTS Engine]
        H --> I[Audio Output]
        G --> J[Visual Feedback]
        J --> K[Audio Visualizer]
    end
```

---

## Key Features

### Voice Interaction
- **Wake-Word Activation**: "Hey Lydian" phrase detection via Web Speech API
- **Auto Re-activation**: Automatically resumes listening after each response cycle
- **5-Message Conversational Memory**: Maintains context across multiple exchanges
- **Turkish Text-to-Speech**: Premium voice selection with configurable rate, pitch, and volume

### Audio Processing
- **Real-time Audio Visualizer**: Live waveform rendering using Web Audio API AnalyserNode
- **Processing State Animations**: Visual feedback for listening, processing, and speaking states
- **Retry Logic**: Exponential backoff with 3 attempts for network resilience

### Progressive Web App
- **Installable**: Add to home screen on iOS, Android, and desktop
- **Offline Capability**: Core UI and interaction logic works without network
- **Manifest + Service Worker**: Full PWA compliance

### UI Design
- **Glassmorphism UI**: Frosted glass card design with backdrop blur
- **SVG Animations**: Smooth particle and pulse animations
- **Responsive Layout**: Optimized for mobile and desktop viewports

---

## Technology Stack

<div align="center">

| Category | Technology | Badge |
|----------|------------|-------|
| Core | HTML5, CSS3, Vanilla JavaScript | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) |
| Speech Input | Web Speech API (SpeechRecognition) | ![Web API](https://img.shields.io/badge/Web_Speech_API-native-blue?style=flat-square) |
| Audio Processing | Web Audio API (AnalyserNode) | ![Web Audio](https://img.shields.io/badge/Web_Audio_API-native-purple?style=flat-square) |
| Text-to-Speech | Web Speech API (SpeechSynthesis) | ![TTS](https://img.shields.io/badge/SpeechSynthesis-Turkish-green?style=flat-square) |
| Backend Functions | Vercel Serverless Functions | ![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?style=flat-square&logo=vercel) |
| Deployment | Vercel | ![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel) |
| PWA | Web App Manifest + Service Worker | ![PWA](https://img.shields.io/badge/PWA-Compliant-blue?style=flat-square) |

</div>

---

## Getting Started

### Prerequisites

- Modern browser with Web Speech API support (Chrome, Edge recommended)
- Microphone access permission
- Node.js 20+ (for development)

### Local Development

```bash
# Clone the repository
git clone https://github.com/lydianai/voice.ailydian.com.git
cd voice.ailydian.com

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

```env
# Intelligence Engine API
INTELLIGENCE_API_KEY=your_key_here
INTELLIGENCE_API_URL=https://your-endpoint.com

# App Configuration
NEXT_PUBLIC_APP_URL=https://voice.ailydian.com
```

---

## Usage Guide

1. **Open the app** at [voice.ailydian.com](https://voice.ailydian.com)
2. **Grant microphone permission** when prompted
3. **Say "Hey Lydian"** to activate the assistant
4. **Speak your query** in Turkish
5. The assistant will **respond with audio and visual feedback**
6. The system **automatically re-activates** for the next query

### Voice Settings

Accessible from the settings panel:

| Setting | Range | Default |
|---------|-------|---------|
| Speech Rate | 0.5 - 2.0 | 1.0 |
| Voice Pitch | 0.5 - 2.0 | 1.0 |
| Volume | 0.0 - 1.0 | 0.9 |
| Voice | System Turkish voices | Preferred |

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 100+ | Full |
| Edge 100+ | Full |
| Safari 15+ | Partial (TTS only) |
| Firefox | Limited |

Web Speech API support varies by browser. Chrome and Edge provide the most complete experience including wake-word detection.

---

## Project Structure

```
voice.ailydian.com/
├── index.html          # Main PWA shell
├── manifest.json       # PWA manifest
├── api/                # Vercel serverless functions
│   └── chat.js         # Intelligence engine proxy
├── app/                # Next.js pages (if applicable)
├── components/         # UI components
│   ├── visualizer.js   # Audio visualizer
│   └── controls.js     # Voice control panel
└── public/             # Static assets and icons
```

---

## Security

Audio data is processed locally in the browser. Voice queries are transmitted over HTTPS to serverless functions. No audio recordings are stored. See [SECURITY.md](SECURITY.md) for vulnerability reporting.

---

## License

Copyright (c) 2024-2026 Lydian (AiLydian). All Rights Reserved.

This software is proprietary. See [LICENSE](LICENSE) for details.

---

## Links

- **Live App**: [voice.ailydian.com](https://voice.ailydian.com)
- **Main Website**: [www.ailydian.com](https://www.ailydian.com)
- **Security Policy**: [SECURITY.md](SECURITY.md)
