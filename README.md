# InspireHer Empowerment Initiative — Deployment Journey

This project demonstrates the evolution of deploying a React application on AWS EC2, moving from a static Nginx setup to a Docker-based deployment.

The application is built using **React + Vite** and deployed on an Ubuntu EC2 instance.

---

## Project Phases

### Phase 1 — Static Deployment with Nginx

In this phase, the application is built on the server and served as static files using Nginx.

**Flow**

Browser → EC2 IP / Domain → Nginx → React build files

**What was done**

- Created React app with Vite
- Pushed code to GitHub
- Set up EC2 instance (Ubuntu)
- Installed Nginx, Git, Node.js
- Cloned repository to server
- Built app using `npm run build`
- Copied `dist` files to `/var/www/...`
- Configured Nginx to serve static files
- Reloaded Nginx

**What this demonstrates**

- Static site hosting
- Nginx configuration
- Manual deployment workflow
- EC2-based hosting

---

### Phase 2 — Dockerized Deployment

In this phase, the application is containerized and served through Docker instead of copying files manually.

**Flow**

Browser → EC2 IP / Domain → Nginx (optional) → Docker container → React app

**What was done**

- Added `Dockerfile`
- Added container Nginx configuration
- Built Docker image
- Ran container on port `3000`
- Prepared Nginx as reverse proxy (for domain use)

**What this improves**

- Portability
- Consistent environments
- Easier deployment process
- Foundation for CI/CD

---

## Folder Structure
