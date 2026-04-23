# 🚀 MERN Stack Developer Portfolio

A professional, full-stack portfolio website built with MongoDB, Express.js, React, and Node.js.
Automatically pulls and displays your GitHub repositories with live stats.

---

## 📋 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Prerequisites — Software to Install](#prerequisites)
5. [Step-by-Step Setup](#setup)
6. [Environment Variables](#environment-variables)
7. [Running the App](#running)
8. [Customization Guide](#customization)
9. [Deploying to Production](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## 🛠 Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, React Router v6         |
| Backend  | Node.js, Express.js               |
| Database | MongoDB (Mongoose ODM)            |
| APIs     | GitHub REST API v3                |
| Email    | Nodemailer (Gmail SMTP)           |
| Styling  | Custom CSS, Google Fonts          |
| Animations | Framer Motion, CSS Keyframes    |
| Icons    | React Icons                       |
| Typing   | React Type Animation              |

---

## ✨ Features

- **Live GitHub Integration** — Repos auto-fetched from your GitHub account
- **Project Search & Filter** — Filter by language, sort by stars/forks/date
- **GitHub Stats Dashboard** — Stars, forks, followers, repo count
- **Contact Form with Email** — Messages saved to MongoDB + email notification
- **Animated Loading Screen** — Branded intro animation
- **Responsive Design** — Mobile-first, works on all devices
- **Dark Theme** — Elegant dark UI with accent colors
- **Skills Marquee** — Auto-scrolling technology showcase
- **Experience Timeline** — Professional history display
- **Rate Limiting** — API protection built-in

---

## 📁 Project Structure

```
portfolio/
├── package.json              ← Root package (runs both servers)
├── .gitignore
│
├── server/                   ← Express Backend
│   ├── index.js              ← Entry point
│   ├── package.json
│   ├── .env                  ← Your secrets (create from .env.example)
│   ├── routes/
│   │   ├── github.js         ← GitHub API routes
│   │   ├── contact.js        ← Contact form + email
│   │   └── stats.js          ← GitHub stats aggregation
│   └── models/
│       └── Message.js        ← MongoDB contact message schema
│
└── client/                   ← React Frontend
    ├── package.json
    ├── .env                  ← Frontend env vars
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js            ← Router setup
        ├── index.js          ← React root
        ├── index.css         ← Global styles & design tokens
        ├── components/
        │   ├── Navbar.js/.css
        │   ├── Footer.js/.css
        │   └── ProjectCard.js/.css
        ├── pages/
        │   ├── Home.js/.css   ← Hero, stats, featured projects
        │   ├── Projects.js/.css ← All repos with filter/search
        │   ├── About.js/.css  ← Bio, stack, timeline
        │   └── Contact.js/.css ← Contact form
        └── hooks/
            └── useGitHub.js  ← Custom React hooks for API calls
```

---

## ⚙️ Prerequisites — Software to Install

### 1. Node.js & npm

Node.js is the JavaScript runtime. npm comes bundled with it.

**Windows:**
1. Go to https://nodejs.org
2. Download the **LTS** version (e.g., 20.x)
3. Run the installer — accept all defaults
4. Verify: open Command Prompt and run:
   ```
   node --version
   npm --version
   ```
   You should see version numbers like `v20.x.x` and `10.x.x`

**macOS:**
```bash
# Install Homebrew first (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Node
brew install node

# Verify
node --version && npm --version
```

**Ubuntu/Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version && npm --version
```

---

### 2. MongoDB Community Server

MongoDB is the database that stores contact form messages.

**Windows:**
1. Go to https://www.mongodb.com/try/download/community
2. Select: Version = Latest, OS = Windows, Package = MSI
3. Download and run the installer
4. Check ✅ "Install MongoDB as a Service" (starts automatically)
5. Also install **MongoDB Compass** (GUI, offered in same installer)
6. Verify: open Command Prompt:
   ```
   mongod --version
   ```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Verify
mongod --version
```

**Ubuntu/Linux:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongod --version
```

---

### 3. Git

**Windows:** Download from https://git-scm.com/download/win, run installer.

**macOS:** `brew install git` or install Xcode Command Line Tools: `xcode-select --install`

**Linux:** `sudo apt-get install git`

Verify: `git --version`

---

### 4. Code Editor (VS Code Recommended)

Download VS Code: https://code.visualstudio.com

Recommended extensions:
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **MongoDB for VS Code**
- **Thunder Client** (API testing, like Postman)

---

## 🔑 Environment Variables

### Server — create `server/.env`

```bash
# Copy the example file
cp server/.env.example server/.env
```

Then edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio

# GitHub API — REQUIRED for fetching repos
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_USERNAME=your_github_username

# Email — OPTIONAL (for contact form email notifications)
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:3000
```

**How to get your GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name (e.g., "Portfolio Token")
4. Select scopes: ✅ `public_repo`, ✅ `read:user`
5. Click **Generate token**
6. Copy the token immediately (it won't show again!)
7. Paste it as `GITHUB_TOKEN` in your `.env`

**How to get Gmail App Password (for contact email):**
1. Go to your Google Account → Security
2. Enable **2-Step Verification** (required)
3. Search for "App passwords" in Google Account settings
4. Select App: Mail, Device: Other (enter "Portfolio")
5. Click Generate — copy the 16-character password
6. Use this as `EMAIL_PASS` (NOT your real Gmail password)

---

### Client — create `client/.env`

```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GITHUB_USERNAME=your_github_username
```

---

## ▶️ Running the App

### Option A — Run both servers with one command (recommended)

```bash
# 1. Go to the root portfolio folder
cd portfolio

# 2. Install ALL dependencies (root + server + client)
npm run install-all

# 3. Start both servers simultaneously
npm run dev
```

This starts:
- **Backend** at http://localhost:5000
- **Frontend** at http://localhost:3000

Your browser will open automatically at http://localhost:3000 🎉

---

### Option B — Run servers separately

**Terminal 1 — Backend:**
```bash
cd portfolio/server
npm install
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd portfolio/client
npm install
npm start
```

---

### Verify Everything is Working

Open your browser and check:
- http://localhost:3000 → React app loads
- http://localhost:5000/api/health → Should return `{"status":"OK",...}`
- http://localhost:5000/api/github/profile → Your GitHub profile JSON
- http://localhost:5000/api/github/repos → Your repositories JSON

---

## ✏️ Customization Guide

### 1. Change Your Name & Info

**`client/src/components/Navbar.js`** — Update the logo text:
```jsx
<span>&lt;YourActualName /&gt;</span>
```

**`client/src/components/Footer.js`** — Update name and social links:
```jsx
<span className="footer-logo">&lt;YourActualName /&gt;</span>
<a href="https://github.com/your-real-username" ...>
```

**`client/src/pages/Home.js`** — Update hero section:
```jsx
<h1>Hi, I'm <span className="hero-name">John Doe</span></h1>
```

**`client/src/pages/About.js`** — Update bio, experience, skills:
- Edit `techStack` array for your actual skills
- Edit `timeline` array for your real experience
- Update the avatar initials and name

**`client/src/pages/Contact.js`** — Update email and location

### 2. Change Colors / Theme

Edit CSS variables in `client/src/index.css`:
```css
:root {
  --accent: #6c63ff;   /* Main purple → change to your brand color */
  --accent2: #ff6584;  /* Pink accent */
  --accent3: #43e97b;  /* Green accent */
  --bg: #050508;       /* Background → change for light theme */
}
```

### 3. Add a Profile Photo

Replace the avatar letters with your actual photo:
```jsx
// In About.js, replace:
<div className="avatar">YN</div>

// With:
<img src="/profile.jpg" alt="Your Name" className="avatar-img" />
```
Put your photo in `client/public/profile.jpg`

### 4. Add Resume Download

Put your resume PDF in `client/public/resume.pdf`.
The download button in the Hero already links to `/resume.pdf`.

### 5. Update Meta Tags

Edit `client/public/index.html`:
```html
<meta name="description" content="John Doe — Full-Stack MERN Developer" />
<title>John Doe | Full-Stack Developer</title>
```

---

## 🌐 Deploying to Production

### Frontend → Vercel (Free, Recommended)

```bash
# Build the React app
cd client
npm run build

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts — set environment variables in Vercel dashboard
```

Or push to GitHub and connect repo at https://vercel.com

**Set these environment variables in Vercel:**
- `REACT_APP_API_URL` = `https://your-backend-url.com/api`

### Backend → Railway or Render (Free tier available)

**Railway:**
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repo → select `server` folder
4. Add environment variables from your `.env`
5. Railway auto-detects Node.js and deploys

**Render:**
1. Go to https://render.com
2. New → Web Service → Connect GitHub
3. Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Add all environment variables

### Database → MongoDB Atlas (Free Cloud MongoDB)

1. Go to https://cloud.mongodb.com
2. Create a free cluster (M0 — free forever)
3. Create a database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string → paste as `MONGO_URI` in your backend env:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
# Windows:
net start MongoDB

# macOS/Linux:
brew services start mongodb-community
# or
sudo systemctl start mongod
```

### "GitHub API rate limit exceeded"
- Make sure `GITHUB_TOKEN` is set in `server/.env`
- Without a token, GitHub limits to 60 requests/hour
- With a token, limit is 5000 requests/hour

### "Module not found" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors in browser
- Make sure `CLIENT_URL=http://localhost:3000` is in `server/.env`
- Make sure backend is running on port 5000

### Port already in use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 5000 (Mac/Linux)
lsof -ti:5000 | xargs kill
```

### React app shows "cannot fetch" from API
- Check that proxy in `client/package.json` is `"proxy": "http://localhost:5000"`
- Make sure backend server is actually running

---

## 📦 Useful npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both servers (run from root) |
| `npm run install-all` | Install all dependencies |
| `npm run build` | Build React for production |
| `cd server && npm run dev` | Start only backend with nodemon |
| `cd client && npm start` | Start only frontend |

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/github/profile` | Your GitHub profile |
| GET | `/api/github/repos` | All your public repos |
| GET | `/api/github/languages` | Language stats |
| GET | `/api/stats` | Stars, forks, followers count |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages (admin) |

---

## 🎨 Pages Overview

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, stats, featured projects, CTA |
| `/projects` | Projects | All repos with search & filter |
| `/about` | About | Bio, tech stack, timeline |
| `/contact` | Contact | Contact form with email |

---

Built with ❤️ using the MERN Stack
