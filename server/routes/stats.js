const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/stats — GitHub contribution stats
router.get('/', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME;
    const headers = { Authorization: `token ${process.env.GITHUB_TOKEN}` };

    const { data: repos } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );

    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
    const { data: user } = await axios.get(`https://api.github.com/users/${username}`, { headers });

    res.json({
      public_repos: user.public_repos,
      followers: user.followers,
      totalStars,
      totalForks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
