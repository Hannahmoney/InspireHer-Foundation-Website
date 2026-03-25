# Phase 6 — Terraform (Infrastructure as Code)

In this phase, I moved the infrastructure from manual AWS setup to Terraform and improved it to make it stable and closer to a real-world environment.

---

## What I built

Terraform provisions:

- EC2 instance (Ubuntu)
- Security group
- Elastic IP (static public IP)
- User data script to bootstrap the server

The EC2 instance runs Docker and hosts the full application stack.

---

## Architecture

Internet  
→ Elastic IP  
→ EC2 (Docker host)  
→ Frontend (React on port 3000)  
→ Backend (FastAPI internal)  
→ Database (PostgreSQL internal)

---

## Key decisions

### Infrastructure as Code
Everything is defined in Terraform instead of the AWS console.

- reproducible setup  
- version controlled  
- no hidden manual steps  

---

### Server bootstrap
On startup, the EC2 instance installs:

- Docker  
- Docker Compose  
- Git  

So it is immediately ready to run the app.

---

### Elastic IP
A static IP is attached to the instance.

Why:
- public IP does not change  
- GitHub Actions remains stable  
- easier to attach a domain later  

---

### Security group design

Open ports:

- 22 → SSH (my IP only)  
- 3000 → frontend (public)  
- 80 / 443 → open for future use  

Not exposed:

- backend (8000)  
- database (5432)  

These communicate internally via Docker.

---

### Internal networking

The backend connects to the database using:

db:5432

This works inside Docker without exposing ports externally.

---

## Terraform structure

terraform/
- providers.tf  
- versions.tf  
- variables.tf  
- locals.tf  
- main.tf  
- outputs.tf  
- terraform.tfvars  
- user-data.sh  

---

## Deploy infrastructure

terraform init  
terraform validate  
terraform plan  
terraform apply  

---

## Access server

ssh -i key.pem ubuntu@<ELASTIC_IP>

---

## Deploy app

cd /var/www  
git clone <repo>  
cd <repo>  
docker compose up -d --build  

---

## Access application

http://<ELASTIC_IP>:3000

---

## CI/CD

GitHub Actions deploys via SSH.

After adding Elastic IP:
- updated EC2_HOST secret  
- deployments remain stable  

---

## Limitations

- single EC2 (single point of failure)  
- database in container  
- no load balancing  
- no autoscaling  
- no private networking  

---

## Next improvements

- move DB to RDS  
- add load balancer  
- restrict backend access  
- add monitoring  
- move to ECS or Kubernetes  

---

## Summary

Infrastructure is now fully managed with Terraform, with a stable endpoint and a structure ready for future scaling.

## Upcoming Phases
* Phase 7 — Monitoring & Logging
* Phase 8 — Security & Reliability
* Phase 9 — Multi-AZ & Scaling
* Phase 10 — Container Orchestration (ECS/Kubernetes)
* Phase 11 — CDN (CloudFront)
