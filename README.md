# Portfolio V2

My personal updated portfolio built with the MERN stack. Displays my projects, skills, and experience with live GitHub integration that automatically pulls my repositories and stats.

---

## About

This is the second version of my portfolio. The first was built with plain HTML, CSS, and JavaScript. This version is a full-stack app with a real backend, database, and live GitHub API integration.

I built this to level up from static websites to full-stack development and to have a portfolio that updates itself automatically as I push new projects to GitHub.

Live Demo: https://my-personal-portfolio-v2.netlify.app/

---

## Features

- Live GitHub integration — repos and stats pull automatically from my GitHub account
- Project search and filter by language, stars, and date
- GitHub stats dashboard — followers, total stars, forks, repo count
- Contact form that saves messages to MongoDB and sends email notifications
- Animated loading screen and smooth page transitions
- Fully responsive on mobile, tablet, and desktop
- Dark theme UI

---

## Tech Stack

- React 18 — frontend
- Node.js + Express.js — backend API
- MongoDB + Mongoose — database
- GitHub REST API — live repo data
- Nodemailer — contact form emails
- Framer Motion — animations

---

## Getting Started

git clone https://github.com/inam8463/Portfolio-V2.git <br>
cd Portfolio-V2 <br>
npm run install-all <br>
npm run dev <br>

Frontend runs at http://localhost:3000 <br>
Backend runs at http://localhost:5000 <br>

---

## Environment Variables

Create server/.env and add:

PORT=5000   <br>
MONGO_URI=mongodb://localhost:27017/portfolio <br>
GITHUB_TOKEN=your_github_token <br>
GITHUB_USERNAME=inam8463 <br>
EMAIL_USER=your_email@gmail.com  <br>
EMAIL_PASS=your_gmail_app_password  <br>
CLIENT_URL=http://localhost:3000  <br>

Create client/.env and add:

REACT_APP_API_URL=http://localhost:5000/api  <br>
REACT_APP_GITHUB_USERNAME=inam8463  <br>

---

## Pages

/ → Home — hero section, GitHub stats, featured projects <br>
/projects → All repositories with search and filter <br>
/about → Bio, tech stack, experience timeline <br>
/contact → Contact form <br>

---

## What I Learned

- Building a REST API with Node.js and Express
- Connecting and storing data in MongoDB
- Consuming third party APIs (GitHub REST API)
- Managing environment variables securely
- Structuring a full-stack MERN project

---

## Roadmap

- [ ] Add blog section
- [ ] Light mode toggle
- [ ] Admin dashboard to view contact messages

---
