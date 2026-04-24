import React from 'react';
import { FiCode, FiBook, FiTarget, FiHeart } from 'react-icons/fi';
import './About.css';

const techStack = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', "Python"] },
  { category: 'Database', items: ['MongoDB', 'MySQL'] },
  { category: 'DevOps', items: ['Git', 'AWS', 'GitHub Actions'] },
];

const timeline = [
  { year: 'Nov 2025-Present', title: 'Full-Stack Developer', org: 'ArchTechnologies', desc: 'Building scalable full-stack web applications and delivering clean, production-ready code' },
  { year: 'Jan 2025-Oct 2025', title: 'Freelance Full-Stack Developer', org: 'Developed and delivered MERN stack and React applications for various clients, building responsive, scalable web solutions from scratch.'},
  { year: '2023-2027', title: 'CS Degree', org: 'University', desc: 'Bachelor of Science in Computer Science.' },
];

export default function About() {
  return (
    <div className="about-page section">
      <div className="container" style={{ paddingTop: '4rem' }}>
        <h1 className="section-title">About <span className="accent">Me</span></h1>
        <p className="section-subtitle">The story, the stack, and the person behind the code</p>

        <div className="about-grid">
          {/* Left: Bio */}
          <div className="about-bio">
            <div className="avatar-wrapper">
          
             <img 
                src='/IMG_2622_1.jpg' 
                alt='Muhammad Inam' 
                className='avatar-img'
                /> 
              <div className="avatar-ring" />
            </div>
            <h2 className="bio-name">Muhammad Inam</h2>
            <p className="bio-role">Full-Stack MERN Developer</p>
            <div className="bio-text">
              <p>
                I'm a full-stack developer with 1+ years of experience building modern web applications. I specialize in the MERN stack and love turning complex problems into clean, performant solutions.
              </p>
              <p>
                When I'm not coding, I contribute to open-source, write technical blogs, and explore the space where design meets engineering.
                explore the intersection of design and engineering.
              </p>
            </div>
            <div className="bio-facts">
              {[
                { icon: <FiCode />, label: '10+ Projects' },
                { icon: <FiBook />, label: 'CS UnderGraduate' },
                { icon: <FiTarget />, label: 'Problem Solver' },
                { icon: <FiHeart />, label: 'Open Source' },
              ].map((f) => (
                <div key={f.label} className="fact-chip">
                  {f.icon} {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tech Stack */}
          <div className="about-stack">
            <h3 className="stack-title">Tech Stack</h3>
            {techStack.map((cat) => (
              <div key={cat.category} className="stack-category">
                <span className="stack-cat-label">{cat.category}</span>
                <div className="stack-items">
                  {cat.items.map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-section">
          <h2 className="section-title">Experience & <span className="accent">Education</span></h2>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content card">
                  <h4>{t.title}</h4>
                  <span className="timeline-org">{t.org}</span>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
