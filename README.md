# MindOS

MindOS is an AI productivity app — planner, tasks, goals, notes, vault, assistant, and focus mode in one place.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS v4, Firebase (client stubbed), Lucide icons.

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in Firebase keys when you wire auth
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll land on login; dashboard lives under `/dashboard/*`.

For folder layout, tokens, and where to plug auth later, see [GUIDE.md](GUIDE.md).
