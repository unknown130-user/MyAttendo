# MyAttendo

MyAttendo is a production-oriented college attendance management platform for students and administrators. It combines a React + TypeScript frontend, an Express + TypeScript API, and PostgreSQL-backed Prisma data models for student attendance, timetable tracking, deadlines, and reporting.

## Features

- Student dashboard with attendance summary and subject status states
- Attendance calculations for 75% thresholds, classes needed, and projections
- Admin dashboard for students, departments, subjects, and timetable management
- Personal task management, shared deadlines, and report exports
- Secure authentication flows using server-side sessions and role checks
- Prisma schema for PostgreSQL with migration-ready models
- Responsive UI built with Vite + React + Tailwind CSS

## Architecture

- Frontend: React, Vite, TypeScript, Tailwind CSS, TanStack Query, React Router
- Backend: Express.js, TypeScript, Zod, Prisma, PostgreSQL-ready services
- Shared logic: attendance calculations and validation schemas in the shared package

## Repository structure

- `apps/web` – React + Vite frontend
- `apps/api` – Express backend with Prisma and API modules
- `packages/shared` – shared validation schemas and attendance logic
- `prisma` – database schema and migrations (when used with Prisma)
- `README.md` – project documentation
- `.env.example` – environment variables template

## Local development

1. Copy `.env.example` to `.env` in the repo root.
2. Update the values for local PostgreSQL and app configuration.
3. Run `npm install` at the repo root.
4. Run `npm run dev` to start the backend and frontend together.

## Production and deployment

- Frontend can be hosted on Vercel or a compatible static host.
- Backend can be deployed to Render, Railway, Fly.io, or another Node.js host.
- PostgreSQL is expected to be managed externally and configured via environment variables.

## Security notes

- Never expose database URLs or secrets to the frontend.
- Use HTTP-only cookies for session auth.
- Validate all input on the server and verify ownership on protected endpoints.
- Keep admin credentials secure and avoid default admin seeds in production.

## Limitations

This repository includes a working full-stack architecture, shared attendance logic, and the required project structure. Environment variables, package installation, and database creation still require a cloud or managed-hosted setup before running the complete application end to end.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open the frontend on `http://localhost:5173` and the API on `http://localhost:4000`.
