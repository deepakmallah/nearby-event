/**
 * Created by deepak on 20/11/17.
 */

const Promise = require("bluebird");
const mongoose = require("mongoose");
const moment =require("moment");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://nearby:nearby123!@ds163301.mlab.com:63301/nearby");

var schema = new mongoose.Schema({
  name: String,
  eventId: String,
  email: String,
  time: Number,
  startAt: Date,
  status: Boolean
});

var Reminder = mongoose.model("Reminder", schema);

function sendEmail(item) {
  return new Promise((resolve, reject) => {
    console.log("itme", item, process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'deepak.mallah@gmail.com',
      from: item.email,
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail.send(msg)
      .then(res => {
        console.log("res res")
        resolve(item.id);
      })
      .catch(err => {
        resolve(0);
      });
  })
}

Reminder.find({status: false})
  .then(events => {
    var mailList = [];
    if(events.length){
      for(var i = 0; i < events.length; i++){
        var eventDate = new Date(events[i]["startAt"]);
        var d = new Date();

        var a = moment(d);
        var b = moment(eventDate);
        var diff = b.diff(a, 'minutes');

        console.log("events[i]", diff)
        if(diff >= events[i]["time"]) mailList.push({eventId: events[i]["eventId"], email: events[i]["email"], id: events[i]["_id"]});
      }

      console.log("mailList", mailList)
    }

    return Promise.map(mailList, sendEmail)
  })
  .then(list => {
    if(list.length){
      console.log("list list list list", list);
      return Reminder.update({ _id: { $in: list } },{ $set: { status : true } }, { multi: true })
    }else{
      return Promise.resolve(0);
    }
  })
  .then(final => {
    console.log("final", final);
    process.exit(0);
  })
  .catch(err => {
    console.log("Error occured", err)
    process.exit(0);
  });