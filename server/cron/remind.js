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
    const msg = {
      to: 'deepak.mallah@gmail.com',
      from: item.email,
      subject: `"${item.name}" will start @ ${item.startAt}`,
      text: `Hello, <br />This email is to Remind you about the event "${item.name}" which will start at ${item.startAt}`,
      html: `<p>Hello,</p><p>This email is to Remind you about the event <b>"${item.name}"</b> which will start at <b>${item.startAt}</b></p>`,
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

Reminder.find({status: true})
  .then(events => {
    var mailList = [];
    if(events.length){
      for(var i = 0; i < events.length; i++){
        var eventDate = new Date(events[i]["startAt"]);
        var d = new Date();

        var a = moment(d);
        var b = moment(eventDate);
        var diff = b.diff(a, 'minutes');

        if(diff <= events[i]["time"]) mailList.push(events[i]);
      }
    }

    return Promise.map(mailList, sendEmail)
  })
  .then(list => {
    if(list.length){
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