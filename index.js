const express = require('express');
const app = express();
const router = require('./server/routes.js');
const path = require('path');
const bodyParser = require('body-parser');

/**
 * Body Parser
 */
app.use(bodyParser.json());

/**
 * Template Engine
 */
app.set('view engine', 'ejs');
app.set('views',[path.join(__dirname, '/client/views')]);

/**
 * Route setup
 */
router.route(app);

/**
 * Server init
 * @type {number}
 */
var port = 6767;
app.listen(port, function () {
  console.log('Server running on port => ' + port);
});