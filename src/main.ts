import './style.css'
import { caseScenarios, initialProgress, learningSteps, levelUpCriteria } from './data'
import type { Clue, Language } from './data'

type Verdict = {
  correct: boolean
  message: string
  selected: string
}

const state = {
  language: 'english' as Language,
  selectedStepId: 1,
  selectedCaseId: caseScenarios.find((item) => item.step === 1)!.id,
  progress: { ...initialProgress },
  lastVerdict: null as Verdict | null,
  currentHintStage: 0
}

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root element not found')
}

app.innerHTML = `
  <div class="page">
    <header class="hero">
      <div class="hero-content">
        <p class="eyebrow">Lang's Mystery</p>
        <h1>Detective language learning from Lang's point of view</h1>
        <p class="hero-subtitle">Solve bilingual cases, collect XP, review vocab with SRS, and level up the narrative.</p>
        <div class="hero-actions">
          <div class="lang-toggle">
            <button class="pill-button" data-language="english">English focus</button>
            <button class="pill-button" data-language="japanese">Japanese focus</button>
          </div>
          <div class="hero-weather">
            <span>Language strategy:</span>
            <strong id="language-label">English focus</strong>
          </div>
        </div>
      </div>
      <div class="hero-meta">
        <p class="hero-meta-title">Lang's Desk Status</p>
        <ul>
          <li><strong>Goal:</strong> <span id="hero-goal">Loading…</span></li>
          <li><strong>Level-up criteria:</strong> ${levelUpCriteria}</li>
          <li><strong>Personalization:</strong> SRS intervals and XP adapt to accuracy and hint habits.</li>
        </ul>
        <p class="hero-note">Lang's log entries unlock as you prove consistent accuracy and restrained hint use.</p>
      </div>
    </header>

    <section class="stage-layout">
      <aside class="steps-panel" id="steps-panel"></aside>
      <article class="case-panel" id="case-panel"></article>
    </section>

    <section class="supporting-panels">
      <div class="progress-panel" id="progress-panel"></div>
      <div class="backend-panel" id="backend-panel"></div>
    </section>

    <section class="feedback-panel" id="feedback-panel"></section>

    <section class="flow-panel" id="flow-panel"></section>
  </div>
`

const getCurrentStep = () => learningSteps.find((step) => step.id === state.selectedStepId)!

const getSelectedCase = () => {
  const scenario = caseScenarios.find((item) => item.id === state.selectedCaseId)
  if (scenario) return scenario
  const fallback = caseScenarios.find((item) => item.step === state.selectedStepId)
  state.selectedCaseId = fallback?.id ?? caseScenarios[0].id
  return fallback ?? caseScenarios[0]
}

const formatClue = (clue: Clue) => {
  const primary = state.language === 'english' ? clue.text : clue.translation
  const secondary = state.language === 'english' ? clue.translation : clue.text
  return `
    <article class="clue-card">
      <p class="clue-primary">${primary}</p>
      <p class="clue-secondary">${secondary}</p>
      <p class="clue-meta">
        <span>${clue.difficulty}</span>
        <span>${clue.languageFocus.toUpperCase()} focus</span>
        <span>${clue.skills.join(', ')}</span>
      </p>
    </article>
  `
}

const renderSteps = () => {
  const panel = document.getElementById('steps-panel')
  if (!panel) return

  const stepsMarkup = learningSteps
    .map(
      (step) => `
        <article class="step-card ${step.id === state.selectedStepId ? 'active' : ''}" data-step-id="${step.id}">
          <header>
            <p class="step-number">Step ${step.id}</p>
            <h3>${step.title}</h3>
          </header>
          <p>${step.description}</p>
          <p class="step-goal">${step.goal}</p>
          <div class="step-meta">
            <span>${step.casesCount} planned cases</span>
            <span>XP threshold ${step.xpThreshold}</span>
            <span>Hint budget ${step.hintBudget}</span>
          </div>
          <p class="step-story">Story beat: ${step.storyBeat}</p>
          <div class="review-strategy">
            <p><strong>Clue review:</strong> ${step.review.clue}</p>
            <p><strong>Sentence review:</strong> ${step.review.sentence}</p>
            <p><strong>Vocabulary review:</strong> ${step.review.vocab}</p>
          </div>
          <p class="step-complexity">${step.complexity}${step.timedVariant ? ' • Timed challenge ready' : ''}</p>
        </article>
      `
    )
    .join('')

  panel.innerHTML = `
    <div class="panel-heading">
      <h2>Learning stages</h2>
      <p>Five steps raise difficulty, case count, learning goals, and mystery complexity.</p>
    </div>
    <div class="steps-grid">
      ${stepsMarkup}
    </div>
  `
}

