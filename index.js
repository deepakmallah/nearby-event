const express = require('express');
const app = express();
const router = require('./server/routes.js');
const path = require('path');

//ROUTE
router.route(app);

//SERVER
var port = 6767;
app.listen(port, function () {
  console.log('Server running on port => ' + port);
});