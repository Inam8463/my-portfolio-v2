import { useState, useEffect } from 'react';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'Inam8463';

export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=30`)
      .then(r => r.json())
      .then(data => setRepos(data.filter(r => !r.fork)))
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
    fetch(`${GITHUB_API}/users/${USERNAME}`)
      .then(r => r.json())
      .then(data => setProfile(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}

export function useGitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100`)
      .then(r => r.json())
      .then(data => {
        const totalStars = data.reduce((acc, r) => acc + r.stargazers_count, 0);
        const totalForks = data.reduce((acc, r) => acc + r.forks_count, 0);
        setStats({
          public_repos: data.length,
          totalStars,
          totalForks,
        });
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}