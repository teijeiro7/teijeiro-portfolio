# 🚀 Cristian Teijeiro - Portfolio

[![Astro](https://img.shields.io/badge/Astro-4.12.2-BC52EE?logo=astro)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Personal portfolio website built with **Astro**, featuring bilingual support (English/Spanish), dark/light theme toggle, and responsive design.

🌐 **Live:** [teijeiro7.vercel.app](https://teijeiro7.vercel.app)

---

## ✨ Features

- **🌍 Bilingual** — Full English/Spanish translation with language toggle
- **🌗 Dark/Light Theme** — Theme switcher with `localStorage` persistence
- **📱 Responsive** — Mobile-first design with breakpoints for all devices
- **⚡ Performance** — Static site generation with Astro for optimal loading
- **🎨 Custom Design** — Hand-crafted UI with red/black color identity
- **📧 Contact** — Copy-to-clipboard email functionality
- **🔗 Social Links** — GitHub, LinkedIn, Instagram integration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Astro](https://astro.build/) | Static site generator |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [astro-icon](https://www.astroicon.dev/) | Icon component library |
| CSS Custom Properties | Theming & design tokens |
| Inter (Google Fonts) | Typography |

---

## 📁 Project Structure

```text
/
├── public/                  # Static assets
│   ├── images/              # Photos, logos, project screenshots
│   └── js/                  # Client-side scripts
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Experience.astro # Work experience timeline
│   │   └── Project.astro    # Project showcase card
│   ├── i18n/
│   │   └── translations.ts  # Bilingual dictionary (ES/EN)
│   ├── layouts/
│   │   └── Layout.astro     # Root HTML layout + theme init
│   ├── pages/
│   │   ├── components/      # Page sections
│   │   │   ├── nav.astro         # Navigation bar
│   │   │   ├── about-me.astro    # Contact section
│   │   │   └── projects.astro    # Projects section
│   │   └── index.astro      # Main landing page
│   └── env.d.ts             # Astro type declarations
├── astro.config.mjs         # Astro configuration
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies & scripts
```

---

## 🚀 Commands

All commands run from the project root:

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Start dev server at `localhost:4321`      |
| `npm run build`   | Type-check and build for production       |
| `npm run preview` | Preview production build locally          |

---

## 🏗️ Architecture Highlights

### Custom i18n System
No external library — pure TypeScript implementation using:
- `data-i18n` attributes for automatic DOM translation
- `CustomEvent("languagechange")` for cross-component sync
- `localStorage` persistence for user preference

### Theme System
Class-based theming (`light`/`dark` on `<html>`):
- CSS custom properties switch based on parent class
- Respects `prefers-color-scheme` when no saved preference
- `localStorage` persists theme choice

### Component Organization
- **Reusable components** → `src/components/`
- **Page sections** → `src/pages/components/`

---

## 📄 License

MIT © [Cristian Teijeiro](https://github.com/cristiantg)

---

> 🧑‍💻 **Last-year Software Engineering student** at URJC (Madrid, Spain)  
> Passionate about AI, full-stack development, and building impactful products.
