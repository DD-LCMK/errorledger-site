# ErrorLedger (에러레저) — Web Platform

> **Free interactive stream games, live 48h Chzzk moderation radar, and broadcast utilities for live creators.**  
> 스트리머와 시청자를 위한 100% 무료 방송용 인터랙티브 웹게임, 실시간 48시간 치지직 제재 레이더, 크리에이터 유틸리티 스튜디오.

🌐 **Production Site:** [errorledger.com](https://errorledger.com) (🇰🇷 `/` · 🇺🇸 `/en`)  
🎮 **Supported Platforms:** Naver CHZZK (치지직), SOOP (AfreecaTV), YouTube Live, Twitch  
⚡ **Commercial Use:** 100% Free for live broadcasting, OBS Browser Sources, VODs & monetization — zero install, zero login.

---

## 🚀 Key Features & Hubs

### 🛡️ Bzzk (검지직) — Live 48h Moderation Radar ([/bzzk](https://errorledger.com/bzzk))
- **Live 48h Chzzk Moderation Radar**: Client-side auto-updating Korean analytics dashboard powered by hourly anonymous snapshots — live **Chat Weather** (`쾌청` / `보통` / `주의` / `경보`), 7 KPI cards with 24h trend deltas, moderation type donut chart, timeout severity & pardon analysis, blinded message pattern risk multipliers (`URL`, `도배`, `장문`), interactive 48h surge timeline, KST time-of-day heatmaps, sortable category & segment benchmarks, stream calmness distribution, and cross-channel troll funnel.
- **Homepage Live Telemetry Deck**: Compact live 48h weather, 4 KPIs, AI-vs-Mod split, and mini sparkline right at the top of `/` and `/en`.
- **Recent 25 Malicious Activity Feed**: Real-time pseudonymized (`**`) cross-channel ban radar feed.

### 🎮 18 Interactive Stream Games ([/games](https://errorledger.com/games))
- **Arcade & Reflex (9)**:
  - [3-Second Reflex & Word Quiz](https://errorledger.com/games/three-sec-quiz) · [Eagle-Eye: Spot the Odd & Color Vision](https://errorledger.com/games/spot-odd) · [7.77s Blind Timer](https://errorledger.com/games/blind-timer)
  - [Mine Gems: Cash Out or Bust](https://errorledger.com/games/mine-gems) · [Streamer Physical Age Test](https://errorledger.com/games/reaction-test) · [Legendary +20 Sword Enhancer](https://errorledger.com/games/sword-enhance)
  - [Block Blast!](https://errorledger.com/games/block-blast) · [Arrow Climber](https://errorledger.com/games/arrow-jump) · [Sand Drop](https://errorledger.com/games/sand-drop)
- **Giveaways & Party (4)**:
  - [3D Marble Race Roulette](https://errorledger.com/games/marble-roulette) · [Custom Spin Wheel](https://errorledger.com/games/roulette) · [Ghost Leg Ladder](https://errorledger.com/games/ladder) · [Blossom Board](https://errorledger.com/games/drinking-marble)
- **Audio, Quizzes & Creative Studios (5)**:
  - [AI Music Quiz](https://errorledger.com/games/ai-music-quiz) · [Broadcast Keypad Soundboard](https://errorledger.com/games/soundboard) · [Stream Doodle (GIF)](https://errorledger.com/games/stream-doodle) · [Stream Emoji](https://errorledger.com/games/stream-emoji) · [Daily Fortune](https://errorledger.com/fortune)

### 🛠️ Streamer Utilities & Guides ([/tools](https://errorledger.com/tools))
- **[Chzzk & YouTube Downloader](https://errorledger.com/chzzk-downloader)**: Lossless 4K/1080p FHD VOD, clip & Shorts batch downloader with bundled FFmpeg and VOD section-clipping commands.
- **[Stream Schedule Studio](https://errorledger.com/schedule)**: 7-theme weekly/monthly timetable designer with 2x PNG export, local JSON template backup & 4-platform community text copy.
- **[60-Question Scientific MBTI](https://errorledger.com/mbti)**: 4-axis percentage spectrum, Jungian 8 cognitive functions & creator persona profiling.
- **[Chzzk Streamer Guide](https://errorledger.com/guide)** & **[Changelog](https://errorledger.com/changelog)**.

---

## 🛠️ Tech Stack

- **Framework:** [Astro v7](https://astro.build/) (Static Site Generation, Cloudflare Workers Static Assets)
- **Design System:** Obsidian Broadcast Studio Deck theme, 18 custom inline SVG game covers (`GameThumb.astro`), zero external chart libraries
- **Interactive Engines:** HTML5 Canvas, Three.js, Cannon-es, Web Audio API, Cryptographic PRNG & SHA-256 Provably Fair hashing
- **i18n & SEO:** Full Korean (`/`) & English (`/en/`) localization, `hreflang`, filtered XML Sitemap, RSS, and JSON-LD (`WebApplication`, `BreadcrumbList`, `FAQPage`, `ItemList`)

---

## 💻 Getting Started

```bash
# Clone repository
git clone https://github.com/DD-LCMK/errorledger-site.git
cd errorledger-site

# Install dependencies
npm install

# Start local dev server (http://localhost:4321)
npm run dev

# Build production static bundle
npm run build

# Preview production build
npm run preview
```

---

## 🔒 Security & Binary Releases

Executable desktop releases (such as `Chzzk_Downloader.exe`) are published exclusively on [GitHub Releases](https://github.com/DD-LCMK/errorledger-site/releases) with SHA-256 verification hashes and multi-engine VirusTotal reports.
