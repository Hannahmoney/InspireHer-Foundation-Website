# Phase 2 — Dockerized Deployment

This phase introduces Docker to containerize and serve the InspireHer React application, replacing the manual static file deployment used in Phase 1.

---

## Overview

Instead of copying built files into the server’s web root, the application is packaged into a Docker image and served from a container.

This ensures:
- consistent environments
- easier deployment
- improved portability

---

## Architecture

EC2 → Docker container → React app  
(Optional) Nginx → reverse proxy → Docker

---

## Prerequisites

- Ubuntu EC2 instance
- Repository cloned to server
- Docker installed

---

## Step 1 — Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
```

Optional: allow running Docker without sudo

```bash
sudo usermod -aG docker ubuntu
```

---

## Step 2 — Navigate to project

```bash
cd /var/www/inspireher-repo/InspireHer-Foundation-Website
```

This directory contains:

Dockerfile

nginx.conf

application source code

---

## Step 3 — Build Docker image

```bash
docker build -t inspireher .
```

This command:

reads the Dockerfile

installs dependencies

builds the React app

prepares Nginx inside the container

---

## Step 4 — Run container

```bash
docker run -d --name inspireher-container -p 3000:80 inspireher
```

Explanation:

-d runs container in background

--name assigns container name

-p 3000:80 maps EC2 port 3000 to container port 80

---

## Step 5 — Verify container is running
docker ps

Expected output includes:

0.0.0.0:3000->80/tcp
Step 6 — Test application

From server:

```bash
curl http://localhost:3000
```

From browser:

```bash
http://EC2_PUBLIC_IP:3000
```
If working, the React app should load.

---

## To make updates

```bash
git pull #from repo folder in /var/www
```
## Next Steps

introduce Docker Compose

automate deployment with GitHub Actions

provision infrastructure using Terraform

add monitoring and logging