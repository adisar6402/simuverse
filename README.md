# SimuVerse - AI-Powered Physics Simulation PWA

SimuVerse is a cutting-edge Progressive Web App that transforms natural language descriptions into cinematic physics simulations. Built with React, Three.js, and modern web technologies, it delivers SpaceX/NVIDIA-grade visuals with full offline capabilities.

## 🚀 Features

### Core Functionality
- **Natural Language Input**: Describe physics scenarios in plain English or use voice input
- **AI-Powered Parsing**: Converts descriptions into accurate physics parameters (currently mock, GPT-4 ready)
- **Real-Time 3D Physics**: Powered by Three.js and Cannon.js with realistic gravity, collisions, and forces
- **Live Controls**: Real-time parameter adjustment with glassmorphism UI
- **Cinematic Visuals**: Professional-grade rendering with shadows, particles, and bloom effects

### Progressive Web App
- **Full PWA**: Installable on all platforms (Android, Windows, macOS)
- **Offline Mode**: Complete functionality without internet connection
- **Service Worker**: Smart caching with background updates
- **Native Experience**: Standalone app with custom install prompt

### Recording & Sharing
- **Screen Recording**: Capture 15-second simulations as WebM/MP4
- **Web Share API**: Native sharing on supported platforms
- **Auto-Download**: Fallback for unsupported browsers
- **Social Ready**: Pre-captioned for social media sharing

### Audio Integration
- **Ambient Audio**: Immersive background soundscape
- **Physics-Synced SFX**: Collision sounds, wind effects, rocket audio
- **Web Audio API**: Professional audio processing and mixing

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js with WebGL2/WebGPU support
- **Physics Engine**: Cannon.js for realistic physics simulation
- **Styling**: TailwindCSS with custom neon/cyber theme
- **PWA**: Workbox for service worker and caching
- **Audio**: Web Audio API for immersive sound design
- **Voice**: Web Speech API for voice input

## 🎮 Getting Started

### Prerequisites
- Node.js 18+ 
- Modern browser with WebGL2 support
- HTTPS context (required for PWA features and microphone access)

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd simuverse
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open in browser**:
Navigate to `https://localhost:5173` (HTTPS required for PWA features)

### Production Build

```bash
npm run build
npm run preview
```

## 🌐 PWA Installation

### Desktop (Chrome/Edge)
1. Open SimuVerse in browser
2. Click "Install SimuVerse" button (appears automatically)
3. Follow browser installation prompts

### Mobile (Android)
1. Open in Chrome/Samsung Internet
2. Tap "Add to Home Screen" when prompted
3. App icon appears on home screen

### iOS (Safari)
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"

## 🔧 Configuration

### Environment Variables

Create a `.env` file for production API keys:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### AI Integration

The app currently uses a mock AI parser. To integrate with GPT-4:

1. Get OpenAI API key from https://platform.openai.com/
2. Add key to `.env` file
3. Uncomment the GPT-4 integration code in `src/ai/parseScenario.ts`

## 🎨 Example Scenarios

Try these natural language prompts:

- "Simulate a rocket launch on Mars with low gravity"
- "Model a skyscraper in a hurricane with 200 km/h winds"  
- "Simulate a drone carrying 200 kg in 40°C heat with strong wind"
- "Drop a basketball and a feather on the Moon"
- "Launch a paper airplane in zero gravity"

## 🏗️ Architecture

### File Structure
```
src/
├── components/          # React UI components
├── three/              # Three.js scene management
├── physics/            # Cannon.js physics engine
├── audio/              # Web Audio system
├── ai/                 # AI parsing (mock + GPT-4 ready)
├── pwa/               # PWA registration and updates
└── App.tsx            # Main application component

public/
├── icons/             # PWA icons (192, 256, 384, 512px)
├── manifest.json      # PWA manifest
└── robots.txt         # SEO configuration
```

### Key Components

- **LandingPage**: Cinematic home screen with input controls
- **SimulationView**: 3D physics simulation with real-time controls  
- **SlidersPanel**: Live parameter adjustment with glassmorphism UI
- **RecordShareFAB**: Recording and sharing functionality
- **InstallPWAButton**: Custom PWA installation prompt

## 🎯 Performance

- **Initial Bundle**: < 1.2MB (optimized for fast loading)
- **Runtime**: 60 FPS physics simulation
- **Memory**: Efficient object pooling and cleanup
- **Caching**: Aggressive service worker caching for offline performance

## 🔊 Audio Features

- **Ambient Background**: Subtle sci-fi atmosphere
- **Collision Detection**: Dynamic impact sounds based on physics
- **Wind Effects**: Procedural wind noise based on simulation parameters
- **Rocket Audio**: Realistic engine sounds with frequency modulation

## 📱 Browser Support

### Fully Supported
- Chrome 90+ (Desktop/Mobile)
- Edge 90+ (Desktop/Mobile)  
- Firefox 90+ (Desktop/Mobile)
- Safari 14+ (Desktop/Mobile)

### Feature Detection
- WebGL2/WebGPU: Automatic fallback chain
- Web Speech API: Graceful degradation with visual feedback
- Web Share API: Fallback to download functionality
- Service Workers: Progressive enhancement

## 🚧 Offline Capabilities

SimuVerse works completely offline after initial load:

- **Local Simulations**: Full physics engine runs client-side
- **Built-in Presets**: Mars launch, hurricane scenarios, zero gravity
- **Parameter Controls**: All simulation controls work offline
- **Recording**: Canvas recording works without network
- **Updates**: Background updates when connection restored

## 🔒 Security & Privacy

- **No Data Collection**: All processing happens client-side
- **Microphone Access**: Only when explicitly requested, fully user-controlled
- **Local Storage**: Only simulation preferences, no personal data
- **HTTPS Required**: Enforced for PWA and microphone functionality

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Roadmap

- [ ] Real GPT-4 integration with advanced prompt engineering
- [ ] WebGPU renderer for enhanced performance
- [ ] Multiplayer physics synchronization
- [ ] VR/AR support with WebXR
- [ ] Advanced particle systems and fluid dynamics
- [ ] Machine learning for physics optimization

---

**Built with ⚡ by Abdulrahman Adisa Amuda**
