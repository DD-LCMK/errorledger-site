export interface CognitiveFunctionDetail {
  code: string; // 'Ni', 'Ne', 'Si', 'Se', 'Ti', 'Te', 'Fi', 'Fe'
  nameKo: string;
  nameEn: string;
  descKo: string;
  descEn: string;
}

export interface MbtiProfile {
  code: string;
  nameKo: string;
  nameEn: string;
  badge: string;
  keywords: string[];
  mottoKo: string;
  mottoEn: string;
  overviewKo: string;
  overviewEn: string;
  cognitiveFunctions: {
    dominant: CognitiveFunctionDetail;
    auxiliary: CognitiveFunctionDetail;
    tertiary: CognitiveFunctionDetail;
    inferior: CognitiveFunctionDetail;
  };
  strengthsKo: string[];
  strengthsEn: string[];
  weaknessesKo: string[];
  weaknessesEn: string[];
  stressLoopKo: string;
  stressLoopEn: string;
  career: {
    bestEnvironmentKo: string;
    bestEnvironmentEn: string;
    recommendedCareers: string[];
    workStyleKo: string;
    workStyleEn: string;
  };
  relationship: {
    loveStyleKo: string;
    loveStyleEn: string;
    bestMatches: string[];
    bestMatchReasonKo: string;
    bestMatchReasonEn: string;
    challengingMatches: string[];
    challengingMatchReasonKo: string;
    challengingMatchReasonEn: string;
  };
  streamerStyle: {
    personaKo: string;
    personaEn: string;
    viewerDynamicKo: string;
    viewerDynamicEn: string;
    recommendedContent: string[];
  };
  growthAdviceKo: string;
  growthAdviceEn: string;
  famousFigures: string[];
}

