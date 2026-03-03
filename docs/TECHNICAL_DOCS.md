# Sentinel Systems - Technical Documentation

## 🏗️ Architecture Overview

Sentinel Systems is a modern web application built on the **Next.js 14 App Router**. It leverages a hybrid rendering strategy (SSG, ISR, and CSR) to deliver a seamless user experience while maintaining high performance and SEO visibility.

### Design Pattern: Atomic Cyber-Design
The project follows a modified atomic design pattern, organized within the `components` directory:
- **UI Components**: Low-level, reusable atoms and molecules (Buttons, Inputs, Cards).
- **Sections**: High-level organisms that form the building blocks of the landing page (Hero, Features, Testimonials).

---

## 🛡️ Core Modules

### 1. Role-Based Data Isolation
Implemented to ensure enterprise data security. The system uses middleware and server-side checks to isolate data based on user roles (e.g., City Manager, Administrator).
- **Implementation**: See `middleware.ts` and `lib/auth.ts`.
- **Logic**: Filters MongoDB queries at the repository layer based on the authenticated session's scope.

### 2. FlexiBot AI Integration
An intelligent hybrid responder system.
- **Workflow**:
    1. User Input → API Route.
    2. Hybrid Processor: Checks FAQ Engine (MongoDB) → If no match, forwards to GPT Engine.
    3. Session Management: Tracks conversation state and rate limits users.
- **Location**: `app/api/chat/` and `lib/ai/`.

### 3. Sentinel Shield MDM Interface
A high-fidelity simulation of an Enterprise Mobility Management dashboard.
- **Tech**: GSAP for intricate data visualization animations and Framer Motion for UI state transitions.
- **Location**: `components/sections/ShieldMDMSection.tsx`.

---

## 💾 Data Layer

### Mongoose Models
- **Lead**: Captures business inquiries with multi-step validation.
- **Blog**: Manages content with Markdown support and automatic slug generation.
- **Newsletter**: Handles subscriptions with duplicate prevention logic.

---

## 🌐 API Reference

### `POST /api/leads`
- **Purpose**: Submits lead capture form data.
- **Security**: Rate limited (5 req / 15 min), Zod validation, DOMPurify sanitization.

### `POST /api/newsletter`
- **Purpose**: Registers a new email for the newsletter.
- **Validation**: Strict email regex.

---

## ⚙️ DevOps & Deployment

### Environment Variables
Refer to `.env.example` for the required keys. Ensure `MONGODB_URI` and `RESEND_API_KEY` are set in production environments.

### Build & Optimization
The project uses `next optimize` for image handling and `next/font` for local font hosting, minimizing external requests and improving FCP.
