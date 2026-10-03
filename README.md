# MultiCBA

**Multi Custom Boot Animations**

A beautiful collection of 20+ custom Android-style boot animations with live HTML previews, sound effects, duration info and download buttons.

## Live Demo

Once GitHub Pages is enabled:  
**https://slabylol.github.io/MultiCBA/**

## Features

- 20 unique boot animations (Neon Pulse, Matrix Rain, Android Bounce, Glitch, Cyber Grid, Progress Boot and many more)
- Live preview with one click
- Generated sound effects for every animation (Web Audio API)
- Shows duration and resolution
- Search and filter (short / long)
- Modern dark UI with Orbitron + Inter fonts
- Fully static – works on GitHub Pages

## How to enable GitHub Pages

1. Go to the repository: https://github.com/SlabyLol/MultiCBA
2. Click **Settings** → **Pages**
3. Under **Source** select **Deploy from a branch**
4. Branch: `main` / folder: `/ (root)`
5. Click **Save**
6. After 1–2 minutes the site will be live at:  
   https://slabylol.github.io/MultiCBA/

## Note about Download as MP4

The current version shows a toast notification for the download button.  
True MP4 export of the CSS animations would require canvas recording + MediaRecorder (can be added later).  
For real `bootanimation.zip` files you can convert the animations to frames with tools such as [abatools](https://github.com/threadreaper/abatools).

## Tech

- Pure HTML + CSS + Vanilla JS
- Web Audio API for procedural sounds
- No external dependencies except Google Fonts

---

Made by [SlabyLol / DarkFox](https://github.com/SlabyLol)
