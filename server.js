const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => reply('hello world')
});

server.route({
  method: 'POST',
  path: '/generate',
  handler: (request, reply) => {
    const data = request.payload.url;
    console.log(data);

    reply('aasdasd');
  }
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
