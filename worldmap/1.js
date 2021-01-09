const fs = require('fs');
// const svg = fs.readFileSync('world.svg');
const svg = fs.readFileSync('world-robinson.svg');

require('http')
  .createServer((req, res) => {
    if (req.url === '/world.svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.end(svg);
    }
    const body = fs.readFileSync('1.html');
    res.end(body);
  })
  .listen(3000);
