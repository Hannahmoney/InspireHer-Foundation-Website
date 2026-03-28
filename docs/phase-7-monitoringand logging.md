# Phase 7 — Monitoring & Logging

In this phase, I introduced basic observability into the system to monitor application health, container performance, and service availability.

---

## Objectives

- Add visibility into application and container behavior
- Monitor service health and uptime
- Collect metrics from backend and containers
- Enable basic troubleshooting through logs

---

## What I implemented

- Prometheus for metrics collection
- Grafana for visualization
- cAdvisor for container-level metrics
- FastAPI metrics endpoint (`/metrics`)
- Docker logs for service-level debugging

---

## Architecture

Internet  
→ Elastic IP  
→ EC2  
→ Docker  

Monitoring stack:

- Prometheus (metrics collection)
- Grafana (dashboards)
- cAdvisor (container metrics)

Application stack:

- Frontend (React)
- Backend (FastAPI with metrics)
- Database (PostgreSQL)

---

## Key components

### 1. FastAPI metrics

The backend exposes a `/metrics` endpoint using Prometheus instrumentation.

This provides:
- request count
- request latency
- response status tracking

---

### 2. Prometheus

Prometheus scrapes metrics from:

- backend (`backend:8000/metrics`)
- cAdvisor (`cadvisor:8080`)
- itself (`prometheus:9090`)

Configured via:

monitoring/prometheus.yml

---

### 3. Grafana

Grafana is used to visualize metrics from Prometheus.

Access:

http://<ELASTIC_IP>:3001

Connected to Prometheus using:

http://prometheus:9090

---

### 4. cAdvisor

cAdvisor provides container-level metrics such as:

- CPU usage
- memory usage
- container stats

Access:

http://<ELASTIC_IP>:8080

---

## Dashboards created

Basic dashboard includes:

- target status (`up`)
- container CPU usage  
- container memory usage  
- backend request metrics  

These provide a quick view of:

- system health
- resource usage
- application activity

---

## Prometheus access

http://<ELASTIC_IP>:9090

Used to:

- verify targets (Status → Targets)
- test queries before Grafana

---

## Logging

Logging is handled via Docker:

View logs:

docker compose logs -f

Per service:

docker compose logs -f backend  
docker compose logs -f frontend  
docker compose logs -f prometheus  
docker compose logs -f grafana  

---

## Ports used

- 3000 → frontend  
- 3001 → Grafana  
- 8080 → cAdvisor  
- 9090 → Prometheus  

---

## Security note

For this phase, monitoring tools are publicly accessible to simplify setup.

In a production setup, these would be:

- restricted to internal access
- protected via authentication or VPN

---

## Limitations

- no alerting configured
- no centralized logging system (ELK/Loki)
- no host-level metrics (node_exporter not added)
- dashboards are basic

---

## Next steps

- restrict monitoring ports to private access
- add alerting (Alertmanager)
- improve dashboards
- move database to RDS
- introduce load balancing

---

## Summary

I added a monitoring stack using Prometheus, Grafana, and cAdvisor, allowing visibility into application metrics, container performance, and system health.

## Upcoming Phases
* Phase 8 — Security & Reliability
* Phase 9 — Multi-AZ & Scaling
* Phase 10 — Container Orchestration (ECS/Kubernetes)
* Phase 11 — CDN (CloudFront)


## personal Indebpth study ater project completion
- app level metrics
K8s Instrumentation
diffrent custome metrics
metrics for developers_ who determines_
- hat is caadvisor
why cant i connect using public ip_
so after restarting, graph prom every setting goes away?
how are passwords handled for graphana enterpise grade