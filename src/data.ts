
export type Language = 'english' | 'japanese'

export interface ReviewStrategy {
  clue: string
  sentence: string
  vocab: string
}

export interface LearningStep {
  id: number
  title: string
  description: string
  goal: string
  xpThreshold: number
  hintBudget: number
  casesCount: number
  complexity: string
  storyBeat: string
  review: ReviewStrategy
  timedVariant: boolean
}

export interface Clue {
  text: string
  translation: string
  difficulty: 'easy' | 'medium' | 'hard'
  languageFocus: Language
  skills: string[]
}

export interface Dialogue {
  speaker: string
  line: string
  translation: string
}

export interface Vocabulary {
  term: string
  translation: string
  context: string
  reviewInterval: string
}

export interface CaseScenario {
  id: string
  step: number
  title: string
  scene: string
  mystery: string
  difficulty: 'Introductory' | 'Intermediate' | 'Advanced'
  timer: number
  language: Language
  npcDialogue: Dialogue[]
  clues: Clue[]
  choices: { label: string; detail: string }[]
  correct: number
  explanation: string
  hintSequence: string[]
  vocab: Vocabulary[]
  timedVariant: boolean
}

export interface Progress {
  xp: number
  level: number
  hintUsage: number
  correctAnswers: number
  attempts: number
  streak: number
  srsQueue: Vocabulary[]
}

export const learningSteps: LearningStep[] = [
  {
    id: 1,
    title: "Lang's Desk Starter",
    description: 'Lang starts as a rookie handling simple theft reports and greetings.',
    goal: 'Spot basic who/what/when clues and reinforce greeting words.',
    xpThreshold: 200,
    hintBudget: 2,
    casesCount: 3,
    complexity: 'Introductory: short mysteries with clear vocabulary focus.',
    storyBeat: "Lang's first desk assignment involves a courier note.",
    review: {
      clue: 'List the suspects, times, and objects in the clues.',
      sentence: 'Rephrase the opening dialogue with verb markers.',
      vocab: 'Capture scheduling terms and greetings in SRS.'
    },
    timedVariant: false
  },
  {
    id: 2,
    title: 'City Lights Surveillance',
    description: 'Lang follows alley whispers to gather mid-level adjectives.',
    goal: 'Parse descriptive adjectives and Japanese directives from witnesses.',
    xpThreshold: 450,
    hintBudget: 2,
    casesCount: 4,
    complexity: 'Intermediate: multi-location scenes with timed cues.',
    storyBeat: 'Lang shadows a private guard on the evening shift.',
    review: {
      clue: 'Compare clues that mention coordinating lights or angles.',
      sentence: 'Break down Japanese directives and matching English echoes.',
      vocab: 'Add spatial adjectives and imperative verbs to SRS.'
    },
    timedVariant: true
  },
  {
    id: 3,
    title: 'Neon Code Drift',
    description: 'Lang decodes neon graffiti and slang from a street artist.',
    goal: 'Understand idioms, conditions, and polite commands.',
    xpThreshold: 700,
    hintBudget: 3,
    casesCount: 5,
    complexity: 'Advanced intermediate: layered slang and conditional phrases.',
    storyBeat: 'Lang interrogates a street artist whose graffiti hides the code.',
    review: {
      clue: 'Match graffiti metaphors with the slang in dialogue.',
      sentence: 'Highlight polite conditionals and connective phrases.',
      vocab: 'Idioms enter SRS with higher spacing intervals.'
    },
    timedVariant: true
  },
  {
    id: 4,
    title: 'Harbor Cipher Shift',
    description: 'Lang analyzes logistics and honorific dispatch notes.',
    goal: 'Navigate complex sentence structures, counters, and honorific shifts.',
    xpThreshold: 950,
    hintBudget: 3,
    casesCount: 5,
    complexity: 'Advanced: multiple suspects with timed deductions.',
    storyBeat: 'Lang races to intercept a coded shipment before dawn.',
    review: {
      clue: 'Differentiate clues about manifests versus conversations.',
      sentence: 'Extract trigger words that prompt immediate action.',
      vocab: 'Logistics and business phrases earn extended SRS intervals.'
    },
    timedVariant: true
  },
  {
    id: 5,
    title: "Lang's Cipher Ring",
    description: 'Lang faces the final cipher ring with dense dialogue.',
    goal: 'Synthesize cross-language metaphors, long-form narrative, and inference.',
    xpThreshold: 1250,
    hintBudget: 4,
    casesCount: 5,
    complexity: 'Expert: branching mysteries and high inference demand.',
    storyBeat: "Lang is on the brink of cracking the ring's final cipher.",
    review: {
      clue: 'Sequence how final clues point to one suspect.',
      sentence: 'Translate metaphor-rich sentences and connective phrases.',
      vocab: 'Complex metaphors and verbs land in weekly SRS reviews.'
    },
    timedVariant: true
  }
]

