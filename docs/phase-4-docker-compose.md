# Phase 4 — Docker Compose Deployment

This phase introduces Docker Compose to manage the application using a single configuration file instead of manually running multiple Docker commands.

Docker Compose simplifies container management and prepares the system for multi-service architecture such as adding a backend and database.

---

## Architecture

```text
EC2
  │
  ▼
Docker Compose
  │
  ▼
Frontend Container (React + Nginx)
```

Docker Compose manages the lifecycle of the container and allows future expansion into multiple services.

---

## Problem Solved

Before this phase:

* manual `docker build`
* manual `docker run`
* manual container removal
* difficult to scale beyond one container

After this phase:

* single command to build and run containers
* cleaner and repeatable deployment
* easier to extend with backend and database services

---

## Prerequisites

* EC2 instance running
* Docker installed
* Application already containerized (Phase 2)
* CI/CD pipeline working (Phase 3)

---

## Project Setup

### Create docker-compose.yml

Inside your project directory:

```bash
cd /var/www/InspireHer-Foundation-Website
nano docker-compose.yml
```

Add the following configuration:

```yaml
version: "3.8"

services:
  frontend:
    build: .
    container_name: inspireher-container
    ports:
      - "3000:80"
    restart: always
```

---

## Running the Application

### Stop old container

```bash
docker rm -f inspireher-container || true
```

### Start with Docker Compose

```bash
docker-compose up -d --build
```

This command:

* builds the image
* creates the container
* runs it in the background

---

## Verification

### Check running containers

```bash
docker ps
```

Expected output:

```text
inspireher-container   0.0.0.0:3000->80/tcp
```

---

## Test Application

From browser:

```text
http://EC2_PUBLIC_IP:3000
```

---

## CI/CD Integration Update

Modify your GitHub Actions workflow to use Docker Compose.

Replace manual Docker commands:

```bash
docker rm -f inspireher-container || true
docker build -t inspireher .
docker run -d --name inspireher-container -p 3000:80 inspireher
```

With:

```bash
docker-compose down || true
docker-compose up -d --build
```

---

## Deployment Workflow

```text
Developer Machine
       │
       ▼
Push Code to GitHub
       │
       ▼
GitHub Actions
       │
       ▼
SSH into EC2
       │
       ▼
docker-compose up
       │
       ▼
Application Updated
```

---

## Common Commands

### Start services

```bash
docker-compose up -d
```

### Stop services

```bash
docker-compose down
```

### Rebuild services

```bash
docker-compose up -d --build
```

### View logs

```bash
docker-compose logs
```

---

## Key Concepts Demonstrated

* Docker Compose service management
* container lifecycle automation
* simplified deployment workflow
* foundation for multi-container systems

---

## Outcome

The application is now managed using Docker Compose, enabling easier deployment and preparing the system for adding backend and database services.

---

## Next Steps

* Add backend service (API)
* Add database (PostgreSQL / RDS)
* Extend Docker Compose to multi-service architecture

---

## Upcoming Phases

* Phase 5 — Backend + Database
* Phase 6 — Infrastructure as Code (Terraform)
* Phase 7 — Monitoring & Logging
* Phase 8 — Security & Reliability
* Phase 9 — Multi-AZ & Scaling
* Phase 10 — Container Orchestration (ECS/Kubernetes)
* Phase 11 — CDN (CloudFront)
