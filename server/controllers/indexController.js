'use strict';

module.exports = (req, res) => {

  res.render('index.ejs', {msg: "Hello World"});
}