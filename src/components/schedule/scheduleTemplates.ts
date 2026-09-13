/**
 * Stream Schedule Studio — Design Themes, Badges, and Presets
 */

export interface ScheduleTheme {
  id: string;
  nameKo: string;
  nameEn: string;
  bg: string;
  cardBg: string;
  accent: string;
  accentGlow: string;
  border: string;
  textMain: string;
  textSub: string;
  badgeColor: string;
  badgeBg: string;
  previewGradient: string;

  // Boarding Pass & Calendar Tokens
  keytagTitle: string;
  keytagBg: string;
  keytagBorder: string;
  keytagText: string;
  keytagShadow: string;

  tickerBg: string;
  tickerBorder: string;
  tickerLabel: string;
  tickerText: string;

  ribbonBg: string;
  ribbonFold: string;
  ribbonText: string;

  stripBg: string;
  stripBorder: string;

  stubBg: string;
  stubBorder: string;
  stubText: string;
  barcodeColor: string;

  ticketBg: string;
  ticketInnerBorder: string;
  ticketTitle: string;
  ticketMemo: string;
  ticketTime: string;
  flourishColor: string;

  offlineBg: string;
  offlineBorder: string;
  offlineText: string;
}

export interface StatusBadgeInfo {
  id: string;
  labelKo: string;
  labelEn: string;
  icon: string;
  color: string;
  bg: string;
}

export interface DayScheduleEntry {
  time: string; // Formatted display time, e.g. "20:00 ~ 23:00" or "20:00"
  startTime?: string; // Start time, e.g. "20:00" or "PM 08:00"
  endTime?: string; // End time (optional), e.g. "23:00" or "방종"
  status: string; // 'live' | 'off' | 'collab' | 'new' | 'viewer' | 'event' | 'chat' | 'irl'
  title: string; // Short title / keyword: e.g. "저챗 / 소통", "스팀 종합 게임"
  memo?: string;
}

export interface StreamScheduleData {
  version: 2;
  viewMode: 'weekly' | 'monthly';
  selectedWeekIndex: number; // 0: Week 1, 1: Week 2, 2: Week 3, etc.
  themeId: string;
  channel: {
    name: string;
    platform: 'chzzk' | 'soop' | 'twitch' | 'youtube' | 'custom';
    avatarEmoji: string;
    tagline: string;
    notice: string; // Weekly notice (backwards compatibility)
    noticeWeekly?: string;
    noticeMonthly?: string;
  };
  monthly: {
    year: number;
    month: number;
    monthlyGoal: string;
    days: Record<number, DayScheduleEntry>; // Day of month (1..31)
  };
}

export function formatDisplayTime(entry?: DayScheduleEntry): string {
  if (!entry) return '';
  if (entry.status === 'off' || entry.title === 'OFFLINE') return '휴식';
  if (entry.startTime && entry.endTime) {
    return `${entry.startTime} ~ ${entry.endTime}`;
  }
  if (entry.startTime) {
    return entry.startTime;
  }
  if (entry.time) {
    return entry.time;
  }
  return '20:00';
}

