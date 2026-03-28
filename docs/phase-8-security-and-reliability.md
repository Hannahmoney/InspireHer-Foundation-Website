# Phase 8 — Security & Reliability

In this phase, I improved the security posture and reliability of the system by reducing unnecessary public exposure, enforcing internal communication between services, and making the application more resilient.

---

## Objectives

- Reduce public attack surface
- Keep backend and database internal
- Restrict access to only required ports
- Improve service reliability
- Align the system with production-like practices

---

## Key Improvements

### 1. Reduced Public Exposure

Only necessary ports are exposed publicly:

- 3000 → frontend (public access)
- 80 / 443 → reserved for future use
- 22 → SSH (restricted to my IP)

No longer exposed publicly:

- backend (8000)
- database (5432)

This ensures that only the entry point (frontend) is accessible from the internet.

---

### 2. Internal Service Communication

Backend and database communicate through Docker’s internal network.

Example:

backend connects to database using:

db:5432

No external access is required for internal services.

---

### 3. Docker Networking Improvements

- frontend uses `ports` (public access)
- backend uses `expose` (internal only)
- database uses `expose` (internal only)

This enforces clear separation between:

- public services
- internal services

---

### 4. Security Group Hardening

Security group rules were refined to:

- allow SSH only from my IP
- expose only necessary public ports
- remove access to backend and database ports
- restrict monitoring tools (Grafana, Prometheus, cAdvisor) to my IP

This reduces risk from:

- unauthorized access
- port scanning
- accidental exposure

---

### 5. Monitoring Access Control

Monitoring services:

- Grafana (3001)
- Prometheus (9090)
- cAdvisor (8080)

are restricted to trusted access instead of being fully public.

---

### 6. Service Reliability

All services use restart policies:

restart: always

This ensures:

- automatic recovery after failure
- containers restart after server reboot

---

### 7. Separation of Concerns

The system now clearly separates:

- public layer → frontend
- application layer → backend
- data layer → database

This is a key step toward production-ready architecture.

---

## Current Architecture

Internet  
→ Elastic IP  
→ EC2  
→ Frontend (public)  
→ Backend (internal)  
→ Database (internal)

---

## What is still not production-ready

- single EC2 instance (single point of failure)
- database runs in container
- no managed backups
- no load balancing
- no private subnets
- no secrets management system

---

## Lessons Learned

- not every service should be publicly accessible
- internal networking is sufficient for service communication
- security groups must match application architecture
- reducing exposure significantly improves security posture

---

## Upcoming Phases

- Phase 9 — Database & Scaling Foundation (RDS + ALB)
- Phase 10 — Container Orchestration (EKS)
- Phase 11 — CDN & Performance Optimization (CloudFront)

---

## Summary

In this phase, I improved system security by minimizing exposed services, enforcing internal communication patterns, and strengthening reliability through better container configuration and access control.