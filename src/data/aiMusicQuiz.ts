// AI 편곡 노래 맞추기 퀴즈 데이터 및 유틸리티
// 사용자가 얼마든지 자유롭게 곡을 추가하거나 수정할 수 있습니다.

export interface QuizSong {
  id: string;
  title: string;              // 정답 노래 제목 (예: "만약에")
  artist: string;             // 원곡 가수 (예: "태연")
  aliases: string[];          // 인정되는 추가 정답 목록 (영어 제목, 약칭 등)
  aiYoutubeUrl: string;       // AI 편곡 유튜브 링크 (퀴즈 음원으로 재생)
  originalYoutubeUrl: string; // 원곡 유튜브 링크 (타임스탬프 t=166 포함 가능)
  hint?: {
    initials?: string;        // 초성 힌트 (예: "ㅁㅇㅇ")
    genre?: string;           // 장르/분위기 힌트
    releaseYear?: string;     // 발매 연도
  };
}

/**
 * 유튜브 URL에서 Video ID와 시작 시간(초)을 파싱하는 유틸리티
 */
export function parseYoutubeUrl(url: string): { videoId: string; startTime: number } {
  let videoId = '';
  let startTime = 0;

  if (!url) return { videoId, startTime };

  try {
    const trimmed = url.trim();
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);

    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1).split('/')[0].split('?')[0];
    } else if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.replace('/embed/', '').split('/')[0].split('?')[0];
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.replace('/shorts/', '').split('/')[0].split('?')[0];
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }
    }

    // 타임스탬프 파싱 (예: 166, 166s, 2m46s, 1h2m3s)
    const tParam = parsed.searchParams.get('t') || parsed.searchParams.get('start');
    if (tParam) {
      if (/^\d+$/.test(tParam)) {
        startTime = parseInt(tParam, 10);
      } else if (/^\d+s$/i.test(tParam)) {
        startTime = parseInt(tParam.replace(/s/i, ''), 10);
      } else {
        let total = 0;
        const hMatch = tParam.match(/(\d+)h/i);
        const mMatch = tParam.match(/(\d+)m/i);
        const sMatch = tParam.match(/(\d+)s/i);
        if (hMatch) total += parseInt(hMatch[1], 10) * 3600;
        if (mMatch) total += parseInt(mMatch[1], 10) * 60;
        if (sMatch) total += parseInt(sMatch[1], 10);
        if (total > 0) startTime = total;
      }
    }
  } catch {
    const idMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (idMatch) videoId = idMatch[1];
    const tMatch = url.match(/[?&]t=(\d+)/);
    if (tMatch) startTime = parseInt(tMatch[1], 10);
  }

  return { videoId, startTime };
}

/**
 * 정답 판정을 위한 텍스트 정규화 (공백, 문장부호, 대소문자 제거)
 */
export function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '') // 전 세계 모든 문자(한글, 영문 등)와 숫자만 남김
    .trim();
}

/**
 * 레벤슈타인 편집 거리 (오타 허용 계산)
 */
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * 관대한 정답 체크 함수
 */
export function checkAnswer(
  userInput: string,
  song: QuizSong
): { isCorrect: boolean; matchedAlias?: string } {
  const cleanInput = normalizeText(userInput);
  if (!cleanInput) return { isCorrect: false };

  // 1. 검사 대상 정답 후보군 리스트 생성
  const candidates: string[] = [
    song.title,
    song.artist + ' ' + song.title,
    song.title + ' ' + song.artist,
    ...(song.aliases || []),
  ];

  // 2. 정확한 일치 검사 (정규화 후)
  for (const cand of candidates) {
    const cleanCand = normalizeText(cand);
    if (cleanCand && cleanInput === cleanCand) {
      return { isCorrect: true, matchedAlias: cand };
    }
  }

  // 3. 포함 관계 검사 (제목 길이가 3자 이상이고 사용자가 '태연 노래 만약에요' 처럼 입력했을 때)
  const cleanTitle = normalizeText(song.title);
  if (cleanTitle.length >= 3 && cleanInput.includes(cleanTitle)) {
    return { isCorrect: true, matchedAlias: song.title };
  }

  // 4. 레벤슈타인 편집 거리 (오타 관대성)
  // 3~4글자는 1글자 오타 허용, 5글자 이상은 2글자 오타 허용
  for (const cand of candidates) {
    const cleanCand = normalizeText(cand);
    if (!cleanCand) continue;

    const dist = levenshteinDistance(cleanInput, cleanCand);
    const maxAllowedDist = cleanCand.length >= 5 ? 2 : cleanCand.length >= 3 ? 1 : 0;

    if (dist <= maxAllowedDist) {
      return { isCorrect: true, matchedAlias: cand };
    }
  }

  return { isCorrect: false };
}

