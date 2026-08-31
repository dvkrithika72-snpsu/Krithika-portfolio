const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/users/dvkrithika72-snpsu/repos?sort=updated&per_page=10',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const repos = JSON.parse(data);
    if (Array.isArray(repos)) {
      repos.forEach(repo => console.log(repo.name));
    } else {
      console.log('Error:', repos);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