export const SCHEDULE_THEMES: Record<string, ScheduleTheme> = {
  'travel-boarding-pass': {
    id: 'travel-boarding-pass',
    nameKo: '여행 보딩패스',
    nameEn: 'Travel Boarding Pass',
    bg: '#cbd5e1',
    cardBg: '#ffffff',
    accent: '#1e40af',
    accentGlow: 'rgba(30, 64, 175, 0.35)',
    border: '#475569',
    textMain: '#0f172a',
    textSub: '#334155',
    badgeColor: '#1e40af',
    badgeBg: 'rgba(30, 64, 175, 0.12)',
    previewGradient: 'linear-gradient(135deg, #1e3a8a 0%, #f1f5f9 100%)',

    keytagTitle: 'SCHEDULE',
    keytagBg: '#334e80',
    keytagBorder: '#1e3a8a',
    keytagText: '#ffffff',
    keytagShadow: '#93c5fd',

    tickerBg: '#ffffff',
    tickerBorder: '#475569',
    tickerLabel: '#1e293b',
    tickerText: '#0f172a',

    ribbonBg: '#1e40af',
    ribbonFold: '#172554',
    ribbonText: '#ffffff',

    stripBg: '#ffffff',
    stripBorder: '#64748b',

    stubBg: '#f1f5f9',
    stubBorder: '#64748b',
    stubText: '#1e293b',
    barcodeColor: '#1e293b',

    ticketBg: '#ffffff',
    ticketInnerBorder: '#94a3b8',
    ticketTitle: '#0f172a',
    ticketMemo: '#334155',
    ticketTime: '#1e40af',
    flourishColor: '#64748b',

    offlineBg: '#451a03',
    offlineBorder: '#290f02',
    offlineText: '#fef08a'
  },
  'chzzk-neon': {
    id: 'chzzk-neon',
    nameKo: '에메랄드 네온',
    nameEn: 'Emerald Neon',
    bg: '#080c14',
    cardBg: 'rgba(14, 23, 38, 0.92)',
    accent: '#00ffa3',
    accentGlow: 'rgba(0, 255, 163, 0.35)',
    border: 'rgba(0, 255, 163, 0.3)',
    textMain: '#ffffff',
    textSub: '#a7f3d0',
    badgeColor: '#00ffa3',
    badgeBg: 'rgba(0, 255, 163, 0.15)',
    previewGradient: 'linear-gradient(135deg, #080c14 0%, #00ffa3 100%)',

    keytagTitle: 'NEON LIVE',
    keytagBg: '#0b1e16',
    keytagBorder: '#00ffa3',
    keytagText: '#00ffa3',
    keytagShadow: 'rgba(0, 255, 163, 0.4)',

    tickerBg: '#071610',
    tickerBorder: 'rgba(0, 255, 163, 0.45)',
    tickerLabel: '#4ade80',
    tickerText: '#00ffa3',

    ribbonBg: '#00ffa3',
    ribbonFold: '#00b875',
    ribbonText: '#041c10',

    stripBg: '#0e1824',
    stripBorder: 'rgba(0, 255, 163, 0.35)',

    stubBg: '#0a121c',
    stubBorder: 'rgba(0, 255, 163, 0.3)',
    stubText: '#86efac',
    barcodeColor: '#00ffa3',

    ticketBg: '#111e2e',
    ticketInnerBorder: 'rgba(0, 255, 163, 0.25)',
    ticketTitle: '#ffffff',
    ticketMemo: '#a7f3d0',
    ticketTime: '#00ffa3',
    flourishColor: 'rgba(0, 255, 163, 0.45)',

    offlineBg: '#152520',
    offlineBorder: '#00ffa3',
    offlineText: '#00ffa3'
  },
  'twitch-violet': {
    id: 'twitch-violet',
    nameKo: '글리치 바이올렛',
    nameEn: 'Glitch Violet',
    bg: '#0b0914',
    cardBg: 'rgba(23, 17, 43, 0.92)',
    accent: '#9146ff',
    accentGlow: 'rgba(145, 70, 255, 0.4)',
    border: 'rgba(145, 70, 255, 0.35)',
    textMain: '#ffffff',
    textSub: '#e9d5ff',
    badgeColor: '#c084fc',
    badgeBg: 'rgba(145, 70, 255, 0.2)',
    previewGradient: 'linear-gradient(135deg, #0b0914 0%, #9146ff 100%)',

    keytagTitle: 'VIOLET',
    keytagBg: '#20123a',
    keytagBorder: '#9146ff',
    keytagText: '#ffffff',
    keytagShadow: '#a855f7',

    tickerBg: '#170c2d',
    tickerBorder: 'rgba(145, 70, 255, 0.45)',
    tickerLabel: '#c084fc',
    tickerText: '#faf5ff',

    ribbonBg: '#9146ff',
    ribbonFold: '#6b21a8',
    ribbonText: '#ffffff',

    stripBg: '#151026',
    stripBorder: 'rgba(145, 70, 255, 0.4)',

    stubBg: '#100b1e',
    stubBorder: 'rgba(145, 70, 255, 0.3)',
    stubText: '#c084fc',
    barcodeColor: '#a855f7',

    ticketBg: '#1b1433',
    ticketInnerBorder: 'rgba(192, 132, 252, 0.25)',
    ticketTitle: '#ffffff',
    ticketMemo: '#e9d5ff',
    ticketTime: '#c084fc',
    flourishColor: 'rgba(145, 70, 255, 0.45)',

    offlineBg: '#23153c',
    offlineBorder: '#9146ff',
    offlineText: '#faf5ff'
  },
  'soop-cyan': {
    id: 'soop-cyan',
    nameKo: '사이버 오션',
    nameEn: 'Cyber Ocean',
    bg: '#06101e',
    cardBg: 'rgba(10, 26, 51, 0.92)',
    accent: '#00d2ff',
    accentGlow: 'rgba(0, 210, 255, 0.35)',
    border: 'rgba(0, 210, 255, 0.3)',
    textMain: '#ffffff',
    textSub: '#bae6fd',
    badgeColor: '#00d2ff',
    badgeBg: 'rgba(0, 210, 255, 0.15)',
    previewGradient: 'linear-gradient(135deg, #06101e 0%, #00d2ff 100%)',

    keytagTitle: 'OCEAN',
    keytagBg: '#082236',
    keytagBorder: '#00d2ff',
    keytagText: '#00d2ff',
    keytagShadow: 'rgba(0, 210, 255, 0.4)',

    tickerBg: '#061928',
    tickerBorder: 'rgba(0, 210, 255, 0.45)',
    tickerLabel: '#38bdf8',
    tickerText: '#00d2ff',

    ribbonBg: '#00d2ff',
    ribbonFold: '#0284c7',
    ribbonText: '#031929',

    stripBg: '#0a1a2e',
    stripBorder: 'rgba(0, 210, 255, 0.35)',

    stubBg: '#061221',
    stubBorder: 'rgba(0, 210, 255, 0.3)',
    stubText: '#7dd3fc',
    barcodeColor: '#00d2ff',

    ticketBg: '#0d223c',
    ticketInnerBorder: 'rgba(0, 210, 255, 0.25)',
    ticketTitle: '#ffffff',
    ticketMemo: '#bae6fd',
    ticketTime: '#38bdf8',
    flourishColor: 'rgba(0, 210, 255, 0.45)',

    offlineBg: '#0c263d',
    offlineBorder: '#00d2ff',
    offlineText: '#e0f2fe'
  },
  'cozy-pastel': {
    id: 'cozy-pastel',
    nameKo: '포근한 파스텔',
    nameEn: 'Cozy Pastel',
    bg: '#1e1826',
    cardBg: 'rgba(42, 33, 54, 0.94)',
    accent: '#f472b6',
    accentGlow: 'rgba(244, 114, 182, 0.35)',
    border: 'rgba(244, 114, 182, 0.35)',
    textMain: '#ffffff',
    textSub: '#fce7f3',
    badgeColor: '#f472b6',
    badgeBg: 'rgba(244, 114, 182, 0.2)',
    previewGradient: 'linear-gradient(135deg, #1e1826 0%, #f472b6 100%)',

    keytagTitle: 'COZY',
    keytagBg: '#42243a',
    keytagBorder: '#f472b6',
    keytagText: '#fdf2f8',
    keytagShadow: '#f472b6',

    tickerBg: '#331b2c',
    tickerBorder: 'rgba(244, 114, 182, 0.4)',
    tickerLabel: '#fbcfe8',
    tickerText: '#fdf2f8',

    ribbonBg: '#f472b6',
    ribbonFold: '#db2777',
    ribbonText: '#331122',

    stripBg: '#2b1c31',
    stripBorder: 'rgba(244, 114, 182, 0.35)',

    stubBg: '#201426',
    stubBorder: 'rgba(244, 114, 182, 0.3)',
    stubText: '#fbcfe8',
    barcodeColor: '#f472b6',

    ticketBg: '#372440',
    ticketInnerBorder: 'rgba(244, 114, 182, 0.25)',
    ticketTitle: '#ffffff',
    ticketMemo: '#fce7f3',
    ticketTime: '#f472b6',
    flourishColor: 'rgba(244, 114, 182, 0.45)',

    offlineBg: '#46273f',
    offlineBorder: '#f472b6',
    offlineText: '#fdf2f8'
  },
  'retro-arcade': {
    id: 'retro-arcade',
    nameKo: '80s 레트로',
    nameEn: '80s Retro',
    bg: '#130924',
    cardBg: 'rgba(35, 16, 61, 0.92)',
    accent: '#ff007f',
    accentGlow: 'rgba(255, 0, 127, 0.45)',
    border: 'rgba(255, 230, 0, 0.4)',
    textMain: '#ffffff',
    textSub: '#fef08a',
    badgeColor: '#ffe600',
    badgeBg: 'rgba(255, 230, 0, 0.2)',
    previewGradient: 'linear-gradient(135deg, #130924 0%, #ff007f 100%)',

    keytagTitle: 'ARCADE',
    keytagBg: '#2e0f45',
    keytagBorder: '#ffe600',
    keytagText: '#ffe600',
    keytagShadow: '#ff007f',

    tickerBg: '#210935',
    tickerBorder: 'rgba(255, 0, 127, 0.5)',
    tickerLabel: '#ff007f',
    tickerText: '#ffe600',

    ribbonBg: '#ff007f',
    ribbonFold: '#be005d',
    ribbonText: '#ffe600',

    stripBg: '#1c0d33',
    stripBorder: 'rgba(255, 0, 127, 0.45)',

    stubBg: '#140826',
    stubBorder: 'rgba(255, 230, 0, 0.35)',
    stubText: '#ffe600',
    barcodeColor: '#ff007f',

    ticketBg: '#271247',
    ticketInnerBorder: 'rgba(255, 230, 0, 0.3)',
    ticketTitle: '#ffffff',
    ticketMemo: '#fef08a',
    ticketTime: '#00f0ff',
    flourishColor: 'rgba(255, 0, 127, 0.45)',

    offlineBg: '#351152',
    offlineBorder: '#ff007f',
    offlineText: '#ffe600'
  },
  'minimal-obsidian': {
    id: 'minimal-obsidian',
    nameKo: '미니멀 모노',
    nameEn: 'Minimal Mono',
    bg: '#0a0a0c',
    cardBg: 'rgba(18, 18, 24, 0.96)',
    accent: '#e2e8f0',
    accentGlow: 'rgba(226, 232, 240, 0.2)',
    border: 'rgba(255, 255, 255, 0.18)',
    textMain: '#ffffff',
    textSub: '#cbd5e1',
    badgeColor: '#f8fafc',
    badgeBg: 'rgba(255, 255, 255, 0.1)',
    previewGradient: 'linear-gradient(135deg, #0a0a0c 0%, #cbd5e1 100%)',

    keytagTitle: 'MINIMAL',
    keytagBg: '#18181f',
    keytagBorder: '#94a3b8',
    keytagText: '#ffffff',
    keytagShadow: '#64748b',

    tickerBg: '#131318',
    tickerBorder: 'rgba(255, 255, 255, 0.2)',
    tickerLabel: '#94a3b8',
    tickerText: '#f8fafc',

    ribbonBg: '#e2e8f0',
    ribbonFold: '#94a3b8',
    ribbonText: '#0f172a',

    stripBg: '#121217',
    stripBorder: 'rgba(255, 255, 255, 0.18)',

    stubBg: '#0d0d12',
    stubBorder: 'rgba(255, 255, 255, 0.15)',
    stubText: '#94a3b8',
    barcodeColor: '#cbd5e1',

    ticketBg: '#181820',
    ticketInnerBorder: 'rgba(255, 255, 255, 0.14)',
    ticketTitle: '#ffffff',
    ticketMemo: '#cbd5e1',
    ticketTime: '#f8fafc',
    flourishColor: 'rgba(255, 255, 255, 0.25)',

    offlineBg: '#1e1e26',
    offlineBorder: '#94a3b8',
    offlineText: '#f8fafc'
  },
  'cyberpunk-matrix': {
    id: 'cyberpunk-matrix',
    nameKo: '사이버 매트릭스',
    nameEn: 'Cyber Matrix',
    bg: '#090a0f',
    cardBg: 'rgba(20, 20, 30, 0.94)',
    accent: '#fcee0a',
    accentGlow: 'rgba(252, 238, 10, 0.4)',
    border: 'rgba(0, 240, 255, 0.4)',
    textMain: '#ffffff',
    textSub: '#00f0ff',
    badgeColor: '#fcee0a',
    badgeBg: 'rgba(252, 238, 10, 0.15)',
    previewGradient: 'linear-gradient(135deg, #090a0f 0%, #fcee0a 100%)',

    keytagTitle: 'CYBER',
    keytagBg: '#141824',
    keytagBorder: '#fcee0a',
    keytagText: '#fcee0a',
    keytagShadow: '#00f0ff',

    tickerBg: '#0d111c',
    tickerBorder: 'rgba(0, 240, 255, 0.45)',
    tickerLabel: '#00f0ff',
    tickerText: '#fcee0a',

    ribbonBg: '#fcee0a',
    ribbonFold: '#c8bd04',
    ribbonText: '#05070c',

    stripBg: '#0f131f',
    stripBorder: 'rgba(0, 240, 255, 0.4)',

    stubBg: '#090c15',
    stubBorder: 'rgba(0, 240, 255, 0.3)',
    stubText: '#00f0ff',
    barcodeColor: '#fcee0a',

    ticketBg: '#161c2c',
    ticketInnerBorder: 'rgba(252, 238, 10, 0.28)',
    ticketTitle: '#ffffff',
    ticketMemo: '#00f0ff',
    ticketTime: '#fcee0a',
    flourishColor: 'rgba(0, 240, 255, 0.45)',

    offlineBg: '#1d2233',
    offlineBorder: '#fcee0a',
    offlineText: '#fcee0a'
  }
};

