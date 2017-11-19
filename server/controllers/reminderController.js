'use strict';

const Promise = require("bluebird");
const request = require("request");
const token = "KFIMKJ3IIGGSXHEVAULZ";
const event =  require("../model/event");

module.exports = (req, res) => {

  function getCategories(params) {
    return new Promise((resolve, reject) => {
      if(!params.eventId) reject("details missing");
      request(`https://www.eventbriteapi.com/v3/events/${params.eventId}?token=${token}`, function (error, response, body) {
        if (error) resolve(0);

        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        }
      });
    });
  }


  getCategories(req.params)
    .then(eventData => {
      var tmp = req.params;
      tmp.name = eventData.name ? eventData.name.text : "";
      tmp.startAt = eventData.start ? eventData.start.utc : "";
      return event.insertEvent(tmp)
    })
    .then(res => {
      res.send(res)
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).send(err);
    });
};
