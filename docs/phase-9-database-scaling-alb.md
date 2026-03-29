# Phase 9 — Database & Scaling Foundation (RDS + ALB)

In this phase, I improved the architecture by separating the database from the application host and introducing a proper entry point for traffic using an Application Load Balancer (ALB).

This moves the system closer to a production-ready design by removing tight coupling between services and preparing for scalability.

---

## Objectives

- Move database from container to managed service (RDS)
- Separate stateful and stateless components
- Introduce a load balancer for traffic entry
- Improve security and scalability foundation
- Prepare for future orchestration (EKS)

---

## Key Improvements

### 1. Database Migration to Amazon RDS

The PostgreSQL database was moved from a Docker container to Amazon RDS.

Benefits:
- database no longer tied to EC2 lifecycle
- improved durability and persistence
- easier backup and management
- production-aligned architecture

Backend now connects using:

RDS endpoint:5432

instead of:

db:5432 (Docker service)

---

### 2. Secure Database Access

RDS is not publicly accessible.

Access is restricted using security groups:

- RDS allows traffic on port 5432 only from the application security group
- no direct internet access to the database

This enforces a proper data access pattern:

EC2 (backend) → RDS  
NOT  
Internet → RDS

---

### 3. Removal of Local Database Container

The Postgres container was removed from docker-compose.

This ensures:
- no duplicate data sources
- no dependency on local container state
- cleaner architecture

---

### 4. Introduction of Application Load Balancer (ALB)

An ALB was added as the public entry point for the application.

Traffic flow:

Internet → ALB → EC2 → Frontend → Backend → RDS

Benefits:
- standard HTTP entry on port 80
- no need to expose EC2 port 3000 publicly
- enables future scaling (multiple instances)
- supports health checks

---

### 5. Target Group and Health Checks

A target group was configured for the EC2 instance:

- traffic forwarded to port 3000
- health checks configured on `/`
- ensures only healthy instances receive traffic

---

### 6. Security Group Refinement

Security groups were updated to enforce proper traffic flow:

- ALB allows public HTTP/HTTPS access
- EC2 allows traffic only from ALB on port 3000
- database allows traffic only from EC2 on port 5432
- SSH restricted to trusted IP

This removes direct exposure of application services.

---

## Current Architecture

Internet  
→ Application Load Balancer (public)  
→ EC2 (frontend + backend containers)  
→ RDS PostgreSQL (private)

---

## What is improved compared to previous phase

Before:
- database inside container on EC2
- direct public access to EC2 port 3000
- single point of failure for data and app

After:
- database managed by RDS
- controlled traffic through ALB
- internal communication enforced via security groups
- better separation of concerns

---

## Limitations (Current State)

- still a single EC2 instance (no horizontal scaling yet)
- no autoscaling group
- no HTTPS/SSL configuration yet
- secrets still managed via environment variables
- monitoring not integrated with ALB or RDS metrics

---

## Lessons Learned

- stateful components should be separated from compute
- load balancers provide cleaner and safer traffic entry
- security groups should reflect actual architecture layers
- moving to managed services simplifies operations

---

## Upcoming Phases

- Phase 10 — Container Orchestration (EKS)
- Phase 11 — CDN & Performance Optimization (CloudFront)

---

## Summary

In this phase, I migrated the database to Amazon RDS and introduced an Application Load Balancer, improving system reliability, security, and scalability while aligning the architecture with production best practices.