export const STATUS_BADGES: Record<string, StatusBadgeInfo> = {
  live: {
    id: 'live',
    labelKo: '정규방송',
    labelEn: 'Live',
    icon: '🔴',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.15)'
  },
  off: {
    id: 'off',
    labelKo: '휴방',
    labelEn: 'Day Off',
    icon: '💤',
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.15)'
  },
  collab: {
    id: 'collab',
    labelKo: '합방',
    labelEn: 'Collab',
    icon: '🤝',
    color: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.15)'
  },
  new: {
    id: 'new',
    labelKo: '신작게임',
    labelEn: 'New Game',
    icon: '🎮',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.15)'
  },
  viewer: {
    id: 'viewer',
    labelKo: '시청자참여',
    labelEn: 'Viewer Game',
    icon: '🎉',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.15)'
  },
  event: {
    id: 'event',
    labelKo: '특별이벤트',
    labelEn: 'Event',
    icon: '🏆',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)'
  },
  chat: {
    id: 'chat',
    labelKo: '저챗 / 토크',
    labelEn: 'Chatting',
    icon: '💬',
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.15)'
  },
  irl: {
    id: 'irl',
    labelKo: '야외 / 일상',
    labelEn: 'IRL Stream',
    icon: '☀️',
    color: '#f97316',
    bg: 'rgba(249, 115, 22, 0.15)'
  }
};

