const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
    
    // Decode URI component to support special characters or spaces in filenames
    try {
        filePath = decodeURIComponent(filePath);
    } catch(e) {
        console.error('Failed to decode filePath:', e.message);
    }

    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 File Not Found', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            const headers = { 'Content-Type': contentType };
            if (extname === '.html') {
                headers['Cache-Control'] = 'no-cache';
            } else {
                headers['Cache-Control'] = 'public, max-age=31536000, immutable';
            }
            res.writeHead(200, headers);
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running locally at http://localhost:${PORT}`);
});
