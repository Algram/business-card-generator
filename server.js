const path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const pdf1 = require('./pdf1.js');
const pdf2 = require('./pdf2.js');

// Create a server with a host and port
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  host: 'localhost',
  port: 8000
});

server.register(Inert, () => {});

// Add the route
server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: '.',
      listing: false,
      index: true
    }
  }
});

server.route({
  method: 'POST',
  path: '/generate',
  handler: (request, reply) => {
    const data = request.payload;

    if (data.selectedDesign == 1) {
      pdf1.generate(data, () => reply());
    } else if (data.selectedDesign == 2) {
      pdf2.generate(data, () => reply());
    }
  }
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