export const caseScenarios: CaseScenario[] = [
  {
    id: 'S1-1',
    step: 1,
    title: 'Midnight Courier',
    scene: 'A courier slips into the neon alley with a coded receipt.',
    mystery: 'Which contact meets at 21:00?',
    difficulty: 'Introductory',
    timer: 120,
    language: 'english',
    npcDialogue: [
      {
        speaker: 'Courier',
        line: 'The rendezvous is at starlit nine; do not miss the hour.',
        translation: '約束は9時。時間を間違えないように。'
      },
      {
        speaker: 'Lang (internal)',
        line: 'I cross-check the schedule in Japanese so my notes stay sharp.',
        translation: '日本語でスケジュールを照合しておけば、記録が整う。'
      }
    ],
    clues: [
      {
        text: 'Receipt stamped "21:00" from Azul Night café.',
        translation: 'Azul Nightの領収書に21:00と押印あり。',
        difficulty: 'easy',
        languageFocus: 'english',
        skills: ['time expressions', 'detail spotting']
      },
      {
        text: 'Menu highlights sango latte and leaning tower view.',
        translation: 'メニューにはsango latteと傾いた塔の眺め。',
        difficulty: 'easy',
        languageFocus: 'english',
        skills: ['nouns']
      },
      {
        text: 'Gossip mentions an art dealer meeting strictly at 9pm.',
        translation: '噂では画商が9時にしか会わないと言っている。',
        difficulty: 'medium',
        languageFocus: 'japanese',
        skills: ['context inference']
      }
    ],
    choices: [
      {
        label: 'The courier meets the art dealer at the pier gallery.',
        detail: 'The art dealer keeps 21:00 appointments matching the receipt.'
      },
      {
        label: 'The courier is tricked into meeting the bar owner.',
        detail: 'The bar owner runs much later than 21:00.'
      },
      {
        label: 'The courier drops the note to the courier chief.',
        detail: 'No evidence places the chief downtown at that hour.'
      },
      {
        label: 'The courier is visiting the museum before midnight.',
        detail: 'The museum closes earlier and does not align with 21:00.'
      }
    ],
    correct: 0,
    explanation: 'Receipt, menu, and gossip all point to the art dealer meeting at 21:00.',
    hintSequence: [
      'Revisit the receipt timestamp and the matching meeting spot.',
      'Compare the Japanese gossip about the art dealer’s strict hours.',
      'Which option ties both the time and place together?'
    ],
    vocab: [
      {
        term: 'rendezvous',
        translation: '待ち合わせ',
        context: 'Used by the courier to specify the meeting time.',
        reviewInterval: '1 day'
      },
      {
        term: 'gallery',
        translation: '画廊',
        context: 'The art dealer’s pier gallery.',
        reviewInterval: '3 days'
      }
    ],
    timedVariant: false
  },
  {
    id: 'S2-1',
    step: 2,
    title: 'Crosswalk Whisper',
    scene: 'A conductor hints at a secret drop near the plaza fountain.',
    mystery: 'Which vendor is the false informant shielding?',
    difficulty: 'Intermediate',
    timer: 150,
    language: 'japanese',
    npcDialogue: [
      {
        speaker: 'Conductor',
        line: 'Raise your hand by the canal and only whisper the rumor.',
        translation: '運河のそばで手を挙げて、噂だけこそっと伝えて。'
      },
      {
        speaker: 'Lang (internal)',
        line: 'I note the defensive tone and protectiveness.',
        translation: '防御的な語調と守りの姿勢を記録しておこう。'
      }
    ],
    clues: [
      {
        text: 'Fountain vendor menu lists sakura syrup and cold stares.',
        translation: '噴水の屋台には桜シロップと冷たい視線が書かれている。',
        difficulty: 'medium',
        languageFocus: 'japanese',
        skills: ['adjective parsing']
      },
      {
        text: 'A passerby says the conductor shields dusk vendors.',
        translation: '通行人が夕暮れに働く屋台だけ守ると言った。',
        difficulty: 'easy',
        languageFocus: 'english',
        skills: ['temporal phrases']
      },
      {
        text: 'Notebook highlights motion words guard and protect.',
        translation: 'ノートには「守る」「護衛する」がマーカーされている。',
        difficulty: 'hard',
        languageFocus: 'japanese',
        skills: ['verb recognition']
      }
    ],
    choices: [
      {
        label: 'He protects the fountain vendor with sakura syrup.',
        detail: 'Motion words align with a vendor cooking at dusk needing protection.'
      },
      {
        label: 'He defends the injured performer on the bridge.',
        detail: 'No clues mention a performer; focus stays on vendors.'
      },
      {
        label: 'He meets the courier near the museum vault.',
        detail: 'Notebook verbs point to cooking vendors, not vaults.'
      },
      {
        label: 'He is the false informant covering the bar owner.',
        detail: 'No direct bar link, only the plaza fountain area.'
      }
    ],
    correct: 0,
    explanation: 'Sakura syrup vendor matches the dusk words and protective tone.',
    hintSequence: [
      'Focus on motion verbs highlighted in the notebook.',
      'Which vendor is described with sakura syrup and dismissal glances?',
      'The conductor shields vendors cooking near water at dusk.'
    ],
    vocab: [
      {
        term: '護衛',
        translation: 'protection',
        context: 'Shows what the conductor does for vendors.',
        reviewInterval: '1 day'
      },
      {
        term: '噂',
        translation: 'rumor',
        context: 'Mentioned by the conductor when sharing gossip.',
        reviewInterval: '2 days'
      }
    ],
    timedVariant: true
  },
  {
    id: 'S3-1',
    step: 3,
    title: 'Neon Code Drift',
    scene: 'Graffiti references slanted skyline codes and neon beats.',
    mystery: 'Which group hides the signal for the next contact?',
    difficulty: 'Intermediate',
    timer: 180,
    language: 'english',
    npcDialogue: [
      {
        speaker: 'Street Artist',
        line: 'My code is a beat, not a sentence; feel the rhythm before translating.',
        translation: 'このコードは文ではなくビート。翻訳より前にリズムを感じて。'
      },
      {
        speaker: 'Lang (internal)',
        line: 'I record conditionals respectfully to trace the tone.',
        translation: '丁寧な条件形を記録して、語調を追おう。'
      }
    ],
    clues: [
      {
        text: 'Mural mentions shake then still and halved neon beats.',
        translation: '壁画には「揺れて静止」「半分のネオンビート」が書かれている。',
        difficulty: 'medium',
        languageFocus: 'english',
        skills: ['idiomatic reading']
      },
      {
        text: 'Speakers repeat if the skyline leans, follow the drift.',
        translation: 'スピーカーは「空が傾いたらドリフトを追え」と繰り返す。',
        difficulty: 'hard',
        languageFocus: 'japanese',
        skills: ['conditional inference']
      },
      {
        text: 'Tag includes calibrate and honorific -sama.',
        translation: 'タグにはcalibrateと敬称-samaが混ざっている。',
        difficulty: 'hard',
        languageFocus: 'english',
        skills: ['honorific recognition']
      }
    ],
    choices: [
      {
        label: 'The Halved Neon Syndicate sends the signal when the skyline leans.',
        detail: 'Mural and speakers both reference leaning skyline drift.'
      },
      {
        label: 'The Midnight Splinter group uses museum stairs.',
        detail: 'No clues immediately reference museum staircases.'
      },
      {
        label: 'A courier crew hides in the subway tunnels.',
        detail: 'Speakers keep pointing to skyline drift, not tunnels.'
      },
      {
        label: 'The Harbor Bloom collective uses the lighthouse.',
        detail: 'Clues mention skyline drift, not harbor lights.'
      }
    ],
    correct: 0,
    explanation: 'Leaning skyline, neon beats, and honorific hints match the Halved Neon Syndicate.',
    hintSequence: [
      'Match the leaning skyline mention with the syndicate name.',
      'Honorifics and conditionals reinforce a coordinated crew.',
      'Which option keeps the neon drift imagery?'
    ],
    vocab: [
      {
        term: 'drift',
        translation: '流れ',
        context: 'Describes the skyline code movement.',
        reviewInterval: '2 days'
      },
      {
        term: 'calibrate',
        translation: '調整する',
        context: 'Appears in the graffiti tag.',
        reviewInterval: '3 days'
      }
    ],
    timedVariant: false
  },
  {
    id: 'S4-1',
    step: 4,
    title: 'Harbor Cipher Shift',
    scene: 'Manifests and dispatch notes hide a cipher shipment.',
    mystery: 'Which shipment carries the cipher ring?',
    difficulty: 'Advanced',
    timer: 200,
    language: 'japanese',
    npcDialogue: [
      {
        speaker: 'Dock Foreman',
        line: 'This cargo has no honorifics, so we must guard it ourselves.',
        translation: 'この貨物には敬称がない。だから我々が守る。'
      },
      {
        speaker: 'Lang (internal)',
        line: 'I log honorific shifts to compare with the manifest.',
        translation: '敬称の変化を記録してマニフェストと照らし合わせる。'
      }
    ],
    clues: [
      {
        text: 'Manifest mentions reserve cargo and silent crew.',
        translation: 'マニフェストにはreserve cargoとsilent crewとある。',
        difficulty: 'hard',
        languageFocus: 'japanese',
        skills: ['logistics jargon']
      },
      {
        text: 'Dispatch note lacking honorifics contrasts with polite letters.',
        translation: '敬称なしの通知と丁寧な手紙が対比されている。',
        difficulty: 'hard',
        languageFocus: 'english',
        skills: ['contrast spotting']
      },
      {
        text: 'Security chatter references second stack and low tide.',
        translation: '警備がsecond stackとlow tideを交信している。',
        difficulty: 'medium',
        languageFocus: 'english',
        skills: ['numeric cues']
      }
    ],
    choices: [
      {
        label: 'The reserve cargo delivered at low tide holds the ring.',
        detail: 'Secrecy cues align with low tide reserve cargo.'
      },
      {
        label: 'A polite export through the main crane is the carrier.',
        detail: 'Politeness seems to point elsewhere; the cipher needs secrecy.'
      },
      {
        label: 'A courier moving through the museum docks carries it.',
        detail: 'Manifest clues avoid museum references.'
      },
      {
        label: 'The barge captain keeps it during midnight jazz.',
        detail: 'No midnight jazz in the logistics notes.'
      }
    ],
    correct: 0,
    explanation: 'Secluded reserve cargo under low tide matches the cipher shipment hints.',
    hintSequence: [
      'Look for low tide and second stack clues.',
      'Notice how honorifics vanish in dispatch notes.',
      'Which option connects the secrecy cues?'
    ],
    vocab: [
      {
        term: 'low tide',
        translation: '干潮',
        context: 'Security chatter mentions the cipher arriving at low tide.',
        reviewInterval: '3 days'
      },
      {
        term: 'stack',
        translation: '積み',
        context: 'Manifest references the second stack of containers.',
        reviewInterval: '4 days'
      }
    ],
    timedVariant: true
  },
  {
    id: 'S5-1',
    step: 5,
    title: 'Cipher Ring Dawn',
    scene: 'Lantern notes bloom with metaphors before the final showdown.',
    mystery: 'Which procession note reveals the cipher ring location?',
    difficulty: 'Advanced',
    timer: 220,
    language: 'english',
    npcDialogue: [
      {
        speaker: 'Mystery Patron',
        line: 'The rose never blooms without dusk; follow the lantern procession.',
        translation: 'バラは黄昏なしでは咲かない。提灯行列を追いなさい。'
      },
      {
        speaker: 'Lang (internal)',
        line: 'I map the procession notes to Japanese metaphors.',
        translation: '行列メモを日本語の比喩に当てはめていく。'
      }
    ],
    clues: [
      {
        text: 'Lantern notes cite rose, crown, and dawn hush.',
        translation: '提灯のメモはrose, crown, dawn hushを含む。',
        difficulty: 'hard',
        languageFocus: 'english',
        skills: ['metaphor parsing']
      },
      {
        text: 'Procession orders combine long stride with sakura ash.',
        translation: '行列指示にはlong strideとsakura ashがある。',
        difficulty: 'hard',
        languageFocus: 'japanese',
        skills: ['poetic imagery']
      },
      {
        text: 'Hidden note instructs circle the crown three times.',
        translation: '隠されたメモには「王冠を三度巡る」とある。',
        difficulty: 'medium',
        languageFocus: 'english',
        skills: ['sequence spotting']
      }
    ],
    choices: [
      {
        label: 'The crown-bearing procession at dawn carries the ring.',
        detail: 'Metaphors of crown, rose, and dawn hush match the procession.'
      },
      {
        label: 'The warehouse band with ashes holds it.',
        detail: 'Clues emphasize lantern procession, not warehouse bands.'
      },
      {
        label: 'The museum night shift keeps the ring in a vault.',
        detail: 'Metaphors point to lantern procession, not vaults.'
      },
      {
        label: 'The harbor festival with fireworks is the cover.',
        detail: 'No fireworks or harbor signals are mentioned.'
      }
    ],
    correct: 0,
    explanation: 'Crown circles at dawn match the cipher ring procession hints.',
    hintSequence: [
      'Trace the metaphor chain: rose, crown, dawn hush.',
      'Sequence the instruction to circle the crown three times.',
      'Which option keeps the poetic procession intact?'
    ],
    vocab: [
      {
        term: 'metaphor',
        translation: '比喩',
        context: 'Lantern notes overflow with metaphor.',
        reviewInterval: '3 days'
      },
      {
        term: 'procession',
        translation: '行列',
        context: 'Lang follows the procession notes.',
        reviewInterval: '2 days'
      }
    ],
    timedVariant: true
  }
]

export const levelUpCriteria = '≥80% accuracy, ≤2 hints per case, XP from successful deductions'

export const initialProgress: Progress = {
  xp: 180,
  level: 1,
  hintUsage: 0,
  correctAnswers: 0,
  attempts: 0,
  streak: 0,
  srsQueue: caseScenarios[0].vocab.slice(0, 2)
}
