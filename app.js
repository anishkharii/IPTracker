const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress

    console.log(parseIp(req))
    const ip = parseIp(req);
    res.render("index",{ip});
});

app.listen(3000 || PROCESS.ENV.PORT, () => {
  console.log('Server is running on port 3000');
});
