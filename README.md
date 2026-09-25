# LGP Association — Ganesh Chaturthi 2026

This is a Vite + React + TypeScript project scaffold for a one-page Ganesh Chaturthi association website.

Quick start:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Notes:
- Edit `src/data/siteConfig.ts` to update association-specific information.
- Assets are in `src/assets/` and `src/assets/gallery`.
- Form submissions are local-only — connect a backend to `RSVPForm` for persistence.
 
Server (RSVP)
 - A simple Express server is included in `/server` for RSVPs.
 - To run the server:

```bash
cd server
npm install
npm start
```

Replace placeholder photos
 - See `src/assets/photo-sources.md` for suggested image search pages (Unsplash / Pexels).
 - Replace the placeholder files in `src/assets/` with real images (optimize them for web), or update paths in `src/data/siteConfig.ts`.

Redeploy trigger: 2026-09-01T14:30:00Z
