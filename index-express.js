const express = require('express');
const http = require('http');
const api = require('./api');
const env = process.env;

const hostname = env.HOST || '0.0.0.0';
const port = env.PORT || 3000;

const app = express();

const handle500 = (err, res) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong 🥹');
}

app.get('/', (req, res) => {
  res.send('Hello World Express');
});

app.get('/dows', (req, res) => {
  api.loadData()
    .then(r => res.json(r))
    .catch(e => handle500(e, res));
});

app.put('/dows', (req, res) => {
  api.insertData()
    .then(() => res.json({"insert" : true}))
    .catch(e => handle500(e, res));
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Express Server running at http://${hostname}:${port}/`);
});