import express from 'express';

const router = express.Router();

router.get('/repos', async (req, res): Promise<void> => {
  try {
    const GITHUB_USERNAME = 'dvkrithika72-snpsu';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional: To prevent rate limiting

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    // Fetch repositories sorted by updated time
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    let repos = await response.json();

    // Fetch additional contributed repositories explicitly requested
    const additionalRepos = [
      'HemanthKumar94/ShakthiFoundationsIndia',
      'kishoreeducation045-sudo/Pipeline-IQ',
      'kishoreeducation045-sudo/Multi-Cloud-DR-Orchestrator-Project'
    ];

    const additionalFetchPromises = additionalRepos.map(async (repoFullName) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.error(`Failed to fetch additional repo ${repoFullName}`, err);
      }
      return null;
    });

    const extraRepos = (await Promise.all(additionalFetchPromises)).filter(r => r !== null);
    
    // Combine, deduplicate, and filter out 'git-0' as requested
    const allRepos = [...repos, ...extraRepos].filter(repo => repo && repo.name !== 'git-0');
    const uniqueReposMap = new Map();
    allRepos.forEach(repo => {
      if (repo && repo.id) {
        uniqueReposMap.set(repo.id, repo);
      }
    });
    repos = Array.from(uniqueReposMap.values());
    
    // Sort by updated_at descending
    repos.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    
    // Format the response to only send what the frontend needs
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      updated_at: repo.updated_at,
      topics: repo.topics || []
    }));

    res.status(200).json({
      success: true,
      data: formattedRepos
    });
  } catch (error) {
    console.error('GitHub fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch GitHub data' });
  }
});

export default router;
