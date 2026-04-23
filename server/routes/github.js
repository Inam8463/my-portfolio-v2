const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_API = 'https://api.github.com';
const headers = () => ({
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
});

// GET /api/github/profile
router.get('/profile', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME;
    const { data } = await axios.get(`${GITHUB_API}/users/${username}`, { headers: headers() });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub profile', details: err.message });
  }
});

// GET /api/github/repos
router.get('/repos', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME;
    const { data } = await axios.get(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=30`,
      { headers: headers() }
    );
    // Filter and enrich repos
    const repos = data
      .filter((r) => !r.fork)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        topics: r.topics,
        updated_at: r.updated_at,
        watchers_count: r.watchers_count,
      }));
    res.json(repos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch repos', details: err.message });
  }
});

// GET /api/github/languages
router.get('/languages', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME;
    const { data: repos } = await axios.get(
      `${GITHUB_API}/users/${username}/repos?per_page=50`,
      { headers: headers() }
    );
    const langMap = {};
    await Promise.all(
      repos.slice(0, 20).map(async (repo) => {
        try {
          const { data: langs } = await axios.get(repo.languages_url, { headers: headers() });
          Object.entries(langs).forEach(([lang, bytes]) => {
            langMap[lang] = (langMap[lang] || 0) + bytes;
          });
        } catch (_) {}
      })
    );
    res.json(langMap);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch languages', details: err.message });
  }
});

module.exports = router;
