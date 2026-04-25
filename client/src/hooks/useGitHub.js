import { useState, useEffect } from 'react';
import axios from 'axios';

// const API = process.env.REACT_APP_API_URL || '/api';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'Inam8463';

export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/github/repos`)
      .then((r) => setRepos(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading, error };
}

export function useGitHubProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/github/profile`)
      .then((r) => setProfile(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}

export function useGitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/stats`)
      .then((r) => setStats(r.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
