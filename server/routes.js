"use strict";

function route(app) {
  // index page
  app.get("/", require('./controllers/indexController'));
}

module.exports.route = route;