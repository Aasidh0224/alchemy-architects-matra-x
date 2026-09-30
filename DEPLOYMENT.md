# MATRA-X 2.0 deployment

## Google AI Studio

1. Open Google AI Studio Build mode.
2. Import the GitHub repository Aasidh0224/alchemy-architects-matra-x.
3. Open AI_STUDIO_PROMPT.md.
4. Ask Build mode to preserve the current UI and incrementally connect real data, Gemini, database services and the advanced MATRA-X modules.
5. Add GEMINI_API_KEY as a server-side secret only.
6. Publish to Cloud Run from AI Studio Build mode.

## Vercel

1. Import the GitHub repository into Vercel as a Next.js project.
2. Keep the root directory at the repository root.
3. Use the default Next.js build settings.
4. Add GEMINI_API_KEY and GEMINI_MODEL to production Environment Variables.
5. Deploy.
6. Use the resulting vercel.app URL for the SIH demo/QR.

## Local

npm install
npm run dev

## Notes

- The root Next.js app is the new MATRA-X 2.0 application.
- The older static prototype files remain in the repository as legacy material and can be archived later.
- Synthetic/virtual material capacity is clearly labelled and is not a claim of confidential CPSE production data.
- Do not commit API keys.
