const express = require('express');
const path = require('path');

const app = express();

// static files
app.use(express.static('docs', {
    index: false,
    redirect: false
}));

// root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    const suffix = port == 80 ? '' : `:${port}`
    console.log(`http://localhost${suffix}/`);
    console.log('Ctrl+C to quit');
});