export const SAMPLE_PRESETS: Record<string, StreamScheduleData> = {
  travelTicket: {
    version: 2,
    viewMode: 'weekly',
    selectedWeekIndex: 2, // 3주차 (9/14~9/20)
    themeId: 'travel-boarding-pass',
    channel: {
      name: '스트리머 아케이드',
      platform: 'chzzk',
      avatarEmoji: '🎮',
      tagline: '매일 저녁 8시 소통 & 종합 게임 방송',
      notice: '📢 이번 주 토요일은 시청자 참여전 & 치킨 이벤트 진행!',
      noticeWeekly: '📢 이번 주 토요일은 시청자 참여전 & 치킨 이벤트 진행!',
      noticeMonthly: '🎯 9월 목표: 주 5회 정규 방송 & 구독자 1만 달성!'
    },
    monthly: {
      year: 2026,
      month: 9,
      monthlyGoal: '🎯 9월 목표: 주 5회 정규 방송 & 구독자 1만 달성!',
      days: {
        14: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '저챗 / 소통', memo: '한 주 시작 토크 & 근황 수다' },
        15: { startTime: '20:00', endTime: '24:00', time: '20:00 ~ 24:00', status: 'live', title: '스팀 종합 게임', memo: '화제의 신작 도전 플레이' },
        16: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'irl', title: '야식 & 먹방', memo: '치킨 먹방 & 소통 토크' },
        17: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'viewer', title: '시청자 참여', memo: '롤 / 배그 시참 내기전' },
        18: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: 'OFFLINE', memo: '정기 휴방 (에너지 충전)' },
        19: { startTime: '19:00', endTime: '자율', time: '19:00 ~ 자율', status: 'event', title: '주말 특별 방송', memo: '공포 게임 켠왕 도전' },
        20: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '주간 결산 & 저챗', memo: '다음 주 일정 안내 & 마무리' }
      }
    }
  },
  varietyGamer: {
    version: 2,
    viewMode: 'weekly',
    selectedWeekIndex: 2,
    themeId: 'chzzk-neon',
    channel: {
      name: '스트리머 아케이드',
      platform: 'chzzk',
      avatarEmoji: '🎮',
      tagline: '매일 저녁 8시 신작 & 종합 게임 방송!',
      notice: '📢 이번 주 토요일은 시청자 참여 돌림판 & 사다리타기 벌칙전 진행!',
      noticeWeekly: '📢 이번 주 토요일은 시청자 참여 돌림판 & 사다리타기 벌칙전 진행!',
      noticeMonthly: '구독자 1만 달성 & 시참 토너먼트 2회 개최'
    },
    monthly: {
      year: 2026,
      month: 9,
      monthlyGoal: '구독자 1만 달성 & 시참 토너먼트 2회 개최',
      days: {
        1: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '9월 첫 방송 & 저챗' },
        2: { startTime: '20:00', endTime: '24:00', time: '20:00 ~ 24:00', status: 'new', title: '스팀 신작 인디게임' },
        3: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '정기 휴방' },
        4: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '심야 토크 & 사연' },
        5: { startTime: '21:00', endTime: '24:00', time: '21:00 ~ 24:00', status: 'collab', title: '스트리머 4인 합방' },
        6: { startTime: '19:00', endTime: '22:00', time: '19:00 ~ 22:00', status: 'viewer', title: '시참 돌림판 대전' },
        7: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'live', title: '롤 솔랭 랭크게임' },
        8: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'live', title: '스팀 신작 탐험' },
        9: { startTime: '20:30', endTime: '23:30', time: '20:30 ~ 23:30', status: 'new', title: '공포게임 켠왕' },
        10: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '정기 휴방' },
        11: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '저챗 & 고민 상담' },
        12: { startTime: '21:00', endTime: '24:00', time: '21:00 ~ 24:00', status: 'collab', title: '배틀로얄 합방' },
        13: { startTime: '19:00', endTime: '22:00', time: '19:00 ~ 22:00', status: 'viewer', title: '구슬 레이스 치킨 내기' },
        14: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '저챗 / 소통' },
        15: { startTime: '20:00', endTime: '24:00', time: '20:00 ~ 24:00', status: 'live', title: '스팀 종합 게임' },
        16: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'irl', title: '야식 & 먹방' },
        17: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'viewer', title: '시청자 참여 게임' },
        18: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '정기 휴방' },
        19: { startTime: '19:00', endTime: '자율', time: '19:00 ~ 자율', status: 'event', title: '주말 특별 방송' },
        20: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '주간 결산 & 저챗' },
        21: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'event', title: '🎉 방송 기념 파티' },
        22: { startTime: '20:00', endTime: '24:00', time: '20:00 ~ 24:00', status: 'live', title: '종합 게임 켠왕' },
        23: { startTime: '20:30', endTime: '23:30', time: '20:30 ~ 23:30', status: 'new', title: '신작 RPG 1일차' },
        24: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '정기 휴방' },
        25: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '수다 & 팬아트 감상' },
        26: { startTime: '21:00', endTime: '24:00', time: '21:00 ~ 24:00', status: 'collab', title: '듀오 팀전 합방' },
        27: { startTime: '19:00', endTime: '22:00', time: '19:00 ~ 22:00', status: 'viewer', title: '월말 룰렛 토너먼트' },
        28: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'live', title: 'RPG 최종 엔딩' },
        29: { startTime: '20:30', endTime: '23:30', time: '20:30 ~ 23:30', status: 'live', title: '9월 결산 어워즈' },
        30: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '10월 일정 준비 휴방' }
      }
    }
  },
  vtuberCozy: {
    version: 2,
    viewMode: 'weekly',
    selectedWeekIndex: 2,
    themeId: 'cozy-pastel',
    channel: {
      name: '체리 마카롱 (Cherry)',
      platform: 'chzzk',
      avatarEmoji: '🌸',
      tagline: '달콤한 힐링 보이스 버튜버 체리입니다 ✨',
      notice: '🍓 목요일은 신규 의상 공개 & 심야 노래 방송입니다!',
      noticeWeekly: '🍓 목요일은 신규 의상 공개 & 심야 노래 방송입니다!',
      noticeMonthly: '신규 오리지널 곡 공개 & 팬미팅 기획'
    },
    monthly: {
      year: 2026,
      month: 9,
      monthlyGoal: '신규 오리지널 곡 공개 & 팬미팅 기획',
      days: {
        1: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'chat', title: '티타임 저챗' },
        2: { startTime: '21:30', endTime: '24:00', time: '21:30 ~ 24:00', status: 'live', title: '동숲 섬 꾸미기 힐링' },
        3: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '보컬 레슨 휴방' },
        4: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'event', title: '노래방 라이브' },
        5: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'collab', title: '4인 파티게임 합방' },
        6: { startTime: '21:00', endTime: '23:00', time: '21:00 ~ 23:00', status: 'viewer', title: '시참 캐치마인드' },
        7: { startTime: '21:00', endTime: '24:00', time: '21:00 ~ 24:00', status: 'event', title: '🎂 생일 카운트다운' },
        8: { startTime: '21:30', endTime: '24:00', time: '21:30 ~ 24:00', status: 'live', title: '포켓몬스터 스칼렛' },
        9: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'chat', title: '생일 언박싱 & 수다' },
        10: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '정기 휴식일' },
        11: { startTime: '22:00', endTime: '새벽', time: '22:00 ~ 새벽', status: 'chat', title: '심야 ASMR & 잠방' },
        12: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'collab', title: '릴레이 노래 합방' },
        13: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'viewer', title: '시청자 마작 대전' },
        14: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '저챗 / 소통' },
        15: { startTime: '20:00', endTime: '24:00', time: '20:00 ~ 24:00', status: 'live', title: '스팀 종합 게임' },
        16: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'irl', title: '야식 & 먹방' },
        17: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'viewer', title: '시청자 참여 게임' },
        18: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '정기 휴방' },
        19: { startTime: '19:00', endTime: '자율', time: '19:00 ~ 자율', status: 'event', title: '주말 특별 방송' },
        20: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'chat', title: '주간 결산 & 저챗' },
        21: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'viewer', title: '팬아트 감상' },
        22: { startTime: '21:00', endTime: '24:00', time: '21:00 ~ 24:00', status: 'live', title: '마인크래프트 건축' },
        23: { startTime: '21:30', endTime: '23:30', time: '21:30 ~ 23:30', status: 'live', title: '쿠키런 킹덤' },
        24: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '체력 충전 휴방' },
        25: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'chat', title: '가을 노래 추천받기' },
        26: { startTime: '20:00', endTime: '23:00', time: '20:00 ~ 23:00', status: 'collab', title: '팀전 합방' },
        27: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'viewer', title: '시참 벌칙게임' },
        28: { startTime: '21:00', endTime: '23:30', time: '21:00 ~ 23:30', status: 'event', title: '가을 특별 낭독회' },
        29: { startTime: '21:30', endTime: '24:00', time: '21:30 ~ 24:00', status: 'live', title: '스팀 힐링 게임' },
        30: { startTime: '휴식', endTime: '', time: '휴식', status: 'off', title: '9월 결산 휴방' }
      }
    }
  }
};
