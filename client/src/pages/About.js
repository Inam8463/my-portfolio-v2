import React from 'react';
import { FiCode, FiBook, FiTarget, FiHeart } from 'react-icons/fi';
import './About.css';

const techStack = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io'] },
  { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose', 'Prisma'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'GitHub Actions', 'Nginx', 'Linux'] },
];

const timeline = [
  { year: '2024', title: 'Senior Developer', org: 'TechCorp', desc: 'Leading MERN stack projects and mentoring junior developers.' },
  { year: '2022', title: 'Full-Stack Developer', org: 'StartupXYZ', desc: 'Built and shipped 5+ production web applications.' },
  { year: '2020', title: 'Junior Developer', org: 'AgencyABC', desc: 'Developed React frontends and REST APIs for clients.' },
  { year: '2019', title: 'CS Degree', org: 'University', desc: 'Bachelor of Science in Computer Science.' },
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
              <div className='avatar'>YN</div>
             {/* <img src='/IMG_2622_1.jpg' alt='Muhammad Inam' className='avatar-img'/> */}
              <div className="avatar-ring" />
            </div>
            <h2 className="bio-name">Muhammad Inam</h2>
            <p className="bio-role">Full-Stack MERN Developer</p>
            <div className="bio-text">
              <p>
                I'm a passionate full-stack developer with 5+ years of experience building modern web applications.
                I specialize in the MERN stack and love turning complex problems into elegant, performant solutions.
              </p>
              <p>
                When I'm not coding, I contribute to open-source projects, write technical blogs, and
                explore the intersection of design and engineering.
              </p>
            </div>
            <div className="bio-facts">
              {[
                { icon: <FiCode />, label: '50+ Projects' },
                { icon: <FiBook />, label: 'CS Graduate' },
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
