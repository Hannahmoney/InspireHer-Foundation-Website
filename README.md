# InspireHer Empowerment Initiative — Landing Page

This project demonstrates the end-to-end deployment of a React application using AWS infrastructure, Nginx, and a manual CI/CD workflow.

The application is built locally, pushed to GitHub, and deployed to an EC2 server where Nginx serves the production build.

---

# Architecture

## High Level Architecture

```
User Browser
     │
     ▼
Domain (Namecheap)
     │
     ▼
DNS (AWS Route 53)
     │
     ▼
EC2 Public IP
     │
     ▼
Nginx Web Server
     │
     ▼
React Static Files
```

Users access the site through the domain. DNS resolves the domain to the EC2 instance, where Nginx serves the compiled React application.

---

# Project Components

## React Application

- Built with **React + Vite**
- UI components live inside `src/`
- Static assets live inside `public/`
- Production files are generated in `dist/`

Example structure:

```
src/
  App.jsx
  App.css

public/
  gallery/
  partners/

dist/
  index.html
  assets/
```

The browser only interacts with the compiled production files.

# Development Setup

## Create React App

```bash
npm create vite@latest inspireher-landing -- --template react
cd inspireher-landing
npm install
```

Run locally:

```bash
npm run dev
```
Production build after cloning the repo to server:

```bash
npm install
npm run build
```
---

## EC2 Server

An Ubuntu EC2 instance hosts the application.

Installed software:

- Nginx
- Node.js
- Git

```
sudo apt update
sudo apt install nginx git -y
sudo apt install nodejs npm -y

Server responsibilities:

- Pull latest code from GitHub
- Build production assets
- Serve static files

---

## Nginx Web Server

Nginx serves the React application.

Example configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/inspireher-site;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The `try_files` rule ensures React routing works correctly.

---

# Domain and DNS

The domain is purchased from **Namecheap**.

DNS is managed using **AWS Route 53**.

Steps:

1. Create hosted zone in Route 53
2. Update Namecheap nameservers
3. Create DNS records

Example DNS records:

```
A record   @      → EC2 Public IP
A record   www    → EC2 Public IP
```

You can allocate an elastic IP to EC2 instance so no manual updates to the IP in the DNS records if EC2 is restarted and public IP chnages.

Update nginx config files at, enable it and set as default

```
sudo nano /etc/nginx/sites-available/$name of file

sudo ln -s /etc/nginx/sites-available/inspireher /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```
---

# HTTPS with Let's Encrypt

SSL certificates are issued using **Certbot**.

Install Certbot:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

Generate certificate:

```bash
sudo certbot --nginx
```

Features:

- HTTPS enabled
- Automatic renewal
- HTTP → HTTPS redirect

---

# GitHub Setup

Initialize Git:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

Connect repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

# EC2 Server Setup

## SSH into the server

```bash
ssh -i your-key.pem ubuntu@SERVER_IP
```

## Install required packages

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nginx git nodejs npm -y
```

Enable Nginx:

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

# Server Directory Layout

```
/var/www
   │
   ├── inspireher-repo
   │      └── inspireher-landing
   │            ├── src
   │            ├── public
   │            └── dist
   │
   └── inspireher-site
          ├── index.html
          └── assets
```

- `inspireher-repo` → source code repository
- `inspireher-site` → production files served by Nginx

---

# Deployment Workflow (Manual CI/CD)

The deployment pipeline is intentionally simple.

```
Developer Machine
       │
       ▼
Push Code to GitHub
       │
       ▼
SSH into EC2
       │
       ▼
Pull Latest Code
       │
       ▼
Build React Production Files
       │
       ▼
Copy Files to Nginx Web Directory
       │
       ▼
Reload Nginx
```

---

# Deploy Commands

SSH into server:

```bash
ssh ubuntu@SERVER_IP
```

Pull latest code:

```bash
cd /var/www/inspireher-repo/inspireher-landing
git pull
```

Build the application:

```bash
npm install
npm run build
```

Deploy the new build:

```bash
sudo rm -rf /var/www/inspireher-site/*
sudo cp -r dist/* /var/www/inspireher-site/
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

If the website is not up, enable 

The updated website becomes live immediately.

---

# Updating the Website

When making updates:

1. Update files locally (React components or images)
2. Commit and push to GitHub
3. SSH into EC2
4. Pull the latest code
5. Build the new production files
6. Deploy the updated `dist` folder
7. Reload Nginx

Example:

```bash
git add .
git commit -m "Update outreach photos"
git push
```

Server deploy:

```bash
git pull
npm run build
sudo cp -r dist/* /var/www/inspireher-site/
sudo systemctl reload nginx
```

---

# Key Concepts Demonstrated

This project demonstrates:

- React production builds
- Static site hosting with Nginx
- Domain configuration using Route 53
- SSL certificate automation with Let's Encrypt
- Manual CI/CD deployment workflow
- Cloud deployment using AWS EC2

---

# Future Improvements.

Potential enhancements include:

- GitHub Actions CI/CD pipeline
- Docker containerization
- CloudFront CDN integration
- Infrastructure as Code (Terraform)
- Monitoring and logging
- Adding Backed and RDS
- Move to microservices architecture
- Multi AZ deployment
- Push to Kubernetes and/ecs deployment