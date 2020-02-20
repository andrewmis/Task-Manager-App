var app = require('./app.js');
var debug = require('debug')('todo-list-app:server');
var http = require('http');
var cors = require('cors');

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.use(cors());
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  console.log(`Listening on port ${port}!`),
  debug('Listening on ' + port);
}
// const express = require('express');
// const server = express();
// const bodyParser = require('body-parser');

// const db = require('./db.json');

// server.use(express.json());
// server.use(express.urlencoded({ extended: false }));
// server.use(bodyParser.json())

// let todos = [{id: 1, name: 'Cohen Interview Assignment'}];

// const PORT = process.env.PORT || 3000

// server.get('/saved-lists', (req, res) => {
//     return res.json(db);
// });

// server.listen(PORT, () =>
//   console.log(`Listening on port ${PORT}!`),
// );
