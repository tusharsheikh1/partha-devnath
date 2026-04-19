# 📈 Performance Marketing Portfolio

![React](https://img.shields.io/badge/React-18.0-blue.svg?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg?style=for-the-badge&logo=vite)
![CSS3](https://img.shields.io/badge/Custom_CSS-Variables-1572B6.svg?style=for-the-badge&logo=css3)

> A premium, ultra-fast single-page portfolio designed for a Performance Marketing & Google Ads Specialist. Built to convert, this site features advanced scroll animations, dynamic theme toggling, and seamless WhatsApp lead generation without relying on heavy UI libraries.

---

## ✨ Key Features

* **🌓 Dynamic Theming:** Custom CSS-variable driven architecture supporting an eye-friendly "Gold/Dark" mode and a striking "Sunset Orange/Light" mode.
* **⚡ Ultra-Performance:** Built with Vite and React, leveraging native CSS keyframes and a custom Intersection Observer (`useInView`) for buttery-smooth scroll animations without the bloat of external animation libraries.
* **📱 Direct WhatsApp Integration:** A highly optimized contact form that pre-formats client lead data (Name, Email, Ad Spend, Situation) and routes it directly to a WhatsApp business number.
* **📊 Data-Driven Project Showcase:** Interactive case studies featuring custom SVG sparklines (`Sparkline.tsx`) and grid-based metric highlights.
* **🧩 Centralized Content Management:** All copy, testimonials, services, and project metrics are completely decoupled from the UI and managed via a single `constants.ts` file for effortless updating.

---

## 🛠️ Tech Stack

* **Core:** [React 18](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling:** Custom Vanilla CSS (`App.css`) leveraging native variables, flexbox/grid, and glassmorphism. Tailwind is initialized but core styles remain bespoke.

---

## 📂 Project Architecture

```text
src/
├── components/
│   ├── Avatar.tsx       # Optimized profile imagery
│   └── Sparkline.tsx    # Dynamic SVG line-charts for case studies
├── data/
│   └── constants.ts     # 🗄️ Single Source of Truth for all textual content
├── hooks/
│   └── useInView.ts     # Custom intersection observer for scroll reveals
├── App.tsx              # Main application layout and section orchestration
├── App.css              # Bespoke animations, theming, and layout styles
├── index.css            # Base resets and Tailwind imports
└── main.tsx             # React DOM entry point
🚀 Getting Started
Prerequisites
Ensure you have Node.js (v18+ recommended) installed.

1. Installation
Clone the repository and install dependencies:

Bash
npm install
# or
yarn install
# or
pnpm install
2. Local Development
Start the ultra-fast Vite development server:

Bash
npm run dev
Navigate to http://localhost:5173 in your browser. Hot Module Replacement (HMR) is enabled by default.

3. Production Build
Compile and optimize the application for production:

Bash
npm run build
The compiled assets will be generated in the dist/ directory. You can preview the production build locally using:

Bash
npm run preview
✏️ Customization Guide
This template is designed to be easily maintainable. You do not need to edit the React components to update the site content.

Updating Text, Stats, and Projects
Navigate to src/data/constants.ts.

Edit the relevant arrays (STATS, SERVICES, PROJECTS, PROCESS, TESTIMONIALS, FAQS).

Save the file. The UI will dynamically map and render your new content.

Updating Branding Assets
Place your updated images in the /public directory:

/public/partha_logo.png - Navbar and Footer Logo

/public/partha_photo.png - Hero and About Avatar

/public/recent_work_[1-9].png - Case study thumbnail images

Updating Contact Information
Open src/App.tsx.

Locate the handleWhatsAppSubmit function.

Update the Target Number inside the whatsappUrl variable to your desired WhatsApp number (include the country code, e.g., 880...).

Update the mailto: links in the Contact and Footer sections.

🌐 Deployment
Because this project is a static site built with Vite, it can be deployed seamlessly to platforms like Vercel, Netlify, or Cloudflare Pages.

For Vercel/Netlify:

Connect your GitHub repository.

Set the build command to npm run build.

Set the publish directory to dist.

Deploy!