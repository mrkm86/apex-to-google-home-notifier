var express = require('express');
var googlehome = require('./node_modules/google-home-notifier');
var ngrok = require('./node_modules/ngrok');
var bodyParser = require('body-parser');
var app = express();
const serverPort = 8080;

var deviceName = 'Google Home';
googlehome.device(deviceName);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//GET METHOD (ORACLE)
app.get('/test/google-home-notifier/api/message', function (req, res) {

  if (!req.query) return res.sendStatus(400)

  try {

    var items = {
      items: [
        {
          t_message: "009",
          t_google_home_ip_address: "192.168.1.1",
          t_row_id: "AAAWixAAAAACALjAAA"
        }
      ]
    };

    console.log("SEND:" + JSON.stringify(items));
    res.send(JSON.stringify(items));

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    res.send(err);
  }
})

//GET METHOD DELETE NOTIFICATION (ORACLE)
app.delete('/test/google-home-notifier/api/message', function (req, res) {

  if (!req.query) return res.sendStatus(400)

  try {

    console.log("SEND dELETE:");
    res.send("delete OK");

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    res.send(err);
  }
})

//GET METHOD (Googel Home Device)
app.post('test/google-home-notifier/api/message', urlencodedParser, function (req, res) {
  if (!req.query) return res.sendStatus(400)
  var text = req.query.text;

  if (text) {
    try {

      googlehome.notify(text, function (notifyRes) {
        console.log(notifyRes);
        res.send(deviceName + ' will say: ' + text + '\n');
      });

    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
      res.send(err);
    }
  }
  else {
    res.send('Please POST "text=Hello Google Home"');
  }

});

app.listen(serverPort, function () {
  ngrok.connect(serverPort, function (err, url) {
    console.log('-------------------------------------------------------');
    console.log('POST "text=Hello Google Home" to:');
    console.log('    http://localhost:' + serverPort + '/test/google-home-notifier/api/message');
    console.log('    ' + url + '/test/google-home-notifier/api/message');
    console.log('example:');
    console.log('curl -X POST -d "text=Hello Google Home" ' + url + '/test/google-home-notifier/api/message');
    console.log('-------------------------------------------------------');
  });
})
