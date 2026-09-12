// StreamArcade MBTI Psychology Facts & Demographics Dictionary
// Demographics, Keirsey 4-Temperaments, and deep situational behavioral patterns for all 16 MBTI types.

export interface MbtiDemographics {
  rarityKo: string;
  rarityEn: string;
  rankKo: string;
  rankEn: string;
  maleRatio: string;
  femaleRatio: string;
  koreaStatKo: string;
  globalStatKo: string;
}

export interface MbtiTemperament {
  group: 'NT' | 'NF' | 'SJ' | 'SP';
  nameKo: string;
  nameEn: string;
  mottoKo: string;
  mottoEn: string;
  coreDriveKo: string;
  coreDriveEn: string;
  shadowSideKo: string;
  shadowSideEn: string;
}

export interface MbtiBehaviorFacts {
  conflictReactionKo: string;
  conflictReactionEn: string;
  rechargeRoutineKo: string;
  rechargeRoutineEn: string;
  petPeeveKo: string;
  petPeeveEn: string;
  intimacyStages: {
    stage1Ko: string;
    stage1En: string;
    stage2Ko: string;
    stage2En: string;
    stage3Ko: string;
    stage3En: string;
  };
}

export interface MbtiPsychologyDetail {
  demographics: MbtiDemographics;
  temperament: MbtiTemperament;
  behaviorFacts: MbtiBehaviorFacts;
}

