# Sentinel Systems: Enterprise-Grade Mobile Security & MDM

![Sentinel Systems Banner](https://raw.githubusercontent.com/rabiasiddique-dev/Sentinal-System/main/public/hero-illustration.png)

## 🛡️ Overview

Sentinel Systems is a cutting-edge, security-first platform designed to provide enterprise-grade protection for mobile ecosystems. Built with a focus on performance, scalability, and absolute privacy, it offers a comprehensive suite of tools for device management (MDM), secure communications, and threat mitigation.

This repository contains the high-performance marketing website and platform interface, built using **Next.js 14**, **TypeScript**, and a custom-engineered **Cyber Aesthetic** design system.

---

## ✨ Key Features

- **🔒 Sentinel Shield MDM**: Interactive dashboard for real-time mobile device management and policy enforcement.
- **🛡️ Secure App Ecosystem**: A suite of hardened applications including Sentinel Mail, Vault, and Chat.
- **⚡ High-Performance Architecture**: 95+ Lighthouse scores achieved through Next.js App Router and optimized assets.
- **🎨 Premium Cyber Aesthetic**: A unique, glassmorphic design system built with GSAP and Framer Motion for immersive interactions.
- **📝 Enterprise Blog System**: Knowledge hub with ISR support for rapid content delivery.
- **♿ Inclusive Design**: Fully accessible (WCAG 2.1 AA) and responsive across all device classes (320px to 2560px).
- **🛡️ Hardened Security**: Built-in rate limiting, CSP headers, and multi-layered input sanitization.

---

## 🛠️ Tech Stack

### Frontend Excellence
- **Core**: [Next.js 14](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom design token system.
- **Animations**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger) & [Framer Motion](https://www.framer.com/motion/).
- **Components**: [Radix UI](https://www.radix-ui.com/) primitives for uncompromised accessibility.
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation.

### Robust Backend
- **Environment**: Next.js Server Components & API Routes.
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/) ODM.
- **Communication**: [Resend](https://resend.com/) for transactional email infrastructure.
- **Validation**: Strict schema enforcement with Zod.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.17 or later
- **Package Manager**: npm or yarn
- **Database**: A MongoDB Atlas connection string
- **Email**: A Resend API key for lead notifications

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/rabiasiddique-dev/Sentinal-System.git
    cd Sentinal-System
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Copy the example environment file and populate it with your credentials:
    ```bash
    cp .env.example .env.local
    ```

4.  **Launch Development Server**:
    ```bash
    npm run dev
    ```

Visit [http://localhost:3000](http://localhost:3000) to view the application in action.

---

## 📁 System Architecture

```text
├── app/                    # App Router (Pages, Layouts, API)
│   ├── api/                # Secure API Gateways
│   ├── blog/               # ISR-powered Content Hub
│   └── ui-demo/            # Component Design System Showcase
├── components/             
│   ├── sections/           # High-level landing page modules
│   └── ui/                 # Atomic design component library
├── lib/                    # Core utilities, DB connection, & Middleware
├── models/                 # Mongoose Data Schemas
├── public/                 # Optimized static assets & brand identity
└── types/                  # Global TypeScript definitions
```

---

## 🔐 Security & Compliance

Sentinel Systems is built on a "Secure by Design" philosophy:
- **Rate Limiting**: Intelligent IP-based throttling on sensitive endpoints.
- **Content Security Policy**: Strict headers to mitigate XSS and injection attacks.
- **Data Privacy**: No tracking pixels; minimal data collection focused on lead generation.
- **Sanitization**: All user-provided data is sanitized via DOMPurify before rendering or storage.

---

## 📄 License

Proprietary - © 2026 Sentinel Systems. All rights reserved.

---

## 📞 Contact

For inquiries, support, or partnership opportunities:
- **Email**: [support@sentinelsystems.com](mailto:support@sentinelsystems.com)
- **Website**: [sentinelsystems.com](https://sentinelsystems.com)
