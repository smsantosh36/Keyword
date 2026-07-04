# KeywordRadar — Next.js Version

Ek hi Next.js app mein backend (API route) + frontend (React), koi separate server nahi chahiye.

## Sabse Aasan Tareeka (3 commands)
1. Is zip ko extract karein
2. Terminal/CMD mein extracted folder ke andar jaayein
3. Ye 2 commands chalayein:
   ```bash
   npm install
   npm run dev
   ```
4. Browser mein kholein: **http://localhost:3000**

Bas. Node.js (v18+) pehle se installed hona chahiye — [nodejs.org](https://nodejs.org) se le sakte hain.

## Folder Structure
```
keyword-tool-next/
├── app/
│   ├── api/
│   │   └── suggestions/
│   │       └── route.js     # Backend logic (GET /api/suggestions)
│   ├── layout.jsx
│   ├── page.jsx              # Frontend UI
│   └── globals.css
├── package.json
└── next.config.js
```

## Setup & Run
```bash
npm install
npm run dev
```
Browser mein kholein: `http://localhost:3000`

Production build:
```bash
npm run build
npm start
```

## Kaise Kaam Karta Hai
1. `app/page.jsx` — client-side React UI, user seed keyword type karta hai
2. Frontend `fetch("/api/suggestions?keyword=...")` call karta hai — same-origin hone ki wajah se koi CORS setup nahi chahiye
3. `app/api/suggestions/route.js` — Route Handler jo:
   - Google Suggest API se direct autocomplete suggestions leta hai
   - Keyword ko questions/prepositions/modifiers/a-z ke saath combine karke extra queries fetch karta hai
   - Har result ke liye estimated volume/difficulty/CPC calculate karta hai (heuristic, real data nahi)
4. UI table mein sortable results dikhata hai + CSV export

## Deploy
Vercel par ek-click deploy ho sakta hai (Next.js Vercel ka apna framework hai) — bas repo import karke deploy button dabayein. Kisi alag backend hosting ki zaroorat nahi, API route automatically serverless function ban jaata hai.

## Real Search Volume Chahiye?
`app/api/suggestions/route.js` mein `estimateMetrics()` function replace karke Google Ads Keyword Planner / SEMrush / Ahrefs / Ubersuggest jaisi API integrate kar sakte hain — apni API key aur response-parsing logic daal dein, baaki structure wahi rahega.
