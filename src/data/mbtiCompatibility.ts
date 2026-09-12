// StreamArcade Comprehensive MBTI & Jungian Cognitive Function Compatibility Engine
// Exhaustive 256 pairwise relationship dynamics with multi-dimensional chemistry sub-scores,
// pair nicknames, conversation vibes, deep synergy mechanics, friction triggers, and actionable advice.

export interface ChemistrySubScores {
  romance: number;        // 연애/애정 케미 (0-100)
  communication: number;  // 대화/티키타카 (0-100)
  work: number;           // 업무/프로젝트 시너지 (0-100)
  recovery: number;       // 갈등 회복력 & 안정감 (0-100)
}

export interface CompatibilityResult {
  score: number;
  gradeKo: string;
  gradeEn: string;
  badge: string;
  archetypeKo: string;
  archetypeEn: string;
  pairNicknameKo: string;
  pairNicknameEn: string;
  subScores: ChemistrySubScores;
  talkVibeKo: string;
  talkVibeEn: string;
  synergyKo: string;
  synergyEn: string;
  frictionKo: string;
  frictionEn: string;
  adviceKo: string;
  adviceEn: string;
  summaryKo: string;
  summaryEn: string;
}

// 1. Exact Socionics & Jungian Relationship Matrix Map
const DUAL_PAIRS: Record<string, string> = {
  INTJ: 'ENFP', ENFP: 'INTJ', INTP: 'ENTJ', ENTJ: 'INTP',
  INFJ: 'ENTP', ENTP: 'INFJ', INFP: 'ENFJ', ENFJ: 'INFP',
  ISTJ: 'ESFP', ESFP: 'ISTJ', ISFJ: 'ESTP', ESTP: 'ISFJ',
  ESTJ: 'ISFP', ISFP: 'ESTJ', ESFJ: 'ISTP', ISTP: 'ESFJ'
};

const SEMI_DUAL_PAIRS: Record<string, string> = {
  INTJ: 'ENTP', ENTP: 'INTJ', INTP: 'ENFJ', ENFJ: 'INTP',
  INFJ: 'ENFP', ENFP: 'INFJ', INFP: 'ENTJ', ENTJ: 'INFP',
  ISTJ: 'ESTP', ESTP: 'ISTJ', ISFJ: 'ESFP', ESFP: 'ISFJ',
  ESTJ: 'ISTP', ISTP: 'ESTJ', ESFJ: 'ISFP', ISFP: 'ESFJ'
};

const ACTIVATION_PAIRS: Record<string, string> = {
  INTJ: 'ISFP', ISFP: 'INTJ', INTP: 'ISFJ', ISFJ: 'INTP',
  ENTJ: 'ESFP', ESFP: 'ENTJ', ENTP: 'ESFJ', ESFJ: 'ENTP',
  INFJ: 'ISTP', ISTP: 'INFJ', INFP: 'ISTJ', ISTJ: 'INFP',
  ENFJ: 'ESTP', ESTP: 'ENFJ', ENFP: 'ESTJ', ESTJ: 'ENFP'
};

const MIRROR_PAIRS: Record<string, string> = {
  INTJ: 'INTP', INTP: 'INTJ', ENTJ: 'ENTP', ENTP: 'ENTJ',
  INFJ: 'INFP', INFP: 'INFJ', ENFJ: 'ENFP', ENFP: 'ENFJ',
  ISTJ: 'ISTP', ISTP: 'ISTJ', ESTJ: 'ESTP', ESTP: 'ESTJ',
  ISFJ: 'ISFP', ISFP: 'ISFJ', ESFJ: 'ESFP', ESFP: 'ESFJ'
};

const COOPERATION_PAIRS: Record<string, string> = {
  INTJ: 'ENTJ', ENTJ: 'INTJ', INTP: 'ENTP', ENTP: 'INTP',
  INFJ: 'ENFJ', ENFJ: 'INFJ', INFP: 'ENFP', ENFP: 'INFP',
  ISTJ: 'ESTJ', ESTJ: 'ISTJ', ISTP: 'ESTP', ESTP: 'ISTP',
  ISFJ: 'ESFJ', ESFJ: 'ISFJ', ISFP: 'ESFP', ESFP: 'ISFP'
};