const renderCasePanel = () => {
  const panel = document.getElementById('case-panel')
  if (!panel) return

  const scenario = getSelectedCase()
  const clueMarkup = scenario.clues.map(formatClue).join('')
  const dialogueMarkup = scenario.npcDialogue
    .map(
      (dialogue) => `
        <div class="dialogue-card">
          <p class="dialogue-speaker">${dialogue.speaker}</p>
          <p class="dialogue-line">${state.language === 'english' ? dialogue.line : dialogue.translation}</p>
          <p class="dialogue-translation">${state.language === 'english' ? dialogue.translation : dialogue.line}</p>
        </div>
      `
    )
    .join('')
  const choiceMarkup = scenario.choices
    .map(
      (choice, index) => `
        <button class="choice-button" data-choice-index="${index}">
          <span>${choice.label}</span>
          <small>${choice.detail}</small>
        </button>
      `
    )
    .join('')

  const verdictMarkup = state.lastVerdict
    ? `
      <div class="verdict ${state.lastVerdict.correct ? 'correct' : 'incorrect'}">
        <p>${state.lastVerdict.correct ? 'Correct deduction!' : 'Lang senses hesitation in that deduction.'}</p>
        <p>${state.lastVerdict.message}</p>
        <p><strong>Last answer:</strong> ${state.lastVerdict.selected}</p>
      </div>
    `
    : '<div class="verdict placeholder">Awaiting your deduction to unlock explanations.</div>'

  const hintMarkup =
    state.currentHintStage > 0
      ? `<p class="hint-line">Hint ${state.currentHintStage}: ${scenario.hintSequence[state.currentHintStage - 1]}</p>`
      : '<p class="hint-line muted">Hints reinforce learning, revealing translations and vocab nudges.</p>'

  const vocabMarkup = scenario.vocab
    .map(
      (entry) => `
        <div class="vocab-card">
          <p class="vocab-term">${entry.term} <span>(${entry.reviewInterval})</span></p>
          <p class="vocab-translation">${entry.translation}</p>
          <p class="vocab-context">${entry.context}</p>
        </div>
      `
    )
    .join('')

  panel.innerHTML = `
    <div class="case-header">
      <div>
        <p class="eyebrow">Step ${scenario.step} • ${scenario.difficulty}</p>
        <h2>${scenario.title}</h2>
        <p class="case-mystery">${scenario.mystery}</p>
      </div>
      <div class="case-meta">
        <p>${scenario.timer}s • ${scenario.timedVariant ? 'Timed challenge variant' : 'Flexible pace'}</p>
        <p>Investigation language: ${state.language === 'english' ? 'English scenes with Japanese notes' : 'Japanese scenes with English notes'}</p>
        <button class="tiny-button" id="hint-button">Request language hint</button>
      </div>
    </div>
    <div class="case-scene">
      <p>${scenario.scene}</p>
      <p class="case-structure">
        Case structure: scene → dialogue (target language + translation) → clues → multiple-choice deduction → hints ( text, vocab prompt, mini-translation ) → explanation with review toggles.
      </p>
    </div>
    <div class="case-panels">
      <section>
        <h3>Clues & dialogue</h3>
        <div class="clue-grid">
          ${clueMarkup}
        </div>
        <div class="dialogue-grid">
          ${dialogueMarkup}
        </div>
      </section>
      <section>
        <h3>Deduction workbook</h3>
        <div class="choice-list">
          ${choiceMarkup}
        </div>
        ${verdictMarkup}
        ${hintMarkup}
      </section>
    </div>
    <div class="case-bottom">
      <div class="srs-panel">
        <h4>Vocabulary & expression SRS review</h4>
        <div class="vocab-grid">
          ${vocabMarkup}
        </div>
      </div>
      <div class="case-list" id="case-list">
        <h4>Other cases this step</h4>
        ${caseScenarios
          .filter((item) => item.step === scenario.step)
          .map(
            (item) => `
              <button class="case-preset ${item.id === scenario.id ? 'active' : ''}" data-case-id="${item.id}">
                ${item.title} ${item.timedVariant ? '• Timed' : ''}
              </button>
            `
          )
          .join('')}
      </div>
      <div class="community-card">
        <h4>Optional community feed</h4>
        <p>Share Lang's case snapshot, XP, and vocabulary badges once he levels up.</p>
        <button class="tiny-button">Share completion snapshot</button>
      </div>
    </div>
  `
}

