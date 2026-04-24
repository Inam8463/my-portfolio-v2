import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiGithub, FiDownload, FiCode, FiUsers, FiStar, FiGitBranch } from 'react-icons/fi';
import { useGitHubStats, useGitHubRepos } from '../hooks/useGitHub';
import ProjectCard from '../components/ProjectCard';
import './Home.css';

const skills = [
  { name: 'MongoDB', icon: '🍃', color: '#47a248' },
  { name: 'Express.js', icon: '⚡', color: '#888' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'JavaScript', icon: '🟨', color: '#f7df1e' },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { name: 'Git', icon: '🔀', color: '#f05032' },
  { name: 'REST APIs', icon: '🔗', color: '#ff6584' },
  { name: 'AWS', icon: '☁️', color: '#ff9900' },
];

export default function Home() {
  const { stats } = useGitHubStats();
  const { repos } = useGitHubRepos();
  const featured = repos.slice(0, 3);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-grid container">
          <div className="hero-content fade-up">
            <div className="hero-badge">
              <span className="badge-dot" />
              Available for hire
            </div>
            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">Muhammad Inam</span>
            </h1>
            <div className="hero-type">
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer', 2000,
                  'MERN Stack Engineer', 2000,
                  'React Specialist', 2000,
                  'Problem Solver', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <p className="hero-desc">
              I build scalable, high-performance web applications with modern technologies.
              Passionate about clean code, great UX, and open-source.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                View Projects <FiArrowRight />
              </Link>
              <a href="/resume.pdf" download className="btn btn-outline">
                <FiDownload /> Resume
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="code-window">
              <div className="window-bar">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="window-title">portfolio.js</span>
              </div>
              <pre className="code-block">{`const developer = {
  name: "Your Name",
  role: "Full-Stack Dev",
  stack: ["MongoDB", "Express",
          "React", "Node.js"],
  passion: "Building amazing
            web experiences",
  available: true,
};

export default developer;`}</pre>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-wheel" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: <FiCode />, label: 'Repositories', value: stats?.public_repos ?? '—' },
              { icon: <FiStar />, label: 'Total Stars', value: stats?.totalStars ?? '—' },
              { icon: <FiGitBranch />, label: 'Total Forks', value: stats?.totalForks ?? '—' },
              { icon: <FiUsers />, label: 'Followers', value: stats?.followers ?? '—' },
            ].map((s) => (
              <div key={s.label} className="stat-card card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="skills-section section">
        <div className="container">
          <p className="section-subtitle">Technologies I Work With</p>
          <div className="skills-track">
            <div className="skills-inner">
              {[...skills, ...skills].map((s, i) => (
                <div key={i} className="skill-chip">
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-section section">
        <div className="container">
          <h2 className="section-title">Featured <span className="accent">Projects</span></h2>
          <p className="section-subtitle">Pulled live from my GitHub — always up to date</p>
          {featured.length > 0 ? (
            <div className="featured-grid">
              {featured.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          ) : (
            <div className="spinner" />
          )}
          <div className="section-cta">
            <Link to="/projects" className="btn btn-outline">
              View All Projects <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner section">
        <div className="container">
          <div className="cta-inner">
            <FiGithub className="cta-icon" />
            <h2>Let's Build Something Together</h2>
            <p>Open to freelance projects, full-time roles, and exciting collaborations.</p>
            <Link to="/contact" className="btn btn-primary">
              Get In Touch <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}