// Supported locales
export type Locale = 'ko' | 'en';

/** Derive locale from URL pathname. English lives under /en/. */
export function getLang(url: URL): Locale {
  return url.pathname.startsWith('/en') ? 'en' : 'ko';
}

/**
 * Given a Korean URL, return the equivalent English URL and vice-versa.
 * Used by the language switcher in the header.
 */
export function getAlternateUrl(currentPath: string, targetLang: Locale): string {
  const clean = currentPath.replace(/\/$/, '') || '/';
  if (targetLang === 'en') {
    // ko → en: prepend /en
    if (clean === '/') return '/en';
    return '/en' + clean;
  } else {
    // en → ko: strip /en prefix
    if (clean === '/en') return '/';
    return clean.replace(/^\/en/, '') || '/';
  }
}

// ─── UI string dictionary ────────────────────────────────────────────────────

const ui = {
  ko: {
    // Header nav
    'nav.marble': '구슬 룰렛',
    'nav.roulette': '돌림판',
    'nav.schedule': '방송 편성표',
    'nav.ladder': '사다리타기',
    'nav.drinking_marble': '주루마블',
    'nav.fortune': '오늘의 운세',
    'nav.bzzk': '검지직',
    'nav.mbti': 'MBTI 검사',
    'nav.sound.on': '소리 켜기',
    'nav.sound.off': '소리 끄기',
    'nav.lang.label': 'EN',
    'nav.lang.title': 'Switch to English',

    // Footer
    'footer.desc': '스트림아케이드는 치지직(CHZZK), SOOP(아프리카TV), 유튜브 라이브 스트리머와 시청자를 위한 무료 방송용 인터랙티브 웹게임 플랫폼입니다. 언제 어디서나 간편하게 띄워 생방송 텐션을 올려보세요.',
    'footer.badge': '⚡ 100% 무료 • 로그인 없는 즉시 실행',
    'footer.tools.title': '추천 방송 도구',
    'footer.tools.schedule': '📅 방송 편성표 (스튜디오 에디터)',
    'footer.tools.mbti': '🧠 정밀 MBTI & 인지기능 검사',
    'footer.tools.bzzk': '🛡️ 검지직 (치지직 방송 보호 레이더)',
    'footer.tools.drinking_marble': '🌸 주루마블 (술게임/벌칙 말판)',
    'footer.tools.roulette': '🎡 돌림판 룰렛 (추첨/벌칙)',
    'footer.tools.marble': '🔮 구슬 레이스 룰렛 (마블 레이스)',
    'footer.tools.ladder': '🪜 사다리타기 (커피/치킨 내기)',
    'footer.tools.fortune': '✨ 오늘의 운세 (12간지 & 별자리)',
    'footer.support.title': '고객지원 & 안내',
    'footer.support.privacy': '개인정보처리방침',
    'footer.support.terms': '이용약관',
    'footer.support.about': '서비스 소개',
    'footer.support.contact': '문의하기',
    'footer.copyright': '스트림아케이드 (StreamArcade). All rights reserved. 방송인을 위한 무료 인터랙티브 도구.',

    // Game layout
    'game.guide.toggle': '📖 상세 가이드 및 FAQ 보기',
    'game.tips.title': '방송 안내 & 조작법',
    'game.faq.title': '자주 묻는 질문 (FAQ)',
    'game.fullscreen': '⛶ 전체화면',

    // Page common
    'page.home.title': '홈',
  },
  en: {
    // Header nav
    'nav.marble': 'Marble Roulette',
    'nav.roulette': 'Spin Wheel',
    'nav.schedule': 'Schedule',
    'nav.ladder': 'Ladder Game',
    'nav.drinking_marble': 'Blossom Board',
    'nav.fortune': 'Daily Fortune',
    'nav.bzzk': 'Bzzk',
    'nav.mbti': 'MBTI Test',
    'nav.sound.on': 'Unmute',
    'nav.sound.off': 'Mute',
    'nav.lang.label': '한국어',
    'nav.lang.title': '한국어로 전환',

    // Footer
    'footer.desc': 'StreamArcade is a 100% free, browser-based interactive tool platform for live streamers on Twitch, YouTube, CHZZK, and SOOP — no install, no login required.',
    'footer.badge': '⚡ 100% Free • No Login Required',
    'footer.tools.title': 'Stream Tools',
    'footer.tools.schedule': '📅 Stream Schedule Studio',
    'footer.tools.mbti': '🧠 Scientific MBTI & Cognitive Test',
    'footer.tools.bzzk': '🛡️ Bzzk (Chzzk Stream Radar)',
    'footer.tools.drinking_marble': '🌸 Blossom Board (Dice Game)',
    'footer.tools.roulette': '🎡 Spin Wheel (Random Picker)',
    'footer.tools.marble': '🔮 Marble Race Roulette',
    'footer.tools.ladder': '🪜 Ghost Leg Ladder Game',
    'footer.tools.fortune': '✨ Daily Fortune & Horoscope',
    'footer.support.title': 'Support & Info',
    'footer.support.privacy': 'Privacy Policy',
    'footer.support.terms': 'Terms of Use',
    'footer.support.about': 'About StreamArcade',
    'footer.support.contact': 'Contact Us',
    'footer.copyright': 'StreamArcade. All rights reserved. Free interactive tools for streamers.',

    // Game layout
    'game.guide.toggle': '📖 Full Guide & FAQ',
    'game.tips.title': 'How to Play & Tips',
    'game.faq.title': 'Frequently Asked Questions',
    'game.fullscreen': '⛶ Fullscreen',

    // Page common
    'page.home.title': 'Home',
  }
} as const;

type UiKey = keyof typeof ui['ko'];

/** Translate a UI key for the given locale. Falls back to Korean if missing. */
export function t(lang: Locale, key: UiKey): string {
  return (ui[lang] as Record<string, string>)[key] ?? (ui['ko'] as Record<string, string>)[key] ?? key;
}

/** Return the canonical Korean URL for this page (strips /en prefix). */
export function getKoUrl(siteBase: string, currentPath: string): string {
  const clean = currentPath.replace(/\/$/, '') || '/';
  const koPath = clean.startsWith('/en') ? (clean.replace(/^\/en/, '') || '/') : clean;
  return new URL(koPath, siteBase).href;
}

/** Return the canonical English URL for this page (adds /en prefix). */
export function getEnUrl(siteBase: string, currentPath: string): string {
  const clean = currentPath.replace(/\/$/, '') || '/';
  const koPath = clean.startsWith('/en') ? (clean.replace(/^\/en/, '') || '/') : clean;
  const enPath = koPath === '/' ? '/en' : '/en' + koPath;
  return new URL(enPath, siteBase).href;
}