const renderProgressPanel = () => {
  const panel = document.getElementById('progress-panel')
  if (!panel) return

  const currentStep = getCurrentStep()
  const accuracy = state.progress.attempts
    ? Math.round((state.progress.correctAnswers / state.progress.attempts) * 100)
    : 0
  const xpPercent = Math.min(100, Math.round((state.progress.xp / currentStep.xpThreshold) * 100))
  panel.innerHTML = `
    <div class="progress-card">
      <h3>Progress & stats</h3>
      <p>XP: ${state.progress.xp}/${currentStep.xpThreshold} (${xpPercent}%)</p>
      <div class="xp-bar">
        <span style="width: ${xpPercent}%"></span>
      </div>
      <p>Accuracy: ${accuracy}% • Hint usage: ${state.progress.hintUsage} • Streak: ${state.progress.streak} • Level ${state.progress.level}</p>
      <p class="level-criteria">Level-up criteria reminder: ${levelUpCriteria}</p>
      <div class="srs-preview">
        <h4>Spaced repetition preview</h4>
        <ul>
          ${state.progress.srsQueue
            .map((entry) => `<li>${entry.term} — ${entry.translation} (${entry.reviewInterval})</li>`)
            .join('')}
        </ul>
      </div>
      <div class="faux-stats">
        <p><strong>Behavior logging</strong>: completion time, choice patterns, and hint hits feed analytics.</p>
        <p><strong>Personalized learning</strong>: XP and SRS adjust to accuracy and hint restraint.</p>
      </div>
    </div>
  `
}

const renderBackendPanel = () => {
  const panel = document.getElementById('backend-panel')
  if (!panel) return

  panel.innerHTML = `
    <div class="backend-card">
      <h3>Backend & AI strategy</h3>
      <p>Python service (FastAPI or Django) hosts AI-assisted case generation, progress ingestion, and analytics.</p>
      <ul>
        <li><strong>Endpoints</strong>: <code>/cases/step/{n}</code>, <code>/progress</code>, <code>/ai/generate-case</code>, <code>/feedback</code>.</li>
        <li><strong>AI integration</strong>: GPT-4/4o generates bilingual cases, dialogues, and vocab explanations while keeping Lang's narrator voice.</li>
        <li><strong>SRS + stats</strong>: Backend schedules next reviews, calculates XP math, caps hints, and logs completion time, choice patterns, and hint counts.</li>
        <li><strong>Persistence</strong>: Firebase/Supabase/PostgreSQL store progress, community posts, and AI prompts for auditability.</li>
      </ul>
      <p>React Native or Flutter mobile blueprint shares these contracts for consistent experiences.</p>
    </div>
  `
}

const renderFeedbackPanel = () => {
  const panel = document.getElementById('feedback-panel')
  if (!panel) return

  panel.innerHTML = `
    <div class="feedback-card">
      <h3>Feedback & testing</h3>
      <ul>
        <li>In-app surveys and a “Help Lang improve” button gather qualitative responses tied to hint usage.</li>
        <li>Instrumentation logs case completion time, choice patterns, hint counts, and accuracy.</li>
        <li>Small test groups (web first, mobile follow-up) practice interviews around immersion and vocab retention.</li>
        <li>Iterate MVP based on low accuracy cases, excessive hints, and SRS effectiveness.</li>
      </ul>
      <p>Testing scenarios:</p>
      <ol>
        <li>Step 2 case with ≤2 hints to confirm XP and accuracy trigger level-up.</li>
        <li>Intentional incorrect answer to verify the explanation and SRS queue update.</li>
        <li>Switch language mid-case to ensure dialogues, clues, and vocab notes refresh.</li>
      </ol>
    </div>
  `
}

