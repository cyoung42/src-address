// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const client = require('mariasql');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Setup Mariadb
var c = new client({
  host: '127.0.0.1',
  user: 'root',
  password: ''
});

c.query("CREATE DATABASE IF NOT EXISTS srcAddress", function(err, rows) {
  if (err) {
    throw err;
  } else {

    //entryname
    //companyname *
    //recipientname *
    //street1 *
    //street2
    //city *
    //state *
    //zip *

    c.query("CREATE TABLE IF NOT EXISTS srcAddress.addressBook ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, entryname VARCHAR(60) NOT NULL, companyname VARCHAR(60) NOT NULL, recipientname VARCHAR(60) NOT NULL, street1 VARCHAR(60) NOT NULL, street2 VARCHAR(60), city VARCHAR(30) NOT NULL, state VARCHAR(2) NOT NULL, zip VARCHAR(10) NOT NULL, added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP )", function(err, rows) {
      if (err)
        throw err;
    })
  }
});

c.end();

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
