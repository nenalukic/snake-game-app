# Snake Game App

A full end-to-end Snake game application featuring a React frontend, FastAPI backend, Postgres database, and complete CI/CD pipeline.

## Project Overview

- **Frontend**: React + Vite + TypeScript
- **Backend**: FastAPI + Python 3.11+
- **Database**: PostgreSQL
- **Infrastructure**: Docker Compose, Docker
- **Deployment**: Render
- **CI/CD**: GitHub Actions

## Development Plan

### Phase A — Repo init and scaffolding
- [x] Create folders: `/frontend`, `/backend`, `/deploy`, `/infra`
- [x] Create README.md
- [ ] Commit and push scaffold

### Phase B — Frontend
- [ ] Initialize Vite React TS app
- [ ] Implement game logic (Snake, Food, Collision)
- [ ] Implement UI (GameBoard, Controls, ScoreInput, Leaderboard)
- [ ] Create API contract stub
- [ ] Add unit tests and Dockerfile

### Phase C — Backend
- [ ] Initialize FastAPI app
- [ ] Implement endpoints based on API contract
- [ ] Setup Database models and migrations (Alembic)
- [ ] Add tests and Dockerfile

### Phase D — Database & Docker Compose
- [ ] Create `docker-compose.yml`
- [ ] Connect backend to Postgres
- [ ] Verify integration

### Phase E — Containerization & Render deployment
- [ ] Finalize production Dockerfiles
- [ ] Configure Render deployment
- [ ] Verify deployment

### Phase F — CI/CD (GitHub Actions)
- [ ] Create CI/CD workflow
- [ ] Automate tests and deployment

### Phase G — Final checks
- [ ] Final verification
- [ ] Add CONTRIBUTING.md
