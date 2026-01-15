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

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/atrocityz/poketeam.git
cd poketeam

# 2. Setup environment (creates .env files)
bun run setup:env

# 3. Configure your environment variables
# Edit backend/.env with your JWT, Google, Github settings
# Edit frontend/.env with your backend API URL (if needed)

# 4. Run complete setup (installs deps, setups database)
bun run setup

# 5. Start development servers
bun dev
```
