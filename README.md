# PokeTeam

> Web application for creating and managing Pokémon teams

## 📕 Description

PokeTeam is a fullstack application that allows users to create, save, and manage their Pokémon teams. The project uses data from PokeAPI and provides a convenient interface for working with Pokémon.

## 🔨 Technologies

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger API Documentation

**Frontend:**
- React 19
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
- Shadcn UI
- React Router v7

## 🚀 Installation and Setup

### Prerequisites

Make sure you have installed:
- [Bun](https://bun.sh/) (v1.0+)
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/atrocityz/poketeam.git
cd poketeam
```

### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
bun install

# Start PostgreSQL database via Docker
docker-compose up -d

# Copy configuration template
cp .env.template .env

# Don't forget configure your .env file with JWT, Google, Github settings

# Generate Prisma client and apply migrations
bun run build

# For first time setup, run db push to create database schema
bunx prisma db push

# Start development server
bun run dev
```

Backend will be available at: `http://localhost:3000`

Swagger documentation: `http://localhost:3000/docs`

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
bun install

# Copy configuration template
cp .env.template .env

# Don't forget configure your .env file with JWT, Google, Github settings

# Start development application
bun run dev
```

Frontend will be available at: `http://localhost:5173`

## 📦 Additional Commands

### Backend

```bash
# Format code
bun run format

# Lint
bun run lint

# Build for production
bun run build

# Run in production mode
bun run start:prod
```

### Frontend

```bash
# Format code
bun run format

# Lint
bun run lint

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📁 Project Structure

```
poketeam/
├── backend/              # NestJS API server
│   ├── prisma/           # Database schema and migrations
│   └── src/              # Source code
│       ├── components/   # Application modules
│       ├── config/       # Configuration
│       └── utils/        # Utilities
└── frontend/             # React application
    ├── src/              # Source code
    │   ├── app/          # Root component
    │   ├── components/   # UI components
    │   ├── pages/        # Application pages
    │   └── utils/        # Utilities and hooks
    ├── @types/           # API Types
    └── public/           # Static files
```
