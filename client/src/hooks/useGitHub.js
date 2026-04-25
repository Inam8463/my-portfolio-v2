import { useState, useEffect } from 'react';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'Inam8463';
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const headers = TOKEN ? {
  Authorization: `token ${TOKEN}`
} : {};

export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=30`, { headers })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork));
        } else {
          setError(data.message);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading, error };
}

export function useGitHubProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${GITHUB_API}/users/${USERNAME}`, { headers })
      .then(r => r.json())
      .then(data => {
        if (data.login) setProfile(data);
        else setError(data.message);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}

export function useGitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100`, { headers })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats({
            public_repos: data.length,
            totalStars: data.reduce((acc, r) => acc + r.stargazers_count, 0),
            totalForks: data.reduce((acc, r) => acc + r.forks_count, 0),
            followers: 0,
          });
        }
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}