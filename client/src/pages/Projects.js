import React, { useState, useMemo } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useGitHubRepos } from '../hooks/useGitHub';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos();
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('All');
  const [sort, setSort] = useState('updated');

  const languages = useMemo(() => {
    const langs = repos.map((r) => r.language).filter(Boolean);
    return ['All', ...new Set(langs)];
  }, [repos]);

  const filtered = useMemo(() => {
    let list = [...repos];
    if (search) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          (r.description || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    if (lang !== 'All') list = list.filter((r) => r.language === lang);
    if (sort === 'stars') list.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sort === 'forks') list.sort((a, b) => b.forks_count - a.forks_count);
    else list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return list;
  }, [repos, search, lang, sort]);

  return (
    <div className="projects-page section">
      <div className="container">
        <div style={{ paddingTop: '4rem' }}>
          <h1 className="section-title">My <span className="accent">Projects</span></h1>
          <p className="section-subtitle">
            {repos.length} repositories pulled live from GitHub
          </p>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              {languages.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading && <div className="spinner" />}
        {error && <div className="error-msg">⚠️ {error} — make sure your server is running and GitHub token is set.</div>}
        {!loading && !error && (
          <>
            <p className="results-count">{filtered.length} projects found</p>
            <div className="projects-grid">
              {filtered.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <span>🔍</span>
                <p>No projects match your search.</p>
                <button onClick={() => { setSearch(''); setLang('All'); }} className="btn btn-outline">Clear Filters</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
