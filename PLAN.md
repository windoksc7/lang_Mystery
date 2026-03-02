**Lang’s Mystery MVP Plan**

**Summary**  
Deliver a React/Vite web entry point plus a paired cross-platform blueprint (React Native/Flutter) that stages a five-step immersive detective story from Lang’s perspective, surfaces English/Japanese clues, and tracks learning progress while wiring in AI-assisted case generation and analytics.

**Development Stages**

1. **Foundation & Architecture**
   - Initialize the React/Vite project (`LangsMystery-Web`) and a companion mobile scaffold (`LangsMystery-Mobile`) with shared case/clue data contracts (JSON schema for steps, cases, clues, vocab).
   - Define data models: `LearningStep` (difficulty, XP thresholds, hint budget), `Case` (title, mystery beats, language target, clues, dialogues, choices, correct answer, explanation), `Progress` (XP, hint usage, correct rate, SRS history).
   - Set up backend plan (Python FastAPI or Django) with endpoints for case retrieval, AI generation requests, stats ingestion, and user progress export; connect to Firebase/Supabase/Postgres for persistence.
   - Document language strategy: English and Japanese datasets with tagged sentences (`targetLanguage`, `translation`, `vocabNotes`) so UI can switch contextually.

2. **Learning Stage Design**
   - Outline five steps (1–5) with increasing cases (3–5 per step), complexity, and learning goals (e.g., Step 1 = greetings/basic vocabulary; Step 5 = complex deductions).
   - Specify level-up criteria per step: ≥80% correct answer rate, ≤2 hints per case, XP from deductions.
   - Define review strategy per step: clue review (list of clues with translation), sentence review (example dialogue + breakdown), vocabulary review (SRS queue with spaced intervals).
   - Link step advancement to Lang’s story beats (e.g., Step 1 = “Lang’s first desk assignment,” Step 5 = “Breaking the ring’s cipher”), reinforcing progression.

3. **Case & Clue Structure**
   - Design case template: scene setup, NPC dialogue (target language), clue artifacts, translation toggle, multiple-choice deductions (4 options), verification logic, hint hierarchy (text hint → vocabulary prompt → mini-translation).
   - Each clue carries metadata (`difficulty`, `languageFocus`, `skills`), ties into SRS (e.g., failing to answer adds related vocab to spaced queue).
   - Implement explanations for expressions and vocab, surfaced after answer submission regardless of correctness, emphasizing reinforcement.
   - Prepare initial content pack: 15–25 cases covering both languages, created manually with AI-assisted drafts, with at least one “timed challenge” variant per step.

4. **User Experience Flow & Screens**
   - Flow stages:
     1. **Landing (Lang’s Desk)**: choose language (English/Japanese), see “current case,” “progress stats,” “community updates.”
     2. **Case Briefing**: narrative intro from Lang, key objectives, difficulty, timer toggle.
     3. **Investigation Panel**: scrollable clues + dialogue, language toggle, hint button, SRS vocab pill, choice buttons with live hint usage counter.
     4. **Verdict Summary**: show chosen answer vs correct, XP gained, explanation, incorrect feedback, “review this clue/sentence/vocab” toggles.
     5. **Stage Progress/Statistics**: XP bar, hint count, accuracy, streak, next available cases, option to share completion snapshot with optional community feed.
   - Visual strategy: simple, bold layout with hero gradient (night-city detective), clear typography (custom serif for narrative, sans for UI), choice-driven cards.
   - Include timed challenge widget (countdown) and immersive story journaling (Lang’s log entries unlocking on level up).
   - Plan optional community tab: share case reflections, see other learners’ XP, export achievement badge.

5. **Backend & AI Integration**
   - FastAPI/Django endpoints: `/cases/step/{n}`, `/progress`, `/ai/generate-case`, `/feedback`.
   - AI workbench: use OpenAI (GPT-4/4o) to generate case prompts, translate dialogue, and explain vocab; include guardrails for consistent tone (Lang’s narrator voice).
   - Backend handles SRS scheduling (calculate next review timestamp), XP math, hint usage caps, and stores analytics (completion time, hint hits, choice patterns).
   - Sync with Firebase/Supabase for realtime progress (useful for mobile) and store optional community posts.

6. **Feedback & Testing Strategy**
   - Collect feedback via in-app survey (one-tap after each case) and dedicated “Help Lang improve” button tied to hint usage.
   - Instrument analytics: log case completion time, choice patterns, hint counts, accuracy.
   - Run two small test groups (web first, mobile later) with qualitative interviews focused on clarity of clues, immersion, and vocabulary retention.
   - Iterate MVP based on: low accuracy cases (reword clues), excessive hints (tweak level thresholds), SRS queue performance (adjust intervals).
   - Testing scenarios:
     - Walk through Step 2 case, use ≤2 hints, confirm level-up triggers when XP threshold met.
     - Fail answer, verify explanation and SRS addition appear.
     - Switch language mid-case, confirm dialogue translations and vocab notes update.

**Assumptions & Defaults**

- MVP targets the web experience first; mobile/React Native prototype shares data contracts but ships post-web baseline.
- English/Japanese are the only languages for now, with UI toggles for the highlighted language per case.
- Community features remain optional & a visual placeholder until behavioral data justifies deeper investment.
- AI-generated cases are reviewed/curated before release to maintain narrative consistency.