export const MBTI_PSYCHOLOGY_FACTS: Record<string, MbtiPsychologyDetail> = {
  "INTJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 1.8% (상위 2% 미만 극소수)",
      "rarityEn": "Approx. 1.8% of global population",
      "rankKo": "희귀도 전체 3위 (여성 기준 0.8%로 희귀도 1위)",
      "rankEn": "3rd rarest overall, #1 rarest among females (0.8%)",
      "maleRatio": "남성 2.8%",
      "femaleRatio": "여성 0.8%",
      "koreaStatKo": "한국 인구 중 약 1.9%",
      "globalStatKo": "전 세계 약 1.8%"
    },
    "temperament": {
      "group": "NT",
      "nameKo": "합리주의자 (The Rational Strategist)",
      "nameEn": "Rationals / Analysts",
      "mottoKo": "지식은 힘이며, 모든 시스템은 통찰과 전략으로 최적화될 수 있다.",
      "mottoEn": "Knowledge is power; every system can be optimized.",
      "coreDriveKo": "절대적 역량, 지적 독립성, 본질적 진실과 거시적 인과관계 규명",
      "coreDriveEn": "Intellectual competence, autonomy, and structural mastery",
      "shadowSideKo": "타인의 감정적 니즈 간과, 지나치게 높은 완벽주의 기준과 냉소주의",
      "shadowSideEn": "Dismissing emotional nuances, hyper-perfectionism, and intellectual cynicism"
    },
    "behaviorFacts": {
      "conflictReactionKo": "감정을 철저히 배제하고 상대의 논리적 모순과 팩트를 정밀 해체합니다. 상대가 억지를 부리면 무가치하다고 판단하여 영구 차단(Door-Slam)하고 대화를 종료합니다.",
      "conflictReactionEn": "Dismantles contradictions with razor-sharp logic. If irrationality persists, completely disengages and executes an irreversible psychological door-slam.",
      "rechargeRoutineKo": "외부 자극이 완벽히 차단된 조용한 개인 공간에서 심층 독서, 시스템 설계, 지적 다큐멘터리 몰입, 전략 구상을 즐길 때 뇌의 도파민이 회복됩니다.",
      "rechargeRoutineEn": "Absolute solitary retreat into deep research, strategic architecture, complex puzzles, or reading in undisturbed silence.",
      "petPeeveKo": "비효율적인 핑계와 징징거림, 무능하면서 권위만 내세우는 꼰대, 논리적 근거 없는 우기기와 마이크로 매니징.",
      "petPeeveEn": "Illogical excuses, emotional whining, unearned authority, and senseless micro-management.",
      "intimacyStages": {
        "stage1Ko": "얼음장처럼 차갑고 예의 바르며, 철저하게 필요한 업무/공적 이야기만 나눔.",
        "stage1En": "Polite but guarded and distant; exclusively exchanges necessary objective facts.",
        "stage2Ko": "상대의 지적 역량이 입증되면 관심 분야에 대한 깊은 사견과 통찰을 공유함.",
        "stage2En": "Shares specialized insights, intellectual theories, and private projects once competence is proven.",
        "stage3Ko": "오직 1%에게만 여는 엉뚱한 유머, 아이 같은 순수함, 끝없는 충성심과 절대적 내 편 보호.",
        "stage3En": "Reveals dry quirky humor, childlike curiosity, unwavering loyalty, and fierce protective devotion."
      }
    }
  },
  "INTP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 3.3% (독창적 브레인)",
      "rarityEn": "Approx. 3.3% of global population",
      "rankKo": "희귀도 전체 8위 (남성 4.8%, 여성 1.7%)",
      "rankEn": "8th rarest overall (Male 4.8%, Female 1.7%)",
      "maleRatio": "남성 4.8%",
      "femaleRatio": "여성 1.7%",
      "koreaStatKo": "한국 인구 중 약 3.4%",
      "globalStatKo": "전 세계 약 3.3%"
    },
    "temperament": {
      "group": "NT",
      "nameKo": "논리주의자 (The Architectural Thinker)",
      "nameEn": "Rationals / Analysts",
      "mottoKo": "모든 이론은 검증되어야 하며, 세상은 끝없는 탐구의 실험실이다.",
      "mottoEn": "Every assumption must be questioned; reality is an endless laboratory.",
      "coreDriveKo": "보편적 원리 발견, 지적 일관성, 논리적 프레임워크의 완결성",
      "coreDriveEn": "Uncovering fundamental principles and building coherent conceptual models",
      "shadowSideKo": "실행력 부족(아이디어만 쌓아둠), 사회적 의례 무시, 현실 감각 결여",
      "shadowSideEn": "Analysis paralysis, procrastination, and neglect of social conventions"
    },
    "behaviorFacts": {
      "conflictReactionKo": "즉각적인 감정 싸움을 꺼리며 '용어의 정의'부터 따집니다. 상대가 감정적으로 폭주하면 반박을 포기하고 속으로 '말이 안 통하는군'이라며 무시합니다.",
      "conflictReactionEn": "Avoids emotional outbursts and dissects semantic definitions. If met with irrational anger, silently dismisses the opponent as intellectually bankrupt.",
      "rechargeRoutineKo": "아무도 안 시킨 엉뚱하고 방대한 주제(양자역학, 신기한 역사, 게임 메타 분석 등)를 새벽 4시까지 파고들며 유레카를 외칠 때 살아납니다.",
      "rechargeRoutineEn": "Rabbit-holing into obscure fascinations, coding, philosophical dilemmas, or gaming theory deep into the night.",
      "petPeeveKo": "논리적 오류 지적에 '기분 나쁘다'고 화내는 사람, 뻔하고 지루한 스몰토크, 생각 없이 규칙만 따르는 맹목성.",
      "petPeeveEn": "People offended by logical corrections, shallow small talk, and blind adherence to traditions.",
      "intimacyStages": {
        "stage1Ko": "구석에서 조용히 투명인간 모드로 주변 사람들의 행동 패턴을 스캔함.",
        "stage1En": "Wallflower observer silently scanning and analyzing conversational patterns.",
        "stage2Ko": "관심사(게임, 과학, 밈 등)가 맞으면 갑자기 눈이 반짝이며 폭풍 같은 지식을 방출함.",
        "stage2En": "Unleashes torrential enthusiasm and niche memes the second a shared intellectual interest sparks.",
        "stage3Ko": "새벽에 사소한 고민과 엉뚱한 철학을 털어놓으며 상대방의 말에 진심으로 공감하고 챙겨줌.",
        "stage3En": "Confides vulnerable existential thoughts, provides unfiltered honesty, and becomes deeply loyal."
      }
    }
  },
  "ENTJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 2.0% (외향형 중 최희귀 1위)",
      "rarityEn": "Approx. 2.0% of population (Rarest Extrovert)",
      "rankKo": "희귀도 전체 4위 (여성 1.0%로 극소수)",
      "rankEn": "4th rarest overall, #2 rarest among females (1.0%)",
      "maleRatio": "남성 3.0%",
      "femaleRatio": "여성 1.0%",
      "koreaStatKo": "한국 인구 중 약 2.1%",
      "globalStatKo": "전 세계 약 2.0%"
    },
    "temperament": {
      "group": "NT",
      "nameKo": "대담한 지휘관 (The Field Marshal)",
      "nameEn": "Rationals / Analysts",
      "mottoKo": "길이 없다면 내가 만들며, 승리는 준비된 자의 필연이다.",
      "mottoEn": "I will either find a way or create one; victory belongs to strategy.",
      "coreDriveKo": "비전의 현실화, 조직과 시스템의 장악, 압도적인 목표 달성",
      "coreDriveEn": "Vision execution, institutional optimization, and decisive leadership",
      "shadowSideKo": "타인의 감정적 한계를 무시하는 강압성, 워커홀릭 번아웃, 조급함",
      "shadowSideEn": "Overpowering bluntness, intolerance of perceived weakness, and relentless impatience"
    },
    "behaviorFacts": {
      "conflictReactionKo": "피하지 않고 즉각 정면 돌파합니다. 감정을 빼고 문제의 원인과 손실을 명확히 가린 뒤, 누가 잘못했는지 따지기보다 지금 당장 해결책을 내놓으라고 요구합니다.",
      "conflictReactionEn": "Confronts disputes directly with zero hesitation. Demands immediate objective accountability and actionable solutions.",
      "rechargeRoutineKo": "복잡하고 거대한 프로젝트를 성공적으로 끝마친 뒤, 하이엔드 환경에서 훌륭한 사람들과 더 큰 야망과 비즈니스를 논할 때 도파민이 폭발합니다.",
      "rechargeRoutineEn": "Dominating milestones, strategic high-level networking, and structuring new ambitious enterprises.",
      "petPeeveKo": "우유부단함, 시간 약속 미준수, 발전 없는 신세한탄, 일을 망쳐놓고 변명만 늘어놓는 것.",
      "petPeeveEn": "Indecision, chronic unpunctuality, victim mentalities, and defensive excuses for incompetence.",
      "intimacyStages": {
        "stage1Ko": "압도적인 카리스마와 예리한 눈빛으로 상대를 스캔하며 실력을 평가함.",
        "stage1En": "Commands presence effortlessly while evaluating credibility and competence.",
        "stage2Ko": "신뢰할 수 있는 사람으로 인정되면 자신의 고급 정보와 인맥, 자원을 아낌없이 열어줌.",
        "stage2En": "Unlocks valuable networks, strategic advice, and powerful resources to elevate the partner.",
        "stage3Ko": "강철 갑옷을 완전히 벗고 고독함과 약점을 털어놓으며 끝없는 애정과 지지를 보냄.",
        "stage3En": "Drops all armor, confesses hidden vulnerabilities, and becomes an invincible lifelong protector."
      }
    }
  },
  "ENTP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 3.2% (유쾌한 혁신가)",
      "rarityEn": "Approx. 3.2% of global population",
      "rankKo": "희귀도 전체 7위 (남성 4.0%, 여성 2.4%)",
      "rankEn": "7th rarest overall (Male 4.0%, Female 2.4%)",
      "maleRatio": "남성 4.0%",
      "femaleRatio": "여성 2.4%",
      "koreaStatKo": "한국 인구 중 약 3.1%",
      "globalStatKo": "전 세계 약 3.2%"
    },
    "temperament": {
      "group": "NT",
      "nameKo": "아이디어 혁신가 (The Visionary Inventor)",
      "nameEn": "Rationals / Analysts",
      "mottoKo": "불가능한 것은 없으며, 모든 규칙은 깨지기 위해 존재한다.",
      "mottoEn": "Nothing is sacred; rules are merely suggestions waiting to be dismantled.",
      "coreDriveKo": "기존 통념의 파괴, 끊임없는 지적 패러독스 탐색, 새로운 가능성의 창조",
      "coreDriveEn": "Challenging dogmas, discovering intellectual breakthroughs, and witty innovation",
      "shadowSideKo": "뒷감당 없는 프로젝트 벌리기, 논쟁을 위한 논쟁(어그로), 일상의 루틴 혐오",
      "shadowSideEn": "Starting projects without finishing, arguing purely for sport, and routine aversion"
    },
    "behaviorFacts": {
      "conflictReactionKo": "상대방 논리의 헛점을 역이용해 '악마의 대변인'으로 돌입합니다. 상대가 멘붕에 빠지거나 말문이 막히는 과정을 오히려 흥미진진해합니다.",
      "conflictReactionEn": "Pivots into devil's advocate mode, weaponizing humor and logical paradoxes to destabilize the opponent.",
      "rechargeRoutineKo": "번뜩이는 창업 아이템이나 콘텐츠를 브레인스토밍하고, 흥미로운 사람들과 끝장 토론을 벌이거나 새로운 판을 짤 때 에너지를 얻습니다.",
      "rechargeRoutineEn": "Brainstorming disruptive concepts, energetic late-night debates, and launching creative side-quests.",
      "petPeeveKo": "꼰대질, 답정너, '원래 그런 거니까 그냥 해'라는 말, 융통성 없는 고지식함.",
      "petPeeveEn": "Dogmatic traditionalism, rigged conversations, and humorless rigid minds.",
      "intimacyStages": {
        "stage1Ko": "가벼운 드립과 위트로 분위기를 띄우며 인싸 가면을 장착함.",
        "stage1En": "Witty, charming social dynamo keeping interactions sparkling and playful.",
        "stage2Ko": "지적 자극을 주는 상대에게는 밤을 새워 진짜 야망과 비밀 아이디어를 공개함.",
        "stage2En": "Entrusts genuine business schemes, philosophical depth, and unfiltered brainstorms.",
        "stage3Ko": "장난기를 싹 거두고 상대방의 안위와 행복을 세상에서 가장 진지하고 다정하게 챙겨줌.",
        "stage3En": "Sets teasing aside to reveal deep romantic tenderness, unwavering loyalty, and sweet emotional care."
      }
    }
  },
  "INFJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 1.5% (전 세계 최희귀 1위 MBTI)",
      "rarityEn": "Approx. 1.5% of population (#1 Rarest Type Globally)",
      "rankKo": "희귀도 전체 1위 (남성 1.3%, 여성 1.7%)",
      "rankEn": "#1 rarest MBTI type in the world",
      "maleRatio": "남성 1.3%",
      "femaleRatio": "여성 1.7%",
      "koreaStatKo": "한국 인구 중 약 1.6%",
      "globalStatKo": "전 세계 약 1.5%"
    },
    "temperament": {
      "group": "NF",
      "nameKo": "통찰적 옹호자 (The Mystic Counselor)",
      "nameEn": "Idealists / Diplomats",
      "mottoKo": "우리의 사명은 세상의 어둠을 밝히고 인간 내면의 진정한 가치를 일깨우는 것이다.",
      "mottoEn": "Our purpose is to illuminate darkness and nurture the human spirit.",
      "coreDriveKo": "인간 본질에 대한 영적 통찰, 이상적 조화, 세상을 더 낫게 만드는 사명감",
      "coreDriveEn": "Profound human insight, transcendent purpose, and compassionate harmony",
      "shadowSideKo": "과도한 자기희생 후 폭발, 높은 인간적 기준, '도어슬램' 후 냉담함",
      "shadowSideEn": "Martyr burnout, unrealistic moral expectations, and sudden icy door-slams"
    },
    "behaviorFacts": {
      "conflictReactionKo": "극도로 상처를 받으며 갈등을 봉합하려 애씁니다. 그러나 상대가 선을 넘거나 악의를 품었다고 확신하면 일말의 미련도 없이 완벽한 영구 차단(Door-Slam)을 실행합니다.",
      "conflictReactionEn": "Endures and seeks harmony until moral lines are crossed; then executes a cold, irrevocable door-slam.",
      "rechargeRoutineKo": "비 오는 날 잔잔한 음악과 따뜻한 차를 마시며 사색하거나, 감성적인 일기 쓰기, 고요한 숲길 산책을 통해 영혼을 정화합니다.",
      "rechargeRoutineEn": "Solitary contemplation with warm tea, introspective journaling, poetic art, and mindful nature walks.",
      "petPeeveKo": "가식과 위선, 약자를 괴롭히는 무례함, 속셈이 뻔히 보이는 얄팍한 접근, 배은망덕.",
      "petPeeveEn": "Hypocrisy, cruelty to the vulnerable, manipulative small-mindedness, and emotional falseness.",
      "intimacyStages": {
        "stage1Ko": "따뜻하고 상냥하게 남의 말을 들어주지만, 자신의 마음 문은 굳게 닫고 관찰함.",
        "stage1En": "Empathetic active listener who keeps their own inner world strictly concealed.",
        "stage2Ko": "영혼의 결이 맞다고 느끼면 내면의 독특한 가치관과 철학적 고민을 조금씩 털어놓음.",
        "stage2En": "Unveils mystical perspectives, secret ideals, and sensitive emotional depths.",
        "stage3Ko": "영혼의 모든 것을 투명하게 보여주며, 상대방의 고통까지 함께 짊어지는 운명적 동반자.",
        "stage3En": "Total spiritual transparency, sharing wounds and offering boundless transcendent love."
      }
    }
  },
  "INFP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 4.4% (순수한 영혼의 몽상가)",
      "rarityEn": "Approx. 4.4% of global population",
      "rankKo": "희귀도 전체 9위 (여성 4.6%, 남성 4.1%)",
      "rankEn": "9th rarest overall (Female 4.6%, Male 4.1%)",
      "maleRatio": "남성 4.1%",
      "femaleRatio": "여성 4.6%",
      "koreaStatKo": "한국 인구 중 약 4.5%",
      "globalStatKo": "전 세계 약 4.4%"
    },
    "temperament": {
      "group": "NF",
      "nameKo": "순수 이상주의자 (The Romantic Dreamer)",
      "nameEn": "Idealists / Diplomats",
      "mottoKo": "나만의 진실된 가치를 지키며, 보이지 않는 곳에서도 아름다움을 노래하리라.",
      "mottoEn": "To thine own self be true; discover poetry in the hidden corners of life.",
      "coreDriveKo": "자아의 진정성(Authenticity), 내면의 평화, 상처받은 영혼에 대한 깊은 연민",
      "coreDriveEn": "Authentic individuality, inner emotional harmony, and poetic empathy",
      "shadowSideKo": "현실 도피, 지나친 감정 과몰입, 거절이나 비판에 대한 극심한 상처",
      "shadowSideEn": "Escapist daydreaming, hypersensitivity to criticism, and paralysis in conflict"
    },
    "behaviorFacts": {
      "conflictReactionKo": "자신의 신념이나 감정이 부정당하면 깊은 상처를 입고 입을 닫습니다. 겉으론 조용해 보이지만 내면에서는 거대한 슬픔과 분노의 파도가 소용돌이칩니다.",
      "conflictReactionEn": "Withdraws into wounded silence when core values are attacked, feeling immense internal turbulence.",
      "rechargeRoutineKo": "좋아하는 인디 음악, 감성 웹툰, 문학 작품에 푹 빠져 혼자 눈물을 흘리거나 나만의 상상 정원 속에서 뒹굴 때 비로소 치유됩니다.",
      "rechargeRoutineEn": "Immersing in indie music, poetry, daydreaming in bed, or creating private artistic works.",
      "petPeeveKo": "나의 가치관과 감성을 유난 떤다고 비웃는 것, 피도 눈물도 없는 냉혈한적 계산, 강요.",
      "petPeeveEn": "Belittling their sensitivity, transactional ruthlessness, and coercive conformity.",
      "intimacyStages": {
        "stage1Ko": "수줍게 눈치를 살피며 부드러운 미소와 조심스러운 리액션으로 거리를 둠.",
        "stage1En": "Gentle, shy, and courteous while keeping a wide emotional safety buffer.",
        "stage2Ko": "자신과 비슷한 감성을 발견하면 숨겨둔 독특한 취향과 예술적 덕질을 은밀히 방출함.",
        "stage2En": "Shares secret playlists, heartfelt art, and delightful quirky passions.",
        "stage3Ko": "세상 누구에게도 말하지 못한 순수한 눈물과 가장 내밀한 꿈을 온전히 맡기는 둘도 없는 단짝.",
        "stage3En": "Shares raw soul vulnerabilities and gives devoted, gentle, lifelong adoration."
      }
    }
  },
  "ENFJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 2.5% (사람을 살리는 리더)",
      "rarityEn": "Approx. 2.5% of global population",
      "rankKo": "희귀도 전체 5위 (남성 1.8%, 여성 3.1%)",
      "rankEn": "5th rarest overall (Male 1.8%, Female 3.1%)",
      "maleRatio": "남성 1.8%",
      "femaleRatio": "여성 3.1%",
      "koreaStatKo": "한국 인구 중 약 2.6%",
      "globalStatKo": "전 세계 약 2.5%"
    },
    "temperament": {
      "group": "NF",
      "nameKo": "정의로운 멘토 (The Inspiring Protagonist)",
      "nameEn": "Idealists / Diplomats",
      "mottoKo": "우리가 함께 손을 잡을 때, 세상 모든 사람의 잠재력이 꽃필 수 있다.",
      "mottoEn": "When we unite hearts, the boundless potential of humanity unfolds.",
      "coreDriveKo": "공동체의 조화와 성장, 타인의 잠재력 개화, 따뜻한 영향력 전파",
      "coreDriveEn": "Community uplift, unlocking human potential, and charismatic empathy",
      "shadowSideKo": "타인의 시선에 대한 지나친 의식, 거절 못 하는 오지랖, 인정 욕구 결핍",
      "shadowSideEn": "Hyper-attunement to approval, boundary neglect, and overwhelming meddling"
    },
    "behaviorFacts": {
      "conflictReactionKo": "집단의 화합을 위해 자신의 상처를 억누르고 중재하려 합니다. 그러나 불의나 약자를 괴롭히는 행위를 목격하면 분노의 잔다르크로 돌변해 맞섭니다.",
      "conflictReactionEn": "Swallows personal hurt to mediate, but unleashes righteous fury if injustice harms the vulnerable.",
      "rechargeRoutineKo": "소중한 사람들과 진심 어린 대화를 나누며 서로의 성장을 축하하거나, 따뜻한 모임에서 긍정적 에너지를 주고받을 때 회복됩니다.",
      "rechargeRoutineEn": "Deep heart-to-heart connections, uplifting group celebrations, and mentoring loved ones.",
      "petPeeveKo": "은혜를 원수로 갚는 배은망덕, 뒤에서 남을 헐뜯는 이간질, 진심을 의심하고 차갑게 무시하는 태도.",
      "petPeeveEn": "Ungrateful cynicism, treacherous backstabbing, and cold mockery of sincere care.",
      "intimacyStages": {
        "stage1Ko": "모든 사람을 챙겨주는 밝고 다정한 국민 리더이자 따뜻한 상담가 모드.",
        "stage1En": "Charismatic, warm mentor attending to everyone's comfort in the room.",
        "stage2Ko": "신뢰가 쌓이면 남들에게 털어놓지 못하는 리더로서의 고독과 막중한 책임감을 고백함.",
        "stage2En": "Reveals the heavy burden of public expectations and personal exhaustion.",
        "stage3Ko": "상대방의 행복과 성장을 위해 자신의 모든 것을 아낌없이 내어주는 헌신적인 삶의 동반자.",
        "stage3En": "Ceaseless devotion, cheering your every dream and defending you with their whole heart."
      }
    }
  },
  "ENFP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 8.1% (반짝이는 영감의 요정)",
      "rarityEn": "Approx. 8.1% of global population",
      "rankKo": "희귀도 전체 11위 (남성 6.4%, 여성 9.7%)",
      "rankEn": "11th rarest overall (Male 6.4%, Female 9.7%)",
      "maleRatio": "남성 6.4%",
      "femaleRatio": "여성 9.7%",
      "koreaStatKo": "한국 인구 중 약 8.0%",
      "globalStatKo": "전 세계 약 8.1%"
    },
    "temperament": {
      "group": "NF",
      "nameKo": "스파크 촉매자 (The Spirited Campaigner)",
      "nameEn": "Idealists / Diplomats",
      "mottoKo": "인생은 예측할 수 없는 신나는 모험이며, 모든 사람에게는 특별한 마법이 있다.",
      "mottoEn": "Life is a vibrant adventure; every soul harbors a spark of pure magic.",
      "coreDriveKo": "새로운 사람과 영감 탐색, 무한한 가능성의 시도, 자유로운 감정 표현",
      "coreDriveEn": "Spontaneous creative adventures, emotional connection, and liberating novelty",
      "shadowSideKo": "뒷심 부족(일 벌려놓고 수습 안 함), 감정 기복, 세부 디테일 누락",
      "shadowSideEn": "Disorganized follow-through, emotional volatility, and boredom with maintenance"
    },
    "behaviorFacts": {
      "conflictReactionKo": "갈등 상황을 매우 괴로워하며 회피하거나 펑펑 눈물을 흘립니다. 하지만 상대방이 진심 어린 사과나 대화를 건네면 언제 그랬냐는 듯 뒤끝 없이 안아줍니다.",
      "conflictReactionEn": "Deeply distressed by discord; may cry or flee, but forgives instantly if met with authentic apology.",
      "rechargeRoutineKo": "예상치 못한 즉흥 여행, 새로운 예술 전시회, 마음 통하는 사람들과 밤새도록 떠드는 티키타카 파티에서 도파민이 폭발합니다.",
      "rechargeRoutineEn": "Spontaneous road trips, novel creative jams, immersive festivals, and late-night laughing fits.",
      "petPeeveKo": "마이크로 통제와 억압, '너는 원래 그런 애잖아' 식의 낙인찍기, 삭막하고 무미건조한 환경.",
      "petPeeveEn": "Micromanagement, pigeonholing their personality, and dry sterile routines.",
      "intimacyStages": {
        "stage1Ko": "첫 만남 10분 만에 10년 지기처럼 하이텐션으로 웃겨주는 비글미.",
        "stage1En": "Effervescent golden retriever energy making instant, lively connections.",
        "stage2Ko": "장난스러운 텐션 뒤에 숨겨진 깊은 철학적 고민과 실존적 외로움을 진지하게 털어놓음.",
        "stage2En": "Shares existential yearnings, sensitive anxieties, and philosophical depth.",
        "stage3Ko": "상대방의 사소한 슬픔에도 함께 울어주고 영혼의 가장 따뜻한 햇살이 되어주는 영원한 내 편.",
        "stage3En": "Boundless unconditional loyalty, infusing radiant joy and deep protective warmth."
      }
    }
  },
  "ISTJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 11.6% (사회의 견고한 기둥)",
      "rarityEn": "Approx. 11.6% of population (Cornerstone of Society)",
      "rankKo": "인구 비율 전체 2위 (남성 기준 14.5%로 1위)",
      "rankEn": "2nd most common type (#1 among males at 14.5%)",
      "maleRatio": "남성 14.5%",
      "femaleRatio": "여성 8.7%",
      "koreaStatKo": "한국 인구 중 약 12.1%",
      "globalStatKo": "전 세계 약 11.6%"
    },
    "temperament": {
      "group": "SJ",
      "nameKo": "철벽의 원칙주의자 (The Steadfast Inspector)",
      "nameEn": "Guardians / Sentinels",
      "mottoKo": "원칙과 약속은 생명이며, 묵묵한 성실함이 최고의 가치다.",
      "mottoEn": "Duty and integrity are paramount; consistency builds true greatness.",
      "coreDriveKo": "질서와 안정 유지, 규칙과 의무의 완벽한 이행, 체계적인 팩트 검증",
      "coreDriveEn": "Institutional stability, dependable execution, and empirical reliability",
      "shadowSideKo": "변화에 대한 완고한 거부, 융통성 부족, 타인의 감정적 맥락 무시",
      "shadowSideEn": "Rigidity against change, dogmatic rule enforcement, and blunt skepticism"
    },
    "behaviorFacts": {
      "conflictReactionKo": "감정을 섞지 않고 사실 관계(Fact), 규칙, 약속 위반 내역을 차분하고 조목조목 나열하며 잘못을 입증합니다.",
      "conflictReactionEn": "Suppresses emotion to present chronological evidence, rules, and objective protocol breaches.",
      "rechargeRoutineKo": "할 일을 완벽히 끝마친 뒤, 티끌 하나 없이 정돈된 깨끗한 방에서 혼자 조용히 규칙적인 취미나 휴식을 즐길 때 힐링됩니다.",
      "rechargeRoutineEn": "Relaxing in an impeccably organized room with scheduled hobbies after every single chore is finished.",
      "petPeeveKo": "시간 약속 어기기, 무책임한 말 바꾸기, '대충 하자'는 안일함, 근거 없는 헛소문.",
      "petPeeveEn": "Chronic tardiness, careless flakiness, sloppiness, and unsubstantiated gossip.",
      "intimacyStages": {
        "stage1Ko": "깍듯하고 예의 바르며 감정 표현을 극도로 절제하는 FM 공직자 스타일.",
        "stage1En": "Strictly professional, polite, reserved, and respectful of boundaries.",
        "stage2Ko": "말보다는 묵묵한 행동으로 상대방의 필요를 꼼꼼하게 챙겨주며 신뢰를 증명함.",
        "stage2En": "Demonstrates quiet loyalty through dependable actions, practical help, and punctuality.",
        "stage3Ko": "상대가 위기에 처했을 때 아무 조건 없이 현실적 방패막이가 되어주는 평생의 든든한 아군.",
        "stage3En": "Unshakable rock of support, offering lifelong protection and quiet profound affection."
      }
    }
  },
  "ISFJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 13.8% (전 세계 최다 비율 1위 MBTI)",
      "rarityEn": "Approx. 13.8% of population (#1 Most Common Globally)",
      "rankKo": "인구 비율 전체 1위 (여성 16.7%로 1위, 남성 8.4%)",
      "rankEn": "#1 most common type worldwide (#1 in females: 16.7%)",
      "maleRatio": "남성 8.4%",
      "femaleRatio": "여성 16.7%",
      "koreaStatKo": "한국 인구 중 약 13.5%",
      "globalStatKo": "전 세계 약 13.8%"
    },
    "temperament": {
      "group": "SJ",
      "nameKo": "헌신적 수호자 (The Gentle Protector)",
      "nameEn": "Guardians / Sentinels",
      "mottoKo": "작은 배려가 모여 세상을 지탱하며, 소중한 사람을 지키는 것이 내 삶의 보람이다.",
      "mottoEn": "Quiet devotion holds the world together; caring for loved ones is sacred.",
      "coreDriveKo": "소중한 사람들에 대한 보살핌, 평화롭고 따뜻한 일상 보존, 헌신과 책임",
      "coreDriveEn": "Protecting loved ones, preserving warm domestic harmony, and quiet loyalty",
      "shadowSideKo": "거절 못 하고 혼자 끙끙 앓기, 변화에 대한 두려움, 감정 억압 후 폭발",
      "shadowSideEn": "Inability to say no, resentment from overextending, and anxiety towards upheaval"
    },
    "behaviorFacts": {
      "conflictReactionKo": "상처를 속으로 삼키고 삭이다가 도저히 감당할 수 없는 한계에 이르면 조용히 인연의 끈을 놓습니다. 거친 직설적 비난에 큰 충격을 받습니다.",
      "conflictReactionEn": "Endures conflict quietly, absorbing hurt until quietly withdrawing completely if mistreated.",
      "rechargeRoutineKo": "정갈하고 따뜻한 집밥을 해 먹거나, 아늑한 침구 속에서 좋아하는 드라마를 정주행하고 소소한 공예를 할 때 마음이 편안해집니다.",
      "rechargeRoutineEn": "Cozy comfort at home, preparing warm meals, sentimental shows, and quiet crafting.",
      "petPeeveKo": "호의를 권리로 아는 뻔뻔함, 무례하고 거친 말투, 배려를 무시하는 오만함.",
      "petPeeveEn": "Entitlement, callous abrasive speech, and taking quiet generosity for granted.",
      "intimacyStages": {
        "stage1Ko": "수줍지만 배려심 넘치며 부담스럽지 않게 상대를 세심하게 배려함.",
        "stage1En": "Gentle, self-effacing, observant, and exceptionally attentive to comfort.",
        "stage2Ko": "상대의 사소한 기호(알레르기, 좋아하는 음식, 기념일)를 전부 기억해 감동을 줌.",
        "stage2En": "Memorizes every personal preference, gifting thoughtful comfort with zero fanfare.",
        "stage3Ko": "억눌렀던 속마음과 눈물을 솔직하게 털어놓으며 끝없는 보살핌을 바치는 따뜻한 수호천사.",
        "stage3En": "Reveals vulnerable private feelings and becomes your sweetest, most devoted protector."
      }
    }
  },
  "ESTJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 8.7% (현실의 총괄 사령관)",
      "rarityEn": "Approx. 8.7% of global population",
      "rankKo": "인구 비율 전체 6위 (남성 11.2%, 여성 6.3%)",
      "rankEn": "6th most common type (Male 11.2%, Female 6.3%)",
      "maleRatio": "남성 11.2%",
      "femaleRatio": "여성 6.3%",
      "koreaStatKo": "한국 인구 중 약 9.2%",
      "globalStatKo": "전 세계 약 8.7%"
    },
    "temperament": {
      "group": "SJ",
      "nameKo": "단호한 집행관 (The Executive Director)",
      "nameEn": "Guardians / Sentinels",
      "mottoKo": "말보다는 결과로 증명하며, 규율과 질서가 성공의 지름길이다.",
      "mottoEn": "Prove it through results; discipline and accountability create triumph.",
      "coreDriveKo": "확실한 실적 달성, 체계적인 자원 관리, 사회적 규범과 질서의 수호",
      "coreDriveEn": "Tangible results, structured organization, and authoritative stewardship",
      "shadowSideKo": "독선과 융통성 결여, 상대방 감정 무시, 지나친 통제욕구",
      "shadowSideEn": "Authoritarian steamrolling, dismissal of subjective feelings, and micromanaging"
    },
    "behaviorFacts": {
      "conflictReactionKo": "단호하고 카리스마 넘치게 목소리를 높이며, 명확한 근거와 상식을 들어 문제의 잘못을 시정하고 즉시 바로잡으려 합니다.",
      "conflictReactionEn": "Addresses discord forcefully and transparently, laying out rules and demanding immediate correction.",
      "rechargeRoutineKo": "밀린 업무나 주변 공간을 깔끔하게 정리하고, 격렬한 운동으로 땀을 흘리거나 확실한 실적이 눈앞에 보일 때 개운해집니다.",
      "rechargeRoutineEn": "Productive workouts, clearing checklists, fixing practical household systems, and hitting goals.",
      "petPeeveKo": "게으름과 나태함, 무책임한 핑계, 지각, 감정에 호소하며 일을 미루는 태도.",
      "petPeeveEn": "Laziness, chronic excuses, unreliability, and crying over solvable practical tasks.",
      "intimacyStages": {
        "stage1Ko": "빈틈없이 똑 부러지며 공과 사를 엄격하게 구분하는 카리스마 넘치는 보스.",
        "stage1En": "Commanding, efficient, highly organized, and strictly compartmentalized.",
        "stage2Ko": "내 사람으로 인정하면 실질적인 경제적·물리적 지원과 해결책을 발 벗고 밀어줌.",
        "stage2En": "Offers heavy logistical support, career mentorship, and material backing.",
        "stage3Ko": "의외의 귀여운 허당기를 보여주며, 내 가족과 연인에게는 간 쓸개 다 빼주는 든든한 방패.",
        "stage3En": "Reveals unexpected warmth, playful humor, and ferocious loyalty to their inner circle."
      }
    }
  },
  "ESFJ": {
    "demographics": {
      "rarityKo": "전체 인구의 약 12.3% (사교 모임의 중심축)",
      "rarityEn": "Approx. 12.3% of global population",
      "rankKo": "인구 비율 전체 3위 (여성 기준 16.9%로 1위권)",
      "rankEn": "3rd most common type (Female 16.9%, Male 7.5%)",
      "maleRatio": "남성 7.5%",
      "femaleRatio": "여성 16.9%",
      "koreaStatKo": "한국 인구 중 약 12.5%",
      "globalStatKo": "전 세계 약 12.3%"
    },
    "temperament": {
      "group": "SJ",
      "nameKo": "조화로운 조율자 (The Warm Provider)",
      "nameEn": "Guardians / Sentinels",
      "mottoKo": "모두가 함께 웃을 수 있는 따뜻한 화합이야말로 세상에서 가장 소중하다.",
      "mottoEn": "Kindness is contagious; community harmony makes life joyful.",
      "coreDriveKo": "집단의 화합과 정서적 안정, 타인에 대한 실질적 환대와 케어, 사회적 소속감",
      "coreDriveEn": "Interpersonal harmony, generous hospitality, and practical emotional care",
      "shadowSideKo": "남의 시선에 과도하게 얽매임, 질투와 서운함 축적, 갈등에 대한 공포",
      "shadowSideEn": "Excessive fear of social disapproval, smothering meddling, and conflict avoidance"
    },
    "behaviorFacts": {
      "conflictReactionKo": "갈등 분위기 자체를 견디지 못하며 어떻게든 마음을 풀기 위해 애씁니다. 그러나 소외감을 느끼거나 배신당하면 깊은 서운함과 울분을 토로합니다.",
      "conflictReactionEn": "Desperately seeks to restore warmth; feels deeply shattered and resentful if excluded or unappreciated.",
      "rechargeRoutineKo": "좋아하는 사람들을 모아 맛있는 음식을 대접하고, 다 함께 수다를 떨며 서로를 챙겨줄 때 에너지가 샘솟습니다.",
      "rechargeRoutineEn": "Hosting joyful dinner parties, social gatherings, shopping with friends, and sharing laughter.",
      "petPeeveKo": "차갑게 선 긋기, 쌀쌀맞은 단답형 반응, 베푼 배려에 대해 고마움조차 표현하지 않는 무례함.",
      "petPeeveEn": "Cold dismissal, ungrateful aloofness, and deliberate refusal to participate in shared goodwill.",
      "intimacyStages": {
        "stage1Ko": "환한 미소와 폭풍 리액션으로 모임의 어색함을 단숨에 녹이는 분위기 메이커.",
        "stage1En": "Sparkling warmth, attentive hospitality, and instant conversational friendliness.",
        "stage2Ko": "상대방의 일상과 가족, 고민을 친언니/친오빠처럼 진심으로 염려하고 챙겨줌.",
        "stage2En": "Checks in constantly, offering home-cooked treats and sincere emotional reassurance.",
        "stage3Ko": "조건 없이 모든 마음을 쏟아붓고 어떤 슬픔도 함께 끌어안아 주는 세상에서 가장 다정한 안식처.",
        "stage3En": "Boundless loving devotion, creating a haven of safety and unwavering emotional shelter."
      }
    }
  },
  "ISTP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 5.4% (냉철한 만능 해결사)",
      "rarityEn": "Approx. 5.4% of global population",
      "rankKo": "희귀도 전체 10위 (남성 8.5%, 여성 2.4%)",
      "rankEn": "10th rarest overall (Male 8.5%, Female 2.4%)",
      "maleRatio": "남성 8.5%",
      "femaleRatio": "여성 2.4%",
      "koreaStatKo": "한국 인구 중 약 6.0%",
      "globalStatKo": "전 세계 약 5.4%"
    },
    "temperament": {
      "group": "SP",
      "nameKo": "실용적 장인 (The Virtuoso Craftsman)",
      "nameEn": "Artisans / Explorers",
      "mottoKo": "쓸데없는 말은 줄이고 손으로 증명한다. 세상의 모든 메커니즘은 분해할 수 있다.",
      "mottoEn": "Less talk, more action; every mechanism can be understood and mastered.",
      "coreDriveKo": "도구와 시스템의 마스터리, 실용적 문제 해결, 자유로운 개인적 자율성",
      "coreDriveEn": "Tactile problem-solving, mechanical mastery, and fierce independent autonomy",
      "shadowSideKo": "감정적 둔감함, 지나친 개인주의, 장기적인 헌신에 대한 거부감",
      "shadowSideEn": "Emotional aloofness, isolationist stubbornness, and resistance to commitment"
    },
    "behaviorFacts": {
      "conflictReactionKo": "쓸데없는 감정 소모를 질색하여 자리를 박차고 나가거나, 단 한마디의 날카로운 팩트로 논쟁을 강제 종료시킵니다.",
      "conflictReactionEn": "Detests emotional drama; either walks away immediately or terminates the debate with one blunt fact.",
      "rechargeRoutineKo": "오토바이, 드라이브, 게임, 장비 분해 및 조립, 짜릿한 익스트림 스포츠를 홀로 몰입할 때 피로가 싹 풀립니다.",
      "rechargeRoutineEn": "Solitary hands-on focus: tinkering with hardware, driving fast roads, gaming, or intense sports.",
      "petPeeveKo": "영양가 없는 잔소리와 참견, 감정적 강요, 사생활 침해, 빙빙 돌려 말하는 화법.",
      "petPeeveEn": "Nagging, emotional guilt-tripping, boundary intrusion, and beat-around-the-bush monologues.",
      "intimacyStages": {
        "stage1Ko": "과묵하고 무표정하며 오직 필요한 말만 툭툭 던지는 시크한 독고다이.",
        "stage1En": "Quiet, impassive, pragmatic, and observing from a calm neutral distance.",
        "stage2Ko": "귀찮아하면서도 상대방이 곤란할 때 고장 난 기계를 고쳐주거나 문제를 묵묵히 해결해 줌.",
        "stage2En": "Quietly fixes broken appliances, handles emergencies, and shows up when practical help is needed.",
        "stage3Ko": "츤데레의 정석: 겉으론 무심한 척 툴툴대면서도 내 사람의 모든 안전과 행복을 끝까지 지켜줌.",
        "stage3En": "The quintessential tsundere: secretly attentive, extraordinarily loyal, and fiercely protective."
      }
    }
  },
  "ISFP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 8.8% (따스한 감성의 예술가)",
      "rarityEn": "Approx. 8.8% of global population",
      "rankKo": "인구 비율 전체 5위 (여성 9.9%, 남성 7.6%)",
      "rankEn": "5th most common overall (Female 9.9%, Male 7.6%)",
      "maleRatio": "남성 7.6%",
      "femaleRatio": "여성 9.9%",
      "koreaStatKo": "한국 인구 중 약 9.1%",
      "globalStatKo": "전 세계 약 8.8%"
    },
    "temperament": {
      "group": "SP",
      "nameKo": "감성적 모험가 (The Sensitive Artist)",
      "nameEn": "Artisans / Explorers",
      "mottoKo": "나만의 속도로 오늘을 즐기며, 일상의 작은 순간에서 아름다움을 발견한다.",
      "mottoEn": "Live gently in the present; discover art in everyday quiet moments.",
      "coreDriveKo": "감각적 조화와 아름다움, 나만의 가치 존중, 평화롭고 자유로운 일상",
      "coreDriveEn": "Sensory beauty, authentic self-expression, and quiet non-judgmental peace",
      "shadowSideKo": "갈등 회피 후 잠수, 거절을 못 해 생기는 과부하, 미래 계획 부재",
      "shadowSideEn": "Conflict ghosting, passive avoidance, over-accommodation, and present-bias procrastination"
    },
    "behaviorFacts": {
      "conflictReactionKo": "다투는 것 자체가 극도의 스트레스라 일단 맞춰주거나 피합니다. 속으로 상처를 삼키며 조용히 마음의 거리를 두고 손절각을 잽니다.",
      "conflictReactionEn": "Hates fighting; passively accommodates or slips away, quietly detaching emotionally if disrespected.",
      "rechargeRoutineKo": "폭신한 침대에 누워 푹 쉬기, 은은한 향초와 음악 켜놓기, 반려동물과 뒹굴며 완전한 무압박의 자유를 만끽할 때 살아납니다.",
      "rechargeRoutineEn": "Basking in cozy bed rest, sensory aromatherapy, gentle music, and cuddling pets in absolute peace.",
      "petPeeveKo": "강요와 압박, 명령조의 말투, 나의 감각적 취향을 촌스럽다고 깎아내리는 태도.",
      "petPeeveEn": "Bossy demands, pressured deadlines, harsh criticism of their artistic taste, and forced socialising.",
      "intimacyStages": {
        "stage1Ko": "순하고 온화하며 남의 말에 잘 맞춰주는 부드러운 순둥이 모드.",
        "stage1En": "Gentle, obliging, quiet, and unobtrusive companion keeping calm vibes.",
        "stage2Ko": "편안해지면 엉뚱하고 독특한 예술적 감각과 귀여운 장난기를 조금씩 보여줌.",
        "stage2En": "Unveils delightful whimsy, exquisite sensory tastes, and silly lighthearted humor.",
        "stage3Ko": "세상 누구보다 진솔하고 순수한 마음으로 상대방 곁을 묵묵히 지켜주는 따스한 온기의 쉼터.",
        "stage3En": "Pure, unpretentious emotional sanctuary offering unwavering tenderness and gentle devotion."
      }
    }
  },
  "ESTP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 4.3% (승부사적 모험가)",
      "rarityEn": "Approx. 4.3% of global population",
      "rankKo": "희귀도 전체 9위 (남성 5.6%, 여성 3.0%)",
      "rankEn": "9th most common (Male 5.6%, Female 3.0%)",
      "maleRatio": "남성 5.6%",
      "femaleRatio": "여성 3.0%",
      "koreaStatKo": "한국 인구 중 약 4.8%",
      "globalStatKo": "전 세계 약 4.3%"
    },
    "temperament": {
      "group": "SP",
      "nameKo": "역동적 행동가 (The Daring Entrepreneur)",
      "nameEn": "Artisans / Explorers",
      "mottoKo": "일단 부딪쳐 보고 해결한다. 인생은 스릴 넘치는 승부의 연속이다.",
      "mottoEn": "Act first, adapt instantly; life is a thrilling arena meant to be won.",
      "coreDriveKo": "직접적인 경험과 행동, 순발력 있는 위기 돌파, 스릴과 즉각적 성과",
      "coreDriveEn": "Tactical agility, real-time sensory mastery, thrill, and competitive impact",
      "shadowSideKo": "충동적인 리스크 감수, 뒤끝은 없으나 생각 없이 내뱉는 직설적 말, 지루함 불내증",
      "shadowSideEn": "Reckless thrill-seeking, tactless bluntness, impatience with theory, and boredom"
    },
    "behaviorFacts": {
      "conflictReactionKo": "뒤끝 없이 바로바로 직설적으로 따지고 그 자리에서 담판을 짓습니다. 지난 일로 꽁해 있거나 삐져 있는 태도를 가장 답답해합니다.",
      "conflictReactionEn": "Confronts issues immediately and bluntly, clearing the air on the spot with zero lingering grudges.",
      "rechargeRoutineKo": "짜릿한 스포츠, 신나는 드라이브, 활기찬 술자리나 클럽, 승부욕을 자극하는 게임에서 온몸의 에너지를 쏟아낼 때 살아납니다.",
      "rechargeRoutineEn": "High-adrenaline sports, roaring road trips, vibrant night scenes, and competitive gaming.",
      "petPeeveKo": "돌려 말하기, 질질 끄는 설명, 고리타분한 설교, 과도하게 심각한 분위기 조성.",
      "petPeeveEn": "Passive-aggressive hints, tedious monologues, moralizing lectures, and joyless seriousness.",
      "intimacyStages": {
        "stage1Ko": "유쾌하고 거침없는 매력으로 첫 만남부터 분위기를 휘어잡는 핵인싸.",
        "stage1En": "Magnetic, audacious, energetic life of the party drawing everyone in.",
        "stage2Ko": "신뢰하는 친구에게는 위기 상황에서 가장 먼저 달려와 현실적 도움을 주고 모험을 함께함.",
        "stage2En": "Shares adrenaline adventures and shows up in an instant during real emergencies.",
        "stage3Ko": "내 사람에게 생긴 일이라면 물불 가리지 않고 앞장서서 지켜주는 가장 든든한 의리파 보디가드.",
        "stage3En": "Fierce, unapologetic protector who will fight anyone to defend their beloved people."
      }
    }
  },
  "ESFP": {
    "demographics": {
      "rarityKo": "전체 인구의 약 8.5% (스포트라이트의 주인공)",
      "rarityEn": "Approx. 8.5% of global population",
      "rankKo": "인구 비율 전체 7위 (여성 10.1%, 남성 6.9%)",
      "rankEn": "7th most common (Female 10.1%, Male 6.9%)",
      "maleRatio": "남성 6.9%",
      "femaleRatio": "여성 10.1%",
      "koreaStatKo": "한국 인구 중 약 8.7%",
      "globalStatKo": "전 세계 약 8.5%"
    },
    "temperament": {
      "group": "SP",
      "nameKo": "빛나는 엔터테이너 (The Radiant Performer)",
      "nameEn": "Artisans / Explorers",
      "mottoKo": "오늘 하루를 축제처럼 즐기자! 웃음과 에너지를 나누는 것이 최고의 기쁨이다.",
      "mottoEn": "Make today a celebration; sharing laughter and joy is the highest art.",
      "coreDriveKo": "순간의 즐거움과 생동감, 사람들과의 즐거운 에너지 교류, 스포트라이트와 매력 발산",
      "coreDriveEn": "Spontaneous celebration, vibrant shared joy, aesthetic flair, and spotlight presence",
      "shadowSideKo": "장기적 계획 소홀, 진지한 대화 회피, 비판에 대한 과도한 방어기제",
      "shadowSideEn": "Short-sighted impulsivity, avoidance of serious introspection, and sensitivity to disapproval"
    },
    "behaviorFacts": {
      "conflictReactionKo": "험악한 분위기 자체를 견디지 못하고 피하려 합니다. 화가 나면 감정을 즉시 터뜨리지만, 조금만 달래주면 금방 풀리고 뒤끝이 없습니다.",
      "conflictReactionEn": "Deeply hates tense vibes; expresses sudden emotional flares but calms down and forgives quickly.",
      "rechargeRoutineKo": "노래방, 맛집 투어, 쇼핑, 친구들과의 신나는 수다와 축제 분위기 속에서 살아있는 기쁨을 느낍니다.",
      "rechargeRoutineEn": "Karaoke marathons, food-hunting adventures, vibrant festivals, and laughing with best friends.",
      "petPeeveKo": "재미없는 분위기 깨기(갑분싸), 비관적인 징징거림, 무시하고 깎아내리는 태도.",
      "petPeeveEn": "Buzzkills, chronic Debbie Downers, pompous arrogance, and cold mockery.",
      "intimacyStages": {
        "stage1Ko": "눈부신 미소와 친화력으로 모두를 무장해제시키는 파티의 주인공.",
        "stage1En": "Irresistible bubbly charm, warm compliments, and infectious celebration.",
        "stage2Ko": "우울하거나 슬픈 친구 곁에서 온갖 맛있는 것과 유쾌함으로 기분을 북돋아 줌.",
        "stage2En": "Refuses to let you suffer alone, bringing treats, distractions, and comforting cheer.",
        "stage3Ko": "화려한 겉모습 뒤에 감춘 진솔한 외로움과 순정을 나누며 평생 웃음을 주는 사랑스러운 동반자.",
        "stage3En": "Pure tender vulnerability, unwavering emotional loyalty, and lifelong joyful sunshine."
      }
    }
  }
};
