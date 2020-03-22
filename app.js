const express = require('express');
const path = require('path');

const app = express();

// app config
app.disable('x-powered-by');

// static files
app.use(express.static('public', {
    index: false,
    redirect: false
}));

// root
app.get('/', (req, res) => {
    if (req.hostname !== 'localhost' && req.get('X-Forwarded-Proto') === 'http') {
        res.redirect(301, `https://${req.hostname}/`).end();
        return;
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

// other docs
const redirectToRoot = (req, res) => res.redirect(301, '/');
const anyDocPaths = /.+(\/|\.html|\.php|\.cgi)$/;
app.get(anyDocPaths, redirectToRoot);
app.post(anyDocPaths, redirectToRoot);

// 404 handler
app.use((req, res, next) => {
    res
        .status(404)
        .set('Content-Type', 'text/plain')
        .send('Not Found')
        .end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    const suffix = port == 80 ? '' : `:${port}`
    console.log(`http://localhost${suffix}/`);
    console.log('Ctrl+C to quit');
});
