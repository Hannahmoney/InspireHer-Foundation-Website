# Phase 3 — GitHub Actions CI/CD Deployment

This phase automates the deployment process by using **GitHub Actions** to deploy the application to an EC2 server whenever code is pushed to the `main` branch.

This removes the need to manually SSH into the server, pull code, rebuild the Docker image, and restart the container.

---

## Architecture

### High Level Flow


Developer
│
▼
GitHub (push to main)
│
▼
GitHub Actions
│
▼
SSH into EC2
│
▼
Update code + rebuild Docker + restart container
│
▼
Updated application live


---

## Problem Solved

Before this phase, deployment required manual steps:

- SSH into EC2  
- run `git pull`  
- rebuild Docker image  
- restart container  

After this phase:

- deployment is automatic  
- every push triggers an update  
- no manual server access required  

---

## Prerequisites

- EC2 instance running  
- Docker installed on EC2  
- Application already deployed on EC2  
- GitHub repository created  

---

## Step 1 — Prepare EC2

SSH into the server:

```bash
ssh -i your-key.pem ubuntu@SERVER_IP
```
Ensure Docker works:

```bash
docker ps
```
Fix Git safe directory issue:

```bash
git config --global --add safe.directory /var/www/InspireHer-Foundation-Website
```
Ensure correct ownership:

```bash
sudo chown -R ubuntu:ubuntu /var/www/InspireHer-Foundation-Website
```

## Step 2 — Generate SSH Key (Local Machine)

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions"
```

Press enter for all prompts.

This creates:

private key → ~/.ssh/id_rsa

public key → ~/.ssh/id_rsa.pub

## Step 3 — Add Public Key to EC2

On EC2:

nano ~/.ssh/authorized_keys

Paste the contents of your public key:

cat ~/.ssh/id_rsa.pub

Save and exit.

## Step 4 — Add GitHub Secrets

Go to your repository:

Settings → Secrets and variables → Actions

Add the following secrets:

EC2_HOST = your-ec2-public-ip
EC2_USER = ubuntu
EC2_SSH_KEY = your-private-key
## Step 5 — Create GitHub Actions Workflow

Create this file in your repo:

.github/workflows/deploy.yml

Add the following content:

name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: SSH into EC2 and deploy
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /var/www/InspireHer-Foundation-Website

            git fetch origin
            git reset --hard origin/main

            docker rm -f inspireher-container || true

            docker build -t inspireher .

            docker run -d --name inspireher-container -p 3000:80 inspireher
## Step 6 — Trigger Deployment

Make a change locally:

git add .
git commit -m "test CI/CD deployment"
git push
Step 7 — Verify Deployment

Go to GitHub:

open your repository

click on Actions

observe the workflow running

After it completes, test your app:

http://EC2_PUBLIC_IP:3000
Deployment Workflow
Code change → Push → GitHub Actions → EC2 updated automatically
Outcome

The deployment process is now fully automated.

no manual SSH required

no manual Docker rebuild

consistent deployments on every push

Key Concepts Demonstrated

CI/CD pipeline with GitHub Actions

SSH-based remote deployment

automated Docker rebuild and restart

infrastructure interaction from pipeline

## Next Step
Phase 4 — Docker Compose
Phase 5 — Backend + Database
Phase 6 — Infrastructure as Code (Terraform)
Phase 7 — Monitoring & Logging
Phase 8 — Security & Reliability
Phase 9 — Multi-AZ & Scaling
Phase 10 — Container Orchestration (ECS/Kubernetes)
Phase 11 — CDN (CloudFront)