/**
 * 기본 퀴즈 곡 목록
 * 사용자가 여기에 새로운 곡 객체를 얼마든지 추가할 수 있습니다.
 */
export const QUIZ_SONG_LIST: QuizSong[] = [
  {
    id: 'manyake-taeyeon',
    title: '만약에',
    artist: '태연',
    aliases: ['만약에', 'if', 'manyake', '태연 만약에', '만약에 태연', '쾌도홍길동 ost'],
    aiYoutubeUrl: 'https://www.youtube.com/watch?v=lY1Ox_f9Dp8',
    originalYoutubeUrl: 'https://youtu.be/VR9TC4xxfnQ?si=Hy_Rg4X9aVP0ic0d&t=166',
    hint: {
      initials: 'ㅁㅇㅇ',
      releaseYear: '2008',
      genre: '발라드 / 드라마 OST',
    },
  },
  {
    id: 'horangsuwolga-tophyun',
    title: '호랑수월가',
    artist: '탑현',
    aliases: ['호랑수월가', '호랑수월 가', 'horangsuwolga', '탑현 호랑수월가', '나와 호랑이님'],
    aiYoutubeUrl: 'https://youtu.be/H6by-EQx2ZQ',
    originalYoutubeUrl: 'https://youtu.be/oF4X5OkAiq8?si=YOg06Bq0gpzRaIDU&t=38',
    hint: {
      initials: 'ㅎㄹㅅㅇㄱ',
      releaseYear: '2022',
      genre: '발라드 / 퓨전 국악',
    },
  },
  {
    id: 'sodapop-sajaboys',
    title: '소다팝',
    artist: '케데헌 (사자보이즈)',
    aliases: ['소다팝', 'soda pop', 'sodapop', '케데헌 소다팝', '사자보이즈 소다팝', '케이팝 데몬 헌터스'],
    aiYoutubeUrl: 'https://youtu.be/X947AQ4nrLY',
    originalYoutubeUrl: 'https://youtu.be/eutujBBpEUA?si=jpK03BX2icwNI9Rs&t=35',
    hint: {
      initials: 'ㅅㄷㅍ',
      releaseYear: '2024',
      genre: '애니메이션 OST / 댄스 팝',
    },
  },
  {
    id: 'romantic-cat-cherryfilter',
    title: '낭만고양이',
    artist: '체리필터',
    aliases: ['낭만고양이', '낭만 고양이', 'romantic cat', '체리필터 낭만고양이'],
    aiYoutubeUrl: 'https://youtu.be/3SdjbCPp1nc',
    originalYoutubeUrl: 'https://youtu.be/Nh5Ld4EpXJs?si=sxL2sWCmkRjsR3aQ&t=25',
    hint: {
      initials: 'ㄴㅁㄱㅇㅇ',
      releaseYear: '2002',
      genre: '모던 록 / 펑크 록',
    },
  },
  {
    id: 'rollercoaster-chungha',
    title: 'Roller Coaster',
    artist: '청하',
    aliases: ['롤러코스터', '롤러 코스터', 'roller coaster', 'rollercoaster', '청하 롤러코스터'],
    aiYoutubeUrl: 'https://youtu.be/ljshYaQClcY',
    originalYoutubeUrl: 'https://youtu.be/HB0hzF3oQH0?si=wQRcgOrs_fcHPht0&t=105',
    hint: {
      initials: 'ㄹㄹㅋㅅㅌ',
      releaseYear: '2018',
      genre: 'K-POP / 댄스',
    },
  },
  {
    id: 'really-love-you-jangbeomjune',
    title: '정말로 사랑한다면',
    artist: '장범준 (버스커 버스커)',
    aliases: ['정말로 사랑한다면', '정말로사랑한다면', 'if you really love me', '장범준 정말로 사랑한다면', '버스커 버스커 정말로 사랑한다면'],
    aiYoutubeUrl: 'https://youtu.be/jrqZpsxdgK4',
    originalYoutubeUrl: 'https://youtu.be/5HX5gxQPBag?si=khn04I_8Ko4bzeTY&t=96',
    hint: {
      initials: 'ㅈㅁㄹ ㅅㄹㅎㄷㅁ',
      releaseYear: '2012',
      genre: '포크 록 / 어쿠스틱',
    },
  },
  {
    id: 'twenty-five-jaurim',
    title: '스물다섯, 스물하나',
    artist: '자우림',
    aliases: ['스물다섯스물하나', '스물다섯 스물하나', '스물다섯, 스물하나', 'twenty five twenty one', '25 21', '2521', '자우림 스물다섯 스물하나'],
    aiYoutubeUrl: 'https://youtu.be/xzRln6jxSeY',
    originalYoutubeUrl: 'https://youtu.be/XVLF2e8lCHo?si=0XeaVK6lDR4IMeeA&t=100',
    hint: {
      initials: 'ㅅㅁㄷㅅ ㅅㅁㅎㄴ',
      releaseYear: '2013',
      genre: '모던 록',
    },
  },
  {
    id: 'love-always-runs-limyoungwoong',
    title: '사랑은 늘 도망가',
    artist: '임영웅',
    aliases: ['사랑은 늘 도망가', '사랑은늘도망가', '사랑은 늘도망가', 'love always runs away', '신사와 아가씨 ost', '임영웅 사랑은 늘 도망가'],
    aiYoutubeUrl: 'https://youtu.be/LMewsROFQXI',
    originalYoutubeUrl: 'https://youtu.be/pVC1DU_IPlQ?si=YPS97AG-jtSMUxtJ',
    hint: {
      initials: 'ㅅㄹㅇ ㄴ ㄷㅁㄱ',
      releaseYear: '2021',
      genre: '발라드 / 드라마 OST',
    },
  },
  {
    id: 'be-mine-infinite',
    title: '내꺼하자',
    artist: '인피니트',
    aliases: ['내꺼하자', '내꺼 하자', 'be mine', 'bemine', '인피니트 내꺼하자'],
    aiYoutubeUrl: 'https://youtu.be/mPx9GMUr5XY',
    originalYoutubeUrl: 'https://youtu.be/WvR8iihYONs?si=JWrKk25X5J-J2t_A&t=89',
    hint: {
      initials: 'ㄴㄲㅎㅈ',
      releaseYear: '2011',
      genre: 'K-POP / 신스팝 댄스',
    },
  },
  {
    id: 'new-future-leeyongshin',
    title: 'New Future',
    artist: '이용신',
    aliases: ['new future', 'newfuture', '뉴 퓨처', '뉴퓨처', '달빛천사', '달빛천사 ost', '이용신 new future', '이용선 new future'],
    aiYoutubeUrl: 'https://youtu.be/zjU5F4PJYpY',
    originalYoutubeUrl: 'https://youtu.be/hejr_Ypo0LQ?si=pRFj6ChxTVv3CQVm&t=119',
    hint: {
      initials: 'ㄴㅍㅊ',
      releaseYear: '2004',
      genre: '애니메이션 OST / 팝',
    },
  },
  {
    id: 'oort-cloud-younha',
    title: '오르트구름',
    artist: '윤하',
    aliases: ['오르트구름', '오르트 구름', 'oort cloud', '윤하 오르트구름', '윤하 오르트 구름'],
    aiYoutubeUrl: 'https://youtu.be/4o8iUkpPErE',
    originalYoutubeUrl: 'https://youtu.be/cFgk2PMgPJ4?si=0qqOsABr30PMaVkU&t=67',
    hint: {
      initials: 'ㅇㄹㅌㄱㄹ',
      releaseYear: '2021',
      genre: '팝 록 / 컨트리 록',
    },
  },
  {
    id: 'black-mamba-aespa',
    title: 'Black Mamba',
    artist: '에스파',
    aliases: ['블랙맘바', '블랙 맘바', 'black mamba', 'blackmamba', '에스파 블랙맘바'],
    aiYoutubeUrl: 'https://youtu.be/V-XV7eY13oI',
    originalYoutubeUrl: 'https://youtu.be/6eOAT4eRIDM?si=TtUls_uPRg6u9tZG&t=24',
    hint: {
      initials: 'ㅂㄹㅁㅂ',
      releaseYear: '2020',
      genre: 'K-POP / 댄스 팝',
    },
  },
  {
    id: 'changgwi-ahnyeeun',
    title: '창귀',
    artist: '안예은',
    aliases: ['창귀', 'changgwi', '안예은 창귀'],
    aiYoutubeUrl: 'https://youtu.be/8BnaCpUE1OA',
    originalYoutubeUrl: 'https://youtu.be/8ChQm6HUhmA?si=4CjDkBVcWJkr3g1e&t=16',
    hint: {
      initials: 'ㅊㄱ',
      releaseYear: '2021',
      genre: '퓨전 국악 / 아트 록',
    },
  },
  {
    id: 'sangsahwa-ahnyeeun',
    title: '상사화',
    artist: '안예은',
    aliases: ['상사화', 'sangsahwa', '역적 ost', '안예은 상사화'],
    aiYoutubeUrl: 'https://youtu.be/JicaRcxklFQ',
    originalYoutubeUrl: 'https://youtu.be/AVUeL6RMHoo?si=4fT9PaaFBZGtaQJ7&t=104',
    hint: {
      initials: 'ㅅㅅㅎ',
      releaseYear: '2017',
      genre: '발라드 / 국악 가요',
    },
  },
  {
    id: 'frys-dream-akmu',
    title: '후라이의 꿈',
    artist: 'AKMU (악뮤)',
    aliases: ['후라이의 꿈', '후라이의꿈', 'fry\'s dream', 'frys dream', '계란후라이', '악뮤 후라이의 꿈', '악동뮤지션 후라이의 꿈'],
    aiYoutubeUrl: 'https://youtu.be/Sm5cWADhvCQ',
    originalYoutubeUrl: 'https://youtu.be/R5QgjCB9skQ?si=T5364TLQl0cVR3cb&t=7',
    hint: {
      initials: 'ㅎㄹㅇㅇ ㄲ',
      releaseYear: '2023',
      genre: '어쿠스틱 팝',
    },
  },
  {
    id: 'gangnam-style-psy',
    title: '강남스타일',
    artist: '싸이',
    aliases: ['강남스타일', '강남 스타일', 'gangnam style', 'gangnamstyle', '싸이 강남스타일'],
    aiYoutubeUrl: 'https://youtu.be/-CEy_NTPTzU',
    originalYoutubeUrl: 'https://youtu.be/y5ggaJEyhzU?si=_ZeSkHtnIiYTJ5TU&t=112',
    hint: {
      initials: 'ㄱㄴㅅㅌㅇ',
      releaseYear: '2012',
      genre: 'K-POP / 일렉트로하우스',
    },
  },
  {
    id: 'bam-yang-gang-bibi',
    title: '밤양갱',
    artist: '비비',
    aliases: ['밤양갱', '밤 양갱', 'bam yang gang', 'bamyanggang', '비비 밤양갱'],
    aiYoutubeUrl: 'https://youtu.be/nM-RnQqQJFs',
    originalYoutubeUrl: 'https://youtu.be/ayREauImhZg?si=rmM8XBk-popm8ltF&t=51',
    hint: {
      initials: 'ㅂㅇㄱ',
      releaseYear: '2024',
      genre: '왈츠 / 팝',
    },
  },
  {
    id: 'ddudu-ddudu-blackpink',
    title: '뚜두뚜두',
    artist: 'BLACKPINK',
    aliases: ['뚜두뚜두', '뚜두 뚜두', 'ddu-du ddu-du', 'ddu du ddu du', 'ddudu ddudu', '블랙핑크 뚜두뚜두'],
    aiYoutubeUrl: 'https://youtu.be/DlMRPlwco0Q',
    originalYoutubeUrl: 'https://youtu.be/VWiiOQL4-so?si=hk5_2ikysqmLk6Ul&t=36',
    hint: {
      initials: 'ㄸㄷㄸㄷ',
      releaseYear: '2018',
      genre: 'K-POP / 트랩 힙합',
    },
  },
  {
    id: 'give-you-the-universe-bol4',
    title: '우주를 줄게',
    artist: '볼빨간사춘기',
    aliases: ['우주를 줄게', '우주를줄게', 'galaxy', 'give you the universe', '볼빨간사춘기 우주를 줄게', '볼사 우주를 줄게'],
    aiYoutubeUrl: 'https://youtu.be/MlCqHf8e0kw',
    originalYoutubeUrl: 'https://youtu.be/uq8zbeiFY-U?si=GX6cLzqVtSctBnTP&t=102',
    hint: {
      initials: 'ㅇㅈㄹ ㅈㄱ',
      releaseYear: '2016',
      genre: '인디 팝 / 어쿠스틱',
    },
  },
  {
    id: 'a-walk-yerinbaek',
    title: '산책',
    artist: '백예린',
    aliases: ['산책', 'a walk', 'the walk', '백예린 산책', '이소라 산책'],
    aiYoutubeUrl: 'https://youtu.be/C4Q4rW0lwEA',
    originalYoutubeUrl: 'https://youtu.be/iAeeTin1uCA?si=d5RCvEYlImGaVBhc&t=82',
    hint: {
      initials: 'ㅅㅊ',
      releaseYear: '2021',
      genre: '발라드 / 인디',
    },
  },
  {
    id: 'um-oh-ah-yeh-mamamoo',
    title: '음오아예',
    artist: '마마무',
    aliases: ['음오아예', '음 오 아 예', 'um oh ah yeh', 'umohahyeh', '마마무 음오아예'],
    aiYoutubeUrl: 'https://youtu.be/pI4q4Jr3DOw',
    originalYoutubeUrl: 'https://youtu.be/Z8my_ZwZjGs?si=976LvYkqdUyQlj-y&t=140',
    hint: {
      initials: 'ㅇㅇㅇㅇ',
      releaseYear: '2015',
      genre: 'R&B / 댄스',
    },
  },
  {
    id: 'fearless-lesserafim',
    title: 'FEARLESS',
    artist: 'LE SSERAFIM',
    aliases: ['피어리스', 'fearless', '르세라핌 피어리스', '르세라핌 fearless'],
    aiYoutubeUrl: 'https://youtu.be/akfVd-hg5Go',
    originalYoutubeUrl: 'https://youtu.be/PLGFeCanIeA?si=3wcdhklOMYEPIJKD&t=90',
    hint: {
      initials: 'ㅍㅇㄹㅅ',
      releaseYear: '2022',
      genre: 'K-POP / 얼터너티브 팝',
    },
  },
  {
    id: 'apt-rose-brunomars',
    title: 'APT.',
    artist: '로제 & Bruno Mars',
    aliases: ['아파트', 'apt', 'apt.', '로제 아파트', '로제 apt'],
    aiYoutubeUrl: 'https://youtu.be/K0ytZaXuCtY',
    originalYoutubeUrl: 'https://youtu.be/lpP7rIm0rDU?si=EYuLnD3j4_aEpzrL&t=56',
    hint: {
      initials: 'ㅇㅍㅌ',
      releaseYear: '2024',
      genre: '팝 펑크 / 댄스 팝',
    },
  },
  {
    id: 'confession-delispice',
    title: '고백',
    artist: '델리스파이스',
    aliases: ['고백', 'confession', '클래식 ost', '델리스파이스 고백'],
    aiYoutubeUrl: 'https://youtu.be/6p0xWLELnUE',
    originalYoutubeUrl: 'https://youtu.be/F0aPN-ZiZlA?si=GaN5ZS7a9ODdyEET&t=71',
    hint: {
      initials: 'ㄱㅂ',
      releaseYear: '2003',
      genre: '모던 록 / 영화 OST',
    },
  },
  {
    id: 'ditto-newjeans',
    title: 'Ditto',
    artist: 'NewJeans',
    aliases: ['디토', 'ditto', '뉴진스 디토'],
    aiYoutubeUrl: 'https://youtu.be/UJkjPo605aI',
    originalYoutubeUrl: 'https://youtu.be/kXUiNNN5zy8?si=hCBvT1jzipWfZfip&t=27',
    hint: {
      initials: 'ㄷㅌ',
      releaseYear: '2022',
      genre: '볼티모어 클럽 / 신스팝',
    },
  },
  {
    id: 'patissiere-iu',
    title: '내 꿈은 파티시엘',
    artist: '아이유 (꿈빛 파티시엘)',
    aliases: ['내 꿈은 파티시엘', '내꿈은파티시엘', '꿈빛 파티시엘', '꿈빛파티시엘', '파티시엘', '아이유 꿈빛 파티시엘'],
    aiYoutubeUrl: 'https://youtu.be/-qunjCyQ2L0',
    originalYoutubeUrl: 'https://youtu.be/II9uWXKgkm0?si=VRm1_t6-9FyhwF8z&t=45',
    hint: {
      initials: 'ㄴㄲㅇ ㅍㅌㅅㅇ',
      releaseYear: '2010',
      genre: '애니메이션 주제가 / 팝',
    },
  },
  {
    id: 'tbh-qwer',
    title: '고민중독',
    artist: 'QWER',
    aliases: ['고민중독', '고민 중독', 'tbh', 't.b.h', 'qwer 고민중독'],
    aiYoutubeUrl: 'https://youtu.be/Yt45Lt1KAkM',
    originalYoutubeUrl: 'https://youtu.be/hFTs6HbtxbE?si=6lZRnhfvk1tlzpEl&t=122',
    hint: {
      initials: 'ㄱㅁㅈㄷ',
      releaseYear: '2024',
      genre: 'J-Rock / 팝 펑크',
    },
  },
  {
    id: 'love-scenario-ikon',
    title: '사랑을 했다',
    artist: 'iKON',
    aliases: ['사랑을 했다', '사랑을했다', 'love scenario', 'lovescenario', '아이콘 사랑을 했다'],
    aiYoutubeUrl: 'https://youtu.be/Uj3KRD-fOmk',
    originalYoutubeUrl: 'https://youtu.be/thyuCZVaaq4?si=w1GtcpvIKna4VaxO&t=34',
    hint: {
      initials: 'ㅅㄹㅇ ㅎㄷ',
      releaseYear: '2018',
      genre: 'K-POP / 미디엄 템포',
    },
  },
  {
    id: 'fansa-honeyworks',
    title: '팬서비스',
    artist: 'HoneyWorks',
    aliases: ['팬서비스', '팬 서비스', 'fansa', 'ファンサ', '허니웍스 팬서비스', '모나 팬서비스'],
    aiYoutubeUrl: 'https://youtu.be/RuD0gmAa4IM',
    originalYoutubeUrl: 'https://youtu.be/lzyDD8bMDKs?si=ieHLyDITRgAHmH0M&t=184',
    hint: {
      initials: 'ㅍㅅㅂㅅ',
      releaseYear: '2019',
      genre: 'J-POP / 애니송',
    },
  },
  {
    id: 'growl-exo',
    title: '으르렁',
    artist: 'EXO',
    aliases: ['으르렁', 'growl', '엑소 으르렁', 'exo 으르렁'],
    aiYoutubeUrl: 'https://youtu.be/5s9f03H8xOM',
    originalYoutubeUrl: 'https://youtu.be/sOixnh0jUAI?si=4zQwcbA_OeDRlPi9&t=126',
    hint: {
      initials: 'ㅇㄹㄹ',
      releaseYear: '2013',
      genre: 'K-POP / 어반 R&B',
    },
  },
  {
    id: 'heart-attack-aoa',
    title: '심쿵해',
    artist: 'AOA',
    aliases: ['심쿵해', '심쿵 해', 'heart attack', 'heartattack', 'aoa 심쿵해'],
    aiYoutubeUrl: 'https://youtu.be/eliQg9GmKXk',
    originalYoutubeUrl: 'https://youtu.be/nddgpw_hoh8?si=Q_zhIg25DP2RW6rZ&t=36',
    hint: {
      initials: 'ㅅㅋㅎ',
      releaseYear: '2015',
      genre: 'K-POP / 일렉트로 팝',
    },
  },
];
