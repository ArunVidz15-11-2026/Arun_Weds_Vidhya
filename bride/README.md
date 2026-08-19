# Ravichandra weds Rachana 💍

A luxury, animated wedding invitation website — built with React, Vite and Framer Motion.
Based on the *Making AI Do It* wedding invite guide.

## 1. Install & run

```powershell
npm install
npm run dev
```

Keep `npm run dev` running in one terminal window. Open a **new** terminal window for any other commands (like deploy).

## 2. Add your content

Drop these files into the `public/` folder (see [public/README.md](public/README.md)):

- `couple.jpg` — hero photo
- `couple2.jpg` — countdown background photo
- `envelope.png` — Canva envelope design
- `music.mp3` — background music

Then update these spots in the code:

| File | What to change |
|---|---|
| `src/components/CountdownSlide.jsx` | `WEDDING_DATE` and the displayed date text |
| `src/App.jsx` | Event `date`, `time`, `venue`, `dressCode`, `mapsUrl` for each of the 4 `EventSlide` entries |
| `src/components/HeroSlide.jsx` | Names, subtitle, tagline text if needed |
| `index.html` | Page `<title>` / description if needed |

Use **Ctrl+Shift+F** in VS Code to find & replace placeholder text like `Venue Name, City` across the whole project.

## 3. Project structure

```
src/
  animations.js              # shared Framer Motion variants
  hooks/useCountdown.js       # live countdown timer hook
  components/
    EnvelopeIntro.jsx         # tap-to-open envelope
    HeroSlide.jsx             # couple photo + names
    CountdownSlide.jsx        # live countdown
    EventSlide.jsx            # reusable ceremony slide (Mehendi, Haldi, Dinner, Wedding)
    FinalSlide.jsx            # closing slide
  App.jsx                     # ties it all together, music + mute + scroll progress bar
public/
  couple.jpg / couple2.jpg / envelope.png / music.mp3   # <- add your own
```

## 4. Deploy to Vercel

```powershell
npm run build          # build for production (creates dist/)
npm install -g vercel  # install Vercel CLI
vercel login           # check email, click the link sent
vercel --prod          # deploy — press Enter for every question
```

Your invite will be live at `https://your-project-name.vercel.app`.

## 5. Save your work

```powershell
git init
git add .
git commit -m "save"
```

Undo any mistake instantly with `git restore .`
