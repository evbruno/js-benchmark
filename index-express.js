const express = require('express');
const http = require('http');
const api = require('./api');
const env = process.env;

const hostname = env.HOST || '0.0.0.0';
const port = env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World Express');
});

app.get('/dows', (req, res) => {
  api.loadData().then(r => res.json(r));
});

app.put('/dows', (req, res) => {
  api.insertData().then(() => res.json({"insert" : true}));
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong 🥹');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Express Server running at http://${hostname}:${port}/`);
});