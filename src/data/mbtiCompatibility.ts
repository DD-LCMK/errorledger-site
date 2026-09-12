export interface CompatibilityResult {
  score: number;
  gradeKo: string;
  gradeEn: string;
  badge: string;
  summaryKo: string;
  summaryEn: string;
}

// Classical MBTI & Cognitive Function Compatibility Matrix
// Based on shared or complementary cognitive functions (e.g. Ni-Ne, Fe-Ti, Se-Si dualities)
export function getMbtiCompatibility(type1: string, type2: string): CompatibilityResult {
  const t1 = type1.toUpperCase();
  const t2 = type2.toUpperCase();

  // Self
  if (t1 === t2) {
    return {
      score: 85,
      gradeKo: '영혼의 거울 (Soul Mirror)',
      gradeEn: 'Soul Mirror (High Resonance)',
      badge: '🪞 서로를 가장 잘 이해하는 거울 같은 관계',
      summaryKo: '말하지 않아도 상대방의 생각과 기분을 훤히 꿰뚫어 볼 수 있는 깊은 공감대를 형성합니다. 다만 단점과 맹점까지 똑같아서 한 번 갈등이나 침체에 빠지면 함께 헤어나오기 힘들 수 있으므로 외부의 자극이 필요합니다.',
      summaryEn: 'You share identical cognitive wiring, enabling deep mutual understanding with zero explanation. However, sharing identical blind spots means stagnation or negative loops can amplify unless fresh external perspectives are welcomed.'
    };
  }

  // Dual / Golden Matches (Dominant-Auxiliary complementary pairs)
  // e.g. INTJ-ENFP, INTP-ENTJ, INFJ-ENTP, INFP-ENFJ, ISTJ-ESFP, ISFJ-ESTP, ESTJ-ISFP, ESFJ-ISTP
  const goldenPairs: Record<string, string[]> = {
    INTJ: ['ENFP', 'ENTP'],
    INTP: ['ENTJ', 'ENFJ'],
    ENTJ: ['INTP', 'INFP'],
    ENTP: ['INFJ', 'INTJ'],
    INFJ: ['ENTP', 'ENFP'],
    INFP: ['ENFJ', 'ENTJ'],
    ENFJ: ['INFP', 'ISFP'],
    ENFP: ['INTJ', 'INFJ'],
    ISTJ: ['ESFP', 'ESTP'],
    ISFJ: ['ESTP', 'ESFP'],
    ESTJ: ['ISFP', 'ISTP'],
    ESFJ: ['ISTP', 'ISFP'],
    ISTP: ['ESFJ', 'ESTJ'],
    ISFP: ['ESTJ', 'ESFJ'],
    ESTP: ['ISFJ', 'ISTJ'],
    ESFP: ['ISTJ', 'ISFJ'],
  };

  if (goldenPairs[t1]?.includes(t2)) {
    return {
      score: 98,
      gradeKo: '천생연분 환상의 궁합 (Ideal Match)',
      gradeEn: 'Ideal Match (Transcendent Chemistry)',
      badge: '💖 서로의 영혼을 채워주는 최고의 시너지',
      summaryKo: '서로의 강점이 상대방의 아킬레스건을 자연스럽게 보완해 주는 완벽한 파트너십입니다. 대화가 끊이지 않으며, 함께 있을 때 서로가 더 지혜롭고 매력적인 사람으로 성장하도록 영감을 줍니다.',
      summaryEn: 'An exceptional psychological pairing where each partner’s primary strengths effortlessly cover the other’s blind spots. Conversations spark spontaneous fireworks and mutual growth feels exhilarating and effortless.'
    };
  }

  // Strong Resonance (Sharing N or S and J/P balance)
  const isSameIntuition = (t1[1] === t2[1]);
  const isSameThinking = (t1[2] === t2[2]);
  const isOppositeIntrovert = (t1[0] !== t2[0]);

  if (isSameIntuition && isOppositeIntrovert) {
    return {
      score: 88,
      gradeKo: '매우 좋은 인연 (Great Synergy)',
      gradeEn: 'Great Synergy (Strong Alignment)',
      badge: '✨ 깊은 교감과 안정적인 신뢰',
      summaryKo: '세상을 바라보는 렌즈(인식 기능)가 같아 공통의 관심사와 가치관을 쉽게 공유합니다. 한쪽의 외향성이 다른 쪽의 내향적 안식처와 조화를 이루어 오랫동안 편안하게 지속되는 관계입니다.',
      summaryEn: 'Sharing the same perceptual wavelength allows intuitive alignment on core values and humor. Extrovert-introvert complementarity ensures both adventure and quiet emotional restoration.'
    };
  }

  if (isSameIntuition && isSameThinking) {
    return {
      score: 80,
      gradeKo: '지적 파트너 (Intellectual Allies)',
      gradeEn: 'Intellectual Allies (High Respect)',
      badge: '🤝 뜻이 맞고 의기투합하는 동반자',
      summaryKo: '목표와 사고방식이 비슷하여 비즈니스, 스터디, 창작 프로젝트를 함께할 때 최상의 추진력을 발휘합니다. 사소한 자존심 대결만 주의한다면 평생을 함께할 든든한 동지가 됩니다.',
      summaryEn: 'Similar cognitive processing styles make you brilliant co-creators and strategic comrades. As long as intellectual rivalries are kept playful, you form an unshakeable team.'
    };
  }

  if (!isSameIntuition && !isSameThinking && !isOppositeIntrovert) {
    return {
      score: 55,
      gradeKo: '서로 다른 매력 (Opposites Attract)',
      gradeEn: 'Opposites Attract (Requires Curiosity)',
      badge: '💡 서로 다른 우주를 발견하는 흥미로운 관계',
      summaryKo: '세상을 인식하고 판단하는 방식이 완전히 달라 처음에는 신기하고 호기심이 발동합니다. 다만 깊은 관계로 발전하려면 상대방의 방식이 "틀린 것"이 아니라 "다른 것"임을 인정하는 열린 마음이 필수적입니다.',
      summaryEn: 'Operating on completely different psychological frequencies, you offer each other views of an alien universe. Mutual respect and patient translation of motives are vital for lasting harmony.'
    };
  }

  // Default balanced
  return {
    score: 72,
    gradeKo: '조화로운 보완 관계 (Harmonious Balance)',
    gradeEn: 'Harmonious Balance (Solid Foundation)',
    badge: '🌿 배려와 소통으로 단단해지는 인연',
    summaryKo: '서로 다른 장점과 관점을 지니고 있어 배울 점이 많은 관계입니다. 일상적인 대화와 솔직한 감정 교류를 통해 차이를 좁혀나간다면 세상 어떤 인연보다도 깊고 풍요로운 유대를 맺을 수 있습니다.',
    summaryEn: 'A healthy balance of similarities and differences. With honest communication, you offer complementary perspectives that broaden each other’s life experience and wisdom.'
  };
}
