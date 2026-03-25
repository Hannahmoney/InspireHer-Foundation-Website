# Phase 5 — Backend + Database Integration

This phase transforms the project from a static frontend deployment into a full-stack application with real data flow, backend logic, and persistent storage.

The system now supports end-to-end interaction between the frontend, backend API, and database.

---

## Architecture

### High Level Architecture

```text
Browser
   │
   ▼
Frontend (React)
   │
   ▼
Backend API (FastAPI)
   │
   ▼
PostgreSQL Database
```

All services are containerized and orchestrated using Docker Compose.

---

## Overview

In this phase:

* A FastAPI backend was introduced
* A PostgreSQL database was added
* Backend and database were connected using SQLAlchemy
* React frontend was updated to interact with the backend
* Data persistence was implemented
* Full system runs via Docker Compose

---

## Project Structure

```text
InspireHer-Foundation-Website/
│
├── docker-compose.yml
├── .env
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── src/
├── public/
└── other frontend files
```

---

## Backend (FastAPI)

### Endpoints

* `GET /health` → service health check
* `GET /users` → retrieve users from database
* `POST /users` → create new user

---

## Database (PostgreSQL)

* Runs as a Docker container
* Automatically initialized using environment variables
* Connected via internal Docker network (`db` service name)

---

## Environment Configuration

`.env` file in project root:

```text
POSTGRES_USER=inspireher
POSTGRES_PASSWORD=inspireherpassword
POSTGRES_DB=inspireherdb
```

---

## Docker Compose Services

* **frontend** → React app served via Nginx
* **backend** → FastAPI application
* **db** → PostgreSQL database

---

## Running the Application

```bash
cd /var/www/InspireHer-Foundation-Website
docker-compose down
docker-compose up -d --build
```

---

## Testing

### Backend

```text
http://EC2_PUBLIC_IP:8000/health
http://EC2_PUBLIC_IP:8000/users
```

### Frontend

```text
http://EC2_PUBLIC_IP:3000
```

---

## Full Application Flow

1. User opens frontend
2. React fetches users from backend
3. User submits form
4. Backend processes request
5. Data stored in PostgreSQL
6. Frontend updates with new data

---

## Verifying Data Persistence

```bash
docker exec -it inspireher-db psql -U inspireher -d inspireherdb
```

```sql
SELECT * FROM users;
```

---

## CI/CD Integration

The existing GitHub Actions pipeline continues to deploy the full stack:

```bash
docker-compose down
docker-compose up -d --build
```

---

## Issues Faced and Resolutions

### Backend Not Starting

**Cause**
Missing or incorrect environment variables (`DATABASE_URL` not set)

**Resolution**

* Created `.env` in project root
* Passed variables via `docker-compose.yml`
* Updated backend to use `os.getenv("DATABASE_URL")`

---

### Backend Failing Due to Database

**Cause**
Invalid database configuration or connection failure during startup

**Resolution**

* Ensured Postgres container was running
* Aligned connection string with Docker Compose variables

---

### Internal Server Error on `/users`

**Cause**
Returning raw SQLAlchemy objects

**Resolution**

* Introduced Pydantic response models
* Used `response_model` with proper serialization

---

### `models.User` Attribute Error

**Cause**
Incorrect or missing model definition

**Resolution**

* Corrected `models.py`
* Ensured consistent imports and naming

---

### Frontend “Failed to Fetch”

**Cause**
CORS restrictions blocking requests

**Resolution**

* Added CORS middleware in FastAPI
* Allowed frontend origin

---

### Backend Not Reachable from Browser

**Cause**
Port `8000` not open in EC2 security group

**Resolution**

* Allowed inbound traffic on port `8000`

---

### `.env` Not Working

**Cause**
Incorrect file location

**Resolution**

* Moved `.env` to project root
* Ensured Docker Compose could load variables

---

## Key Concepts Demonstrated

* multi-service architecture
* API development with FastAPI
* database integration with SQLAlchemy
* container networking in Docker Compose
* environment-based configuration
* frontend-backend communication
* debugging distributed systems

---

## Outcome

* Full-stack application successfully deployed
* Users can be created and retrieved through UI
* Data persists in PostgreSQL
* All services run via Docker Compose
* CI/CD deploys the complete system

---

## Phase Completion Criteria

* frontend loads successfully
* backend API responds
* users can be created via UI
* users are stored in database
* users are retrieved and displayed
* system runs via Docker Compose
* CI/CD redeploys full stack

---

## Next Phase

Phase 6 — Infrastructure as Code (Terraform)

* automate infrastructure provisioning
* eliminate manual EC2 setup
* enable reproducible environments
