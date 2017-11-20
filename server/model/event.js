/**
 * Created by deepak on 20/11/17.
 */

const Promise = require("bluebird");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://nearby:nearby123!@ds163301.mlab.com:63301/nearby");
var schema = new mongoose.Schema({
  name: String,
  eventId: String,
  email: String,
  time: Number,
  startAt: Date,
  status: {type: Boolean, default: false}
});

const Reminder = mongoose.model("Reminder", schema);

var event = module.exports = {};

event.insertEvent = function(eventData) {
  return new Promise((resolve, reject) => {
    var data = new Reminder(eventData);
    data.save()
      .then(item => {
        resolve(item);
      })
      .catch(err => {
        console.log("err err err err", err)
        reject(err);
      });
  });
};
