# MyAttendo

MyAttendo is a modern college attendance management platform designed for students and administrators. The project combines a React + TypeScript frontend, an Express + TypeScript API, and a PostgreSQL + Prisma data layer to support attendance, timetable, deadlines, admin reporting, and secure role-based access.

## Architecture

- Frontend: React, Vite, Tailwind CSS, TanStack Query, React Router, Recharts
- Backend: Express.js, TypeScript, Zod, Express session with secure cookies
- Shared package: attendance formulas, validation schemas, and reusable types
- Database: PostgreSQL + Prisma ORM with migrations and a seed script

## Repository layout

- `apps/web` – Vite React frontend
- `apps/api` – Express API with routes, middleware, and Prisma-ready code
- `packages/shared` – shared attendance logic and type-safe schemas
- `prisma` / `apps/api/prisma` – schema, migration, and seed assets

## Setup

1. Copy `.env.example` to `.env`.
2. Update PostgreSQL connection details and session secrets.
3. Install dependencies with `npm install`.
4. Run `npm run dev` to start frontend and backend together.

## Database notes

This repository includes the Prisma schema and migration files required for PostgreSQL-backed development. Production deployment should use a managed PostgreSQL instance and a secure deployment procedure.

## Security notes

- Do not expose database credentials to the frontend.
- Use HTTP-only cookies for authenticated sessions.
- Validate every request on the server and perform ownership checks.
- Keep admin credentials out of source control.

## Verification status

This repository includes the requested project structure and representative full-stack code. The package installation and runtime verification steps are expected to run in a cloud-enabled Node.js environment with PostgreSQL available.

## Defaults

Demo login:

- Admin: `admin@myattendo.local` / `ChangeMeStrongly123!`
- Student: `student@myattendo.local` / `StudentStrong123!`

These are for local/demo use only and should never be reused in production.
