const functions = require('firebase-functions');

// http request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);
  res.send(number.toString());
});

exports.toGoogle = functions.https.onRequest((req, res) => {
  console.log('salam')
  res.redirect('https://www.google.com');
});

exports.sayHello = functions.https.onCall((data, context) => {
  const name = data.name;
  return `Hello ${name}`;
});