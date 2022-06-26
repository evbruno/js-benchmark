const fastify = require('fastify')();

const api = require('./api');
const env = process.env;

const hostname = env.HOST || '0.0.0.0';
const port = env.PORT || 3000;

const handle500 = (err, res) => {
  console.error(err);
  res.statusCode = 500
  res.send('Oops! Something went wrong 🥹\n`');
}

fastify.get('/', (req, res) => {
  res.send('Hello World Fastify');
});

fastify.get('/dows', (req, res) => {
  api.loadData()
    .then(r => res.send(r))
    .catch(e => handle500(e, res));
});

fastify.put('/dows', (req, res) => {
  api.insertData()
    .then(() => res.send({"insert" : true}))
    .catch(e => handle500(e, res));
})

fastify.listen({port: port, host: hostname}, () => {
  console.log(`Fastify Server running at http://${hostname}:${port}/`);
});