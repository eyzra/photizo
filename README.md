# Photizo Global / The Illumination Church

The website for Photizo Global and The Illumination Church. *Till All Men See Jesus.*

Built with Next.js (static export), TypeScript, Tailwind CSS v4 and Motion. Fonts (Space Grotesk and Lora) are self-hosted through Fontsource, so the site needs no external font requests.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to /out
```

## Deploy to GitHub Pages

1. Push this folder to the `main` branch of the repository (for example `eyzra/photizo`).
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`.

The workflow sets the base path automatically, so the site works at `eyzra.github.io/photizo` and on a custom domain. To use a custom domain, add it under **Settings → Pages** and point your DNS at GitHub.

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, WhatsApp, navigation | `lib/site.ts` |
| Ministry copy: pillars, teaching emphasis, DNA, IMMERSION, RISE, editions, expressions, beliefs, pledge | `lib/content.ts` |
| Dear Atheist articles (Substack links) | `lib/articles.ts` |
| Teachings | `lib/teachings.ts` (the library page is paused; see `app/teachings/page.tsx`) |
| Colours, fonts, type scale, animation timing | `app/globals.css` |
| Hand-drawn sketches | `components/sketches/index.tsx` |
| Photos and video | `lib/media.ts`, `public/images/`, `public/video/` |
| Logo files | `public/brand/` (used through `components/Logo.tsx`) |

## Content still to supply

Everything below is clearly labelled on the site so nothing invented goes live.

- **Photographs.** Photos live in `public/images/` as optimised WebP and are listed in `lib/media.ts`. Still to come: a flyer or photo for Faith Fundamentals (timeline), and gallery photos for Shekinah, Now Faith Is and Faith Fundamentals. Programme flyers live in `public/images/flyers/`. To add an edition's cover, put the file in `public/images/`, register it in `lib/media.ts` and set `image` on that edition in `lib/content.ts`.
- **Globe film.** `public/video/globe.mp4` plays behind the "To the Nations" band on the homepage. It pauses off-screen and stays still for visitors who prefer reduced motion.
- **IMMERSION Abuja 2026.** When the theme is announced, set `theme` on the upcoming edition in `lib/content.ts`, and replace the "Registration opening soon" block in `app/immersion/page.tsx` with the real registration link.
- **Bank details.** The account shown on the Give page lives in `lib/site.ts` under `bank`.
- **Online giving links.** Point "Give Now" and "Become a Partner" at a payment page when one exists. They currently open WhatsApp with a ready-made message.
- **WhatsApp links.** The community and channel links live in `lib/site.ts`.
- **Teachings.** The Teachings page points to Telegram for now. When you have recordings or notes to upload, add them to `lib/teachings.ts` and switch `app/teachings/page.tsx` back to the searchable `<TeachingLibrary />`.
- **New Dear Atheist letters.** Add each one to the bottom of the list in `lib/articles.ts` with its title, subtitle, date and Substack link. The site shows them newest first.

## Brand assets

The official logos were traced from the supplied PNGs into sharp SVGs in `public/brand/`: the horizontal lockup, stacked lockup, badge, mark and arch mark. The site shows them through a CSS mask, so one file turns navy on light sections and white on dark ones. `components/Logo.tsx` has `<BrandLogo variant="badge" />` and the other variants ready to drop anywhere.

The favicon (`app/icon.svg`), Apple home-screen icon (`app/apple-icon.png`) and the link preview image shown on WhatsApp and social media (`app/opengraph-image.png`) all use the mark.

## Preloader and scroll light

- The intro screen ("ARE YOU READY" then "COME AND SEE JESUS?") plays once per browser session. Change the words in `components/Preloader.tsx`. To see it again while testing, close the tab and reopen the site.

## Forms (Google Sheets)

The Contact, IMMERSION registration and Dear Atheist question forms save into a Google Sheet through Google Apps Script. Each entry emails an alert to message.theezraanya@gmail.com and sends the person a thank-you. Follow `google-apps-script/SETUP.md` once, then paste the web app URL into `formsEndpoint` in `lib/site.ts`. Until then, the forms open the visitor's email app with the message filled in.

## Accessibility and motion

- Every animation respects the visitor's reduced-motion setting.
- Without JavaScript, all text and illustrations still show (see the `<noscript>` styles in `app/layout.tsx`).
- Keyboard users get a skip link, visible focus rings, an Escape-closable menu and tab-accessible RISE panels.
