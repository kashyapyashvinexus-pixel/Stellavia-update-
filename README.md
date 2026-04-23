# Stellavia Next.js Website

## Run locally
```bash
npm install
npm run dev
```

## Deploy on Vercel
1. Upload this project to GitHub.
2. Import the GitHub repo in Vercel.
3. Framework preset: **Next.js**
4. Build command: `next build`
5. Output setting: default

## Main files
- `app/page.tsx` → full homepage
- `app/globals.css` → complete styling and animations
- `app/layout.tsx` → fonts and metadata

## Notes
- This version keeps the same gold / cream / dark palette.
- Fonts are loaded with `next/font/google`.
- Gallery, floor plan tabs, lightbox, mobile menu, EMI calculator, and reveal animations are included.
- Contact form is frontend-only right now. You can later connect Formspree, Web3Forms, EmailJS, or a custom API route.