const KINDRED_PAIRS: Record<string, string> = {
  INTJ: 'ISTJ', ISTJ: 'INTJ', INTP: 'ISTP', ISTP: 'INTP',
  ENTJ: 'ESTJ', ESTJ: 'ENTJ', ENTP: 'ESTP', ESTP: 'ENTP',
  INFJ: 'ISFJ', ISFJ: 'INFJ', INFP: 'ISFP', ISFP: 'INFP',
  ENFJ: 'ESFJ', ESFJ: 'ENFJ', ENFP: 'ESFP', ESFP: 'ENFP'
};

const MIRAGE_PAIRS: Record<string, string> = {
  INTJ: 'INFP', INFP: 'INTJ', INTP: 'INFJ', INFJ: 'INTP',
  ENTJ: 'ENFP', ENFP: 'ENTJ', ENTP: 'ENFJ', ENFJ: 'ENTP',
  ISTJ: 'ISFP', ISFP: 'ISTJ', ISTP: 'ISFJ', ISFJ: 'ISTP',
  ESTJ: 'ESFP', ESFP: 'ESTJ', ESTP: 'ESFJ', ESFJ: 'ESTP'
};

const SUPER_EGO_PAIRS: Record<string, string> = {
  INTJ: 'ESFP', ESFP: 'INTJ', INTP: 'ESFJ', ESFJ: 'INTP',
  ENTJ: 'ISFP', ISFP: 'ENTJ', ENTP: 'ISFJ', ISFJ: 'ENTP',
  INFJ: 'ESTP', ESTP: 'INFJ', INFP: 'ESTJ', ESTJ: 'INFP',
  ENFJ: 'ISTP', ISTP: 'ENFJ', ENFP: 'ISTJ', ISTJ: 'ENFP'
};

const QUASI_IDENTICAL_PAIRS: Record<string, string> = {
  INTJ: 'INFJ', INFJ: 'INTJ', INTP: 'INFP', INFP: 'INTP',
  ENTJ: 'ENFJ', ENFJ: 'ENTJ', ENTP: 'ENFP', ENFP: 'ENTP',
  ISTJ: 'ISFJ', ISFJ: 'ISTJ', ISTP: 'ISFP', ISFP: 'ISTP',
  ESTJ: 'ESFJ', ESFJ: 'ESTJ', ESTP: 'ESFP', ESFP: 'ESTP'
};

const CONFLICTOR_PAIRS: Record<string, string> = {
  INTJ: 'ESFJ', ESFJ: 'INTJ', INTP: 'ESFP', ESFP: 'INTP',
  ENTJ: 'ISFJ', ISFJ: 'ENTJ', ENTP: 'ISFP', ISFP: 'ENTP',
  INFJ: 'ESTJ', ESTJ: 'INFJ', INFP: 'ESTP', ESTP: 'INFP',
  ENFJ: 'ISTJ', ISTJ: 'ENFJ', ENFP: 'ISTJ', ISTJ: 'ENFP'
};

// MBTI Friendly Names Map
const TYPE_NAMES_KO: Record<string, string> = {
  INTJ: '전략가', INTP: '사색가', ENTJ: '통솔자', ENTP: '변론가',
  INFJ: '옹호자', INFP: '중재자', ENFJ: '멘토', ENFP: '활동가',
  ISTJ: '원칙주의자', ISFJ: '수호자', ESTJ: '관리자', ESFJ: '외교관',
  ISTP: '장인', ISFP: '예술가', ESTP: '모험가', ESFP: '연예인'
};

const TYPE_NAMES_EN: Record<string, string> = {
  INTJ: 'Strategist', INTP: 'Logician', ENTJ: 'Commander', ENTP: 'Debater',
  INFJ: 'Advocate', INFP: 'Mediator', ENFJ: 'Protagonist', ENFP: 'Campaigner',
  ISTJ: 'Inspector', ISFJ: 'Protector', ESTJ: 'Executive', ESFJ: 'Consul',
  ISTP: 'Virtuoso', ISFP: 'Adventurer', ESTP: 'Entrepreneur', ESFP: 'Entertainer'
};

