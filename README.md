# ShrinkPDF AI

## Run locally
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev`.

## Deploy to Vercel
Import this project from GitHub in Vercel. Framework: Vite; Build command: `npm run build`; Output directory: `dist`.

PDF.js and jsPDF are loaded from CDN by the original app. The AI SEO generator currently has an empty Gemini API key and needs a secure server-side API route before it can be used in production.
