const http = require('http');
const api = require('./api');
const env = process.env;

const hostname = env.HOST || '0.0.0.0';
const port = env.PORT || 3000;

const handle500 = (err, res) => {
  console.error(err);
  res.statusCode = 500
  res.end('Oops! Something went wrong 🥹');
}

const server = http.createServer((req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  if (req.method == 'GET' && req.url == '/') {
    res.end('Hello World HTTP');
  } else if (req.method == 'GET' && req.url == '/dows') {
    api.loadData()
      .then(r => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(r)); 
      })
      .catch(e => handle500(e, res));
  } else if (req.method == 'PUT' && req.url == '/dows') {
    api.insertData()
      .then(r => {
        res.setHeader('Content-Type', 'application/json');
        res.end({"insert" : true}); 
      })
      .catch(e => handle500(e, res));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }

});

server.listen(port, hostname, () => {
  console.log(`HTTP Server running at http://${hostname}:${port}/`);
});