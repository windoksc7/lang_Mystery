# LangMystery

LangMystery is a TypeScript + Vite detective-style language learning MVP.
It presents bilingual (English/Japanese) mystery cases, step-based progression, hints, and lightweight SRS vocabulary review from Lang's perspective.

## Features

- Five learning steps with increasing difficulty and story beats
- Case-based investigation flow (scene, dialogue, clues, deduction choices)
- Language focus toggle: English or Japanese
- Hint sequence and verdict feedback for each case
- XP, accuracy, streak, and simple progress tracking
- Vocabulary cards with spaced-repetition review intervals

## Tech Stack

- TypeScript
- Vite
- Vanilla HTML/CSS (rendered from `src/main.ts`)

## Project Structure

- `src/main.ts`: UI rendering, state management, interactions
- `src/data.ts`: learning steps, cases, clues, vocab, initial progress
- `src/style.css`: styling
- `PLAN.md`: MVP roadmap and product direction

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Notes

- Current data is static and stored in `src/data.ts`.
- Backend/API integration is documented in `PLAN.md` and represented in the UI as strategy content.
