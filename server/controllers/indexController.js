'use strict';

const Promise = require("bluebird");
const request = require("request");
const token = "KFIMKJ3IIGGSXHEVAULZ";

module.exports = (req, res) => {
  var hosturl = process.env.HOST_URL || "http://127.0.0.1:3000";
  function getCategories() {
    return new Promise((resolve, reject) => {
      request(`https://www.eventbriteapi.com/v3/categories?token=${token}`, function (error, response, body) {
        if(error) resolve(0);

        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body));
        }
      });
    })
  }

  getCategories()
    .then((resData) => {
      res.render('index.ejs', {categories: JSON.stringify(resData.categories), hosturl: hosturl});
    })
    .catch((err) => {
      console.log("Error occured", err)
      res.status(500).send(err);
    });
};