const renderFlowPanel = () => {
  const panel = document.getElementById('flow-panel')
  if (!panel) return

  panel.innerHTML = `
    <div class="flow-card">
      <h3>User experience flow</h3>
      <ol>
        <li><strong>Landing (Lang's Desk)</strong>: language toggle, current case view, progress snapshot, community teasers.</li>
        <li><strong>Case Briefing</strong>: Lang narrates objectives, difficulty, and timer toggle.</li>
        <li><strong>Investigation Panel</strong>: bilingual clues, dialogues, hint button, SRS pill, and multiple-choice deck with live hint counter.</li>
        <li><strong>Verdict Summary</strong>: verification, XP reward, explanation, wrong-answer feedback, and review toggles for clues/sentences/vocab.</li>
        <li><strong>Stage Progress</strong>: XP bar, hint count, accuracy, streak, next cases, and optional share tracker.</li>
        <li><strong>Lang's log entries</strong>: unlock narrative beats and optional community badges as Lang levels up.</li>
      </ol>
      <p>Timed challenges, translator notes, and community share options keep the detective story immersive.</p>
    </div>
  `
}

const highlightLanguageState = () => {
  const label = document.getElementById('language-label')
  const heroGoal = document.getElementById('hero-goal')
  if (label) {
    label.textContent = state.language === 'english' ? 'English focus' : 'Japanese focus'
  }
  if (heroGoal) {
    heroGoal.textContent = getCurrentStep().goal
  }
  const buttons = document.querySelectorAll<HTMLButtonElement>('.lang-toggle button')
  buttons.forEach((button) => {
    button.classList.toggle('active-pill', button.dataset.language === state.language)
  })
}

const renderAll = () => {
  renderSteps()
  renderCasePanel()
  renderProgressPanel()
  renderBackendPanel()
  renderFeedbackPanel()
  renderFlowPanel()
  highlightLanguageState()
}

const applyChoice = (choiceIndex: number) => {
  const scenario = getSelectedCase()
  state.progress.attempts += 1
  const correct = choiceIndex === scenario.correct
  if (correct) {
    state.progress.correctAnswers += 1
    state.progress.xp += 60
    state.progress.streak += 1
  } else {
    state.progress.streak = 0
    state.progress.xp += 10
  }
  state.lastVerdict = {
    correct,
    message: scenario.explanation,
    selected: scenario.choices[choiceIndex].label
  }
  state.progress.srsQueue = scenario.vocab.slice(0, 2)
  renderAll()
}

const incrementHint = () => {
  const scenario = getSelectedCase()
  if (state.currentHintStage < scenario.hintSequence.length) {
    state.currentHintStage += 1
    state.progress.hintUsage += 1
    state.progress.xp += 5
  }
  renderAll()
}

document.body.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  if (target.closest('.step-card')) {
    const stepCard = target.closest('.step-card')
    const stepId = stepCard?.getAttribute('data-step-id')
    if (stepId) {
      state.selectedStepId = Number(stepId)
      const newCase = caseScenarios.find((item) => item.step === state.selectedStepId)
      state.selectedCaseId = newCase?.id ?? state.selectedCaseId
      state.currentHintStage = 0
      renderAll()
    }
  }

  if (target.matches('[data-language]')) {
    state.language = (target.getAttribute('data-language') ?? 'english') as Language
    renderAll()
  }

  if (target.matches('[data-choice-index]')) {
    const index = Number(target.getAttribute('data-choice-index'))
    applyChoice(index)
  }

  if (target.closest('#hint-button')) {
    incrementHint()
  }

  if (target.matches('[data-case-id]')) {
    const caseId = target.getAttribute('data-case-id')
    if (caseId) {
      state.selectedCaseId = caseId
      state.currentHintStage = 0
      renderAll()
    }
  }
})

renderAll()
