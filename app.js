const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res
        .status(200)
        .send('WCR の跡地')
        .end();
});

app.use(express.static('public', {
    index: false,
    redirect: false
}));

const listener = app.listen(8080, () => {
    const port = listener.address().port;
    const suffix = port == 80 ? '' : `:${port}`
    console.log(`http://localhost${suffix}/`);
    console.log('Ctrl+C to quit');
});