export const MBTI_PROFILES: Record<string, MbtiProfile> = {
  INTJ: {
    code: 'INTJ',
    nameKo: '용의주도한 전략가',
    nameEn: 'The Mastermind Strategist',
    badge: '♟️ 전략과 거시적 통찰의 설계자',
    keywords: ['전략적 사고', '독립성', '높은 기준', '미래 통찰'],
    mottoKo: '"모든 문제는 치밀한 시스템과 통찰력으로 해결할 수 있다."',
    mottoEn: '"Everything is an intellectual puzzle awaiting a grand strategic solution."',
    overviewKo: 'INTJ는 비전과 현실적 집행력을 겸비한 희귀한 전략가 유형입니다. 머릿속에 수십 수 앞을 내다보는 거대한 체스판을 펼쳐두고 살아가며, 직관적 통찰(Ni)을 통해 복잡한 현상의 본질을 단숨에 꿰뚫습니다. 지적 호기심이 극도로 왕성하며, 비효율적이거나 관습적인 것을 견디지 못하고 끊임없이 시스템을 최적화하려는 강한 욕구를 지닙니다. 감정보다는 논리와 결과로 증명하는 것을 신뢰하며, 타인의 평가에 흔들리지 않는 단단한 내면세계를 구축하고 있습니다.',
    overviewEn: 'INTJs are visionaries with an unyielding drive to turn insights into structured reality. Guided by Introverted Intuition (Ni) and Extraverted Thinking (Te), they see the world as a complex chessboard, perceiving patterns and future outcomes far in advance. They have little patience for inefficiency or dogmatic rules, relentlessly optimizing systems and holding themselves and others to rigorous intellectual standards.',
    cognitiveFunctions: {
      dominant: {
        code: 'Ni',
        nameKo: '내향 직관 (주기능)',
        nameEn: 'Introverted Intuition (Dominant)',
        descKo: '복잡한 파편 속에서 미래의 핵심 패턴과 통찰을 단숨에 수렴해 내는 정신적 레이더.',
        descEn: 'Synthesizes subconscious impressions into powerful strategic visions and future foresight.'
      },
      auxiliary: {
        code: 'Te',
        nameKo: '외향 사고 (부기능)',
        nameEn: 'Extraverted Thinking (Auxiliary)',
        descKo: '머릿속 비전을 현실의 체계적 시스템, 논리적 로드맵, 명확한 결과물로 실현하는 실행 엔진.',
        descEn: 'Applies rigorous logic, structured efficiency, and actionable milestones to manifest the vision.'
      },
      tertiary: {
        code: 'Fi',
        nameKo: '내향 감정 (3차기능)',
        nameEn: 'Introverted Feeling (Tertiary)',
        descKo: '겉으로는 차가워 보이지만 내면 깊숙이 간직한 확고한 도덕적 신념과 순수한 가치관.',
        descEn: 'A quiet, intensely private core of authentic personal values and selective loyalty.'
      },
      inferior: {
        code: 'Se',
        nameKo: '외향 감각 (열등기능)',
        nameEn: 'Extraverted Sensing (Inferior)',
        descKo: '스트레스 상황에서 현재의 물리적 감각에 압도당하거나 충동적 과소비/과식 등으로 폭주할 위험.',
        descEn: 'Vulnerable to sensory overload, impulsive indulgences, or obsessive physical fixation under severe stress.'
      }
    },
    strengthsKo: [
      '미래의 흐름과 위험 요소를 미리 감지하는 탁월한 전략적 선견지명',
      '복잡하고 혼란스러운 상황에서도 흔들리지 않는 냉철한 객관성과 결단력',
      '비효율적인 절차를 혁신하여 극대화된 생산성 시스템 구축',
      '외부의 압력이나 유행에 휩쓸리지 않는 강력한 자율성과 주체성',
      '지적 호기심을 바탕으로 한 깊이 있는 전문 지식 습득 능력'
    ],
    strengthsEn: [
      'Exceptional strategic foresight capable of anticipating long-term trajectory and pitfalls',
      'Unwavering objectivity and decisiveness in high-pressure, ambiguous situations',
      'Natural talent for restructuring chaotic systems into streamlined, high-efficiency workflows',
      'Fierce independence unaffected by external peer pressure or fleeting trends',
      'Deep intellectual stamina and dedication to mastering specialized domains'
    ],
    weaknessesKo: [
      '타인의 감정적 뉘앙스를 지나치게 논리적으로만 재단하여 냉정하다는 오해를 받음',
      '자신의 기준에 미치지 못하는 사람이나 비효율적인 관행에 대한 강한 오만과 인내심 부족',
      '모든 것을 머릿속에서 완벽히 통제하려다 겪는 만성적인 과로와 정신적 피로',
      '예기치 못한 감각적 변수나 즉흥적인 상황 변화에 대한 초기 적응 저항',
      '속마음을 표현하지 않아 가까운 사람들과의 정서적 교감에 거리감이 생김'
    ],
    weaknessesEn: [
      'Can appear aloof or dismissive by reducing deeply emotional situations to cold logic',
      'Impatience and arrogance toward perceived incompetence or redundant bureaucratic rituals',
      'Mental exhaustion caused by a relentless desire to plan and control every contingency',
      'Difficulty adapting fluidly to chaotic, unplanned sensory disruptions in real time',
      'Struggles with emotional vulnerability, creating accidental distance in personal relationships'
    ],
    stressLoopKo: '극심한 고립이나 실패를 겪을 때 Ni-Fi 루프에 빠져 세상에 대해 냉소적인 염세주의자가 되거나, 열등기능 Se가 폭주(Grip)하여 충동적인 소비, 폭식, 게임 중독 등 감각적 쾌락에 무의식적으로 매몰될 수 있습니다. 해결책은 Te를 다시 가동하여 작고 구체적인 현실의 성과를 하나씩 만들어내고 몸을 가볍게 움직이는 것입니다.',
    stressLoopEn: 'Under prolonged stress, INTJs may fall into a Ni-Fi loop of hyper-critical cynicism, or suffer a Se-grip outburst marked by impulsive bingeing, reckless spending, or sensory fixation. Recovery comes through reactivating auxiliary Te: setting tangible micro-goals, organizing workflows, and engaging in physical reality.',
    career: {
      bestEnvironmentKo: '자율성이 보장되고 지적 엄밀함과 실력으로 평가받는 독립적 전략/연구 환경',
      bestEnvironmentEn: 'Autonomy-rich environments valuing intellectual rigor, meritocracy, and strategic design',
      recommendedCareers: ['데이터 과학자', '소프트웨어 아키텍트', '경영 전략 컨설턴트', '투자 분석가', '연구원', '시스템 엔지니어', '전략 기획자', '변리사'],
      workStyleKo: '불필요한 회의를 극도로 혐오하며, 명확한 목표와 기한 아래 각자 전문성을 발휘하는 구조화된 협업을 지향합니다. 탁월한 전략적 리더십을 발휘합니다.',
      workStyleEn: 'Despises unnecessary meetings; excels as an architectural leader who delegates tasks with clear objectives and expects high-standard autonomy.'
    },
    relationship: {
      loveStyleKo: '사랑을 가볍게 시작하지 않지만, 한번 선택한 상대에게는 흔들림 없는 충성과 장기적인 헌신을 바칩니다. 말보다는 문제 해결과 든든한 서포트로 애정을 증명합니다.',
      loveStyleEn: 'Cautious and slow to commit, but fiercely loyal and dedicated once bonded. Shows love through dedicated problem-solving and quiet personal investment.',
      bestMatches: ['ENFP', 'ENTP'],
      bestMatchReasonKo: 'ENFP와 ENTP의 자유롭고 기발한 영감(Ne)은 INTJ의 굳은 생각을 활짝 열어주며, INTJ의 든든한 현실화 능력(Te)은 이들에게 안정감을 선물하는 최고의 케미스트리입니다.',
      bestMatchReasonEn: 'The sparkling novelty and boundless optimism of ENFP/ENTP unlock the INTJ’s guarded heart, while INTJ provides grounding stability and strategic clarity.',
      challengingMatches: ['ESFP', 'ISFJ'],
      challengingMatchReasonKo: '순간의 오감과 감정 표현을 중시하는 유형과는 대화의 초점(거시적 미래 vs 현재의 감각)이 달라 깊은 인내심과 상호 배려가 필요합니다.',
      challengingMatchReasonEn: 'Differing cognitive axes (sensory immediacy vs future abstraction) require intentional communication and mutual grace.'
    },
    streamerStyle: {
      personaKo: '지적인 훈수 없는 클린 플레이, 철저한 빌드 분석과 공략 강의를 선보이는 전략가형 크리에이터',
      personaEn: 'Strategic masterclass creator offering analytical build breakdowns, deep lore dissections, and high-IQ gameplay',
      viewerDynamicKo: '채팅창의 어그로나 분탕에 전혀 휘둘리지 않으며, 질의응답과 깊이 있는 토크로 충성도 높은 코어 팬덤을 구축합니다.',
      viewerDynamicEn: 'Completely unbothered by trolls; cultivates an intensely loyal community through insightful commentary and dry humor.',
      recommendedContent: ['턴제 전략 게임 (시빌라이제이션, 체스)', '심도 있는 경제/과학 토크', '고난도 하드코어 로그라이크 공략']
    },
    growthAdviceKo: '완벽주의의 잣대를 조금만 내려놓으세요. 세상의 모든 사람이 효율성만으로 살아가지 않으며, 논리보다 따뜻한 공감 한마디가 더 큰 기적을 만들어낸다는 것을 인정할 때 진정한 대가로 거듭납니다.',
    growthAdviceEn: 'Learn to embrace emotional nuance and imperfect human reality. Soften your standards with empathy; not every problem requires optimization—some just need presence.',
    famousFigures: ['엘론 머스크', '마크 저커버그', '니체', '아이작 뉴턴', '크리스토퍼 놀란', '셜록 홈즈 (BBC)']
  },

  INTP: {
    code: 'INTP',
    nameKo: '논리적인 사색가',
    nameEn: 'The Logician Innovator',
    badge: '🔬 끝없는 진리 탐구와 논리적 분석가',
    keywords: ['논리적 엄밀성', '독창적 아이디어', '지적 호기심', '개념 분석'],
    mottoKo: '"우주의 모든 원리는 정밀한 논리와 메커니즘으로 분해될 수 있다."',
    mottoEn: '"Question everything, dissect every premise, and seek the fundamental truth."',
    overviewKo: 'INTP는 지적 호기심과 이론적 통찰이 가장 발달한 철학자이자 시스템 분석가입니다. 주기능 내향사고(Ti)를 통해 세상 모든 개념의 논리적 모순을 면도날처럼 날카롭게 도려내며, 부기능 외향직관(Ne)으로 기상천외한 아이디어와 가능성을 끊임없이 창출합니다. 권위나 전통에 얽매이지 않고 오직 "진실인가, 논리적인가"만을 기준으로 세상을 바라봅니다. 일상의 사소한 규칙에는 무관심하지만, 흥미를 끄는 이론을 만나면 며칠 밤을 새워 몰입하는 열정적인 두뇌를 지니고 있습니다.',
    overviewEn: 'INTPs are innovative thinkers who analyze the world through rigorous internal frameworks. Driven by Introverted Thinking (Ti) and Extraverted Intuition (Ne), they dissect complex systems down to first principles. Uninterested in arbitrary authority or social pretenses, they care purely for truth, intellectual exploration, and theoretical elegance.',
    cognitiveFunctions: {
      dominant: {
        code: 'Ti',
        nameKo: '내향 사고 (주기능)',
        nameEn: 'Introverted Thinking (Dominant)',
        descKo: '개념의 모순을 감지하고 정밀한 논리적 내부 모델을 세공하는 지적 필터.',
        descEn: 'Builds intricate internal architectures of logic, analyzing concepts for absolute internal consistency.'
      },
      auxiliary: {
        code: 'Ne',
        nameKo: '외향 직관 (부기능)',
        nameEn: 'Extraverted Intuition (Auxiliary)',
        descKo: '사방으로 뻗어나가는 무한한 가능성과 새로운 아이디어를 폭발시키는 상상력 안테나.',
        descEn: 'Connects unconventional ideas and generates exploratory theories across diverse disciplines.'
      },
      tertiary: {
        code: 'Si',
        nameKo: '내향 감각 (3차기능)',
        nameEn: 'Introverted Sensing (Tertiary)',
        descKo: '과거의 방대한 지식 데이터베이스를 보관하고 필요할 때 디테일을 인출하는 서고.',
        descEn: 'Catalogs technical trivia and personal memories that anchor theories to verifiable references.'
      },
      inferior: {
        code: 'Fe',
        nameKo: '외향 감정 (열등기능)',
        nameEn: 'Extraverted Feeling (Inferior)',
        descKo: '사회적 의례나 감정적 기대를 맞추는 데 극심한 피로를 느끼며, 오해받았을 때 소외감을 느낌.',
        descEn: 'Sensitive to social rejection; feels awkward navigating unspoken social etiquettes or group sentiments.'
      }
    },
    strengthsKo: [
      '어떤 복잡한 문제도 근본 원리(First Principles) 단위로 해체하여 파악하는 분석력',
      '기존 통념을 뒤엎는 기발하고 독창적인 발상과 혁신적 관점',
      '새로운 지식과 학문을 빠르게 흡수하고 응용하는 학습 능력',
      '편견과 감정에 치우치지 않는 공정하고 개방적인 지적 태도',
      '흥미가 생기면 무서운 집중력으로 난제를 해결해 내는 문제 해결사'
    ],
    strengthsEn: [
      'Peerless analytical capability to deconstruct convoluted problems down to core axioms',
      'Brilliant, out-of-the-box thinking unconstrained by dogma or conventional wisdom',
      'Rapid intellectual absorption and theoretical synthesis across multiple disciplines',
      'Open-minded, intellectually honest, and detached from irrational biases',
      'Tenacious problem-solving stamina when captivated by a challenging conceptual riddle'
    ],
    weaknessesKo: [
      '아이디어를 시작하는 것은 능숙하지만 마무리 짓고 실행하는 추진력 부족',
      '논리적 결함을 지적하느라 상대방의 감정선을 본의 아니게 건드리는 화법',
      '일상의 사소한 집안일, 행정 절차, 마감 기한 관리에 대한 만성적 무관심',
      '자신의 머릿속에서는 완벽하지만 타인에게 쉽게 설명하는 데 겪는 어려움',
      '사회적 스몰토크나 형식적인 의례 자리에서 느끼는 극도의 피로감'
    ],
    weaknessesEn: [
      'Chronic procrastination; excels at ideation but struggles with tedious follow-through',
      'Blunt, critical communication that inadvertently invalidates emotional sensibilities',
      'Apathy toward routine administration, household chores, and structured deadlines',
      'Difficulty articulating dense internal abstractions into accessible language for non-experts',
      'Exhaustion and awkwardness in formal small-talk and ritualized social settings'
    ],
    stressLoopKo: 'Ti-Si 루프에 빠지면 과거의 실수나 오점을 집요하게 반추하며 침대 밖으로 나오지 않으려 하거나, 열등 Fe 폭주로 인해 사람들에게 갑작스러운 감정 폭발을 보인 뒤 깊은 수치심을 느낄 수 있습니다. Ne를 깨우기 위해 새로운 책, 낯선 호기심의 분야, 가벼운 산책과 외부 자극을 수혈해야 합니다.',
    stressLoopEn: 'In a Ti-Si loop, INTPs obsess over past blunders and withdraw into intellectual paralysis. An Fe grip triggers sudden hypersensitive emotional outbursts. Reigniting Ne through novel research topics, fresh external stimuli, and creative play restores balance.',
    career: {
      bestEnvironmentKo: '관료적 통제 없이 지적 탐구와 자율적인 문제 해결이 가능한 유연한 연구 개발 환경',
      bestEnvironmentEn: 'Unstructured, autonomous think-tank environments prioritizing innovation and pure problem solving',
      recommendedCareers: ['소프트웨어 개발자', 'AI/머신러닝 엔지니어', '순수수학/물리학자', '철학자', '보안 연구원', '시스템 분석가', '게임 디자이너', '데이터 엔지니어'],
      workStyleKo: '규격화된 출퇴근이나 깐깐한 감시를 싫어하며, 자유로운 환경에서 최고의 난제를 혼자 파고들 때 놀라운 결과물을 만들어냅니다.',
      workStyleEn: 'Thrives when given an open-ended brief and freedom to experiment, creating elegant solutions away from micro-management.'
    },
    relationship: {
      loveStyleKo: '연애에서도 지적인 티키타카와 영혼의 대화가 필수적입니다. 감정 표현은 서툴지만, 상대방의 성장을 진심으로 응원하고 구속하지 않는 가장 편안한 쉼터가 되어줍니다.',
      loveStyleEn: 'Values intellectual chemistry and deep conversation above all. Shy with emotional displays, but supportive, unpossessive, and deeply loyal.',
      bestMatches: ['ENTJ', 'ENFJ'],
      bestMatchReasonKo: 'ENTJ의 확고한 실행력과 리더십은 INTP의 아이디어를 현실로 꽃피우며, INTP의 정교한 논리는 ENTJ의 맹점을 채워주는 완벽한 지적 동반자입니다.',
      bestMatchReasonEn: 'ENTJ’s decisive momentum turns INTP’s brilliant blueprints into reality, forming an unstoppable intellectual powerhouse.'
    },
    streamerStyle: {
      personaKo: '엉뚱한 실험, 극한의 게임 메커니즘 분석, 기상천외한 버그 발견으로 뇌지컬을 뽐내는 연구원형 스트리머',
      personaEn: 'Mad scientist streamer experimenting with obscure game mechanics, uncovering glitch physics, and theoretical deep-dives',
      viewerDynamicKo: '시청자들과 편안하게 토론하고 엉뚱한 밈(Meme)을 나누며, 지적이면서도 친근한 아지트 분위기를 만듭니다.',
      viewerDynamicEn: 'Casual, witty, and meme-literate; forms an affectionate geek community that loves debate and absurdity.',
      recommendedContent: ['팩토리오 / 마인크래프트 자동화', '하드코어 퍼즐 게임', '게임 코드 및 메커니즘 뜯어보기']
    },
    growthAdviceKo: '완벽한 이론에 머무르지 말고 70%만 완성되었을 때 일단 세상에 공개해 보세요. 생각보다 실행(Execution)의 가치는 위대하며, 불완전함 속에서 현실의 성숙이 일어납니다.',
    growthAdviceEn: 'Do not let perfection be the enemy of execution. Ship ideas when they are 70% ready. Action creates empirical data that theorizing alone can never reveal.',
    famousFigures: ['알베르트 아인슈타인', '르네 데카르트', '찰스 다윈', '빌 게이츠', '네오 (매트릭스)', 'L (데스노트)']
  },

  ENTJ: {
    code: 'ENTJ',
    nameKo: '대담한 통솔자',
    nameEn: 'The Commander Executive',
    badge: '👑 결단력과 거대한 비전의 지휘관',
    keywords: ['강력한 리더십', '목표 지향', '전략적 기획', '효율 극대화'],
    mottoKo: '"길이 없다면, 내가 길을 만들면 된다."',
    mottoEn: '"I will either find a way, or make one. Hesitation is the enemy of victory."',
    overviewKo: 'ENTJ는 타고난 카리스마와 결단력으로 사람들을 이끄는 천부적인 리더입니다. 주기능 외향사고(Te)를 바탕으로 조직과 프로젝트를 체계적으로 재편하며, 부기능 내향직관(Ni)으로 장기적인 비전과 승리의 로드맵을 그려냅니다. 문제 앞에서도 주저하거나 포기하지 않으며, 거대한 장애물조차 자신의 성장을 위한 훈련장으로 여깁니다. 직설적이고 명쾌한 소통을 선호하며, 비효율과 나태함을 용납하지 않는 불굴의 에너지로 목표를 쟁취합니다.',
    overviewEn: 'ENTJs are born leaders propelled by Extraverted Thinking (Te) and Introverted Intuition (Ni). They naturally command respect through sharp strategic insight, decisive authority, and relentless drive. They view challenges as personal arenas to conquer, structuring chaotic enterprises into highly disciplined, goal-crushing operations.',
    cognitiveFunctions: {
      dominant: {
        code: 'Te',
        nameKo: '외향 사고 (주기능)',
        nameEn: 'Extraverted Thinking (Dominant)',
        descKo: '환경을 조직화하고 목표 달성을 위한 최적의 시스템과 결단을 내리는 강력한 지휘봉.',
        descEn: 'Organizes external reality, marshals resources, and enforces operational efficiency.'
      },
      auxiliary: {
        code: 'Ni',
        nameKo: '내향 직관 (부기능)',
        nameEn: 'Introverted Intuition (Auxiliary)',
        descKo: '10년 뒤의 미래를 내다보고 승리의 판도를 예측하는 전략적 통찰력.',
        descEn: 'Envisions macroscopic trends and formulates comprehensive long-range roadmaps.'
      },
      tertiary: {
        code: 'Se',
        nameKo: '외향 감각 (3차기능)',
        nameEn: 'Extraverted Sensing (Tertiary)',
        descKo: '현장의 변화를 기민하게 포착하고 위기 시 신속하게 방향을 전환하는 현실 감각.',
        descEn: 'Provides situational awareness and physical adaptability to act decisively in the moment.'
      },
      inferior: {
        code: 'Fi',
        nameKo: '내향 감정 (열등기능)',
        nameEn: 'Introverted Feeling (Inferior)',
        descKo: '자신의 취약한 감정이나 타인의 정서적 상처를 돌아보는 데 미숙하여 차갑다는 평을 들음.',
        descEn: 'Struggles with emotional vulnerability and may repress personal values in pursuit of achievement.'
      }
    },
    strengthsKo: [
      '어떤 위기 상황에서도 흔들리지 않고 명쾌한 해법을 제시하는 독보적 결단력',
      '거대한 비전을 현실적인 실행 단계로 쪼개어 달성시키는 뛰어난 전략적 통솔력',
      '시간과 인적 자원을 가장 효율적으로 배치하는 탁월한 시스템 구축 역량',
      '장애물 앞에서 주눅 들지 않고 오히려 투지를 불태우는 강인한 정신력',
      '군더더기 없는 명확하고 카리스마 넘치는 커뮤니케이션'
    ],
    strengthsEn: [
      'Incomparable decisiveness and clarity in crisis, guiding others with absolute certainty',
      'Strategic mastery in translating ambitious visions into structured, measurable milestones',
      'Elite organizational ability to optimize human talent and logistical pipelines',
      'Unyielding resilience; views opposition and setbacks as fuel for triumph',
      'Charismatic, articulate communication that commands immediate attention'
    ],
    weaknessesKo: [
      '목표 달성에 지나치게 몰두하여 동료나 부하직원의 감정적 소진을 간과하기 쉬움',
      '자신의 판단에 대한 강한 확신 때문에 타인의 의견을 성급히 묵살하는 독선적 경향',
      '과정보다 결과만을 중시하여 인간적인 정서적 유대 형성에 소홀해질 수 있음',
      '나약함이나 감정적인 호소를 마주했을 때 솟구치는 참을성 부족과 차가운 말투',
      '스스로에게도 너무 가혹한 기준을 적용하여 겪는 만성적인 번아웃 위험'
    ],
    weaknessesEn: [
      'Can run roughshod over the feelings of others in pursuit of relentless efficiency',
      'Prone to dogmatic stubbornness when convinced of their strategic superiority',
      'Over-focuses on quantitative outputs at the expense of qualitative morale and connection',
      'Low tolerance for excuses, hesitancy, or emotional processing in high-stakes moments',
      'Drives self to exhaustion by refusing to acknowledge personal physical/emotional limits'
    ],
    stressLoopKo: 'Te-Se 루프에 빠지면 주변 상황을 폭력적으로 통제하려 들거나 눈앞의 단기 성과에 집착하게 되며, 열등 Fi가 폭발하면 자신이 아무에게도 인정받지 못한다는 깊은 피해의식과 소외감에 휩싸일 수 있습니다. Ni를 회복하여 긴 호흡으로 미래의 본질을 되돌아보고 내면의 진솔한 감정을 인정해야 합니다.',
    stressLoopEn: 'In a Te-Se loop, ENTJs become domineering and impulsively aggressive over short-term metrics. An Fi grip unleashes self-pity and feelings of betrayal. Reconnecting with auxiliary Ni—stepping back to see the long horizon—restores their true stature.',
    career: {
      bestEnvironmentKo: '높은 권한과 책임이 주어지며 큰 규모의 조직을 성장시킬 수 있는 역동적인 리더십 환경',
      bestEnvironmentEn: 'High-stakes, high-impact environments offering leadership authority and scalable growth',
      recommendedCareers: ['기업 최고경영자 (CEO)', '투자은행가 / 벤처캐피털리스트', '경영 전략 디렉터', '정치인 / 정책 입안자', '로펌 파트너 변호사', '대형 프로젝트 총괄 PM'],
      workStyleKo: '능력주의를 철저히 신봉하며, 방향성을 명확히 제시한 뒤 구성원들이 각자 최고의 성과를 내도록 엄격하면서도 든든하게 이끕니다.',
      workStyleEn: 'Commands with clear metrics, champions competence, and expects team members to take full ownership.'
    },
    relationship: {
      loveStyleKo: '연애에서도 상대방의 성장과 미래를 든든하게 지원하는 보호자이자 동반자입니다. 말뿐인 애교보다는 현실적인 도움과 미래 설계를 통해 깊은 사랑을 표현합니다.',
      loveStyleEn: 'Protective, generous, and dedicated to elevating their partner’s life. Shows devotion through tangible investment and empowering support.',
      bestMatches: ['INTP', 'INFP'],
      bestMatchReasonKo: 'INTP의 무한한 지적 논리는 ENTJ의 야망에 날개를 달아주며, INFP의 따뜻한 감수성은 ENTJ의 얼어붙은 내면을 녹여주는 이상적인 영혼의 단짝입니다.',
      bestMatchReasonEn: 'INTP provides intellectual brilliance to refine ENTJ’s ambitions, while INFP offers gentle emotional authenticity that softens ENTJ’s armor.',
      challengingMatches: ['ISFP', 'ESFP'],
      challengingMatchReasonKo: '계획성과 효율을 중시하는 ENTJ와 자유롭고 즉흥적인 감각 유형 사이에는 생활 패턴의 근본적 조율이 필요합니다.',
      challengingMatchReasonEn: 'Requires disciplined patience to honor free-spirited emotions without enforcing rigid operational control.'
    },
    streamerStyle: {
      personaKo: '지휘관 카리스마로 길드를 이끌거나 하드코어 챌린지를 압도적인 실력으로 정복하는 보스형 스트리머',
      personaEn: 'Alpha commander streamer leading massive raid guilds and dominating high-stakes tournaments',
      viewerDynamicKo: '시청자들을 부하 군단처럼 통솔하며 티키타카를 즐기고, 통쾌한 사이다 발언과 넘치는 자신감으로 환호를 받습니다.',
      viewerDynamicEn: 'Entertains like a charismatic general; rewards smart chatters, shuts down whiners, and commands high respect.',
      recommendedContent: ['MMO 대규모 공성전 / 레이드 오더', '경영 시뮬레이션 및 전략 전술 게임', '인생 상담 및 멘토링 토크']
    },
    growthAdviceKo: '경청의 미덕을 훈련하세요. 상대방이 틀렸더라도 그 감정을 먼저 인정해 줄 때 사람들은 당신을 단순한 지휘관이 아니라 진심으로 존경하는 리더로 따르게 됩니다.',
    growthAdviceEn: 'Cultivate the art of empathetic listening. Validation is not weakness—it is the ultimate leadership multiplier that inspires genuine devotion.'
  },

  ENTP: {
    code: 'ENTP',
    nameKo: '뜨거운 논쟁을 즐기는 변론가',
    nameEn: 'The Debater Visionary',
    badge: '⚡ 지적 스파크와 통념을 깨는 혁신가',
    keywords: ['지적 순발력', '논쟁과 재치', '창의적 혁신', '다재다능'],
    mottoKo: '"모든 상식과 규칙은 더 나은 반론을 기다리고 있을 뿐이다."',
    mottoEn: '"Break the mold, question the dogma, and spark brilliant intellectual chaos."',
    overviewKo: 'ENTP는 번뜩이는 재치와 두려움 없는 지적 유희로 가득 찬 혁신가 유형입니다. 주기능 외향직관(Ne)으로 고정관념을 산산조각 내며 색다른 관점을 끊임없이 제시하고, 부기능 내향사고(Ti)로 그 아이디어들을 정밀하게 검증합니다. 세상의 모든 금기와 당연시되는 규칙에 "왜 안 되는데?"라는 질문을 던지며, 지적 토론과 논쟁 자체를 최고의 스포츠처럼 즐깁니다. 유쾌하고 순발력이 넘치며, 늘 새로운 프로젝트에 뛰어드는 에너자이저입니다.',
    overviewEn: 'ENTPs are clever, agile provocateurs driven by Extraverted Intuition (Ne) and Introverted Thinking (Ti). They thrive on dismantling dogmas, championing devil’s advocacy, and connecting ideas across disparate realms. Charismatic and relentlessly witty, they turn life into an exhilarating intellectual laboratory.',
    cognitiveFunctions: {
      dominant: {
        code: 'Ne',
        nameKo: '외향 직관 (주기능)',
        nameEn: 'Extraverted Intuition (Dominant)',
        descKo: '끊임없이 번뜩이는 상상력과 엉뚱하면서도 혁신적인 아이디어를 발산하는 스파크 엔진.',
        descEn: 'Generates a wildfire of creative concepts, spotting angles and connections others miss.'
      },
      auxiliary: {
        code: 'Ti',
        nameKo: '내향 사고 (부기능)',
        nameEn: 'Introverted Thinking (Auxiliary)',
        descKo: '아이디어의 논리적 뼈대를 검증하고 상대의 논리적 허점을 칼같이 짚어내는 분석 칼날.',
        descEn: 'Sharply evaluates ideas for logical soundness, dissecting counterarguments with razor precision.'
      },
      tertiary: {
        code: 'Fe',
        nameKo: '외향 감정 (3차기능)',
        nameEn: 'Extraverted Feeling (Tertiary)',
        descKo: '분위기를 쥐락펴락하며 유머와 위트로 사람들을 매료시키는 사교적 쇼맨십.',
        descEn: 'Enables playful charisma, charm, and the ability to read social temperature dynamically.'
      },
      inferior: {
        code: 'Si',
        nameKo: '내향 감각 (열등기능)',
        nameEn: 'Introverted Sensing (Inferior)',
        descKo: '반복적인 일상 관리, 세부 디테일 준수, 지루한 마무리 작업에 대한 강한 알레르기.',
        descEn: 'Disdains mundane administrative chores, bureaucratic routine, and meticulous tracking.'
      }
    },
    strengthsKo: [
      '순간적인 순발력과 천재적인 유머 감각으로 대화와 분위기를 장악하는 능력',
      '남들이 보지 못하는 사각지대를 찾아내어 판을 뒤흔드는 파괴적 혁신력',
      '새로운 기술과 지식을 두려움 없이 빠르게 흡수하는 놀라운 습득력',
      '지적 토론에서 어떤 입장이라도 논리적으로 방어해 내는 변론술',
      '실패를 두려워하지 않고 새로운 기회에 몸을 던지는 담대함'
    ],
    strengthsEn: [
      'Unmatched comedic timing, conversational wit, and captivating rhetorical charm',
      'Disruptive innovation that exposes blind spots in conventional methodologies',
      'Incredible intellectual velocity in digesting novel concepts and cutting-edge tech',
      'Superb debate agility capable of defending opposing perspectives with effortless eloquence',
      'Bold fearlessness in experimenting with fresh opportunities and unconventional paths'
    ],
    weaknessesKo: [
      '새로운 아이디어를 벌려놓고 마무리를 짓지 않는 만성적인 뒷심 부족',
      '논쟁을 즐기다 상대방의 감정에 깊은 상처를 주는 도를 넘은 장난기',
      '엄격한 규칙, 반복적인 서류 작업, 일상의 소소한 루틴을 버티지 못함',
      '진지한 감정 표현이나 무거운 분위기에서 농담으로 회피하려는 방어기제',
      '주의가 쉽게 산만해져 우선순위를 놓치는 즉흥성'
    ],
    weaknessesEn: [
      'Chronic project abandonment; initiates brilliant ventures but detests monotonous execution',
      'Argumentativeness that can alienate friends when intellectual banter turns hurtful',
      'Allergy to rigid protocol, meticulous documentation, and structured daily habits',
      'Tendency to deflect genuine emotional intimacy with sarcasm and deflecting jokes',
      'Easily distracted by the next shiny concept, scattering mental focus'
    ],
    stressLoopKo: 'Ne-Fe 루프에 빠지면 타인의 인정과 인기에 과도하게 집착하며 피상적인 쇼맨십에 매몰되거나, 열등 Si 폭주 시 알 수 없는 신체적 질병 공포증(건강 염려증)에 사로잡히고 과거의 사소한 실수에 집착할 수 있습니다. Ti의 엄격한 자기 분석으로 돌아와 하나의 프로젝트를 끝까지 매듭짓는 훈련이 필요합니다.',
    stressLoopEn: 'A Ne-Fe loop creates hyper-superficial approval-seeking and manic drama. An Si grip plunges them into hypochondria and obsessive fixation on historical blunders. Grounding themselves in auxiliary Ti—committing to finish one concrete objective—restores clarity.',
    career: {
      bestEnvironmentKo: '틀에 박힌 규율이 없고 자유로운 아이디어 제안과 창의적 도전이 장려되는 역동적 환경',
      bestEnvironmentEn: 'Fast-paced, disruptive environments with zero bureaucracy that reward relentless experimentation',
      recommendedCareers: ['스타트업 창업가', '크리에이티브 디렉터', '정치/시사 평론가', '특허 변호사', '신사업 기획자', '마케팅 전략가', '스탠드업 코미디언 / 방송인'],
      workStyleKo: '아이디어 브레인스토밍의 최강자이며, 기존 시스템의 맹점을 찾아내어 새로운 모델로 전복시키는 프로젝트 초기 단계에서 독보적입니다.',
      workStyleEn: 'Catalytic ideator who thrives during incubation, pitching bold visions and challenging stale assumptions.'
    },
    relationship: {
      loveStyleKo: '위트와 지적 자극이 가득한 연애를 꿈꿉니다. 장난기 넘치고 솔직하며, 함께 새로운 세계를 모험하고 밤새 열띤 토론을 나눌 수 있는 지적 소울메이트를 원합니다.',
      loveStyleEn: 'Craves intellectual fireworks, relentless humor, and playful sparring. Loyal and endlessly fun with partners who can challenge their mind.',
      bestMatches: ['INFJ', 'INTJ'],
      bestMatchReasonKo: 'INFJ의 깊은 통찰과 신비로운 내면은 ENTP의 끝없는 호기심을 자극하며, 서로의 빈 곳을 마법처럼 채워주는 가장 완벽한 심리적 상호보완 관계입니다.',
      bestMatchReasonEn: 'INFJ’s enigmatic depth and soulful insight endlessly fascinate ENTP, creating legendary intuitive synergy and soulmate balance.',
      challengingMatches: ['ISFJ', 'ISTJ'],
      challengingMatchReasonKo: '안정과 전통을 중시하는 SJ 유형에게 ENTP의 파격적인 변덕과 논쟁은 큰 불안감을 줄 수 있어 섬세한 배려가 요구됩니다.',
      challengingMatchReasonEn: 'Requires mutual respect: ENTP must curb teasing and respect grounding traditions, while SJ accommodates novelty.'
    },
    streamerStyle: {
      personaKo: '폭풍 같은 입담과 기상천외한 트롤링, 시청자 긁기와 도발로 웃음을 빵빵 터뜨리는 악동 예능인',
      personaEn: 'Chaotic jester streamer with lightning-speed roast banter, absurd hot takes, and unpredictable variety skits',
      viewerDynamicKo: '시청자와 서로 물고 뜯는 찰진 티키타카를 펼치며, 어떤 돌발 도네이션이나 억까 상황도 유머로 승화시킵니다.',
      viewerDynamicEn: 'Turns chat into an interactive roast battle; unflappable under trolling and transforms awkward moments into viral comedy.',
      recommendedContent: ['시청자 참여 모의법정 / 토론 콘텐츠', '항아리 게임 등 멘탈 붕괴 챌린지', '신작 게임 엽기적인 방식으로 클리어하기']
    },
    growthAdviceKo: '하나의 아이디어를 끝까지 실행해 보는 인내심을 기르세요. 당신의 번뜩이는 생각들은 세상에 실제로 완성되어 나올 때 비로소 위대한 혁신이 됩니다.',
    growthAdviceEn: 'Build the discipline of follow-through. A brilliant idea implemented to completion is worth a thousand genius concepts abandoned half-way.'
  },

  INFJ: {
    code: 'INFJ',
    nameKo: '선의의 옹호자',
    nameEn: 'The Advocate Mystic',
    badge: '🔮 영혼의 치유와 인류애적 통찰가',
    keywords: ['깊은 통찰력', '진정성', '인류애', '조용한 카리스마'],
    mottoKo: '"세상을 더 인간답고 따뜻한 곳으로 바꾸는 조용한 이상을 품는다."',
    mottoEn: '"Leave this world gently better than you found it, with wisdom and silent grace."',
    overviewKo: '전 세계 인구의 1% 남짓에 불과한 INFJ는 신비로운 예지력과 깊은 인류애를 품은 조용한 이상주의자입니다. 주기능 내향직관(Ni)으로 인간 심리와 세상의 본질을 직관적으로 꿰뚫어 보며, 부기능 외향감정(Fe)으로 타인의 고통과 감정을 자신의 것처럼 온몸으로 흡수합니다. 겉으로는 차분하고 온화해 보이지만, 마음속에는 결코 꺾이지 않는 단단한 도덕적 나침반과 인류를 구원하고자 하는 신념이 불타고 있습니다. 타인의 마음을 치유하는 영혼의 상담가입니다.',
    overviewEn: 'Accounting for barely 1–2% of the population, INFJs are enigmatic visionaries combining profound empathy with strategic foresight. Driven by Introverted Intuition (Ni) and Extraverted Feeling (Fe), they perceive human motivations with uncanny accuracy, dedicating their lives to compassionate ideals and quiet social transformation.',
    cognitiveFunctions: {
      dominant: {
        code: 'Ni',
        nameKo: '내향 직관 (주기능)',
        nameEn: 'Introverted Intuition (Dominant)',
        descKo: '사물의 이면과 인간 무의식의 흐름을 마치 투시하듯 통찰하는 신비로운 직관.',
        descEn: 'Synthesizes holistic patterns, subconscious motives, and visionary spiritual paradigms.'
      },
      auxiliary: {
        code: 'Fe',
        nameKo: '외향 감정 (부기능)',
        nameEn: 'Extraverted Feeling (Auxiliary)',
        descKo: '타인의 감정적 아픔에 깊이 감응하고 집단의 조화와 정서적 안정을 이끄는 공감력.',
        descEn: 'Attunes to communal emotional atmosphere, radiating therapeutic warmth and ethical harmony.'
      },
      tertiary: {
        code: 'Ti',
        nameKo: '내향 사고 (3차기능)',
        nameEn: 'Introverted Thinking (Tertiary)',
        descKo: '자신의 직관적 느낌을 정교한 논리 체계로 정리하고 다듬는 내면의 검증 장치.',
        descEn: 'Analyzes personal impressions with structural logic to ensure ethical visions are conceptually sound.'
      },
      inferior: {
        code: 'Se',
        nameKo: '외향 감각 (열등기능)',
        nameEn: 'Extraverted Sensing (Inferior)',
        descKo: '과도한 소음, 복잡한 인파, 강렬한 물리적 자극에 쉽게 탈진하고 압도당하는 취약점.',
        descEn: 'Easily exhausted by chaotic physical noise, clutter, and intense sensory environments.'
      }
    },
    strengthsKo: [
      '상대방이 말하지 않아도 그 감정과 의도를 직관적으로 간파하는 심리적 투시력',
      '사리사욕을 떠나 더 나은 세상을 위해 묵묵히 헌신하는 숭고한 도덕적 진정성',
      '따뜻하고 영감 넘치는 언어로 사람들의 영혼을 치유하고 잠재력을 일깨우는 상담력',
      '이상적인 꿈에 머무르지 않고 현실적인 실천 계획으로 연결하는 은근한 집념',
      '조용하면서도 사람들의 마음을 하나로 모으는 깊은 도덕적 카리스마'
    ],
    strengthsEn: [
      'Uncanny psychological empathy capable of decoding unvoiced emotional wounds and motives',
      'Unwavering moral authenticity dedicated to noble, human-centric causes',
      'Therapeutic communication that touches the soul and inspires profound personal growth',
      'Quiet persistence that systematically translates high-minded ideals into concrete reality',
      'Subtle yet magnetic moral authority that inspires deep loyalty without coercion'
    ],
    weaknessesKo: [
      '타인의 부정적 감정과 고통까지 스펀지처럼 흡수하여 겪는 극심한 감정적 탈진(Burnout)',
      '자신의 이상에 사람이나 세상이 미치지 못할 때 느끼는 깊은 환멸과 인간 혐오',
      '신뢰를 배신당했다고 느낄 때 대화 없이 상대를 삶에서 영구 삭제하는 도어슬램(Door Slam)',
      '자신의 진짜 속마음이나 고민을 털어놓지 않아 생기는 고질적인 고립감',
      '사소한 갈등이나 마찰 상황에서도 심각한 스트레스를 느끼고 위축됨'
    ],
    weaknessesEn: [
      'Vulnerable to extreme emotional burnout by absorbing the negativity and trauma of others',
      'Deep disillusionment when reality and imperfect humans fail their lofty moral expectations',
      'The dreaded "Door Slam"—suddenly and permanently severing ties when betrayed without warning',
      'Profound loneliness born from feeling perpetually misunderstood and withholding vulnerability',
      'Hypersensitivity to interpersonal friction, internalizing conflict as psychological torment'
    ],
    stressLoopKo: 'Ni-Ti 루프에 빠지면 외부 사람들과의 소통을 차단한 채 방 안에서 자신의 머릿속 망상과 의심을 논리화하며 자멸적인 고립에 빠집니다. 열등 Se 폭주 시에는 감각적 폭식이나 무기력증에 시달립니다. 해결책은 Fe를 가동하여 신뢰할 수 있는 친구에게 감정을 털어놓고 사람들과 따뜻한 교감을 재개하는 것입니다.',
    stressLoopEn: 'A Ni-Ti loop locks INFJs in paralyzing over-analysis, withdrawing from society into dark overthinking. An Se grip leads to sensory paralysis or reckless escapism. Awakening Fe—reaching out to trusted confidants and externalizing feelings—breaks the spell.',
    career: {
      bestEnvironmentKo: '인간적 가치와 진정성이 존중받으며, 의미 있는 변화를 조용히 만들어갈 수 있는 독립적 환경',
      bestEnvironmentEn: 'Purpose-driven, peaceful sanctuaries where deep thought, empathy, and holistic reform thrive',
      recommendedCareers: ['심리상담사 / 정신분석가', '작가 / 소설가', '인권 변호사', '비영리단체(NGO) 리더', '철학교수 / 연구원', 'UX 리서처', '라이프 코치'],
      workStyleKo: '조용하지만 깊은 영향력을 행사하며, 1:1 대화와 멘토링을 통해 동료들의 성장을 이끌어냅니다.',
      workStyleEn: 'Leads through gentle mentorship, inspiring moral purpose and ethical excellence rather than commanding by fiat.'
    },
    relationship: {
      loveStyleKo: '영혼의 결합을 꿈꾸는 진정한 로맨티시스트입니다. 얕은 만남은 거부하며, 상대방의 모든 상처와 결핍까지 따뜻하게 품어주는 헌신적인 사랑을 바칩니다.',
      loveStyleEn: 'Seeks a transcendent soul connection. Uninterested in superficial flings, offering unwavering devotion and unconditional psychological acceptance.',
      bestMatches: ['ENTP', 'ENFP'],
      bestMatchReasonKo: 'ENTP의 지적 유쾌함은 INFJ의 무거운 마음을 가볍게 날려주며, INFJ의 깊은 통찰은 ENTP에게 세상 어디서도 얻지 못한 깊은 안식을 제공합니다.',
      bestMatchReasonEn: 'ENTP brings joyful playfulness that lifts INFJ’s solemn gravity, while INFJ offers profound emotional depth that anchors ENTP.'
    },
    streamerStyle: {
      personaKo: '새벽 감성의 심야 라디오, 잔잔한 고민 상담과 힐링 음악으로 시청자들의 마음을 어루만지는 힐러형 스트리머',
      personaEn: 'Midnight sanctuary streamer offering warm counseling, poetic reflections, and cozy ambient gameplay',
      viewerDynamicKo: '시청자 한 명 한 명의 사연에 진심으로 눈물 흘리고 위로해 주며, 가장 깨끗하고 평화로운 온실 같은 방송을 가꿉니다.',
      viewerDynamicEn: 'Deeply intimate listener who treats viewers with gentle dignity, fostering a safe haven free of toxicity.',
      recommendedContent: ['심야 고민 상담 라디오', '감성 스토리/인디 게임 (투 더 문, 오모리)', 'ASMR 및 잔잔한 소통']
    },
    growthAdviceKo: '세상을 구하기 전에 먼저 나 자신을 구하세요. 모든 사람의 상처를 떠안으려 하지 말고, 건강한 심리적 경계선(Boundary)을 긋는 법을 배울 때 비로소 진정한 빛이 됩니다.',
    growthAdviceEn: 'Protect your emotional boundaries fiercely. You cannot heal the world if you are bleeding. Self-compassion must precede universal salvation.'
  },

  INFP: {
    code: 'INFP',
    nameKo: '열정적인 중재자',
    nameEn: 'The Mediator Dreamer',
    badge: '🌸 순수한 영혼과 서정적 이상주의자',
    keywords: ['진정성', '풍부한 감수성', '이상주의', '따뜻한 공감'],
    mottoKo: '"나만의 고유한 진실과 아름다움을 지키며 세상에 따스한 빛을 전하겠다."',
    mottoEn: '"To thine own self be true; honor every gentle dream and unvoiced sorrow."',
    overviewKo: 'INFP는 마음속에 동화 같은 이상향을 품고 살아가는 섬세하고 다정한 몽상가입니다. 주기능 내향감정(Fi)을 통해 무엇이 자신의 영혼에 진실한가를 치열하게 성찰하며, 부기능 외향직관(Ne)으로 무한한 문학적 상상력과 예술적 영감을 길어 올립니다. 겉으로는 조용하고 온순해 보이지만, 자신의 신념이나 약자가 억압받는 상황 앞에서는 누구보다 용감하게 맞서는 불꽃같은 내면을 지니고 있습니다. 타인의 아픔을 세상 누구보다 깊이 이해하는 따뜻한 친구입니다.',
    overviewEn: 'INFPs are poetic idealists guided by Introverted Feeling (Fi) and Extraverted Intuition (Ne). They live in intimate alignment with personal values, seeking authenticity, beauty, and emotional truth. Quiet on the surface, they possess rich inner universes overflowing with compassion, creative wonder, and quiet courage.',
    cognitiveFunctions: {
      dominant: {
        code: 'Fi',
        nameKo: '내향 감정 (주기능)',
        nameEn: 'Introverted Feeling (Dominant)',
        descKo: '자신의 영혼이 속삭이는 고유한 가치와 진정성을 수호하는 도덕적 심장.',
        descEn: 'Anchors identity in deep personal authenticity, moral integrity, and emotional purity.'
      },
      auxiliary: {
        code: 'Ne',
        nameKo: '외향 직관 (부기능)',
        nameEn: 'Extraverted Intuition (Auxiliary)',
        descKo: '세상의 숨겨진 가능성과 시적 상상력을 탐험하는 다채로운 무지개 안테나.',
        descEn: 'Explores metaphoric connections, artistic possibilities, and alternative worldviews.'
      },
      tertiary: {
        code: 'Si',
        nameKo: '내향 감각 (3차기능)',
        nameEn: 'Introverted Sensing (Tertiary)',
        descKo: '아련한 추억과 옛 기억의 향수를 소중히 간직하는 감성적 기억 서고.',
        descEn: 'Treasures nostalgic memories and personal sentimental rituals that ground their identity.'
      },
      inferior: {
        code: 'Te',
        nameKo: '외향 사고 (열등기능)',
        nameEn: 'Extraverted Thinking (Inferior)',
        descKo: '냉혹한 현실 논리, 행정 절차, 마감 기한 관리에 짓눌릴 때 느끼는 무력감과 공포.',
        descEn: 'Feels intimidated by cold bureaucratic efficiency, structured logistics, and impersonal critique.'
      }
    },
    strengthsKo: [
      '타인의 감정적 고통을 편견 없이 있는 그대로 품어주는 깊은 공감과 치유력',
      '독창적이고 서정적인 글, 예술, 음악을 창작해 내는 풍부한 문학적 감수성',
      '외압이나 유행에 결코 타협하지 않는 확고한 진정성과 자아 정체성',
      '어떤 사람 속에서도 숨겨진 아름다움과 잠재력을 발견해 내는 긍정적 시선',
      '약자와 소외된 존재를 위해 대가를 바라지 않고 베푸는 헌신적인 사랑'
    ],
    strengthsEn: [
      'Profound, non-judgmental empathy that creates a sacred space for others to heal',
      'Lyrical creativity that expresses itself in evocative literature, art, and storytelling',
      'Fierce inner authenticity that refuses to compromise soul values for social status',
      'Remarkable gift for seeing latent beauty and goodness in even the most broken souls',
      'Gentle yet steadfast advocacy for the marginalized, vulnerable, and forgotten'
    ],
    weaknessesKo: [
      '사소한 비판이나 거절에도 영혼이 베인 듯 심한 상처를 받는 유리 멘탈',
      '완벽한 이상과 불완전한 현실 사이의 괴리감으로 겪는 만성적인 우울과 무기력',
      '해야 할 일을 마감 직전까지 미루고 공상 속으로 도피하는 회피 성향',
      '갈등 상황을 극도로 두려워하여 문제를 직면하지 않고 침묵으로 회피함',
      '자신의 감정에 너무 깊이 침잠하여 주변 사람들의 현실적인 요청을 놓침'
    ],
    weaknessesEn: [
      'Hypersensitive to critique; internalizes minor disagreements as devastating personal rejection',
      'Chronic disillusionment and melancholy when harsh realities clash with pristine ideals',
      'Severe procrastination and escapist daydreaming when faced with mundane obligations',
      'Conflict-avoidant to a fault, withdrawing into silent distress rather than addressing friction',
      'Can become absorbed in emotional introspection, losing touch with practical necessities'
    ],
    stressLoopKo: 'Fi-Si 루프에 빠지면 과거의 흑역사나 상처를 수만 번 곱씹으며 자책의 늪에 빠집니다. 극도의 스트레스로 열등 Te가 폭발하면 평소의 온순함을 버리고 갑자기 차갑고 공격적인 독설을 내뱉어 주변을 얼어붙게 만듭니다. Ne를 활용해 새로운 창작, 산책, 미술관 관람 등으로 시야를 환기해야 합니다.',
    stressLoopEn: 'An Fi-Si loop paralyzes INFPs in toxic nostalgic regret and self-condemnation. A Te grip turns their gentle demeanor into harsh, hyper-critical lashing out. Reactivating auxiliary Ne—artistic expression, nature walks, creative journaling—restores their gentle grace.',
    career: {
      bestEnvironmentKo: '상업적 경쟁이나 비정한 효율 대신 진정성과 창의성이 자유롭게 존중받는 평화로운 환경',
      bestEnvironmentEn: 'Gentle, purpose-driven environments fostering individual creativity, compassion, and expression',
      recommendedCareers: ['작가 / 시인 / 웹툰 스토리작가', '일러스트레이터 / 아티스트', '심리상담사 / 미술치료사', '번역가 / 카피라이터', '도서관 사서', '환경/동물보호 활동가'],
      workStyleKo: '엄격한 통제보다는 자율성이 주어질 때 놀라운 예술적 결과물을 내놓으며, 동료들을 진심으로 응원합니다.',
      workStyleEn: 'Blossoms with independent autonomy; pours soul into meaningful work with genuine care for team members.'
    },
    relationship: {
      loveStyleKo: '순정만화의 주인공처럼 한 사람만을 향한 순수하고 지고지순한 사랑을 바칩니다. 상대방의 가장 어두운 비밀까지도 따뜻하게 안아주는 헌신적인 연인입니다.',
      loveStyleEn: 'Devoted, romantic, and deeply loyal. Loves unconditionally with poetic tenderness, accepting the partner’s deepest flaws and vulnerabilities.',
      bestMatches: ['ENFJ', 'ENTJ'],
      bestMatchReasonKo: 'ENFJ의 따뜻한 배려와 든든한 리더십은 INFP에게 세상에서 가장 안전한 보금자리를 만들어주며, INFP는 ENFJ에게 진정한 자아를 선물합니다.',
      bestMatchReasonEn: 'ENFJ’s warm emotional guidance and executive clarity provide a safe, affirming haven where the INFP’s soul blooms.'
    },
    streamerStyle: {
      personaKo: '소탈하고 엉뚱한 매력, 게임 캐릭터에 과몰입하여 울고 웃는 순수 감성의 힐링 스트리머',
      personaEn: 'Endearing, emotionally immersed variety streamer crying at storyline endings and giggling at wholesome silliness',
      viewerDynamicKo: '시청자들의 수호 본능을 자극하며, 아늑하고 따뜻한 팬덤 분위기 속에서 가족 같은 유대감을 형성합니다.',
      viewerDynamicEn: 'Inspires fierce protectiveness in viewers; builds a gentle, meme-cozy sanctuary where everyone feels accepted.',
      recommendedContent: ['스토리 중심 RPG (언더테일, 오모리)', '힐링 라이프 시뮬레이터 (동물의 숲, 스타듀밸리)', '소소한 일상 드로잉 & 소통']
    },
    growthAdviceKo: '현실의 차가운 규칙도 당신의 소중한 꿈을 지키기 위한 방패가 될 수 있습니다. 작은 실행력과 체계적인 습관을 기를 때 당신의 아름다운 이상은 마침내 세상을 변화시킵니다.',
    growthAdviceEn: 'Embrace structure not as a cage, but as an armor protecting your dreams. Small practical habits give your beautiful ideals wings to reshape reality.'
  },

  ENFJ: {
    code: 'ENFJ',
    nameKo: '정의로운 주인공',
    nameEn: 'The Protagonist Mentor',
    badge: '🌟 사람을 감화시키는 따뜻한 멘토',
    keywords: ['카리스마 리더십', '헌신적 공감', '동기부여', '사회적 조화'],
    mottoKo: '"우리가 함께 손을 맞잡을 때 세상은 더 밝고 위대해질 수 있다."',
    mottoEn: '"Lead with love, ignite the potential in every heart, and inspire collective triumph."',
    overviewKo: 'ENFJ는 타인의 잠재력을 꽃피우고 공동체를 화합으로 이끄는 카리스마 넘치는 지도자입니다. 주기능 외향감정(Fe)으로 주변 사람들의 감정과 욕구를 기막히게 파악하여 모두가 존중받는 따뜻한 분위기를 만들고, 부기능 내향직관(Ni)으로 공동체가 나아가야 할 숭고한 미래 비전을 제시합니다. 타고난 웅변술과 진심 어린 배려로 사람들의 마음을 움직이며, 누군가의 성장을 돕는 일에서 인생 최고의 행복을 느낍니다.',
    overviewEn: 'ENFJs are inspirational catalysts guided by Extraverted Feeling (Fe) and Introverted Intuition (Ni). Charismatic, compassionate, and deeply attuned to group dynamics, they see the latent genius in everyone, dedicating their boundless energy to uplifting individuals and uniting communities behind meaningful causes.',
    cognitiveFunctions: {
      dominant: {
        code: 'Fe',
        nameKo: '외향 감정 (주기능)',
        nameEn: 'Extraverted Feeling (Dominant)',
        descKo: '집단의 정서적 화합을 조율하고 모든 사람을 따스하게 포용하는 사랑의 오케스트라 지휘자.',
        descEn: 'Harmonizes interpersonal atmospheres, intuitively sensing and validating the emotional needs of others.'
      },
      auxiliary: {
        code: 'Ni',
        nameKo: '내향 직관 (부기능)',
        nameEn: 'Introverted Intuition (Auxiliary)',
        descKo: '사람들의 성장 가능성과 공동체의 장기적인 발전 방향을 꿰뚫어 보는 혜안.',
        descEn: 'Synthesizes long-term developmental trajectories and inspiring visions for social progress.'
      },
      tertiary: {
        code: 'Se',
        nameKo: '외향 감각 (3차기능)',
        nameEn: 'Extraverted Sensing (Tertiary)',
        descKo: '생생한 프레젠테이션, 열정적인 무대 매너, 현장의 활기를 이끌어내는 퍼포먼스 감각.',
        descEn: 'Engages audiences with vibrant physical presence, spontaneous charm, and charismatic delivery.'
      },
      inferior: {
        code: 'Ti',
        nameKo: '내향 사고 (열등기능)',
        nameEn: 'Introverted Thinking (Inferior)',
        descKo: '자신에 대한 차가운 비판이나 가차 없는 논리적 공격 앞에 심리적으로 흔들리는 아킬레스건.',
        descEn: 'Struggles with impersonal logical critique, often internalizing theoretical flaws as personal failure.'
      }
    },
    strengthsKo: [
      '사람들의 마음에 불을 지피고 자발적인 동참을 이끌어내는 탁월한 동기부여 능력',
      '어떤 갈등 집단도 화해와 상생으로 이끄는 뛰어난 중재력과 소통 기술',
      '타인의 잠재력을 귀신같이 알아보고 훌륭한 리더로 키워내는 멘토링 역량',
      '말과 행동이 일치하는 솔선수범의 자세와 높은 도덕적 신뢰성',
      '주변 사람들에게 끊임없이 긍정적인 에너지를 전파하는 따뜻한 온기'
    ],
    strengthsEn: [
      'Peerless inspirational capacity to motivate, mobilize, and uplift collective morale',
      'Masterful mediation skills that transform fractured groups into harmonious alliances',
      'Incredible mentorship gift that uncovers and nurtures hidden potential in others',
      'High moral integrity; leads by humble, dedicated example rather than authoritarian rule',
      'Radiant emotional warmth that infuses optimism and belonging into every room'
    ],
    weaknessesKo: [
      '모든 사람을 만족시키려다 정작 자신의 몸과 마음을 돌보지 못하는 번아웃',
      '상대방이 원치 않는 조언이나 도움까지 주입하려 하는 지나친 간섭과 과보호',
      '타인의 인정과 칭찬에 지나치게 의존하여 비판에 상처를 크게 받음',
      '갈등을 회피하려다 정작 필요한 쓴소리나 냉정한 결단을 미루는 우유부단함',
      '타인의 문제를 자신의 짐처럼 떠안아 생기는 만성적인 정서적 과부하'
    ],
    weaknessesEn: [
      'Self-neglect and severe exhaustion caused by compulsive people-pleasing',
      'Can become overbearing or meddlesome when imposing unsolicited help onto others',
      'Overly dependent on external social validation, suffering deeply from cold indifference',
      'Hesitation to deliver necessary hard truths due to an aversion to disrupting harmony',
      'Absorbs the burdens of the entire world, carrying overwhelming vicarious guilt'
    ],
    stressLoopKo: 'Fe-Se 루프에 빠지면 외부의 인기와 평판에 집착하여 보여주기식 과시를 하거나 과도한 사교 활동으로 에너지를 낭비합니다. 열등 Ti가 폭발하면 갑자기 냉소적이고 매서운 논리로 상대를 난도질한 뒤 심한 자책감에 빠집니다. Ni로 돌아와 혼자만의 고요한 명상을 통해 자신의 참된 내면과 마주해야 합니다.',
    stressLoopEn: 'A Fe-Se loop breeds frantic image-consciousness and superficial performance. A Ti grip triggers caustic, pedantic nitpicking. Retreating into quiet Ni reflection to reconnect with authentic spiritual purpose restores balance.',
    career: {
      bestEnvironmentKo: '사람들의 삶을 긍정적으로 변화시키고 팀워크와 상호 존중이 살아있는 협력적 환경',
      bestEnvironmentEn: 'Collaborative, human-centered organizations dedicated to education, personal growth, and social empowerment',
      recommendedCareers: ['기업 HR / 인재개발 디렉터', '교육자 / 대학교수', '심리상담센터장', '홍보(PR) 전문가', '비영리단체 대표', '라이프 코칭 전문가', '방송 진행자 (MC)'],
      workStyleKo: '팀원들의 사기를 북돋우며, 모두가 주인의식을 갖고 성장할 수 있도록 판을 깔아주는 서번트 리더십의 표본입니다.',
      workStyleEn: 'Exemplifies servant leadership: rallies teams around inspiring missions, clears obstacles, and celebrates collective victories.'
    },
    relationship: {
      loveStyleKo: '연인의 행복이 곧 나의 행복인 헌신적인 사랑꾼입니다. 상대방의 사소한 취향까지 기억하고 서프라이즈를 선사하며, 서로가 더 멋진 사람으로 함께 성장하는 관계를 지향합니다.',
      loveStyleEn: 'Loving, attentive, and extraordinarily generous. Invests passionately in the partner’s emotional well-being, growth, and joy.',
      bestMatches: ['INFP', 'ISFP'],
      bestMatchReasonKo: 'INFP의 순수한 영혼과 진정성은 ENFJ의 헌신에 가장 깊은 감사와 안식을 돌려주며, 세상에서 가장 아름다운 사랑의 시너지를 발휘합니다.',
      bestMatchReasonEn: 'INFP’s gentle soul and quiet authenticity ground the ENFJ, offering a sanctuary of pure unconditional acceptance.'
    },
    streamerStyle: {
      personaKo: '모든 시청자를 다정하게 챙기며 감동과 웃음, 동기부여를 동시에 선사하는 국민 MC형 스트리머',
      personaEn: 'Charismatic community mentor streamer hosting engaging talk shows, community events, and uplifting multiplayer parties',
      viewerDynamicKo: '채팅창의 소외되는 시청자가 없도록 세심하게 챙기며, 따스한 소통과 리액션으로 방송 전체를 밝은 축제로 만듭니다.',
      viewerDynamicEn: 'Remembers regular viewers by name, weaves chat into co-creators, and runs an uplifting, radiant broadcast.',
      recommendedContent: ['합동 방송 및 크리에이터 인터뷰', '시청자 사연 나눔 및 고민 상담', '협동 멀티플레이어 파티 게임 (잇 테익스 투, 폴가이즈)']
    },
    growthAdviceKo: '타인을 사랑하듯 자신을 사랑하세요. "아니오"라고 거절하는 것은 이기적인 것이 아니라, 더 오래 건강하게 사람들을 돕기 위한 필수적인 용기입니다.',
    growthAdviceEn: 'Learn to say "No" without guilt. Setting healthy boundaries is not a lack of love—it is the very oxygen that keeps your light burning.'
  },

  ENFP: {
    code: 'ENFP',
    nameKo: '재기발랄한 활동가',
    nameEn: 'The Campaigner Spark',
    badge: '✨ 넘치는 열정과 영혼의 에너자이저',
    keywords: ['자유로운 영혼', '무한한 상상력', '열정적 에너지', '사람 중심'],
    mottoKo: '"인생은 지루하기엔 너무나 눈부시고 경이로운 축제다!"',
    mottoEn: '"Life is a dazzling canvas of infinite possibilities waiting to be set ablaze with passion!"',
    overviewKo: 'ENFP는 반짝이는 호기심과 무한한 열정으로 세상을 물들이는 자유로운 방랑자입니다. 주기능 외향직관(Ne)으로 언제 어디서나 흥미진진한 가능성과 새로운 아이디어를 포착하며, 부기능 내향감정(Fi)으로 자신만의 따뜻한 감수성과 인간적인 진정성을 지켜냅니다. 사람들과의 깊은 정서적 교감을 사랑하며, 긍정적인 전염력으로 주변 사람들에게 영감과 미소를 선물합니다. 틀에 박힌 일상을 거부하고 늘 설레는 모험을 찾아 떠나는 영원한 소년/소녀입니다.',
    overviewEn: 'ENFPs are vibrant spirits driven by Extraverted Intuition (Ne) and Introverted Feeling (Fi). Curious, deeply empathetic, and delightfully energetic, they view the world as a kaleidoscope of hidden potentials. They bridge diverse worlds with open-hearted warmth, seeking authentic connection and creative adventure everywhere they go.',
    cognitiveFunctions: {
      dominant: {
        code: 'Ne',
        nameKo: '외향 직관 (주기능)',
        nameEn: 'Extraverted Intuition (Dominant)',
        descKo: '세상의 모든 흥미로운 사람, 아이디어, 사건을 포착하여 상상력을 폭발시키는 안테나.',
        descEn: 'Captures spontaneous connections, igniting an endless cascade of creative visions and excitement.'
      },
      auxiliary: {
        code: 'Fi',
        nameKo: '내향 감정 (부기능)',
        nameEn: 'Introverted Feeling (Auxiliary)',
        descKo: '자신만의 솔직한 감정과 신념에 충실하며, 타인의 개성을 있는 그대로 존중하는 나침반.',
        descEn: 'Anchors vibrant adventures in deep personal values, emotional authenticity, and profound empathy.'
      },
      tertiary: {
        code: 'Te',
        nameKo: '외향 사고 (3차기능)',
        nameEn: 'Extraverted Thinking (Tertiary)',
        descKo: '마음먹은 프로젝트를 세상에 실현하고 사람들을 결집시키는 현실적 추진력.',
        descEn: 'Provides bursts of structured execution, rallying collaborators to bring dreams into tangible fruition.'
      },
      inferior: {
        code: 'Si',
        nameKo: '내향 감각 (열등기능)',
        nameEn: 'Introverted Sensing (Inferior)',
        descKo: '반복적인 서류 정리, 가계부 쓰기, 루틴한 일상 관리에 극심한 피로를 느끼는 취약점.',
        descEn: 'Struggles with repetitive bureaucracy, mundane physical upkeep, and meticulous schedule tracking.'
      }
    },
    strengthsKo: [
      '특유의 밝고 순수한 에너지로 순식간에 사람들의 마음을 열어젖히는 사교력',
      '고정관념을 파괴하는 기발하고 창의적인 아이디어 기획력',
      '타인의 감정적 아픔에 진심으로 눈물 흘리고 위로해 주는 따뜻한 공감 능력',
      '새로운 도전과 낯선 환경에 두려움 없이 뛰어드는 뛰어난 적응력과 모험심',
      '함께 있는 것만으로도 사람들을 미소 짓게 만드는 독보적인 매력'
    ],
    strengthsEn: [
      'Infectious social charisma that melts barriers and makes strangers feel instantly cherished',
      'Boundless creative ideation capable of conceiving truly original campaigns and concepts',
      'Heartfelt empathy that validates the vulnerabilities and dreams of others',
      'Fearless adaptability that dives joyfully into unpredictable adventures and uncharted territory',
      'Irresistible warmth and playful enthusiasm that elevates the spirit of everyone around them'
    ],
    weaknessesKo: [
      '불타오르는 열정으로 시작하지만 마무리를 짓지 못하고 다른 흥미로 옮겨가는 용두사미',
      '감정 기복이 심하여 신날 때는 세상을 다 가질 듯하다가도 순식간에 동굴로 파고듦',
      '사소한 디테일, 일정 약속, 현실적인 예산 관리를 소홀히 하여 겪는 혼란',
      '타인의 사소한 오해나 거절에도 크게 상처받고 마음고생하는 여린 심성',
      '너무 많은 약속과 계획을 벌려놓아 스스로 감당하지 못하고 스트레스를 받음'
    ],
    weaknessesEn: [
      'Chronic follow-through struggles; launches a dozen passions but abandons details when novelty fades',
      'Volatile emotional fluctuations: leaping from ecstatic exuberance to deep existential melancholy',
      'Aversion to administrative rigor, time management, and budget oversight',
      'Deeply sensitive to rejection, agonizing over perceived disapproval or coldness',
      'Over-commits impulsively, getting buried under promises they cannot realistically fulfill'
    ],
    stressLoopKo: 'Ne-Te 루프에 빠지면 불안감을 없애기 위해 무리하게 일을 벌이고 주변 사람들을 통제하려 들며, 열등 Si 폭주 시에는 갑자기 몸이 아프다며 건강 염려증에 빠지거나 과거의 사소한 실수에 갇혀 자책합니다. Fi로 돌아와 조용한 쉼을 취하며 자신의 참된 마음을 달래주어야 합니다.',
    stressLoopEn: 'A Ne-Te loop leads to frenetic, aggressive micromanagement to quiet internal panic. An Si grip brings hypochondria and obsessive fixation on past failures. Returning to Fi reflection—unplugging to honor true inner feelings—restores their sparkle.',
    career: {
      bestEnvironmentKo: '자유로운 개성이 존중받고 다양한 사람들과 창의적인 협업이 펼쳐지는 역동적 공간',
      bestEnvironmentEn: 'Vibrant, open-minded environments celebrating spontaneous innovation, storytelling, and human connection',
      recommendedCareers: ['콘텐츠 크리에이터 / PD', '카피라이터 / 마케터', '방송인 / 연예인', '여행 작가 / 사진가', '이벤트 기획자', '심리상담사 / 청소년 지도사', '아트 디렉터'],
      workStyleKo: '아이디어 회의에서 독보적인 불꽃을 튀기며, 수평적이고 자유로운 분위기 속에서 팀의 분위기 메이커 역할을 완벽히 해냅니다.',
      workStyleEn: 'Dynamic brainstorming powerhouse who infuses optimism into team culture and thrives in flexible, non-hierarchical roles.'
    },
    relationship: {
      loveStyleKo: '영화처럼 로맨틱하고 열정적인 사랑을 합니다. 상대방의 가장 깊은 영혼까지 알고 싶어 하며, 매일매일 새로운 설렘과 애정 표현을 아끼지 않는 사랑스러운 연인입니다.',
      loveStyleEn: 'Passionate, demonstrative, and profoundly romantic. Yearns to explore the depths of their partner’s soul with tender warmth and playful joy.',
      bestMatches: ['INTJ', 'INFJ'],
      bestMatchReasonKo: 'INTJ의 묵직한 지성과 현실적인 든든함은 방황하는 ENFP에게 최고의 안식처가 되며, ENFP의 햇살 같은 밝음은 INTJ의 굳은 마음을 사르르 녹여냅니다.',
      bestMatchReasonEn: 'INTJ’s calm anchor and intellectual mastery provide grounded security, while ENFP’s radiant spontaneity brings joy to the INTJ’s world.'
    },
    streamerStyle: {
      personaKo: '오디오가 단 1초도 비지 않는 하이텐션, 기상천외한 리액션과 통통 튀는 입담의 에너지 폭발형 스트리머',
      personaEn: 'Hyper-energetic variety dynamo whose stream is a non-stop rollercoaster of infectious laughter and spontaneous chaos',
      viewerDynamicKo: '시청자들을 절친처럼 대하며 즉흥 노래, 상황극, 먹방 등 예측 불가능한 매력으로 방송 전체를 파티장으로 만듭니다.',
      viewerDynamicEn: 'Treats chat like an intimate sleepover party, breaking into impromptu singing and rolling with every donation challenge.',
      recommendedContent: ['저스트 채팅 (끝없는 썰 풀기)', '시청자 참여 버라이어티 게임', '새로운 게임 찍먹 및 맛보기 챌린지']
    },
    growthAdviceKo: '열정을 쏟을 대상을 2~3개로 선별하고 끝까지 매듭짓는 습관을 들여보세요. 당신의 눈부신 가능성들이 하나의 현실로 완성될 때 세상은 당신에게 열광할 것입니다.',
    growthAdviceEn: 'Learn to filter your fifty ideas down to three, and follow one to the finish line. When your brilliant potential crystallizes into finished craft, you become unstoppable.'
  },

  ISTJ: {
    code: 'ISTJ',
    nameKo: '청렴결백한 논리주의자',
    nameEn: 'The Inspector Realist',
    badge: '🛡️ 성실함과 흔들리지 않는 신뢰의 기둥',
    keywords: ['철저한 책임감', '원칙과 질서', '정확성', '묵묵한 헌신'],
    mottoKo: '"약속은 반드시 지켜져야 하며, 원칙과 성실함이 사회를 지탱한다."',
    mottoEn: '"Duty, integrity, and steady perseverance build enduring foundations."',
    overviewKo: 'ISTJ는 우리 사회와 조직을 든든하게 떠받치는 신뢰와 책임감의 표본입니다. 주기능 내향감각(Si)으로 축적된 과거의 데이터와 검증된 경험을 정확하게 인출하며, 부기능 외향사고(Te)로 현실의 과업을 한 치의 오차도 없이 완수합니다. 요행이나 지름길을 바라지 않고 묵묵히 땀 흘려 일하는 진정한 노력파이며, 한 번 뱉은 약속은 어떤 희생을 치르더라도 끝까지 지켜냅니다. 조용하지만 가장 믿음직스러운 사회의 기둥입니다.',
    overviewEn: 'ISTJs are the bedrock of society, characterized by steadfast integrity and methodical duty. Guided by Introverted Sensing (Si) and Extraverted Thinking (Te), they revere truth, honor commitments, and execute responsibilities with precision. Unswayed by fleeting fads, they build long-lasting stability through meticulous diligence.',
    cognitiveFunctions: {
      dominant: {
        code: 'Si',
        nameKo: '내향 감각 (주기능)',
        nameEn: 'Introverted Sensing (Dominant)',
        descKo: '과거의 선례, 구체적인 사실, 세부 절차를 완벽하게 기억하고 대조하는 데이터베이스.',
        descEn: 'Catalogs vast stores of verifiable facts, precedents, and detailed procedures with pinpoint accuracy.'
      },
      auxiliary: {
        code: 'Te',
        nameKo: '외향 사고 (부기능)',
        nameEn: 'Extraverted Thinking (Auxiliary)',
        descKo: '규칙과 기한에 맞춰 과업을 일사천리로 완수하고 시스템을 정돈하는 실행력.',
        descEn: 'Implements structured logistics, enforces objective protocols, and ensures timely task completion.'
      },
      tertiary: {
        code: 'Fi',
        nameKo: '내향 감정 (3차기능)',
        nameEn: 'Introverted Feeling (Tertiary)',
        descKo: '겉으로 드러내지 않지만 내면에 깊이 간직한 묵직한 의리와 도덕적 신조.',
        descEn: 'A deeply personal, unspoken core of moral duty, loyalty, and dedication to loved ones.'
      },
      inferior: {
        code: 'Ne',
        nameKo: '외향 직관 (열등기능)',
        nameEn: 'Extraverted Intuition (Inferior)',
        descKo: '갑작스러운 규칙 변화, 불확실한 미래 시나리오 앞에서 겪는 막연한 불안과 저항감.',
        descEn: 'Distrusts unproven changes, chaotic disruptions, and volatile abstract speculation.'
      }
    },
    strengthsKo: [
      '한 번 맡은 일은 비바람이 몰아쳐도 완벽하게 끝마치는 독보적인 책임감',
      '숫자나 문서의 사소한 오류도 놓치지 않는 예리한 관찰력과 정확성',
      '체계적인 계획 수립과 철저한 일정 및 자원 관리 능력',
      '위기 앞에서도 감정에 휘둘리지 않고 평정심을 유지하는 듬직함',
      '가족과 조직에 대한 변함없는 충성과 묵묵한 희생정신'
    ],
    strengthsEn: [
      'Flawless reliability; honors commitments to the letter through sheer dedication',
      'Exceptional precision that spots typographical, computational, and procedural anomalies',
      'Disciplined organizational prowess in scheduling, archiving, and logistical management',
      'Calm, rock-solid composure under organizational stress, unswayed by panic',
      'Unwavering loyalty and quiet dedication to protecting their family and institution'
    ],
    weaknessesKo: [
      '기존 매뉴얼과 관행에 지나치게 집착하여 새로운 혁신을 거부하는 보수성',
      '원칙을 칼같이 적용하다 타인의 인간적 사정을 배려하지 못하는 융통성 부족',
      '감정 표현에 인색하여 가까운 가족이나 연인에게 무뚝뚝하다는 오해를 받음',
      '예기치 못한 돌발 변수나 일정 변경이 생기면 극심한 스트레스를 느낌',
      '자신의 방식만이 옳다고 고집하여 타인과 충돌할 수 있는 완고함'
    ],
    weaknessesEn: [
      'Resistance to innovation; clings rigidly to traditional protocols past their utility',
      'Can be inflexible and dogmatic, failing to accommodate emotional exceptions',
      'Struggles to express emotional affection, often perceived as distant or stern',
      'Highly stressed by abrupt itinerary changes, ambiguous directives, and improvisations',
      'Judgmental of those who fail to exhibit equal levels of discipline and punctuality'
    ],
    stressLoopKo: 'Si-Fi 루프에 빠지면 자신이 겪은 과거의 실패를 곱씹으며 완고하게 마음의 문을 닫아버리고, 열등 Ne 폭주 시에는 모든 것이 파멸할 것이라는 파국적 비관주의에 사로잡혀 극도의 불안을 겪습니다. Te를 작동시켜 객관적인 팩트를 체크하고 한 걸음씩 현실의 질서를 회복해야 합니다.',
    stressLoopEn: 'A Si-Fi loop traps them in bitter stubbornness, re-playing past slights. An Ne grip triggers catastrophic paranoia, envisioning worst-case disasters. Re-engaging auxiliary Te—checking tangible facts, cleaning spaces, and ticking off tasks—restores stability.',
    career: {
      bestEnvironmentKo: '명확한 지침과 표준 매뉴얼이 존재하며, 성실함과 정확성이 높게 평가받는 안정적 환경',
      bestEnvironmentEn: 'Structured, stable environments with well-defined hierarchies and high regard for procedural accuracy',
      recommendedCareers: ['회계사 / 세무사', '감사관 / 공무원', '판사 / 법무사', '군 장교 / 경찰관', '금융 데이터 분석가', '시스템 보안 관리자', '품질 관리(QA) 총괄'],
      workStyleKo: '조직의 룰을 철저히 준수하며, 보고서와 일정에 단 1%의 빈틈도 허용하지 않는 가장 믿음직한 에이스입니다.',
      workStyleEn: 'Methodical, punctual, and exhaustive. Produces impeccably documented deliverables that need zero double-checking.'
    },
    relationship: {
      loveStyleKo: '화려한 이벤트는 서툴지만, 언제나 곁에서 든든한 바람막이가 되어주는 우직한 나무 같은 사랑을 합니다. 변함없는 행동과 헌신으로 신뢰를 쌓아가는 최고의 반려자입니다.',
      loveStyleEn: 'Shows love through steadfast action, stability, and domestic protection rather than grand poetic gestures. The ultimate dependable partner.',
      bestMatches: ['ESFP', 'ESTP'],
      bestMatchReasonKo: 'ESFP의 밝고 유쾌한 에너지는 무뚝뚝한 ISTJ의 일상에 웃음꽃을 피워주며, ISTJ의 든든한 질서는 ESFP에게 안전한 울타리가 되어줍니다.',
      bestMatchReasonEn: 'ESFP brings joyful sunshine and laughter into the ISTJ’s structured routine, while ISTJ offers reassuring grounding and safety.'
    },
    streamerStyle: {
      personaKo: '철저한 노가다와 파밍, 100% 도전과제 달성을 묵묵히 보여주는 장인정신형 스트리머',
      personaEn: 'Disciplined completionist streamer grinding 100% achievements, speedrunning with methodical consistency',
      viewerDynamicKo: '과장된 리액션 대신 담백하고 차분한 목소리로 신뢰를 주며, 성실한 방송 시간 준수로 콘크리트 팬층을 형성합니다.',
      viewerDynamicEn: 'Calm, unpretentious, and strictly punctual; builds a dedicated community that admires relentless patience.',
      recommendedContent: ['시뮬레이션 / 기지 건설 (심즈, 시티즈)', 'RPG 엔드게임 파밍 및 업적 올클리어', '게임 매뉴얼 및 정석 공략']
    },
    growthAdviceKo: '세상은 가끔 계획대로 되지 않기에 아름답습니다. 완벽하지 않은 순간에도 웃어넘기는 유연성을 기르고, 소중한 사람들에게 마음의 온도를 소리 내어 표현해 보세요.',
    growthAdviceEn: 'Allow life to surprise you occasionally. Imperfection is not failure. Practice expressing spoken affection to those who cherish your steady presence.'
  },

  ISFJ: {
    code: 'ISFJ',
    nameKo: '용감한 수호자',
    nameEn: 'The Defender Protector',
    badge: '🕊️ 헌신과 온화함의 따뜻한 안식처',
    keywords: ['이타적 헌신', '세심한 배려', '성실함', '정서적 안정'],
    mottoKo: '"소중한 이들의 행복을 지키는 든든하고 따뜻한 그늘이 되겠다."',
    mottoEn: '"Quietly protect, tenderly nurture, and faithfully remember every gentle kindness."',
    overviewKo: 'ISFJ는 따뜻한 온기와 묵묵한 헌신으로 주변을 밝히는 우리 시대의 천사 같은 존재입니다. 주기능 내향감각(Si)으로 사람들의 사소한 취향과 기억을 보물처럼 간직하며, 부기능 외향감정(Fe)으로 상대방이 진정으로 필요로 하는 배려를 조용히 베풉니다. 자신의 공을 뽐내지 않고 뒤편에서 묵묵히 궂은일을 도맡으며, 약속과 책임을 생명처럼 여깁니다. 안정적이고 조화로운 환경 속에서 소중한 사람들을 돌볼 때 가장 깊은 보람을 느낍니다.',
    overviewEn: 'ISFJs are the compassionate guardians of community and family. Governed by Introverted Sensing (Si) and Extraverted Feeling (Fe), they possess photographic emotional memory, recalling personal preferences and past kindnesses with tender fidelity. Unassuming and fiercely loyal, they work tirelessly behind the scenes to shield loved ones from distress.',
    cognitiveFunctions: {
      dominant: {
        code: 'Si',
        nameKo: '내향 감각 (주기능)',
        nameEn: 'Introverted Sensing (Dominant)',
        descKo: '소중한 사람들의 추억, 사소한 습관, 검증된 일상의 안전을 기억하는 정성 어린 서고.',
        descEn: 'Remembers the detailed preferences, histories, and comforting routines of loved ones with acute fidelity.'
      },
      auxiliary: {
        code: 'Fe',
        nameKo: '외향 감정 (부기능)',
        nameEn: 'Extraverted Feeling (Auxiliary)',
        descKo: '상대방의 불편함을 먼저 감지하고 따뜻하게 챙겨주는 세심한 보살핌의 손길.',
        descEn: 'Anticipates interpersonal needs, providing practical comfort, hospitality, and emotional harmony.'
      },
      tertiary: {
        code: 'Ti',
        nameKo: '내향 사고 (3차기능)',
        nameEn: 'Introverted Thinking (Tertiary)',
        descKo: '도움이 필요한 상황을 실질적이고 체계적으로 해결하는 내면의 현실적 논리.',
        descEn: 'Applies sensible pragmatic logic to organize domestic routines and solve everyday challenges.'
      },
      inferior: {
        code: 'Ne',
        nameKo: '외향 직관 (열등기능)',
        nameEn: 'Extraverted Intuition (Inferior)',
        descKo: '급작스러운 생활 환경의 격변이나 불투명한 미래를 마주할 때 엄습하는 불안감.',
        descEn: 'Becomes anxious when confronted with unpredictable disruptions, novelty, or abstract ambiguity.'
      }
    },
    strengthsKo: [
      '상대방이 말하지 않아도 필요한 것을 알아채고 챙겨주는 기적 같은 세심함',
      '자신의 이익보다 공동체와 소중한 사람들의 평화를 먼저 생각하는 이타심',
      '한번 맺은 인연에 대해 끝까지 신의를 지키는 변함없는 충직함',
      '일상의 살림, 업무 절차, 문서 작업을 한 치의 흐트러짐 없이 정돈하는 꼼꼼함',
      '조용하면서도 주위를 편안하게 녹여내는 온화하고 포근한 안정감'
    ],
    strengthsEn: [
      'Miraculous attentiveness that notices and fulfills the unstated needs of others',
      'Pure altruism that prioritizes family, team, and community well-being over personal vanity',
      'Unshakable fidelity and loyalty to lifelong relationships and solemn duties',
      'Mastery of domestic management, procedural organization, and accurate record-keeping',
      'Gentle, soothing presence that brings calm, order, and hospitality wherever they dwell'
    ],
    weaknessesKo: [
      '부탁을 받으면 거절하지 못하고 혼자 모든 짐을 떠안다 겪는 정서적 탈진',
      '자신의 감정이나 불만을 속으로 삭이다가 곪아 터져버리는 억압적 성향',
      '변화와 새로운 시도를 두려워하여 안락한 익숙함에 안주하려는 보수성',
      '자신의 헌신을 당연하게 여기는 사람들에게 이용당하고도 침묵하는 소심함',
      '타인의 비판이나 굳은 표정을 자신의 탓으로 돌리며 자책하는 과도한 예민함'
    ],
    weaknessesEn: [
      'Inability to say "No", leading to silent exhaustion, burnout, and unexpressed resentment',
      'Bottles up grievances until emotional pressure culminates in tearful distress or withdrawal',
      'Resistance to lifestyle changes and technological shifts out of fear of the unknown',
      'Vulnerable to being taken for granted by selfish individuals due to excessive generosity',
      'Over-personalizes minor slights and coldness, blaming self for external conflicts'
    ],
    stressLoopKo: 'Si-Ti 루프에 빠지면 다른 사람들의 의도를 비관적으로 의심하며 혼자만의 방어적 독선에 갇히고, 열등 Ne 폭주 시에는 가족이나 자신에게 끔찍한 불행이 닥칠 것이라는 공포에 사로잡힙니다. Fe를 회복하여 솔직하게 도움을 요청하고 사람들과 따뜻한 정서적 교류를 나눠야 합니다.',
    stressLoopEn: 'A Si-Ti loop breeds suspicious withdrawal and bitter rumination. An Ne grip triggers panic over catastrophic future events happening to loved ones. Re-engaging Fe—confiding openly in a trusted friend and receiving care—brings healing.',
    career: {
      bestEnvironmentKo: '상호 배려와 감사가 넘치며, 세심한 지원과 실질적 돌봄이 인정받는 따뜻한 환경',
      bestEnvironmentEn: 'Orderly, cooperative environments dedicated to service, healthcare, education, and social care',
      recommendedCareers: ['간호사 / 의사', '초등/유치원 교사', '사회복지사', '인사(HR) 복지 담당자', '비서 / 행정 총괄', '도서관 사서', '사회복지 공무원'],
      workStyleKo: '조직에서 가장 궂은일을 조용히 도맡아 처리하며, 팀원들이 편안하게 일할 수 있도록 뒤에서 완벽한 서포트를 제공합니다.',
      workStyleEn: 'The indispensable backbone of any team: keeps workspaces pristine, remembers birthdays, and ensures flawless operations.'
    },
    relationship: {
      loveStyleKo: '상대방의 건강과 일상을 지극정성으로 챙겨주는 헌신적인 사랑을 합니다. 화려함보다는 변함없는 온기와 정서적 안전기지를 만들어주는 최고의 연인이자 배우자입니다.',
      loveStyleEn: 'Deeply devoted, nurturing, and loyal. Expresses love through thoughtful home-cooked meals, physical comfort, and emotional safety.',
      bestMatches: ['ESFP', 'ESTP'],
      bestMatchReasonKo: 'ESTP의 당당하고 활기찬 에너지는 ISFJ를 새로운 세상으로 이끌어주며, ISFJ의 포근함은 방황하는 ESTP에게 진정한 고향이 되어줍니다.',
      bestMatchReasonEn: 'ESTP’s bold daring encourages ISFJ to step into new adventures, while ISFJ’s sweet loyalty gives ESTP an unshakeable home.'
    },
    streamerStyle: {
      personaKo: '포근한 목소리와 다정한 리액션으로 시청자들의 하루 피로를 씻어주는 온돌방 같은 힐링 스트리머',
      personaEn: 'Gentle, cozy host creating an intimate emotional haven with warm baking, calming games, and sweet chat interactions',
      viewerDynamicKo: '시청자들의 닉네임과 일상을 일일이 기억해 주며, 악플이나 분탕조차 부드럽게 감싸 안는 천사표 방송을 진행합니다.',
      viewerDynamicEn: 'Meticulously remembers viewer milestones, treats chatters like family, and preserves an extraordinarily gentle community.',
      recommendedContent: ['힐링 쿠킹 / 베이킹 라이브', '동물의 숲 / 아기자기한 타이쿤 게임', '잔잔한 일상 소통 및 책 읽어주기']
    },
    growthAdviceKo: '착한 사람 콤플렉스를 내려놓으세요. 당신의 감정과 피로도 소중합니다. 싫은 것은 당당히 거절할 때, 당신의 진정한 선의가 더 큰 힘을 발휘합니다.',
    growthAdviceEn: 'Relinquish the need to please everyone. Boundaries are an act of self-love. Saying "No" to excessive demands empowers your true goodness.'
  },

  ESTJ: {
    code: 'ESTJ',
    nameKo: '엄격한 관리자',
    nameEn: 'The Executive Director',
    badge: '🏛️ 현실적 질서와 체계적인 집행관',
    keywords: ['강력한 추진력', '원칙 준수', '체계적 조직화', '정직과 성실'],
    mottoKo: '"사회와 조직은 명확한 법과 질서, 체계적인 실행을 통해 번영한다."',
    mottoEn: '"Order, discipline, and dedicated execution are the bedrock of success."',
    overviewKo: 'ESTJ는 명확한 규칙과 확고한 추진력으로 사회의 질서를 확립하는 천부적인 관리자입니다. 주기능 외향사고(Te)로 혼란스러운 상황을 즉각적으로 일목요연하게 정리하며, 부기능 내향감각(Si)으로 검증된 매뉴얼과 선례를 바탕으로 프로젝트를 성공으로 이끕니다. 약속 시간과 마감 기한을 칼같이 지키며, 나태함이나 무책임함을 결코 용납하지 않는 단호한 성품을 지닙니다. 솔선수범하여 조직을 승리로 이끄는 든든한 리더입니다.',
    overviewEn: 'ESTJs are pragmatic pillars of community and enterprise, driven by Extraverted Thinking (Te) and Introverted Sensing (Si). Dedicated to civic duty, operational order, and unvarnished truth, they bring clarity and decisive execution to disorganized environments. They lead by rigorous personal example, expecting accountability from all.',
    cognitiveFunctions: {
      dominant: {
        code: 'Te',
        nameKo: '외향 사고 (주기능)',
        nameEn: 'Extraverted Thinking (Dominant)',
        descKo: '과업을 효율적으로 조직화하고 가시적인 성과를 일사천리로 뽑아내는 실행 총괄.',
        descEn: 'Mobilizes resources, establishes clear standard operating procedures, and drives relentless productivity.'
      },
      auxiliary: {
        code: 'Si',
        nameKo: '내향 감각 (부기능)',
        nameEn: 'Introverted Sensing (Auxiliary)',
        descKo: '과거의 성공 데이터와 정교한 매뉴얼을 바탕으로 오차 없이 일을 추진하는 안정망.',
        descEn: 'Grounds leadership in proven traditions, factual track records, and meticulous procedural discipline.'
      },
      tertiary: {
        code: 'Ne',
        nameKo: '외향 직관 (3차기능)',
        nameEn: 'Extraverted Intuition (Tertiary)',
        descKo: '위기 발생 시 기존 대안들을 비교하여 차선책을 신속히 마련하는 유연한 아이디어.',
        descEn: 'Brainstorms practical contingency plans and alternative operational routes when protocols stall.'
      },
      inferior: {
        code: 'Fi',
        nameKo: '내향 감정 (열등기능)',
        nameEn: 'Introverted Feeling (Inferior)',
        descKo: '타인의 섬세한 감정선이나 자신의 취약한 감정을 인정하는 데 서툴러 생기는 갈등.',
        descEn: 'Uncomfortable with irrational emotional sensitivities, often dismissing personal sentiments.'
      }
    },
    strengthsKo: [
      '어떤 복잡한 프로젝트도 단숨에 질서정연한 업무 체계로 재편하는 탁월한 조직화 능력',
      '약속과 일정을 칼같이 지키며 말을 행동으로 즉각 증명하는 불굴의 추진력',
      '위기 속에서도 우유부단하지 않고 명확하고 확고한 결단을 내리는 결단력',
      '거짓 없이 솔직하고 투명하게 소통하는 높은 도덕적 정직성',
      '조직과 공동체를 지키기 위해 사리사욕을 버리고 솔선수범하는 헌신'
    ],
    strengthsEn: [
      'Unrivaled organizational capacity to transform chaotic operations into clockwork efficiency',
      'Ironclad discipline and momentum that translates words into prompt, measurable outcomes',
      'Crystal-clear decisiveness in high-stakes environments, cutting through paralyzing ambiguity',
      'High personal integrity and transparent, straight-shooting communication',
      'Unwavering civic duty, stepping up to shoulder community responsibility without hesitation'
    ],
    weaknessesKo: [
      '자신의 원칙과 기준만을 고집하여 타인을 억압하거나 융통성 없다는 평을 받음',
      '감정적 위로나 공감이 필요한 순간에도 냉정한 해결책만 제시하여 서운함을 줌',
      '자신의 통제를 벗어난 돌발 변수나 불확실한 변화에 대한 강한 거부감과 스트레스',
      '일을 완벽히 해내지 못하는 사람들을 향한 지나친 비판과 참을성 부족',
      '과중한 업무를 스스로 도맡아 처리하려다 생기는 만성적인 육체적 피로'
    ],
    weaknessesEn: [
      'Can be rigid, stubborn, and domineering, enforcing protocols without empathy',
      'Dismisses delicate emotional distress with blunt operational fixes, wounding sensitivities',
      'Deeply unsettled by unorthodox disruptions, ambiguous mandates, and spontaneous chaos',
      'Low tolerance for perceived incompetence, laziness, or emotional excuses in team members',
      'Drives self to exhaustion by refusing to delegate critical responsibilities to others'
    ],
    stressLoopKo: 'Te-Ne 루프에 빠지면 미래에 발생할 온갖 재앙 시나리오를 통제하려 들며 히스테릭한 간섭을 일삼고, 열등 Fi가 폭발하면 아무도 자신을 사랑하지 않고 이용만 한다는 깊은 피해의식에 빠져 절망합니다. Si의 차분한 루틴으로 돌아와 현실의 구체적인 일들을 하나씩 정리해야 합니다.',
    stressLoopEn: 'A Te-Ne loop triggers frantic micromanagement to prevent imaginary operational disasters. An Fi grip unleashes melodramatic feelings of unappreciated martyrdom. Returning to auxiliary Si—disciplined rest, familiar routines, and physical chores—restores control.',
    career: {
      bestEnvironmentKo: '명확한 위계와 평가 기준이 존재하며, 실질적인 실행력과 리더십을 발휘할 수 있는 환경',
      bestEnvironmentEn: 'Structured, results-oriented hierarchies rewarding executive command, accountability, and operational excellence',
      recommendedCareers: ['공장장 / 생산 총괄 디렉터', '군 지휘관 / 경찰 간부', '프로젝트 총괄 디렉터 (COO)', '재무 관리자 (CFO)', '부동산 / 건설 개발 총괄', '법무법인 관리 책임자', '행정 고위 공무원'],
      workStyleKo: '명확한 마일스톤과 역할을 분담하며, 결과에 책임을 지는 당당한 사령관 스타일로 일합니다.',
      workStyleEn: 'Commands with authority, standardizes protocols, tracks deadlines rigorously, and rewards dependable performance.'
    },
    relationship: {
      loveStyleKo: '말보다는 행동으로 가정을 든든하게 지키는 듬직한 바위 같은 사랑을 합니다. 가족의 안전과 경제적 안정, 편안한 울타리를 만들어주는 것을 최고의 사명으로 여깁니다.',
      loveStyleEn: 'Demonstrates love through unshakeable material security, dedicated loyalty, and physical protection. The quintessential provider and protector.',
      bestMatches: ['ISFP', 'ISTP'],
      bestMatchReasonKo: 'ISFP의 따뜻한 감수성과 유연함은 ESTJ의 굳은 어깨를 다정하게 토닥여주며, ESTJ의 든든한 현실감각은 ISFP에게 평화로운 쉼터를 제공합니다.',
      bestMatchReasonEn: 'ISFP’s gentle artistry and sweetness soften ESTJ’s stern demeanor, while ESTJ provides a stable, protective foundation.'
    },
    streamerStyle: {
      personaKo: '철저한 빌드 오더와 통솔력으로 팀을 승리로 이끄는 깐깐하지만 유쾌한 반장형 스트리머',
      personaEn: 'Strict drill sergeant streamer running highly coordinated team lobbies with hilarious zero-tolerance for trolling',
      viewerDynamicKo: '시청자들을 학생 주임처럼 군기 잡으면서도 속정 깊게 챙겨주며, 호탕한 웃음과 시원시원한 진행으로 신뢰를 얻습니다.',
      viewerDynamicEn: 'Runs the stream like a well-drilled squad; roasts slackers, rewards team players, and projects infectious, boisterous authority.',
      recommendedContent: ['RTS 및 전술 시뮬레이션 (스타크래프트)', '하드코어 생존 게임 기지 구축', '시청자 참여 질서정연한 대규모 멀티']
    },
    growthAdviceKo: '논리적으로 옳은 것보다 상대방의 마음을 얻는 것이 더 중요할 때가 있습니다. 정답을 말하기 전에 따뜻한 공감 한마디를 먼저 건네보세요.',
    growthAdviceEn: 'Being right is not the same as being effective. Practice listening without instantly troubleshooting. Tenderness will make your leadership truly beloved.'
  },

  ESFJ: {
    code: 'ESFJ',
    nameKo: '사교적인 외교관',
    nameEn: 'The Consul Caregiver',
    badge: '💐 다정함과 공동체의 따뜻한 구심점',
    keywords: ['사교적 화합', '세심한 배려', '친화력', '책임감'],
    mottoKo: '"모두가 함께 웃고 행복할 수 있는 따뜻한 공동체를 만드는 것이 나의 기쁨이다."',
    mottoEn: '"Bring people together with generous warmth, service, and joyful hospitality."',
    overviewKo: 'ESFJ는 모임의 분위기를 화사하게 밝히고 사람들을 하나로 묶어내는 다정다감한 친선대사입니다. 주기능 외향감정(Fe)으로 주변 사람들의 기분과 감정을 섬세하게 살피며, 부기능 내향감각(Si)으로 소소한 기념일과 취향을 기억해 정성 어린 선물을 건넵니다. 누구와도 쉽게 친구가 되는 독보적인 친화력을 지녔으며, 조직의 화합과 전통을 지키는 데 헌신합니다. 타인을 기쁘게 해줄 때 가장 큰 행복을 느끼는 진정한 사랑둥이입니다.',
    overviewEn: 'ESFJs are the warm, social heartbeats of their communities, propelled by Extraverted Feeling (Fe) and Introverted Sensing (Si). Attuned to social dynamics and practical harmony, they thrive on hospitality, service, and community traditions. They remember the details that make others feel cherished, creating vibrant spaces of belonging.',
    cognitiveFunctions: {
      dominant: {
        code: 'Fe',
        nameKo: '외향 감정 (주기능)',
        nameEn: 'Extraverted Feeling (Dominant)',
        descKo: '모든 사람의 기분을 살피고 화기애애한 파티 분위기를 이끌어내는 친화력 엔진.',
        descEn: 'Fosters communal harmony, actively reading and validating social sentiments to ensure everyone feels included.'
      },
      auxiliary: {
        code: 'Si',
        nameKo: '내향 감각 (부기능)',
        nameEn: 'Introverted Sensing (Auxiliary)',
        descKo: '사람들의 생일, 취향, 기념일과 검증된 예절을 꼼꼼하게 챙기는 기억력.',
        descEn: 'Anchors hospitality in thoughtful traditions, remembering birthdays, favorite foods, and social etiquettes.'
      },
      tertiary: {
        code: 'Ne',
        nameKo: '외향 직관 (3차기능)',
        nameEn: 'Extraverted Intuition (Tertiary)',
        descKo: '모임이나 파티를 더욱 즐겁게 만들기 위한 유쾌한 아이디어와 소통 센스.',
        descEn: 'Spices up social gatherings with playful event ideas, games, and creative conversational spontaneity.'
      },
      inferior: {
        code: 'Ti',
        nameKo: '내향 사고 (열등기능)',
        nameEn: 'Introverted Thinking (Inferior)',
        descKo: '자신에 대한 차가운 논리적 비판이나 비난을 마주했을 때 겪는 심한 상처와 불안.',
        descEn: 'Feels deeply wounded by cold, impersonal criticism; struggles to detach self-worth from external critique.'
      }
    },
    strengthsKo: [
      '어색한 분위기도 단숨에 화기애애하게 녹여버리는 마법 같은 친화력과 말솜씨',
      '주변 사람들의 작은 변화나 기분 상함을 즉각 알아채고 챙겨주는 세심한 배려',
      '모임, 파티, 행사를 흠잡을 데 없이 성공적으로 조직해 내는 탁월한 주최 역량',
      '약속과 규칙을 철저히 지키며 신의를 배신하지 않는 굳건한 책임감',
      '타인의 기쁨을 나의 기쁨처럼 진심으로 축하해 주는 순수한 이타심'
    ],
    strengthsEn: [
      'Effortless social warmth that dismantles awkwardness and unites diverse groups into close friends',
      'Hyper-acute emotional antenna that notices subtle shifts in morale and provides immediate comfort',
      'Masterful coordination of events, celebrations, and gatherings with flawless hospitality',
      'Steadfast dependability; honors social commitments and duties with faithful diligence',
      'Genuine altruism that celebrates the achievements of others with unreserved joy'
    ],
    weaknessesKo: [
      '타인의 시선과 사회적 평판에 지나치게 신경 쓰느라 자신의 참된 욕구를 억누름',
      '자신의 호의와 정성이 인정받지 못하면 서운함과 배신감을 강하게 느낌',
      '갈등이나 불화를 극도로 두려워하여 문제를 공론화하지 못하고 속으로 앓음',
      '가십이나 남들의 사소한 참견에 휩쓸리기 쉬운 취약성',
      '상대방이 원치 않는 간섭이나 보살핌을 주입하여 부담을 주는 과유불급'
    ],
    weaknessesEn: [
      'Hypersensitive to social status, gossip, and external validation at the expense of personal needs',
      'Prone to deep resentment when generous sacrifices go unacknowledged or unreciprocated',
      'Paralyzed by interpersonal friction, often sweeping necessary tensions under the rug to preserve false peace',
      'Can become overly invested in gossip and social drama within their circles',
      'Risk of becoming suffocatingly overprotective, imposing unwanted assistance onto independent souls'
    ],
    stressLoopKo: 'Fe-Ne 루프에 빠지면 사람들이 나를 싫어할 것이라는 사회적 불안에 사로잡혀 과도한 확인과 참견을 일삼고, 열등 Ti가 폭발하면 극도로 냉소적이고 삐딱한 독설가로 돌변합니다. Si의 현실적 루틴으로 돌아와 감사 일기를 쓰고 소소한 집안일을 정돈하며 안정을 찾아야 합니다.',
    stressLoopEn: 'A Fe-Ne loop breeds social anxiety and manic confirmation-seeking. A Ti grip turns them caustically hyper-critical. Returning to auxiliary Si—engaging in grounding domestic routines and savoring simple proven comforts—restores equilibrium.',
    career: {
      bestEnvironmentKo: '사람들과 활발히 교류하며 따뜻한 서비스와 정서적 배려가 높게 평가받는 협력적 환경',
      bestEnvironmentEn: 'Collaborative, socially connected environments celebrating human care, event organization, and service',
      recommendedCareers: ['초등 교사 / 유치원 원장', '고객만족(CS) 총괄 디렉터', '웨딩 / 이벤트 플래너', '항공 승무원 사무장', '병원 행정 / 간호 관리자', '사회복지관장', '홍보 및 대외협력 전문가'],
      workStyleKo: '조직의 윤활유 역할을 완벽히 수행하며, 동료들의 사기를 북돋우고 모두가 하나로 뭉치도록 돕습니다.',
      workStyleEn: 'The ultimate social glue: builds team esprit de corps, honors traditions, and ensures projects run smoothly with high morale.'
    },
    relationship: {
      loveStyleKo: '기념일마다 정성 가득한 선물과 편지로 감동을 주는 다정함의 끝판왕입니다. 연인의 일상을 세심하게 챙기며, 가정을 세상에서 가장 화목하고 따뜻한 파티장으로 가꿉니다.',
      loveStyleEn: 'Tender, expressive, and unfailingly supportive. Celebrates every anniversary and showers their partner with practical acts of service and affection.',
      bestMatches: ['ISFP', 'ISTP'],
      bestMatchReasonKo: 'ISFP의 자유롭고 온화한 예술적 감수성은 ESFJ의 따스한 마음에 깊은 영감을 주며, 서로를 가장 소중히 아껴주는 꿀 떨어지는 커플이 됩니다.',
      bestMatchReasonEn: 'ISFP’s sweet, non-judgmental acceptance allows ESFJ to relax, while ESFJ provides reliable support and affectionate structure.'
    },
    streamerStyle: {
      personaKo: '동네 이장님처럼 모든 시청자를 살뜰히 챙기고 웃음과 수다로 가득 채우는 친화력 만렙 스트리머',
      personaEn: 'Sunny hospitality host welcoming every newcomer like family, running lively viewer-games and wholesome talk shows',
      viewerDynamicKo: '시청자들의 사소한 근황까지 다 기억해 주며, 악플러조차 타이르고 교화시키는 마더 테레사급 포용력을 보여줍니다.',
      viewerDynamicEn: 'Meticulously acknowledges chatters, fosters zero toxicity, and transforms the stream into an uplifting neighborhood gathering.',
      recommendedContent: ['시청자 참여 쿡방 및 먹방 소통', '파티 미니게임 (어몽어스, 구스구스덕)', '기념일 이벤트 및 팬 선물 언박싱']
    },
    growthAdviceKo: '모든 사람에게 좋은 사람일 필요는 없습니다. 타인의 인정보다 내 마음의 소리에 귀 기울이세요. 스스로를 먼저 사랑할 때 당신의 배려는 더욱 빛납니다.',
    growthAdviceEn: 'You do not need to be everyone’s savior. Your worth is intrinsic, not earned through tireless service. Love yourself first without seeking permission.'
  },

  ISTP: {
    code: 'ISTP',
    nameKo: '만능 재주꾼',
    nameEn: 'The Virtuoso Crafter',
    badge: '🛠️ 냉철한 이성과 기계적 메커니즘의 마스터',
    keywords: ['문제 해결사', '탁월한 순발력', '냉철한 이성', '독립적 장인'],
    mottoKo: '"백 마디 말보다 한 번의 직접적인 분해와 조립이 진실을 말해준다."',
    mottoEn: '"Understand the mechanics, stay cool under fire, and fix it with your own hands."',
    overviewKo: 'ISTP는 차분한 이성과 뛰어난 손재주로 도구와 시스템을 능수능란하게 다루는 타고난 기술자이자 해결사입니다. 주기능 내향사고(Ti)로 기계나 상황의 원리를 완벽하게 분해하여 분석하며, 부기능 외향감각(Se)으로 위기 상황에서도 눈 하나 깜빡하지 않고 빛의 속도로 대처합니다. 말보다는 행동을 앞세우며, 불필요한 감정 소모나 형식적인 규율을 극도로 혐오합니다. 조용히 관찰하다가 문제가 터지면 단 한 번의 결정타로 해결해 버리는 쿨한 승부사입니다.',
    overviewEn: 'ISTPs are enigmatic artisans combining detached logic with kinetic mastery. Propelled by Introverted Thinking (Ti) and Extraverted Sensing (Se), they explore the world through tactile mastery, deconstructing mechanisms to see how they tick. Calm, unpretentious, and fiercely independent, they thrive under pressure and solve real-world crises with surgical efficiency.',
    cognitiveFunctions: {
      dominant: {
        code: 'Ti',
        nameKo: '내향 사고 (주기능)',
        nameEn: 'Introverted Thinking (Dominant)',
        descKo: '사물의 물리적 메커니즘과 논리적 인과관계를 냉정하게 파악하는 정밀한 분석기.',
        descEn: 'Deconstructs practical problems into fundamental mechanical principles with detached clarity.'
      },
      auxiliary: {
        code: 'Se',
        nameKo: '외향 감각 (부기능)',
        nameEn: 'Extraverted Sensing (Auxiliary)',
        descKo: '눈앞의 상황 변화를 민첩하게 포착하고 오감으로 도구를 다루는 뛰어난 신체 감각.',
        descEn: 'Reads physical surroundings in real time, reacting with cat-like reflexes and tactile mastery.'
      },
      tertiary: {
        code: 'Ni',
        nameKo: '내향 직관 (3차기능)',
        nameEn: 'Introverted Intuition (Tertiary)',
        descKo: '위기 순간에 직관적으로 문제의 핵심 원인을 짚어내는 내면의 통찰 레이더.',
        descEn: 'Provides flashes of instinctive foresight, zeroing in on the single crux of a complex issue.'
      },
      inferior: {
        code: 'Fe',
        nameKo: '외향 감정 (열등기능)',
        nameEn: 'Extraverted Feeling (Inferior)',
        descKo: '감정적인 위로나 사교적 스몰토크 자리에서 느끼는 극심한 어색함과 회피 본능.',
        descEn: 'Feels clumsy navigating emotional dramas, group expectations, and sentimental displays.'
      }
    },
    strengthsKo: [
      '위기나 사고가 발생했을 때 공황에 빠지지 않고 즉각 문제를 해결하는 냉철한 담력',
      '도구, 소프트웨어, 기계, 신체 조작에서 발휘되는 천부적인 감각과 손재주',
      '복잡한 군더더기를 걷어내고 가장 빠르고 효율적인 해결책을 찾아내는 실용성',
      '타인의 간섭이나 시선에 연연하지 않고 자신만의 페이스를 지키는 쿨한 독립성',
      '불필요한 참견이나 험담을 하지 않는 담백하고 깔끔한 인간관계'
    ],
    strengthsEn: [
      'Ice-cold composure in acute physical crises, troubleshooting disasters without panic',
      'Innate physical coordination and technical mastery over tools, machinery, and software',
      'Ruthless practicality that eliminates superfluous fluff to find the leanest solution',
      'Fierce, unbothered self-reliance that operates completely independent of social approval',
      'Clean, drama-free interpersonal posture; never meddles, gossips, or manipulates'
    ],
    weaknessesKo: [
      '상대방의 감정적 고통을 이해하지 못하고 차갑게 무시한다는 오해를 받음',
      '지루한 일상이나 반복적인 규칙을 견디지 못하고 갑자기 잠수를 타거나 충동적으로 행동함',
      '속마음을 도무지 털어놓지 않아 가까운 사람들에게 벽을 느끼게 만듦',
      '위험한 익스트림 스포츠나 충동적인 스릴에 과도하게 몰입하는 경향',
      '장기적인 계획 수립이나 복잡한 감정적 대화를 기피하는 성향'
    ],
    weaknessesEn: [
      'Can appear insensitive, brusque, and emotionally detached to sensitive individuals',
      'Easily bored by routine, leading to abrupt disappearances, absenteeism, or risky thrill-seeking',
      'Enigmatic secrecy; keeps thoughts so tightly guarded that intimate partners feel shut out',
      'Vulnerable to reckless physical danger in pursuit of adrenaline-pumping sensory stimulation',
      'Allergy to long-range theoretical commitments and heavy emotional processing sessions'
    ],
    stressLoopKo: 'Ti-Ni 루프에 빠지면 세상에 대해 냉소적인 음모론을 펼치며 침묵의 고립에 빠지고, 열등 Fe 폭주 시에는 사소한 일에 갑자기 어린아이처럼 감정을 폭발시켜 주변을 당혹스럽게 만듭니다. Se를 작동시켜 바이크 타기, 목공, 운동 등 몸을 쓰는 활동을 통해 현실 감각을 깨워야 합니다.',
    stressLoopEn: 'A Ti-Ni loop spins dark, cynical theories about why everything is pointless. An Fe grip triggers rare, awkward bursts of volatile emotion. Reigniting Se—tinkering with hands, riding motorcycles, physical sports—restores their grounded swagger.',
    career: {
      bestEnvironmentKo: '간섭 없이 혼자만의 독립적인 재량으로 실질적인 문제를 해결할 수 있는 현장 중심 환경',
      bestEnvironmentEn: 'Action-oriented, hands-on environments rewarding real-time problem solving, autonomy, and zero red tape',
      recommendedCareers: ['소프트웨어 개발자 / 해커', '항공기 조종사 / 레이서', '외과의사 / 응급구조사', '엔지니어 / 메카닉', '포렌식 수사관 / 탐정', '사운드 엔지니어', '전문 스포츠 선수'],
      workStyleKo: '말 많은 회의를 질색하며, 문제가 발생했을 때 즉시 장비를 들고 투입되어 깔끔하게 해결하고 퇴근하는 쿨한 스페셜리스트입니다.',
      workStyleEn: 'Quiet technician who bypasses bureaucratic debates, diagnoses root causes swiftly, and fixes what is broken.'
    },
    relationship: {
      loveStyleKo: '말보다 행동으로 보여주는 츤데레의 정석입니다. 구속받는 것도, 구속하는 것도 싫어하며, 서로의 독립적인 공간을 존중해 주는 편안한 파트너를 원합니다.',
      loveStyleEn: 'Understated, unpossessive, and quietly loyal. Expresses love by fixing things, sharing physical activities, and granting total freedom.',
      bestMatches: ['ESFJ', 'ESTJ'],
      bestMatchReasonKo: 'ESFJ의 다정하고 세심한 보살핌은 무뚝뚝한 ISTP의 마음을 편안하게 녹여주며, ISTP의 든든한 문제 해결력은 ESFJ에게 큰 안도감을 줍니다.',
      bestMatchReasonEn: 'ESFJ’s open warmth draws ISTP gently out of their shell, while ISTP’s calm grounding eases ESFJ’s social anxieties.'
    },
    streamerStyle: {
      personaKo: '무표정으로 초고난도 플레이를 껌 씹듯 클리어하는 피지컬 깡패형 스트리머',
      personaEn: 'Deadpan mechanical god streamer clutching impossible 1v5 scenarios with zero heartbeat change',
      viewerDynamicKo: '채팅창의 주접에 담담하게 "어 그래"로 일관하지만 가끔 터져 나오는 은근한 츤데레 멘트로 팬들의 심장을 저격합니다.',
      viewerDynamicEn: 'Cool, laconic, and unshakeable; chats quietly while dropping jaw-dropping clutch plays that break clip channels.',
      recommendedContent: ['하드코어 FPS (발로란트, 에이펙스 레전드)', '소울라이크 노히트 클리어 챌린지', '기계 분해/수리 및 커스텀 PC 빌드']
    },
    growthAdviceKo: '가끔은 상대방의 마음에 "논리적인 정답" 대신 "따뜻한 공감"이 필요하다는 사실을 기억하세요. 말로 표현하지 않는 마음은 아무도 알 수 없습니다.',
    growthAdviceEn: 'Remember that emotional validation is often the most logical solution to human conflict. Speak your affections out loud—people cannot read your quiet loyalty.'
  },

  ISFP: {
    code: 'ISFP',
    nameKo: '호기심 많은 예술가',
    nameEn: 'The Adventurer Artist',
    badge: '🎨 온화한 감수성과 순간의 미학자',
    keywords: ['순수한 감수성', '자유로운 영혼', '예술적 감각', '겸손과 배려'],
    mottoKo: '"현재 이 순간의 아름다움을 온몸으로 느끼며 나답게 살아가겠다."',
    mottoEn: '"Live gently, embrace the exquisite beauty of this present moment, and stay true to your heart."',
    overviewKo: 'ISFP는 따뜻한 감수성과 뛰어난 미적 감각으로 세상을 조용히 물들이는 온화한 예술가입니다. 주기능 내향감정(Fi)으로 자신만의 확고한 가치관과 진정성을 조용히 간직하며, 부기능 외향감각(Se)으로 지금 이 순간의 시각, 청각, 미각 등 오감의 아름다움을 생생하게 즐깁니다. 타인을 통제하려 하지 않고 있는 그대로 포용하며, 평화롭고 조용한 일상 속에서 자신만의 예술적 표현을 꽃피웁니다. 자연과 동물을 사랑하는 따뜻한 평화주의자입니다.',
    overviewEn: 'ISFPs are gentle, free-spirited artists governed by Introverted Feeling (Fi) and Extraverted Sensing (Se). Modest, sensitive, and deeply attuned to aesthetic harmony, they experience reality with acute sensory richness. Uninterested in dominating others, they live and let live, expressing their authentic soul through quiet creation, tactile crafts, and gentle grace.',
    cognitiveFunctions: {
      dominant: {
        code: 'Fi',
        nameKo: '내향 감정 (주기능)',
        nameEn: 'Introverted Feeling (Dominant)',
        descKo: '자신만의 깊은 도덕적 진실과 순수한 정서를 소중하게 간직하는 감성의 옹달샘.',
        descEn: 'Maintains an intensely personal core of authenticity, quiet compassion, and unshakeable inner integrity.'
      },
      auxiliary: {
        code: 'Se',
        nameKo: '외향 감각 (부기능)',
        nameEn: 'Extraverted Sensing (Auxiliary)',
        descKo: '지금 이 순간의 색감, 사운드, 질감 등 감각적 아름다움을 생생하게 포착하는 예술가적 렌즈.',
        descEn: 'Absorbs the vibrant texture, color, and kinetic beauty of immediate physical reality with acute artistry.'
      },
      tertiary: {
        code: 'Ni',
        nameKo: '내향 직관 (3차기능)',
        nameEn: 'Introverted Intuition (Tertiary)',
        descKo: '사물과 예술 작품의 이면에 깃든 아련한 분위기와 은유적 감각을 감지하는 직관.',
        descEn: 'Senses subtle symbolic currents and thematic depth beneath sensory surfaces.'
      },
      inferior: {
        code: 'Te',
        nameKo: '외향 사고 (열등기능)',
        nameEn: 'Extraverted Thinking (Inferior)',
        descKo: '엄격한 규율, 냉정한 비판, 경쟁과 마감 기한의 압박 앞에서 겪는 무기력함.',
        descEn: 'Struggles with abrasive logic, corporate bureaucracy, and enforcing cold, objective deadlines.'
      }
    },
    strengthsKo: [
      '뛰어난 시각/청각적 센스와 미적 감각으로 아름다움을 창조해 내는 예술적 재능',
      '타인의 개성과 선택을 아무런 편견 없이 있는 그대로 존중하는 넓은 포용력',
      '현재 이 순간의 행복을 생생하게 만끽할 줄 아는 건강한 삶의 태도',
      '다투거나 경쟁하기보다 주위 사람들을 편안하게 해주는 부드러운 온화함',
      '동물, 자연, 약자를 향한 한없이 따스하고 진실된 연민'
    ],
    strengthsEn: [
      'Incredible aesthetic sensibility and tactile craftsmanship in design, music, and art',
      'Pure, non-judgmental acceptance of others’ quirks, lifestyles, and vulnerabilities',
      'Mastery of mindfulness; savors the beauty and sensory delight of the living present',
      'Gentle, unpretentious demeanor that dissolves tension and provides soothing comfort',
      'Profound, unspoken empathy for animals, the natural world, and defenseless beings'
    ],
    weaknessesKo: [
      '경쟁이 치열하거나 갈등이 빈번한 환경에서 심각한 스트레스를 받고 도망침',
      '계획 세우기와 마감 관리를 극도로 힘들어하며 즉흥적인 기분에 좌우되기 쉬움',
      '자신의 속마음이나 서운함을 똑 부러지게 말하지 못하고 속으로 끙끙 앓음',
      '작은 비판에도 자신 전체가 부정당한 것처럼 깊은 상처를 받는 여린 멘탈',
      '장기적인 미래 계획이나 재정 관리에 대한 만성적인 무관심'
    ],
    weaknessesEn: [
      'Extremely sensitive to conflict and harsh environments, swiftly fleeing from confrontation',
      'Severe aversion to long-range planning, rigid schedules, and regimented timeframes',
      'Struggles with assertive self-advocacy, swallowing grievances until silently alienated',
      'Takes criticism deeply to heart, perceiving impersonal feedback as an existential attack',
      'Neglects practical forward planning, living so intensely in the present that finances suffer'
    ],
    stressLoopKo: 'Fi-Ni 루프에 빠지면 자신의 미래가 암담할 것이라는 무기력한 피해의식에 갇히고, 열등 Te 폭주 시에는 갑자기 평소와 달리 쌀쌀맞고 거만하게 굴며 상대를 논리적으로 깎아내리려 합니다. Se를 회복하여 산책하기, 그림 그리기, 맛있는 음식 먹기 등 오감을 즐겁게 해 주어야 합니다.',
    stressLoopEn: 'A Fi-Ni loop generates dark premonitions that they are trapped in a meaningless destiny. A Te grip triggers sharp, dictatorial outbursts. Awakening Se—engaging in crafts, tactile cooking, or nature hikes—restores gentle equilibrium.',
    career: {
      bestEnvironmentKo: '간섭과 마감 압박 없이 자신의 심미안과 감각을 자유롭게 발휘할 수 있는 평화로운 환경',
      bestEnvironmentEn: 'Low-conflict, aesthetically inspiring environments honoring personal pace, creativity, and tactile craft',
      recommendedCareers: ['비주얼 디자이너 / 일러스트레이터', '패션 / 인테리어 스타일리스트', '동물 조련사 / 수의테크니션', '셰프 / 바리스타', '음악가 / 사운드 디자이너', '플로리스트', '사진작가'],
      workStyleKo: '조용히 자신의 작품에 몰두하며, 동료들에게 부담을 주지 않고 각자의 개성을 존중하는 평화주의자입니다.',
      workStyleEn: 'Quietly crafts exceptional work with humble pride; avoids corporate politicking and thrives in cooperative harmony.'
    },
    relationship: {
      loveStyleKo: '말보다는 따뜻한 눈빛, 깜짝 선물, 손을 잡아주는 스킨십으로 사랑을 전하는 다정한 로맨티시스트입니다. 상대방을 구속하지 않고 자유를 선물하는 편안한 연인입니다.',
      loveStyleEn: 'Gentle, attentive, and tactile. Expresses romantic devotion through shared sensory delights, thoughtful gifts, and tender freedom.',
      bestMatches: ['ESFJ', 'ESTJ'],
      bestMatchReasonKo: 'ESFJ의 넘치는 애정과 든든한 챙김은 수줍음 많은 ISFP에게 가장 안전한 울타리가 되어주며, 서로의 부족함을 완벽히 보완합니다.',
      bestMatchReasonEn: 'ESFJ’s loving initiative and social stability provide the reassuring anchor that allows ISFP’s shy heart to fully blossom.'
    },
    streamerStyle: {
      personaKo: '몽환적인 감성, 아름다운 브금과 힐링 플레이로 지친 현대인들을 치유하는 감성 힐러 스트리머',
      personaEn: 'Aesthetic mood streamer featuring gorgeous lo-fi visuals, serene soundtrack curation, and gentle cozy gameplay',
      viewerDynamicKo: '시청자들과 조용조용 소통하며, 편안하게 누워서 들을 수 있는 수면제 같은 힐링 방송을 만듭니다.',
      viewerDynamicEn: 'Soft-spoken and delightfully chill; cultivates a peaceful, pajama-party atmosphere where fans come to unwind.',
      recommendedContent: ['힐링 인디 어드벤처 게임 (저니, 그리스)', '디지털 드로잉 & 그래픽 작업 라이브', '소소한 브이로그 & 펫캠']
    },
    growthAdviceKo: '갈등을 무조건 피하지만 말고, 내 소중한 감정과 권리를 당당하게 표현하는 연습을 해보세요. 솔직한 거절은 관계를 망치는 것이 아니라 더 건강하게 만듭니다.',
    growthAdviceEn: 'Do not fear conflict so much that you erase yourself. Speaking up for your needs does not destroy peace—it builds authentic, lasting respect.'
  },

  ESTP: {
    code: 'ESTP',
    nameKo: '모험을 즐기는 사업가',
    nameEn: 'The Entrepreneur Dynamo',
    badge: '🔥 거침없는 에너지와 승부사적 돌파가',
    keywords: ['폭발적 순발력', '현실적 담력', '위기 해결사', '유쾌한 행동파'],
    mottoKo: '"생각만 하다가 기회를 놓치지 마라. 지금 당장 뛰어들어 부딪쳐라!"',
    mottoEn: '"Life is an extreme sport. Seize the moment, take the calculated leap, and own the room."',
    overviewKo: 'ESTP는 거침없는 행동력과 동물적인 감각으로 현장을 지배하는 타고난 승부사이자 개척자입니다. 주기능 외향감각(Se)으로 주변의 모든 기회와 물리적 상황을 빛의 속도로 포착하며, 부기능 내향사고(Ti)로 순간적인 유불리를 칼같이 계산해 행동으로 옮깁니다. 머뭇거리거나 고민하는 대신 일단 부딪치며 문제를 해결하는 불도저 같은 에너지를 가졌으며, 어떤 절체절명의 위기 앞에서도 씩 웃으며 상황을 역전시키는 담대한 매력을 뿜어냅니다.',
    overviewEn: 'ESTPs are kinetic dynamos governed by Extraverted Sensing (Se) and Introverted Thinking (Ti). Bold, pragmatic, and electrifyingly charismatic, they navigate physical reality with unmatched reflexes and street smarts. They thrive in fast-paced turbulence, bypassing theoretical hesitation to seize lucrative opportunities and solve acute crises on the fly.',
    cognitiveFunctions: {
      dominant: {
        code: 'Se',
        nameKo: '외향 감각 (주기능)',
        nameEn: 'Extraverted Sensing (Dominant)',
        descKo: '주변의 모든 시각, 청각, 기회를 번개처럼 포착하고 행동으로 직행하는 감각 레이더.',
        descEn: 'Feasts on the dynamic pulse of immediate reality, reacting with instantaneous physical reflexes.'
      },
      auxiliary: {
        code: 'Ti',
        nameKo: '내향 사고 (부기능)',
        nameEn: 'Introverted Thinking (Auxiliary)',
        descKo: '복잡한 상황에서도 무엇이 가장 유리하고 실질적인가를 계산하는 냉철한 현실 두뇌.',
        descEn: 'Calculates practical tactical leverage, deconstructing risks and mechanical bottlenecks instantly.'
      },
      tertiary: {
        code: 'Fe',
        nameKo: '외향 감정 (3차기능)',
        nameEn: 'Extraverted Feeling (Tertiary)',
        descKo: '분위기를 띄우고 사람들의 호감을 사서 내 편으로 만드는 유쾌한 사교술과 쇼맨십.',
        descEn: 'Applies playful social charm, humor, and street-smart persuasiveness to win over crowds.'
      },
      inferior: {
        code: 'Ni',
        nameKo: '내향 직관 (열등기능)',
        nameEn: 'Introverted Intuition (Inferior)',
        descKo: '먼 미래의 추상적 예측이나 보이지 않는 내면의 의미를 탐구하는 데 느끼는 지루함과 불안.',
        descEn: 'Disdains long-term abstract theorizing; vulnerable to sudden bouts of superstitious dread under stress.'
      }
    },
    strengthsKo: [
      '돌발 위기나 긴급 상황에서도 공황 없이 상황을 장악하는 압도적인 순발력과 담력',
      '사람들을 한순간에 사로잡는 화끈하고 유쾌한 카리스마와 쇼맨십',
      '말보다 직접 몸으로 부딪쳐 결과를 만들어내는 강력한 실행력과 추진력',
      '사물의 작동 원리와 메커니즘을 빠르게 파악하고 응용하는 뛰어난 적응력',
      '뒤끝 없이 쿨하고 솔직담백하게 소통하는 매력적인 리더십'
    ],
    strengthsEn: [
      'Unshakeable tactical courage; thrives in adrenaline-fueled emergencies where others freeze',
      'Irresistible stage presence, natural showmanship, and magnetic street charisma',
      'Dynamic bias for action that obliterates analysis-paralysis and generates immediate momentum',
      'Razor-sharp real-time troubleshooting ability across physical systems, tools, and markets',
      'Generous, authentic, and completely free of passive-aggressive pettiness'
    ],
    weaknessesKo: [
      '깊은 생각 없이 충동적으로 뛰어들었다가 감당하기 힘든 리스크를 초래함',
      '상대방의 섬세한 감정이나 상처를 헤아리지 못하고 내뱉는 거친 직설 화법',
      '지루하고 반복적인 서류 작업이나 장기적인 프로젝트를 끈기 있게 유지하지 못함',
      '규칙과 법률의 경계를 아슬아슬하게 넘나들며 문제를 일으키는 위험성',
      '당장의 쾌락과 짜릿한 자극에 눈이 멀어 미래를 대비하지 않는 무계획성'
    ],
    weaknessesEn: [
      'Impulsive, high-risk gambles taken without assessing compounding long-term consequences',
      'Tactless bluntness that accidentally wounds sensitive individuals during banter',
      'Intolerant of routine paperwork, long theoretical lectures, and sedentary commitments',
      'Prone to bending rules, pushing boundaries, and courting reckless physical/financial danger',
      'Easily seduced by immediate hedonistic sensory gratification over sustainable planning'
    ],
    stressLoopKo: 'Se-Fe 루프에 빠지면 주변의 관심과 인기에 중독되어 무리한 위험을 감수하거나 허세를 부리고, 열등 Ni 폭주 시에는 알 수 없는 불길한 예감과 망상에 사로잡혀 무기력해집니다. Ti를 가동하여 냉정하게 손익을 따져보고 실질적인 팩트에 집중해야 합니다.',
    stressLoopEn: 'A Se-Fe loop leads to reckless showboating to win cheap social applause. An Ni grip triggers superstitious paranoia about inevitable doom. Activating auxiliary Ti—stepping back to evaluate cold, calculated logic—restores their tactical genius.',
    career: {
      bestEnvironmentKo: '격식이나 관료제 없이 즉각적인 판단과 기민한 순발력으로 큰 보상을 얻는 역동적 환경',
      bestEnvironmentEn: 'Fast-paced, high-stakes environments rewarding quick wits, tangible negotiation, and bold risk-taking',
      recommendedCareers: ['기업 창업가 / 영업 총괄', '응급구조사 / 소방관', '주식/선물 트레이더', '스포츠 에이전트 / 프로 선수', '부동산 디벨로퍼', '탐정 / 경찰 수사관', '스턴트맨 / 액션 배우'],
      workStyleKo: '회의실에 앉아있는 것을 질색하며, 현장을 직접 뛰어다니며 사람들을 설득하고 문제를 해결해 버립니다.',
      workStyleEn: 'Loves the thrill of the deal; bypasses bureaucratic hand-wringing to close sales and put out operational fires.'
    },
    relationship: {
      loveStyleKo: '짜릿한 설렘과 신나는 모험이 가득한 연애를 선물합니다. 말보다는 화끈한 데이트와 아낌없는 애정 표현으로 상대를 사로잡는 매력적인 연인입니다.',
      loveStyleEn: 'Exhilarating, playful, and passionately present. Sweeps partners into vibrant adventures with grand romantic spontaneity.',
      bestMatches: ['ISFJ', 'ISTJ'],
      bestMatchReasonKo: 'ISFJ의 따뜻하고 사려 깊은 내조는 화려하게 달리는 ESTP에게 최고의 안정감을 주며, ESTP는 ISFJ에게 세상에서 가장 신나는 모험을 선물합니다.',
      bestMatchReasonEn: 'ISFJ’s sweet grounding and domestic stability provide the loyal haven ESTP needs, while ESTP injects joyful adventure into ISFJ’s life.'
    },
    streamerStyle: {
      personaKo: '물불 가리지 않는 도발, 극한의 내기 챌린지, 화끈한 텐션으로 방송을 뒤흔드는 승부사 스트리머',
      personaEn: 'High-octane thrill-seeker streamer dominating competitive ladders, taking wild bets, and pulling off insane clutch plays',
      viewerDynamicKo: '시청자들과 삭발빵, 벌칙 내기를 걸며 피 터지게 싸우는 도파민 폭발 방송을 이끌어갑니다.',
      viewerDynamicEn: 'Incredible showman who thrives on high-stakes chat bets, epic trash-talk, and roaring celebratory energy.',
      recommendedContent: ['하이 티어 배틀로얄 FPS 게임', '고위험 벌칙 게임 챌린지', '야외 리얼 버라이어티 및 익스트림 스포츠']
    },
    growthAdviceKo: '속도보다 방향이 중요할 때가 있습니다. 행동하기 전에 10초만 멈춰 서서 이 행동이 가져올 미래의 파장을 상상해 보세요. 그것만으로도 당신은 무적이 됩니다.',
    growthAdviceEn: 'Speed without direction leads to crashes. Pause for ten seconds before making major leaps to consider long-term ripples. That momentary pause will make you truly invincible.'
  },

  ESFP: {
    code: 'ESFP',
    nameKo: '자유로운 영혼의 연예인',
    nameEn: 'The Entertainer Performer',
    badge: '🎉 삶의 축제와 무대를 밝히는 슈퍼스타',
    keywords: ['독보적 스타성', '넘치는 에너지', '낙천주의', '순간의 즐거움'],
    mottoKo: '"인생이라는 무대의 주인공은 바로 나, 오늘을 가장 찬란하게 즐기자!"',
    mottoEn: '"Life is a dazzling party, and every moment is meant to be celebrated with joy!"',
    overviewKo: 'ESFP는 가는 곳마다 스포트라이트를 몰고 다니는 타고난 엔터테이너이자 분위기 메이커입니다. 주기능 외향감각(Se)으로 주변의 모든 즐거움과 감각적 매력을 온몸으로 발산하며, 부기능 내향감정(Fi)으로 가식 없는 솔직함과 따뜻한 애정으로 사람들을 끌어당깁니다. 우울함이나 심각한 고민에 머물러 있기보다 신나는 음악, 맛있는 음식, 사람들의 웃음소리 속에서 삶의 환희를 만끽합니다. 주변을 밝히는 최고의 비타민 같은 존재입니다.',
    overviewEn: 'ESFPs are magnetic performers who transform everyday reality into an exhilarating celebration. Propelled by Extraverted Sensing (Se) and Introverted Feeling (Fi), they radiate infectious vivacity, spontaneity, and open-hearted warmth. Natural showstoppers who thrive in the spotlight, they uplift crowds and encourage everyone to live joyfully in the vibrant present.',
    cognitiveFunctions: {
      dominant: {
        code: 'Se',
        nameKo: '외향 감각 (주기능)',
        nameEn: 'Extraverted Sensing (Dominant)',
        descKo: '시각, 청각, 유행, 분위기를 온몸으로 흡수하고 매력적으로 표출하는 스타성 안테나.',
        descEn: 'Dominates the spotlight with kinetic enthusiasm, aesthetic flair, and vibrant sensory joy.'
      },
      auxiliary: {
        code: 'Fi',
        nameKo: '내향 감정 (부기능)',
        nameEn: 'Introverted Feeling (Auxiliary)',
        descKo: '솔직하고 가식 없는 순수한 감정과 타인의 아픔을 따뜻하게 안아주는 공감 심장.',
        descEn: 'Keeps theatrical charm deeply authentic, radiating genuine compassion and emotional warmth.'
      },
      tertiary: {
        code: 'Te',
        nameKo: '외향 사고 (3차기능)',
        nameEn: 'Extraverted Thinking (Tertiary)',
        descKo: '신나는 파티나 이벤트를 당장 현실로 조직하고 사람들을 모으는 행동력.',
        descEn: 'Marshals practical resources quickly to stage spontaneous parties, trips, and social spectacles.'
      },
      inferior: {
        code: 'Ni',
        nameKo: '내향 직관 (열등기능)',
        nameEn: 'Introverted Intuition (Inferior)',
        descKo: '지루한 미래 설계, 복잡한 철학적 이론, 무거운 진지함 앞에서 느끼는 답답함.',
        descEn: 'Easily overwhelmed by long-term abstract consequences, heavy existential brooding, and solitary analysis.'
      }
    },
    strengthsKo: [
      '단 1초 만에 좌중을 압도하고 분위기를 축제장으로 바꾸는 타고난 스타성과 매력',
      '패션, 뷰티, 음악, 인테리어 등 오감을 자극하는 트렌드를 이끄는 감각적 센스',
      '뒤끝 없이 솔직하고 모든 사람을 편견 없이 대하는 순수한 따뜻함',
      '어떤 우울한 사람도 단숨에 웃게 만드는 독보적인 긍정 에너지와 유머',
      '낯선 환경에서도 거침없이 친구를 사귀는 최고의 사교적 친화력'
    ],
    strengthsEn: [
      'Inborn star power and theatrical charisma that instantly turns any room into a celebration',
      'Impeccable aesthetic and sensory instincts in fashion, entertainment, performance, and design',
      'Utterly devoid of pretension; treats everyone with spontaneous, disarming warmth',
      'Uplifting optimism and comedic timing that cuts through gloom and restores joy',
      'Peerless sociability that effortlessly transforms strangers into lifelong friends'
    ],
    weaknessesKo: [
      '당장의 재미와 쾌락에 빠져 미래의 중요한 책임이나 재정 관리를 망각함',
      '진지한 대화나 비판을 마주했을 때 장난으로 넘기거나 과민하게 토라짐',
      '혼자 있는 고독을 견디지 못하고 끊임없이 타인의 관심과 자극을 찾아 헤맴',
      '끈기 있게 한 가지 일을 장기적으로 밀고 나가는 지구력의 부족',
      '자신의 감정을 여과 없이 표출하다가 의도치 않게 주변을 피곤하게 만듦'
    ],
    weaknessesEn: [
      'Prone to living so entirely in the moment that practical finances and obligations fall apart',
      'Deflects necessary serious discussions, taking constructive critique as an emotional assault',
      'Restless dread of solitude, seeking continuous external stimulation and audience validation',
      'Struggles with long-term follow-through when tasks turn tedious and excitement wanes',
      'Volatile emotional impulsiveness that can unintentionally exhaust more grounded companions'
    ],
    stressLoopKo: 'Se-Te 루프에 빠지면 불안을 감추기 위해 과도한 쇼핑과 파티로 외형적 과시에 집착하고, 열등 Ni 폭주 시에는 알 수 없는 미래의 비극에 대한 공포에 휩싸여 침대에 누워 절망합니다. Fi로 돌아와 진정한 자신의 감정을 인정하고 조용한 자연 속에서 마음을 보살펴야 합니다.',
    stressLoopEn: 'A Se-Te loop sparks compulsive consumption and showy material ostentation. An Ni grip induces paralyzing existential dread about an empty, catastrophic future. Reconnecting with auxiliary Fi—quiet artistic introspection and heartfelt reflection—restores true joy.',
    career: {
      bestEnvironmentKo: '자유롭고 활기찬 분위기 속에서 대중과 호흡하며 자신의 끼를 마음껏 발산할 수 있는 환경',
      bestEnvironmentEn: 'Energetic, expressive environments centered on hospitality, performance, fashion, and social entertainment',
      recommendedCareers: ['방송인 / 연예인 / 유튜버', '뮤지컬 배우 / 댄서', '이벤트 기획자 / 파티 플래너', '패션 스타일리스트 / 뷰티 디렉터', '여행 가이드 / 항공 승무원', '아동 교육 / 레크리에이션 강사', '마케팅 / 홍보 크리에이터'],
      workStyleKo: '딱딱한 서류보다 사람을 직접 대면할 때 최고의 능력을 발휘하며, 팀의 사기를 하늘 끝까지 끌어올리는 분위기 메이커입니다.',
      workStyleEn: 'Thrives in client-facing, collaborative roles; keeps team morale sky-high through infectious laughter and dynamic energy.'
    },
    relationship: {
      loveStyleKo: '온 세상이 알 정도로 온몸으로 사랑을 표현하는 열정적인 연인입니다. 매일이 기념일 같은 로맨틱한 이벤트와 끊임없는 스킨십, 달콤한 칭찬으로 상대방을 행복의 구름 위로 띄워줍니다.',
      loveStyleEn: 'Passionate, affectionate, and wonderfully generous. Treats romance like a vibrant adventure filled with laughter, sensory treats, and warm cuddles.',
      bestMatches: ['ISTJ', 'ISFJ'],
      bestMatchReasonKo: 'ISTJ의 듬직한 책임감과 질서는 통통 튀는 ESFP에게 세상에서 가장 안전한 울타리가 되어주며, ESFP는 ISTJ의 굳은 일상에 웃음의 빛을 비춰줍니다.',
      bestMatchReasonEn: 'ISTJ’s rock-solid stability protects ESFP from chaotic pitfalls, while ESFP unlocks the ISTJ’s quiet, hidden capacity for joy.'
    },
    streamerStyle: {
      personaKo: '카메라가 켜지는 순간 텐션 200%로 폭발하는 인간 비타민, 종합 예능인형 스트리머',
      personaEn: 'Effervescent variety showstopper streaming vibrant song/dance reactions, chaotic IRL vlogs, and comedy games',
      viewerDynamicKo: '화려한 리액션과 통통 튀는 끼로 시청자들의 넋을 쏙 빼놓으며, 단 한순간도 지루할 틈 없는 축제를 만듭니다.',
      viewerDynamicEn: 'A whirlwind of fun who dances to donation alerts, shares hilarious stories, and makes every viewer feel like a VIP at the party.',
      recommendedContent: ['저스트 댄스 / 노래방 라이브', '시청자 소통 및 리액션 콘텐츠', '파티 미니게임 및 야외 방송 (IRL)']
    },
    growthAdviceKo: '눈부신 파티가 끝난 후의 고요함도 사랑해 보세요. 미래를 위한 작은 저축과 준비는 당신의 자유로운 날개를 꺾는 것이 아니라, 더 오래 날 수 있게 해주는 든든한 힘입니다.',
    growthAdviceEn: 'Learn to make peace with quiet stillness. Long-term discipline and financial prudence do not clip your wings—they build the runway for your greatest flights.'
  }
};
