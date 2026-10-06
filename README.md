# ErrorLedger (에러레저) — Web Platform

> **Free tools, games, and practical resources for streamers and content creators.**  
> 스트리머와 크리에이터를 위한 올인원 무료 방송 도구 & 인터랙티브 웹게임 플랫폼.

🌐 **Production Website:** [errorledger.com](https://errorledger.com)  
🎮 **Supported Platforms:** Naver CHZZK (치지직), SOOP (AfreecaTV), YouTube Live, Twitch  
⚡ **Commercial Use:** 100% Free for live streaming, YouTube content creation & monetization

---

## 🚀 Directory Hubs & Features

ErrorLedger features a consolidated architecture designed for high engagement and seamless OBS integration:

### 🛠️ Streamer Tools (`/tools`)
- **[Chzzk & YouTube Downloader](https://errorledger.com/chzzk-downloader) (`/chzzk-downloader`)**: High-speed lossless VOD/Shorts video downloader with bundled FFmpeg engine and session management.
- **[Weekly Broadcast Schedule Studio](https://errorledger.com/schedule) (`/schedule`)**: Create high-res broadcast schedule cards with 7 customizable theme presets, local JSON templates, and Discord announcement export.
- **[Bzzk Ban Radar](https://errorledger.com/bzzk) (`/bzzk`)**: Real-time cross-channel moderation radar tracking malicious chatters and raid bots.
- **[Keypad Stream Soundboard](https://errorledger.com/games/soundboard) (`/games/soundboard`)**: Low-latency browser soundboard triggered via number pad hotkeys.
- **[Animated Emote Studio](https://errorledger.com/games/stream-emoji) (`/games/stream-emoji`)**: Frame-by-frame web creator for animated GIF & WebP channel emotes.
- **[Live Stream Doodle](https://errorledger.com/games/stream-doodle) (`/games/stream-doodle`)**: Real-time neon drawing and animated sketches for OBS overlays.

### 🎮 Interactive Games (`/games`)
- **[3D Marble Roulette](https://errorledger.com/games/marble-roulette) (`/games/marble-roulette`)**: Cannon-es & Three.js 3D physics-based 40-player marble race track.
- **[Custom Wheel Spinner](https://errorledger.com/games/roulette) (`/games/roulette`)**: Weighted probability roulette with victory celebration effects.
- **[Ghost Leg Ladder](https://errorledger.com/games/ladder) (`/games/ladder`)**: Multiplayer Amidakuji with real-time animated line tracing for up to 20 contestants.
- **[Drinking Marble](https://errorledger.com/games/drinking-marble) (`/games/drinking-marble`)**: Classic party board game with 3D rolling dice and penalty cards.
- **[AI Music Quiz](https://errorledger.com/games/ai-music-quiz) (`/games/ai-music-quiz`)**: AI-reimagined song guessing quiz for interactive chat participation.

### 📜 Product Lifecycle & Guides
- **[Changelog](https://errorledger.com/changelog) (`/changelog`)**: Transparent version history, patch notes, and release logs.
- **[Streamer Knowledge Base](https://errorledger.com/guide) (`/guide`)**: Comprehensive OBS Studio configuration, browser source setup, and Chzzk guides.
- **[Creator MBTI](https://errorledger.com/mbti) (`/mbti`)**: 60-item cognitive function and personality assessment tailored for creators and viewers.

---

## 🛠️ Tech Stack

- **Framework:** [Astro v7](https://astro.build/) (Static Site Generation / Sub-second TTFB)
- **Styling:** Modular CSS Tokens & Glassmorphism Design System
- **3D Physics / Rendering:** Three.js, Cannon-es, HTML5 Canvas
- **i18n:** Built-in Korean (`/`) and English (`/en/`) localization
- **SEO & Schemas:** Automated XML Sitemap, RSS, JSON-LD (`SoftwareApplication`, `ItemList`, `BreadcrumbList`, `FAQPage`)

---

## 💻 Getting Started

```bash
# Clone the repository
git clone https://github.com/DD-LCMK/errorledger-site.git

# Navigate into directory
cd errorledger-site

# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Build production static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security & Binaries

Binary executable releases (such as `Chzzk_Downloader.exe`) are distributed exclusively via [GitHub Releases](https://github.com/DD-LCMK/errorledger-site/releases) with published SHA-256 checksums and multi-engine VirusTotal scan reports.
