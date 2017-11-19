"use strict";

function route(app) {
  // index page
  app.get("/", require('./controllers/indexController'));
  app.get("/events/:lon/:lat/:radius/:category", require('./controllers/eventController'));
  app.get("/reminder/:id/:email", require('./controllers/reminderController'));
}

module.exports.route = route;