export function getMbtiCompatibility(type1: string, type2: string): CompatibilityResult {
  const t1 = (type1 || 'INTJ').toUpperCase();
  const t2 = (type2 || 'ENFP').toUpperCase();

  const name1Ko = TYPE_NAMES_KO[t1] || t1;
  const name2Ko = TYPE_NAMES_KO[t2] || t2;
  const name1En = TYPE_NAMES_EN[t1] || t1;
  const name2En = TYPE_NAMES_EN[t2] || t2;

  // 1. Identical (영혼의 분신)
  if (t1 === t2) {
    return {
      score: 86,
      gradeKo: '영혼의 거울 (Soul Mirror)',
      gradeEn: 'Soul Mirror (High Resonance)',
      badge: '🪞 서로를 완벽히 비추는 도플갱어',
      archetypeKo: '동일 관계 (Identical)',
      archetypeEn: 'Identical Resonance',
      pairNicknameKo: `${t1} × ${t2} 「거울 속의 또 다른 나」`,
      pairNicknameEn: `${t1} × ${t2} "Mirror Doppelgänger"`,
      subScores: { romance: 84, communication: 96, work: 88, recovery: 74 },
      talkVibeKo: '말하지 않아도 상대방의 생각과 기분을 0.1초 만에 꿰뚫어 보는 텔레파시 티키타카',
      talkVibeEn: 'Effortless telepathic banter where half-sentences are immediately understood.',
      synergyKo: `두 사람 모두 동일한 ${t1}의 인지기능 스택을 탑재하고 있어, 설명할 필요조차 없는 절대적인 공감대를 형성합니다. 가치관, 유머 코드, 우선순위가 완벽히 일치하여 함께 있을 때 가장 편안하고 자연스러운 본인의 모습을 유지할 수 있습니다.`,
      synergyEn: `Sharing identical cognitive architecture, you intuitively grasp each other's motives with zero friction. Mutual validation and comfort are instantaneously realized.`,
      frictionKo: `단점과 사각지대(열등기능)까지 완벽하게 동일합니다. 둘 다 고집을 부리거나 스트레스 루프(번아웃, 무기력)에 빠지면 서로를 구원해주지 못하고 함께 가라앉을 수 있습니다.`,
      frictionEn: `Identical blind spots mean mutual stress loops can amplify. Neither partner naturally offers the balancing counterweight needed during crisis.`,
      adviceKo: `서로의 생각을 다 안다고 자만하지 말고, 침체기에는 외부 환경의 새로운 자극이나 다른 성향 친구의 조언을 적극적으로 받아들이세요.`,
      adviceEn: `Acknowledge shared blind spots and invite outside perspectives when facing stagnant ruts.`,
      summaryKo: `설명이 필요 없는 완벽한 공감대. 다만 둘의 약점까지 똑같으므로 한 번 침체에 빠지면 외부의 환기가 필수적인 관계입니다.`,
      summaryEn: `Telepathic understanding and supreme comfort, tempered by identical vulnerabilities.`
    };
  }

  // 2. Dual / Golden Match (환상의 천생연분)
  if (DUAL_PAIRS[t1] === t2) {
    return {
      score: 98,
      gradeKo: '천생연분 환상의 궁합 (Golden Dual)',
      gradeEn: 'Golden Dual (Transcendent Chemistry)',
      badge: '💖 서로의 영혼을 채워주는 최고의 시너지',
      archetypeKo: '이중성 (Dual - 환상의 짝)',
      archetypeEn: 'Dual (Golden Complementarity)',
      pairNicknameKo: `${name1Ko}과 ${name2Ko}의 만남 「영혼의 아키텍트와 스파크」`,
      pairNicknameEn: `${t1} & ${t2} "Soul Architects"`,
      subScores: { romance: 99, communication: 96, work: 95, recovery: 92 },
      talkVibeKo: '서로 다른 렌즈로 같은 우주를 바라보며 밤새도록 불꽃이 튀는 영감의 대화',
      talkVibeEn: 'Electric, endlessly stimulating dialogue where opposites ignite pure wonder.',
      synergyKo: `${t1}의 주기능이 ${t2}의 열등기능을 가장 안전하게 감싸주고, ${t2}의 넘치는 에너지가 ${t1}의 닫힌 세상을 따뜻하게 열어줍니다. 서로가 서로에게 가장 필요했던 심리적 산소탱크 역할을 하여 함께할수록 인격적으로 성장합니다.`,
      synergyEn: `Your primary cognitive superpower effortlessly covers your partner's deepest subconscious vulnerability, and vice-versa. Mutual psychological completion at its absolute finest.`,
      frictionKo: `초반에는 서로의 삶의 방식이 너무나 달라 '과연 맞을까?'라는 낯선 두려움이 들 수 있습니다. 표현 방식의 차이(직설 vs 감성, 계획 vs 즉흥)를 공격으로 오해하지 않는 성숙함이 필요합니다.`,
      frictionEn: `Initial unfamiliarity can feel daunting. Mature translation of differing operational tempos is needed.`,
      adviceKo: `상대방의 방식이 나와 다름을 바꾸려 하지 말고, 그 다름이야말로 내가 평생 갖지 못한 보물임을 인정하고 감사하세요.`,
      adviceEn: `Treasure your partner's alien instincts as gifts that save you from your own limitations.`,
      summaryKo: `서로의 약점을 완벽하게 보완하고 잠재력을 폭발시키는 MBTI 역사상 최고의 궁합. 함께할수록 더 깊어지는 운명적 인연입니다.`,
      summaryEn: `The gold standard of psychological synergy. Effortless complementary growth and profound attraction.`
    };
  }

  // 3. Semi-Dual (준이중성 / 지적 영감과 매혹)
  if (SEMI_DUAL_PAIRS[t1] === t2) {
    return {
      score: 93,
      gradeKo: '매혹적인 영감의 파트너 (Semi-Dual)',
      gradeEn: 'Semi-Dual (Deep Magnetism)',
      badge: '✨ 지적 호기심과 설렘이 공존하는 관계',
      archetypeKo: '준이중성 (Semi-Dual)',
      archetypeEn: 'Semi-Dual Harmony',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「지적 영감의 콤비」`,
      pairNicknameEn: `${t1} & ${t2} "Inspirational Spark"`,
      subScores: { romance: 92, communication: 95, work: 90, recovery: 86 },
      talkVibeKo: '서로의 독창적인 아이디어에 감탄하며 끝없이 가지를 뻗어가는 흥미진진한 티키타카',
      talkVibeEn: 'Fascinating intellectual riffing where each insight triggers ten new brilliant thoughts.',
      synergyKo: `대화할 때마다 새로운 시각과 지적 쾌감을 선사합니다. 서로의 에너지 레벨이 편안하게 맞물리며, 함께 있을 때 지루할 틈이 없이 끊임없이 웃음과 새로운 영감이 쏟아집니다.`,
      synergyEn: `Stimulating intellectual chemistry paired with comfortable emotional rapport. Conversations flow with effortless creativity and warmth.`,
      frictionKo: `마지막 결정을 내리는 세부 실행 단계나 생활 습관에서 미묘한 엇박자가 날 수 있습니다. 한쪽이 너무 앞서가거나 멈출 때 템포 조절이 필요합니다.`,
      frictionEn: `Minor disconnects during mundane logistical execution or practical decision deadlines.`,
      adviceKo: `서로의 독창성을 적극 지지해주되, 일상적인 약속이나 실무에서는 명확한 합의점을 미리 정해두세요.`,
      adviceEn: `Anchor your shared creative fireworks with clear mutual agreements on practical routines.`,
      summaryKo: `만날 때마다 가슴 뛰는 영감과 편안한 호감을 동시에 주는 매력적인 인연입니다.`,
      summaryEn: `Magnetic, mentally exhilarating, and filled with playful affection.`
    };
  }

  // 4. Activation (활동 관계 / 활력 충전소)
  if (ACTIVATION_PAIRS[t1] === t2) {
    return {
      score: 89,
      gradeKo: '유쾌한 활력과 에너지 (Activation)',
      gradeEn: 'Activation (Dynamic Catalyst)',
      badge: '⚡ 만나기만 해도 텐션이 올라가는 사이',
      archetypeKo: '활동 관계 (Activation)',
      archetypeEn: 'Activation Catalyst',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「도파민 부스터」`,
      pairNicknameEn: `${t1} & ${t2} "Dopamine Boosters"`,
      subScores: { romance: 88, communication: 90, work: 84, recovery: 85 },
      talkVibeKo: '만난 지 5분 만에 웃음이 터지고 서로의 기분을 단숨에 업시키는 통통 튀는 대화',
      talkVibeEn: 'High-energy, mood-lifting banter that instantly dispels stress and fatigue.',
      synergyKo: `서로의 숨은 활력을 일깨워주는 최고의 비타민 같은 관계입니다. 지쳐 있을 때 상대를 만나면 신기하게 에너지가 솟구치며, 함께 취미나 모험을 즐기기에 더없이 좋습니다.`,
      synergyEn: `Natural mood lifters. Each partner effortlessly stimulates the other's tertiary relief function, making companionship lighthearted and energizing.`,
      frictionKo: `함께 있으면 텐션이 너무 과열되어 쉽게 피로해질 수 있습니다. 진지하고 무거운 문제를 깊이 있게 다루려 할 때는 서로 겉돌 수 있습니다.`,
      frictionEn: `Constant high activation can cause occasional sensory or emotional over-exhaustion.`,
      adviceKo: `늘 신나게 놀기만 하기보다, 가끔은 각자의 차분한 휴식 시간을 존중해 주며 템포를 조절하세요.`,
      adviceEn: `Schedule quiet downtime apart so you don't burn out each other's emotional reserves.`,
      summaryKo: `만나기만 해도 스트레스가 날아가는 유쾌하고 활기찬 관계. 함께 웃고 즐기기에 최적인 궁합입니다.`,
      summaryEn: `Vibrant, mood-elevating companionship filled with laughter and shared adventure.`
    };
  }

  // 5. Mirror (거울 관계 / 지적 동지 싱크탱크)
  if (MIRROR_PAIRS[t1] === t2) {
    return {
      score: 91,
      gradeKo: '지적 동지와 싱크탱크 (Mirror Intellect)',
      gradeEn: 'Mirror Intellect (Strategic Comrades)',
      badge: '🤝 뜻이 맞고 깊이 존경하는 파트너십',
      archetypeKo: '거울 관계 (Mirror)',
      archetypeEn: 'Mirror Reflection',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「두뇌 싱크탱크」`,
      pairNicknameEn: `${t1} & ${t2} "Brain Trust"`,
      subScores: { romance: 86, communication: 97, work: 95, recovery: 82 },
      talkVibeKo: '핵심 쟁점을 두고 깊이 있는 논리와 아이디어를 주고받는 수준 높은 토론 티키타카',
      talkVibeEn: 'Sophisticated analytical discussions that dissect complex systems with mutual delight.',
      synergyKo: `동일한 인지기능을 쓰되 순서(주기능-부기능)가 반대여서, 서로가 생각하지 못한 논리적 빈틈을 완벽하게 메꿔줍니다. 지적 동료, 비즈니스 파트너, 스터디 메이트로서 최고의 역량을 발휘합니다.`,
      synergyEn: `Employing identical functions in reverse dominant/auxiliary order, you provide precisely the strategic corrections the other needs. Exceptional collaborative power.`,
      frictionKo: `생각하는 방향은 같으나 '어떻게 실행할 것인가(J vs P)'에서 충돌합니다. 한쪽은 빨리 결론을 내리고 싶어 하고, 다른 쪽은 더 탐색하고 싶어 해 답답함을 느낄 수 있습니다.`,
      frictionEn: `Tension between planning closure (J) and endless exploration (P) can stall final decisions.`,
      adviceKo: `기획과 구조화는 J에게, 새로운 가능성 탐색과 유연한 수정은 P에게 분담하는 현명한 역할 분담을 하세요.`,
      adviceEn: `Let the J lead deadlines and final execution while the P leads exploration and contingency checks.`,
      summaryKo: `지적으로 깊이 존경하며 함께 위대한 성과를 낼 수 있는 든든한 파트너십입니다.`,
      summaryEn: `Tremendous intellectual respect and synergy; an unstoppable team when roles are clear.`
    };
  }

  // 6. Cooperation / Business (협력 관계 / 환상의 팀워크)
  if (COOPERATION_PAIRS[t1] === t2) {
    return {
      score: 87,
      gradeKo: '생산적인 실행 파트너 (Business Team)',
      gradeEn: 'Productive Execution (Strong Synergy)',
      badge: '💼 목표를 현실로 만드는 환상의 팀워크',
      archetypeKo: '협력 관계 (Cooperation)',
      archetypeEn: 'Cooperation & Impact',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「목표 달성 어벤저스」`,
      pairNicknameEn: `${t1} & ${t2} "Execution Dynamos"`,
      subScores: { romance: 82, communication: 88, work: 98, recovery: 80 },
      talkVibeKo: '일의 본질과 효율성을 중심으로 군더더기 없이 딱딱 맞아떨어지는 프로페셔널 대화',
      talkVibeEn: 'Goal-focused, efficient communication that translates strategy into tangible results.',
      synergyKo: `목표 지향점과 업무 스타일이 매우 잘 맞습니다. 감정적인 소모 없이 프로젝트를 성공으로 이끄는 최고의 비즈니스 시너지를 자랑합니다.`,
      synergyEn: `Unrivaled project collaboration. Shared auxiliary focus enables seamless division of labor with zero drama.`,
      frictionKo: `지나치게 일 중심의 관계가 되거나, 속마음과 사적인 감정을 나누지 않아 관계가 건조해질 위험이 있습니다.`,
      frictionEn: `Risk of becoming purely transactional without cultivating tender personal vulnerability.`,
      adviceKo: `업무나 목표 이야기 외에도 사소한 감정과 일상의 따뜻한 안부를 자주 건네세요.`,
      adviceEn: `Make deliberate space for personal affection and non-work shared joys.`,
      summaryKo: `함께라면 어떤 프로젝트도 완벽히 성공시킬 수 있는 강력한 생산성 파트너입니다.`,
      summaryEn: `Outstanding goal alignment and mutual respect in practical life ventures.`
    };
  }

  // 7. Mirage / Illusionary (착각 관계 / 달콤한 안식처)
  if (MIRAGE_PAIRS[t1] === t2) {
    return {
      score: 84,
      gradeKo: '편안한 감성 힐링 (Mirage Rest)',
      gradeEn: 'Mirage Rest (Gentle Comfort)',
      badge: '🌿 긴장을 풀고 온전히 쉬어가는 안식처',
      archetypeKo: '착각 관계 (Mirage)',
      archetypeEn: 'Mirage Oasis',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「달콤한 오아시스」`,
      pairNicknameEn: `${t1} & ${t2} "Gentle Oasis"`,
      subScores: { romance: 86, communication: 85, work: 76, recovery: 88 },
      talkVibeKo: '일상의 치열함을 잊고 서로에게 기대어 도란도란 나누는 포근한 힐링 토크',
      talkVibeEn: 'Warm, relaxing conversations that melt away daily stress and demands.',
      synergyKo: `만나면 마음이 편안해지고 세상의 스트레스에서 벗어나게 해줍니다. 서로에게 휴식과 정서적 위안을 주는 따스한 관계입니다.`,
      synergyEn: `Psychological oasis. Being together induces genuine calm and emotional decompression.`,
      frictionKo: `공동으로 현실적인 일이나 큰 결정을 내려야 할 때 의지가 약해지거나 서로에게 책임을 미룰 수 있습니다.`,
      frictionEn: `Can foster mutual laziness in practical responsibilities; hard to push each other strictly.`,
      adviceKo: `편안함을 만끽하되, 현실의 중요한 마감이나 목표 앞에서는 함께 마음을 다잡으세요.`,
      adviceEn: `Enjoy the soothing comfort, but maintain external accountability for serious life goals.`,
      summaryKo: `지친 하루 끝에 아무 생각 없이 푹 쉴 수 있는 따뜻한 힐링 궁합입니다.`,
      summaryEn: `Deeply relaxing, tender companionship providing respite from the demanding world.`
    };
  }

  // 8. Kindred / Look-alike (유사 관계 / 친근한 사촌)
  if (KINDRED_PAIRS[t1] === t2) {
    return {
      score: 81,
      gradeKo: '친근한 공감대 (Kindred Spirits)',
      gradeEn: 'Kindred Spirits (Familiar Allies)',
      badge: '☕ 오랜 친구처럼 편안하고 자연스러운 사이',
      archetypeKo: '유사 관계 (Kindred)',
      archetypeEn: 'Kindred Affinity',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「마음 통하는 사촌」`,
      pairNicknameEn: `${t1} & ${t2} "Kindred Cousins"`,
      subScores: { romance: 78, communication: 86, work: 82, recovery: 78 },
      talkVibeKo: '말하는 뉘앙스와 분위기가 비슷해 어색함 없이 물 흐르듯 이어지는 편안한 수다',
      talkVibeEn: 'Natural, easygoing conversations grounded in familiar cognitive rhythms.',
      synergyKo: `세상을 대하는 첫인상이나 기본 태도가 비슷해 금방 친해집니다. 별다른 노력 없이도 자연스러운 공감대가 형성됩니다.`,
      synergyEn: `Instantly familiar wavelength. You understand each other's initial reactions with little explanation.`,
      frictionKo: `깊은 속내를 들여다보면 핵심적인 가치관이나 목적이 달라 예상치 못한 지점에서 의견이 갈릴 수 있습니다.`,
      frictionEn: `Surfacing core motives eventually reveals different internal compasses (N vs S).`,
      adviceKo: `첫인상이 비슷하다고 해서 속마음까지 같을 것이라 넘겨짚지 말고, 차이를 경청하세요.`,
      adviceEn: `Don't assume identical values just because your conversational style feels familiar.`,
      summaryKo: `시작이 편안하고 친숙한 관계. 깊은 대화를 통해 서로의 차이를 이해해 나가는 재미가 있습니다.`,
      summaryEn: `Familiar and comforting connection, enriched as mutual differences are patiently explored.`
    };
  }

  // 9. Super-Ego (초자아 / 호기심과 매혹)
  if (SUPER_EGO_PAIRS[t1] === t2) {
    return {
      score: 76,
      gradeKo: '정반대의 자석과 매혹 (Super-Ego)',
      gradeEn: 'Super-Ego (Magnetic Contrast)',
      badge: '💡 나와 완전히 다른 우주를 가진 사람',
      archetypeKo: '초자아 (Super-Ego)',
      archetypeEn: 'Super-Ego Fascination',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「자석의 N극과 S극」`,
      pairNicknameEn: `${t1} & ${t2} "Magnetic Poles"`,
      subScores: { romance: 82, communication: 72, work: 70, recovery: 74 },
      talkVibeKo: '"어떻게 그런 생각을 하지?"라며 서로의 다른 매력에 신기해하고 놀라는 대화',
      talkVibeEn: 'Intriguing, curious dialogue admiring an alien worldview with fascination.',
      synergyKo: `자신에게 결핍된 기능을 상대방이 완벽하게 다루는 모습을 보며 신비로운 매력과 동경을 느낍니다. 서로의 세계관을 확장시켜 주는 자극제가 됩니다.`,
      synergyEn: `Fascinated by traits you lack. Each partner sees in the other an exotic mastery of an alien world.`,
      frictionKo: `깊은 관계에서 갈등이 생기면 서로의 동기를 근본적으로 이해하기 어려워 서운함이 깊어질 수 있습니다.`,
      frictionEn: `In deep stress, fundamentally opposite priorities can make genuine empathy difficult without translation.`,
      adviceKo: `상대의 행동을 나의 기준에서 평가하지 말고, "외계인을 대하는 친절한 연구자"의 마음으로 다가가세요.`,
      adviceEn: `Approach differences with curious humility rather than judging through your own psychological framework.`,
      summaryKo: `나와 정반대의 매력에 강하게 끌리는 관계. 열린 마음으로 서로를 배울 때 빛을 발합니다.`,
      summaryEn: `Magnetic contrast and mutual fascination that thrives on patient cultural translation.`
    };
  }

  // 10. Quasi-Identical (준동일 / 평행선)
  if (QUASI_IDENTICAL_PAIRS[t1] === t2) {
    return {
      score: 79,
      gradeKo: '미묘한 평행선의 탐구 (Quasi-Identical)',
      gradeEn: 'Quasi-Identical (Parallel Paths)',
      badge: '🔍 겉은 닮았으나 속은 완전히 다른 관계',
      archetypeKo: '준동일 (Quasi-Identical)',
      archetypeEn: 'Quasi-Identical Parallel',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「평행선을 달리는 지적 탐구자」`,
      pairNicknameEn: `${t1} & ${t2} "Parallel Explorers"`,
      subScores: { romance: 75, communication: 82, work: 84, recovery: 72 },
      talkVibeKo: '같은 주제를 다루지만 결론에 도달하는 논리 회로가 완전히 달라 흥미로운 토론',
      talkVibeEn: 'Debating the same topics from completely inverted internal operating systems.',
      synergyKo: `겉보기에는 관심사와 라이프스타일이 놀랍도록 비슷합니다. 같은 문제를 다룰 때 서로 다른 접근법을 비교하며 깊은 지적 재미를 누립니다.`,
      synergyEn: `Similar external interests and lifestyles, but driven by inverted internal cognitive machinery (e.g. Te vs Ti, Fe vs Fi).`,
      frictionKo: `말하는 단어는 같지만 그 단어의 진정한 의미가 달라, 서로 합의했다고 생각했는데 나중에 오해가 드러날 수 있습니다.`,
      frictionEn: `Semantic misunderstandings: using identical words with completely different internal definitions.`,
      adviceKo: `서로 같은 뜻으로 말하고 있는지 구체적인 예시를 들어 확인하는 습관을 들이세요.`,
      adviceEn: `Double-check assumptions using concrete examples to prevent semantic illusions of agreement.`,
      summaryKo: `비슷해 보여서 끌리지만 내면의 코드는 다른 관계. 솔직한 소통으로 오해를 줄이면 훌륭한 동료가 됩니다.`,
      summaryEn: `Superficially alike yet fundamentally distinct; rewarding when communication is precise.`
    };
  }

  // 11. Conflictor (갈등 관계 / 극한의 성장 과제)
  if (CONFLICTOR_PAIRS[t1] === t2) {
    return {
      score: 52,
      gradeKo: '성장과 배움의 도전 (Growth Challenge)',
      gradeEn: 'Growth Challenge (Requires Empathy)',
      badge: '⚡ 서로에게 가장 큰 성장의 과제를 던지는 인연',
      archetypeKo: '갈등 관계 (Conflictor)',
      archetypeEn: 'Conflictor Crucible',
      pairNicknameKo: `${name1Ko}과 ${name2Ko} 「미지의 심리적 퍼즐」`,
      pairNicknameEn: `${t1} & ${t2} "The Crucible"`,
      subScores: { romance: 54, communication: 48, work: 56, recovery: 50 },
      talkVibeKo: '조심스럽게 서로의 선을 살피며 다른 언어로 번역기를 돌려야 하는 신중한 대화',
      talkVibeEn: 'Deliberate, careful conversation requiring conscious emotional translation.',
      synergyKo: `자신의 가장 아픈 맹점과 마주하게 만드는 인생의 거울입니다. 성숙한 태도로 상대를 이해할 수 있다면 그 어떤 관계보다 인간적으로 거대한 도약과 성숙을 선물합니다.`,
      synergyEn: `The ultimate crucible for self-awareness. Overcoming friction with this type expands your psychological range beyond imagination.`,
      frictionKo: `나의 자연스러운 행동이 상대의 가장 취약한 지점을 무의식중에 찌르게 됩니다. 사소한 일도 큰 오해와 방어기제로 비화하기 쉽습니다.`,
      frictionEn: `Your default unconscious behavior naturally hits your partner's exact vulnerable weak spot.`,
      adviceKo: `상대의 방식을 '고쳐야 할 결점'으로 보지 마세요. 개인적 공간과 적절한 심리적 거리를 유지하며 정중함을 지키는 것이 황금률입니다.`,
      adviceEn: `Maintain courteous psychological space. Never attempt to reform or fix each other's native traits.`,
      summaryKo: `가장 많은 배려와 번역이 필요한 관계. 상호 존중이 뒷받침되면 영혼의 깊은 성숙을 이끌어냅니다.`,
      summaryEn: `A challenging dynamic requiring active translation, offering profound personal growth when nurtured.`
    };
  }

  // 12. Benefactor / Supervision (스승과 제자 / 자극과 조언) - Fallback for remaining pairs
  return {
    score: 73,
    gradeKo: '조화로운 보완과 배움 (Balanced Affinity)',
    gradeEn: 'Balanced Affinity (Mutual Learning)',
    badge: '🌱 서로 다른 장점을 존중하며 함께 성장하는 사이',
    archetypeKo: '보완 관계 (Benefactor/Supervision)',
    archetypeEn: 'Dynamic Learning',
    pairNicknameKo: `${name1Ko}과 ${name2Ko} 「서로를 일깨우는 멘토링」`,
    pairNicknameEn: `${t1} & ${t2} "Dynamic Allies"`,
    subScores: { romance: 74, communication: 75, work: 78, recovery: 72 },
    talkVibeKo: '서로 다른 관점을 차분히 비교하며 시야를 넓혀가는 유익한 대화',
    talkVibeEn: 'Constructive dialogue comparing different perspectives to broaden life horizons.',
    synergyKo: `서로 다른 강점을 지니고 있어 배울 점이 많습니다. 일방적이지 않고 상호 호혜적인 태도를 유지하면 매우 유익하고 단단한 유대를 형성합니다.`,
    synergyEn: `Healthy balance of differences. Each offers complementary angles that enrich the other's life perspective.`,
    frictionKo: `한쪽이 무의식중에 조언이나 지적을 과하게 하여 상대방이 부담을 느낄 수 있습니다.`,
    frictionEn: `Unintentional advice-giving can feel patronizing if psychological boundaries are blurred.`,
    adviceKo: `충고나 판단보다는 상대방의 입장을 먼저 있는 그대로 인정해 주고 격려해 주세요.`,
    adviceEn: `Prioritize warm validation and curious listening over unrequested advice.`,
    summaryKo: `서로에게 배울 점이 많은 발전적인 인연. 정중한 존중과 소통으로 깊어지는 관계입니다.`,
    summaryEn: `A rewarding dynamic of mutual learning, strengthened through active respect and open curiosity.`
  };
}
