export interface MbtiQuestion {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  facet: string;
  facetNameKo: string;
  facetNameEn: string;
  polarity: 1 | -1; // 1 means primary direction (E, N, F, P), -1 means secondary direction (I, S, T, J)
  textKo: string;
  textEn: string;
}

export const MBTI_QUESTIONS: MbtiQuestion[] = [
  // =========================================================================
  // 1. Extraversion (E) vs Introversion (I) — 15 Questions
  // Polarity: +1 => E, -1 => I
  // =========================================================================

  // Facet E1: Social Energy & Recharge (사회적 에너지 충전)
  {
    id: 1,
    dimension: 'EI',
    facet: 'E1',
    facetNameKo: '사회적 에너지 충전',
    facetNameEn: 'Social Energy & Recharge',
    polarity: 1,
    textKo: '많은 사람들과 교류하고 대화할수록 활력과 생기가 샘솟는 것을 느낀다.',
    textEn: 'I feel energized and revitalized after spending time interacting with groups of people.'
  },
  {
    id: 2,
    dimension: 'EI',
    facet: 'E1',
    facetNameKo: '사회적 에너지 충전',
    facetNameEn: 'Social Energy & Recharge',
    polarity: -1,
    textKo: '주말이나 휴일에는 방해받지 않고 온전히 혼자만의 시간을 가질 때 가장 깊은 안정을 찾는다.',
    textEn: 'On weekends or days off, I find the deepest peace when I have uninterrupted solitary time.'
  },
  {
    id: 3,
    dimension: 'EI',
    facet: 'E1',
    facetNameKo: '사회적 에너지 충전',
    facetNameEn: 'Social Energy & Recharge',
    polarity: 1,
    textKo: '새로운 사람들을 만나 인연을 넓히는 모임이나 파티에 참석하는 것이 즐겁고 기대된다.',
    textEn: 'I genuinely enjoy and look forward to social gatherings where I can meet new people.'
  },
  {
    id: 4,
    dimension: 'EI',
    facet: 'E1',
    facetNameKo: '사회적 에너지 충전',
    facetNameEn: 'Social Energy & Recharge',
    polarity: -1,
    textKo: '사람들과 오랜 시간 함께 어울리고 나면 에너지가 고갈되어 혼자 충전할 시간이 절실하다.',
    textEn: 'After prolonged socializing, I feel drained and need quiet alone time to recharge my battery.'
  },
  {
    id: 5,
    dimension: 'EI',
    facet: 'E1',
    facetNameKo: '사회적 에너지 충전',
    facetNameEn: 'Social Energy & Recharge',
    polarity: 1,
    textKo: '조용하고 고요한 환경에 오래 있으면 무료하거나 쉽게 답답함을 느낀다.',
    textEn: 'Remaining in a quiet, isolated environment for too long makes me feel restless or bored.'
  },

  // Facet E2: Communication & Verbal Processing (사고 표출 및 소통 방식)
  {
    id: 6,
    dimension: 'EI',
    facet: 'E2',
    facetNameKo: '사고 표출 및 소통 방식',
    facetNameEn: 'Communication & Verbal Processing',
    polarity: 1,
    textKo: '생각을 머릿속에만 담아두기보다 다른 사람에게 말로 표현하면서 생각을 정리하는 편이다.',
    textEn: 'I clarify my thoughts best by talking them out loud with others rather than keeping them internal.'
  },
  {
    id: 7,
    dimension: 'EI',
    facet: 'E2',
    facetNameKo: '사고 표출 및 소통 방식',
    facetNameEn: 'Communication & Verbal Processing',
    polarity: -1,
    textKo: '어떤 의견이나 대답을 내놓기 전에 머릿속으로 충분히 숙고하고 정제하는 과정을 거친다.',
    textEn: 'I prefer to thoroughly reflect and refine my thoughts internally before speaking up.'
  },
  {
    id: 8,
    dimension: 'EI',
    facet: 'E2',
    facetNameKo: '사고 표출 및 소통 방식',
    facetNameEn: 'Communication & Verbal Processing',
    polarity: 1,
    textKo: '처음 만난 사람과도 어색함 없이 먼저 말을 걸고 대화를 자연스럽게 이끌어갈 수 있다.',
    textEn: 'I feel comfortable breaking the ice and initiating conversation with people I have just met.'
  },
  {
    id: 9,
    dimension: 'EI',
    facet: 'E2',
    facetNameKo: '사고 표출 및 소통 방식',
    facetNameEn: 'Communication & Verbal Processing',
    polarity: -1,
    textKo: '다수가 모인 대화 자리에서는 먼저 말하기보다 상대방의 이야기를 경청하는 것이 편하다.',
    textEn: 'In group conversations, I feel more at ease listening attentively than taking center stage.'
  },
  {
    id: 10,
    dimension: 'EI',
    facet: 'E2',
    facetNameKo: '사고 표출 및 소통 방식',
    facetNameEn: 'Communication & Verbal Processing',
    polarity: 1,
    textKo: '주변 사람들에게 내 기분, 최근 관심사나 일상을 스스럼없이 털어놓는 편이다.',
    textEn: 'I readily and openly share my thoughts, current feelings, and daily updates with others.'
  },

  // Facet E3: Action & Stimulation Breadth vs Depth (행동 반경과 자극 추구)
  {
    id: 11,
    dimension: 'EI',
    facet: 'E3',
    facetNameKo: '행동 반경과 자극 추구',
    facetNameEn: 'Action & Stimulation Breadth vs Depth',
    polarity: 1,
    textKo: '깊이 파고드는 한 가지 취미보다는 다채롭고 새로운 활동들을 두루 경험하는 것을 선호한다.',
    textEn: 'I prefer exploring a wide variety of activities and hobbies over focusing narrowly on just one.'
  },
  {
    id: 12,
    dimension: 'EI',
    facet: 'E3',
    facetNameKo: '행동 반경과 자극 추구',
    facetNameEn: 'Action & Stimulation Breadth vs Depth',
    polarity: -1,
    textKo: '넓고 얕은 인간관계보다 소수의 마음 맞는 친구들과 깊은 유대를 맺는 것이 훨씬 가치 있다.',
    textEn: 'I value a small circle of close, meaningful friendships far more than having a broad network of acquaintances.'
  },
  {
    id: 13,
    dimension: 'EI',
    facet: 'E3',
    facetNameKo: '행동 반경과 자극 추구',
    facetNameEn: 'Action & Stimulation Breadth vs Depth',
    polarity: 1,
    textKo: '주변에 사람들이 북적이고 활기가 넘치는 분위기 속에서 더 큰 의욕이 생긴다.',
    textEn: 'I feel more motivated and inspired when surrounded by dynamic activity and lively commotion.'
  },
  {
    id: 14,
    dimension: 'EI',
    facet: 'E3',
    facetNameKo: '행동 반경과 자극 추구',
    facetNameEn: 'Action & Stimulation Breadth vs Depth',
    polarity: -1,
    textKo: '중요한 일을 처리할 때는 아무런 소음이나 방해가 없는 조용한 독립된 공간이 필수적이다.',
    textEn: 'When tackling important work, I need a completely quiet, private space free from distractions.'
  },
  {
    id: 15,
    dimension: 'EI',
    facet: 'E3',
    facetNameKo: '행동 반경과 자극 추구',
    facetNameEn: 'Action & Stimulation Breadth vs Depth',
    polarity: -1,
    textKo: '다른 사람들의 주목을 한몸에 받는 상황에 서면 다소 부담스럽거나 긴장된다.',
    textEn: 'Being the sole center of attention in a room makes me feel somewhat uncomfortable.'
  },

  // =========================================================================
  // 2. Sensing (S) vs Intuition (N) — 15 Questions
  // Polarity: +1 => N (Intuition), -1 => S (Sensing)
  // =========================================================================

  // Facet S1: Information Gathering (정보 인식 및 관찰)
  {
    id: 16,
    dimension: 'SN',
    facet: 'S1',
    facetNameKo: '정보 인식 및 관찰',
    facetNameEn: 'Information Gathering & Perception',
    polarity: 1,
    textKo: '사물이나 사건을 볼 때 겉으로 드러난 사실 너머의 숨은 의미와 상징, 맥락을 본능적으로 탐구한다.',
    textEn: 'I instinctively look beyond surface facts to explore hidden meanings, symbols, and underlying patterns.'
  },
  {
    id: 17,
    dimension: 'SN',
    facet: 'S1',
    facetNameKo: '정보 인식 및 관찰',
    facetNameEn: 'Information Gathering & Perception',
    polarity: -1,
    textKo: '추상적인 비유나 가설보다 눈앞에 실재하는 구체적인 수치와 명확한 데이터에 더 신뢰가 간다.',
    textEn: 'I place greater trust in verifiable data, tangible facts, and concrete reality than in abstract theories.'
  },
  {
    id: 18,
    dimension: 'SN',
    facet: 'S1',
    facetNameKo: '정보 인식 및 관찰',
    facetNameEn: 'Information Gathering & Perception',
    polarity: 1,
    textKo: '복잡한 세부 사항에 얽매이기보다 전체적인 큰 그림(Big Picture)과 전체 흐름을 먼저 조망한다.',
    textEn: 'I instinctively focus on the overarching big picture before getting caught up in granular details.'
  },
  {
    id: 19,
    dimension: 'SN',
    facet: 'S1',
    facetNameKo: '정보 인식 및 관찰',
    facetNameEn: 'Information Gathering & Perception',
    polarity: -1,
    textKo: '설명서나 지침을 볼 때 단계별 세부 절차를 꼼꼼하게 순서대로 따라가는 것이 편안하다.',
    textEn: 'I prefer following step-by-step instructions and practical checklists in exact sequential order.'
  },
  {
    id: 20,
    dimension: 'SN',
    facet: 'S1',
    facetNameKo: '정보 인식 및 관찰',
    facetNameEn: 'Information Gathering & Perception',
    polarity: 1,
    textKo: '직관이나 순간적인 영감(Spontaneous Insight)을 바탕으로 사태의 본질을 꿰뚫어 볼 때가 많다.',
    textEn: 'I often experience sudden flashes of intuition that allow me to grasp the core essence of a problem.'
  },

  // Facet S2: Problem Solving & Methodology (문제 해결 및 방법론)
  {
    id: 21,
    dimension: 'SN',
    facet: 'S2',
    facetNameKo: '문제 해결 및 방법론',
    facetNameEn: 'Problem Solving & Methodology',
    polarity: 1,
    textKo: '과거에 검증된 기존 방식보다 완전히 새롭고 창의적인 독창적 해결책을 고안하는 것을 즐긴다.',
    textEn: 'I enjoy conceiving innovative, unconventional solutions rather than sticking to conventional practices.'
  },
  {
    id: 22,
    dimension: 'SN',
    facet: 'S2',
    facetNameKo: '문제 해결 및 방법론',
    facetNameEn: 'Problem Solving & Methodology',
    polarity: -1,
    textKo: '실현 가능성이 불투명한 실험적 아이디어보다 현실적으로 즉시 적용 가능한 검증된 방식을 선호한다.',
    textEn: 'I prioritize proven, pragmatic methods that yield reliable, immediate real-world results.'
  },
  {
    id: 23,
    dimension: 'SN',
    facet: 'S2',
    facetNameKo: '문제 해결 및 방법론',
    facetNameEn: 'Problem Solving & Methodology',
    polarity: 1,
    textKo: '서로 무관해 보이는 정보들 사이에서 예상치 못한 공통점과 연결고리를 찾아내는 데 능숙하다.',
    textEn: 'I have a knack for connecting disparate dots and identifying links between seemingly unrelated topics.'
  },
  {
    id: 24,
    dimension: 'SN',
    facet: 'S2',
    facetNameKo: '문제 해결 및 방법론',
    facetNameEn: 'Problem Solving & Methodology',
    polarity: -1,
    textKo: '직접 오감으로 보고, 듣고, 경험해 본 확실한 과거의 경험적 선례를 가장 중요한 판단 근거로 삼는다.',
    textEn: 'I rely heavily on past sensory experience, lived precedence, and tangible track records when making choices.'
  },
  {
    id: 25,
    dimension: 'SN',
    facet: 'S2',
    facetNameKo: '문제 해결 및 방법론',
    facetNameEn: 'Problem Solving & Methodology',
    polarity: 1,
    textKo: '철학적이거나 형이상학적인 개념, 미래 가상 시나리오에 대한 토론을 들으면 지적 희열을 느낀다.',
    textEn: 'I feel intellectually thrilled when exploring philosophical ideas, hypothetical scenarios, and visionary concepts.'
  },

  // Facet S3: Temporal & Possibility Orientation (시점 및 상상력 지향)
  {
    id: 26,
    dimension: 'SN',
    facet: 'S3',
    facetNameKo: '시점 및 상상력 지향',
    facetNameEn: 'Temporal & Possibility Orientation',
    polarity: 1,
    textKo: '"현재 상황이 어떠한가"보다 "앞으로 어떻게 변할 수 있는가"에 대한 미래의 가능성에 마음이 끌린다.',
    textEn: 'I am far more intrigued by future possibilities and "what could be" than by present realities and "what is".'
  },
  {
    id: 27,
    dimension: 'SN',
    facet: 'S3',
    facetNameKo: '시점 및 상상력 지향',
    facetNameEn: 'Temporal & Possibility Orientation',
    polarity: -1,
    textKo: '실현 불가능한 공상에 시간을 쏟기보다는 지금 당장 내 손으로 해결할 수 있는 눈앞의 현안에 집중한다.',
    textEn: 'Rather than daydreaming about distant ideals, I focus on resolving immediate, tangible tasks right in front of me.'
  },
  {
    id: 28,
    dimension: 'SN',
    facet: 'S3',
    facetNameKo: '시점 및 상상력 지향',
    facetNameEn: 'Temporal & Possibility Orientation',
    polarity: 1,
    textKo: '반복되는 일상적인 작업에 금방 싫증을 느끼며, 늘 새로운 아이디어와 변화를 갈망한다.',
    textEn: 'Routine, repetitive maintenance tasks quickly bore me; I crave novel ideas and paradigm shifts.'
  },
  {
    id: 29,
    dimension: 'SN',
    facet: 'S3',
    facetNameKo: '시점 및 상상력 지향',
    facetNameEn: 'Temporal & Possibility Orientation',
    polarity: -1,
    textKo: '모호하고 두루뭉술한 추상적 설명보다 구체적인 예시와 실물이 있는 명확한 설명을 선호한다.',
    textEn: 'I prefer concrete examples, physical demonstrations, and literal explanations over vague metaphors.'
  },
  {
    id: 30,
    dimension: 'SN',
    facet: 'S3',
    facetNameKo: '시점 및 상상력 지향',
    facetNameEn: 'Temporal & Possibility Orientation',
    polarity: -1,
    textKo: '현실감각이 뛰어나며, 지금 이 순간의 주변 환경과 감각적 디테일을 생생하게 기억하고 즐긴다.',
    textEn: 'I am firmly grounded in the present moment, easily noticing and savoring sensory details around me.'
  },

  // =========================================================================
  // 3. Thinking (T) vs Feeling (F) — 15 Questions
  // Polarity: +1 => F (Feeling), -1 => T (Thinking)
  // =========================================================================

  // Facet T1: Decision Benchmark (의사결정의 잣대)
  {
    id: 31,
    dimension: 'TF',
    facet: 'T1',
    facetNameKo: '의사결정의 잣대',
    facetNameEn: 'Decision Benchmark',
    polarity: 1,
    textKo: '중요한 결정을 내릴 때 객관적 효율성보다 사람들의 감정과 마음에 미칠 영향을 더 깊이 고려한다.',
    textEn: 'When making important choices, I weigh the human impact and personal feelings more than raw efficiency.'
  },
  {
    id: 32,
    dimension: 'TF',
    facet: 'T1',
    facetNameKo: '의사결정의 잣대',
    facetNameEn: 'Decision Benchmark',
    polarity: -1,
    textKo: '감정에 휩쓸리지 않고 논리적 인과관계와 냉철한 원인 분석을 최우선 기준으로 삼는다.',
    textEn: 'I rely on objective logical causality and dispassionate analysis rather than subjective emotional sentiments.'
  },
  {
    id: 33,
    dimension: 'TF',
    facet: 'T1',
    facetNameKo: '의사결정의 잣대',
    facetNameEn: 'Decision Benchmark',
    polarity: 1,
    textKo: '어떤 규칙이나 원칙이라도 개개인의 특수한 사정과 인간적 맥락에 따라 유연하게 예외를 두어야 한다.',
    textEn: 'Rules should be flexible enough to accommodate individual human circumstances and compassionate context.'
  },
  {
    id: 34,
    dimension: 'TF',
    facet: 'T1',
    facetNameKo: '의사결정의 잣대',
    facetNameEn: 'Decision Benchmark',
    polarity: -1,
    textKo: '아무리 친한 사이라 할지라도 옳고 그름의 원칙과 공정성은 엄격하게 지켜져야 한다.',
    textEn: 'Principles of fairness, truth, and consistency must be maintained regardless of personal relationships.'
  },
  {
    id: 35,
    dimension: 'TF',
    facet: 'T1',
    facetNameKo: '의사결정의 잣대',
    facetNameEn: 'Decision Benchmark',
    polarity: 1,
    textKo: '스스로의 결정이 주변 사람들에게 따뜻함과 정서적 지지를 줄 수 있는지 본능적으로 살핀다.',
    textEn: 'I instinctively care about whether my actions foster warmth, harmony, and emotional validation for others.'
  },

  // Facet T2: Critique & Communication Style (피드백 및 비판 방식)
  {
    id: 36,
    dimension: 'TF',
    facet: 'T2',
    facetNameKo: '피드백 및 소통 방식',
    facetNameEn: 'Critique & Communication Style',
    polarity: 1,
    textKo: '누군가에게 피드백을 줄 때 진실이라도 상대방의 마음이 다치지 않도록 세심하게 배려하여 완곡하게 말한다.',
    textEn: 'When delivering feedback, I soften my words with tact to avoid hurting the recipient’s feelings.'
  },
  {
    id: 37,
    dimension: 'TF',
    facet: 'T2',
    facetNameKo: '피드백 및 소통 방식',
    facetNameEn: 'Critique & Communication Style',
    polarity: -1,
    textKo: '듣기 좋은 위로보다 문제의 본질을 명확히 짚어주는 솔직하고 직설적인 조언이 진정한 도움이라 믿는다.',
    textEn: 'I believe honest, straightforward critique that pinpoints flaws is far more helpful than sweet platitudes.'
  },
  {
    id: 38,
    dimension: 'TF',
    facet: 'T2',
    facetNameKo: '피드백 및 소통 방식',
    facetNameEn: 'Critique & Communication Style',
    polarity: 1,
    textKo: '친구가 힘든 고민을 털어놓을 때 해결책을 제시하기보다 그 감정에 깊이 공감하고 위로해 준다.',
    textEn: 'When a friend vents about struggles, my first instinct is to empathize and comfort rather than troubleshoot.'
  },
  {
    id: 39,
    dimension: 'TF',
    facet: 'T2',
    facetNameKo: '피드백 및 소통 방식',
    facetNameEn: 'Critique & Communication Style',
    polarity: -1,
    textKo: '토론이나 논쟁 상황에서 상대방의 감정적 반응보다 논리적 오류를 찾아내고 논파하는 데 집중한다.',
    textEn: 'In debates, I focus on identifying flawed reasoning and logical inconsistencies over emotional sensitivities.'
  },
  {
    id: 40,
    dimension: 'TF',
    facet: 'T2',
    facetNameKo: '피드백 및 소통 방식',
    facetNameEn: 'Critique & Communication Style',
    polarity: 1,
    textKo: '주변 사람들의 미묘한 표정 변화나 목소리 톤에서 그들의 감정 상태를 민감하게 감지한다.',
    textEn: 'I am acutely attuned to subtle shifts in facial expressions and vocal tones, easily picking up on emotional vibes.'
  },

  // Facet T3: Justice vs Harmony in Conflict (갈등 상황의 정의관)
  {
    id: 41,
    dimension: 'TF',
    facet: 'T3',
    facetNameKo: '갈등과 조화의 가치관',
    facetNameEn: 'Justice vs Harmony in Conflict',
    polarity: 1,
    textKo: '집단의 화합과 평화를 지키기 위해서라면 내 개인적인 주장이나 사소한 논리를 기꺼이 양보할 수 있다.',
    textEn: 'I am willing to compromise my personal arguments to preserve group harmony and peace.'
  },
  {
    id: 42,
    dimension: 'TF',
    facet: 'T3',
    facetNameKo: '갈등과 조화의 가치관',
    facetNameEn: 'Justice vs Harmony in Conflict',
    polarity: -1,
    textKo: '비효율적이거나 불합리한 결정을 마주하면 분위기를 깨더라도 바른 소리를 지적하는 편이다.',
    textEn: 'When faced with irrational or inefficient decisions, I call out the flaw even if it disrupts the mood.'
  },
  {
    id: 43,
    dimension: 'TF',
    facet: 'T3',
    facetNameKo: '갈등과 조화의 가치관',
    facetNameEn: 'Justice vs Harmony in Conflict',
    polarity: 1,
    textKo: '누군가를 비판하거나 평가해야 할 때 심리적인 거부감이나 죄책감을 강하게 느낀다.',
    textEn: 'I feel deeply uncomfortable and hesitant when placed in positions requiring me to judge or critique others.'
  },
  {
    id: 44,
    dimension: 'TF',
    facet: 'T3',
    facetNameKo: '갈등과 조화의 가치관',
    facetNameEn: 'Justice vs Harmony in Conflict',
    polarity: -1,
    textKo: '업무적 성과나 공적인 평가를 내릴 때는 인간적인 친분이나 감정을 철저히 배제해야 한다.',
    textEn: 'Professional evaluations and performance reviews should remain strictly detached from personal friendships.'
  },
  {
    id: 45,
    dimension: 'TF',
    facet: 'T3',
    facetNameKo: '갈등과 조화의 가치관',
    facetNameEn: 'Justice vs Harmony in Conflict',
    polarity: -1,
    textKo: '감정적 호소보다 객관적 팩트와 논리적 타당성이 뒷받침될 때 비로소 설득된다.',
    textEn: 'I am persuaded only by verifiable facts and sound logic, rarely by emotional appeals.'
  },

  // =========================================================================
  // 4. Judging (J) vs Perceiving (P) — 15 Questions
  // Polarity: +1 => P (Perceiving), -1 => J (Judging)
  // =========================================================================

  // Facet J1: Organization & Daily Planning (일상 및 업무 계획성)
  {
    id: 46,
    dimension: 'JP',
    facet: 'J1',
    facetNameKo: '일상 및 업무 계획성',
    facetNameEn: 'Organization & Daily Planning',
    polarity: 1,
    textKo: '엄격한 스케줄에 얽매이기보다 그날그날의 기분과 상황에 맞춰 즉흥적으로 움직이는 편이다.',
    textEn: 'I prefer going with the flow and acting spontaneously rather than adhering to rigid schedules.'
  },
  {
    id: 47,
    dimension: 'JP',
    facet: 'J1',
    facetNameKo: '일상 및 업무 계획성',
    facetNameEn: 'Organization & Daily Planning',
    polarity: -1,
    textKo: '하루 일과를 시작하기 전 해야 할 일들의 우선순위와 시간 계획을 명확히 세워두는 것을 좋아한다.',
    textEn: 'I feel best when I structure my day with clear checklists, schedules, and prioritized milestones.'
  },
  {
    id: 48,
    dimension: 'JP',
    facet: 'J1',
    facetNameKo: '일상 및 업무 계획성',
    facetNameEn: 'Organization & Daily Planning',
    polarity: 1,
    textKo: '여행을 갈 때 분 단위 계획을 세우기보다 대략적인 목적지만 정하고 발길 닿는 대로 유람하는 게 즐겁다.',
    textEn: 'When traveling, I prefer having a loose destination and wandering freely rather than having an hour-by-hour itinerary.'
  },
  {
    id: 49,
    dimension: 'JP',
    facet: 'J1',
    facetNameKo: '일상 및 업무 계획성',
    facetNameEn: 'Organization & Daily Planning',
    polarity: -1,
    textKo: '과제나 프로젝트가 주어지면 마감일 직전에 몰아서 하기보다 미리미리 계획을 세워 단계적으로 끝낸다.',
    textEn: 'When assigned a project, I break it down and finish it well in advance rather than cramming at the deadline.'
  },
  {
    id: 50,
    dimension: 'JP',
    facet: 'J1',
    facetNameKo: '일상 및 업무 계획성',
    facetNameEn: 'Organization & Daily Planning',
    polarity: 1,
    textKo: '예기치 못한 돌발 상황이 발생해도 당황하기보다 유연하게 대처하며 상황을 즐기는 편이다.',
    textEn: 'When unexpected disruptions occur, I adapt flexibly and often enjoy navigating the surprise.'
  },

  // Facet J2: Closure & Decision Timing (종결 욕구와 결정 속도)
  {
    id: 51,
    dimension: 'JP',
    facet: 'J2',
    facetNameKo: '종결 욕구와 결정 속도',
    facetNameEn: 'Closure & Decision Timing',
    polarity: 1,
    textKo: '결정을 성급히 내리기보다 가능한 한 많은 선택지를 마지막 순간까지 열어두는 것을 선호한다.',
    textEn: 'I prefer keeping my options open as long as possible rather than locking into an early final decision.'
  },
  {
    id: 52,
    dimension: 'JP',
    facet: 'J2',
    facetNameKo: '종결 욕구와 결정 속도',
    facetNameEn: 'Closure & Decision Timing',
    polarity: -1,
    textKo: '어떤 사안이 결론 없이 불확실한 상태로 지속되면 신경이 쓰이고 답답함을 느낀다.',
    textEn: 'Ambiguity and unsettled matters frustrate me; I crave prompt closure and finalized decisions.'
  },
  {
    id: 53,
    dimension: 'JP',
    facet: 'J2',
    facetNameKo: '종결 욕구와 결정 속도',
    facetNameEn: 'Closure & Decision Timing',
    polarity: 1,
    textKo: '마감 직전의 촉박한 시간 압박(Deadline rush) 속에서 최고의 집중력과 창의성이 발휘된다.',
    textEn: 'I often produce my most inspired and focused work under the thrilling pressure of an impending deadline.'
  },
  {
    id: 54,
    dimension: 'JP',
    facet: 'J2',
    facetNameKo: '종결 욕구와 결정 속도',
    facetNameEn: 'Closure & Decision Timing',
    polarity: -1,
    textKo: '한번 세운 약속이나 결심은 변수가 생기더라도 끝까지 관철하고 마무리 지어야 마음이 편하다.',
    textEn: 'Once a commitment or plan is made, I feel obligated and satisfied to see it through to completion.'
  },
  {
    id: 55,
    dimension: 'JP',
    facet: 'J2',
    facetNameKo: '종결 욕구와 결정 속도',
    facetNameEn: 'Closure & Decision Timing',
    polarity: 1,
    textKo: '새로운 정보가 들어오면 언제든 기존의 결론이나 계획을 손바닥 뒤집듯 바꿀 준비가 되어 있다.',
    textEn: 'I am always ready to alter my plans instantly when new information or exciting opportunities arise.'
  },

  // Facet J3: Environmental & Workflow Order (환경과 정리 정돈)
  {
    id: 56,
    dimension: 'JP',
    facet: 'J3',
    facetNameKo: '환경과 정리 정돈',
    facetNameEn: 'Environmental & Workflow Order',
    polarity: 1,
    textKo: '책상이나 방이 다소 어질러져 있어도 어디에 무엇이 있는지 나만의 질서 속에서 문제없이 찾아낸다.',
    textEn: 'Even if my desk looks chaotic to others, I navigate my creative clutter with ease and know where things are.'
  },
  {
    id: 57,
    dimension: 'JP',
    facet: 'J3',
    facetNameKo: '환경과 정리 정돈',
    facetNameEn: 'Environmental & Workflow Order',
    polarity: -1,
    textKo: '작업 공간과 파일 폴더가 체계적으로 정리 정돈되어 있지 않으면 일에 집중하기 어렵다.',
    textEn: 'I find it hard to focus unless my physical workspace and digital desktop are cleanly categorized.'
  },
  {
    id: 58,
    dimension: 'JP',
    facet: 'J3',
    facetNameKo: '환경과 정리 정돈',
    facetNameEn: 'Environmental & Workflow Order',
    polarity: 1,
    textKo: '규칙과 절차가 지나치게 엄격한 조직이나 모임에서는 숨이 막히고 얽매이는 느낌을 받는다.',
    textEn: 'Strict rules, red tape, and rigid protocol stifle my creative energy and make me feel trapped.'
  },
  {
    id: 59,
    dimension: 'JP',
    facet: 'J3',
    facetNameKo: '환경과 정리 정돈',
    facetNameEn: 'Environmental & Workflow Order',
    polarity: -1,
    textKo: '물건을 사용한 뒤에는 즉시 원래 있던 제자리에 되돌려 놓는 습관이 몸에 배어 있다.',
    textEn: 'I instinctively return items to their designated storage spot immediately after using them.'
  },
  {
    id: 60,
    dimension: 'JP',
    facet: 'J3',
    facetNameKo: '환경과 정리 정돈',
    facetNameEn: 'Environmental & Workflow Order',
    polarity: -1,
    textKo: '예측 불가능한 즉흥적 제안보다 사전에 조율되고 예상 가능한 일정 속에서 안정감을 느낀다.',
    textEn: 'I feel far more comfortable with predictable, pre-arranged commitments than with last-minute surprises.'
  }
];
