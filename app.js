const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res
        .status(200)
        .send('Final WCR')
        .end();
});

app.listen(8080, () => {
    console.log('http://localhost:8080/');
    console.log('Ctrl+C to quit');
});
