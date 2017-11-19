'use strict';

const Promise = require("bluebird");
const request = require("request");
const token = "KFIMKJ3IIGGSXHEVAULZ";

module.exports = (req, res) => {
  var params = req.params;

  function getEvents() {
    return new Promise((resolve, reject) => {

      var url = `https://www.eventbriteapi.com/v3/events/search?token=${token}&location.latitude=${params.lat}&location.longitude=${params.lon}`;

      if(params.radius && params.radius !== "null"){
        url += `&location.within=${params.radius}km`;
      }

      if(params.category && params.category !== "null"){
        url += `&categories=${params.category}`;
      }

      request(url, function (error, response, body) {
        if(error) reject(error);

        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        }
      });
    })
  }

  getEvents()
    .then((resData) => {
      res.send(resData)
    })
    .catch((err) => {
      console.log("Error occured", err)
    });
};
