import React from 'react';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';
import './ProjectCard.css';

const langColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
  HTML: '#e34f26', CSS: '#1572b6', Java: '#b07219', 'C++': '#f34b7d',
  Go: '#00add8', Rust: '#dea584', Ruby: '#701516', PHP: '#4f5d95',
  Swift: '#fa7343', Kotlin: '#7f52ff', Dart: '#00b4ab', 'C#': '#178600',
};

export default function ProjectCard({ repo, index }) {
  const delay = (index % 6) * 80;

  return (
    <div
      className="project-card card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="pc-header">
        <div className="pc-icon">
          {repo.name.charAt(0).toUpperCase()}
        </div>
        <div className="pc-actions">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title="GitHub" className="pc-link">
            <FiGithub />
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" title="Live Demo" className="pc-link">
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      <h3 className="pc-name">{repo.name.replace(/-/g, ' ')}</h3>
      <p className="pc-desc">{repo.description || 'No description provided.'}</p>

      {repo.topics?.length > 0 && (
        <div className="pc-topics">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      )}

      <div className="pc-footer">
        {repo.language && (
          <span className="pc-lang">
            <span
              className="lang-dot"
              style={{ background: langColors[repo.language] || '#888' }}
            />
            {repo.language}
          </span>
        )}
        <div className="pc-stats">
          <span className="pc-stat"><FiStar /> {repo.stargazers_count}</span>
          <span className="pc-stat"><FiGitBranch /> {repo.forks_count}</span>
        </div>
      </div>
    </div>
  );
}
