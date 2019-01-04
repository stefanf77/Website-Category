const request = require('request');
const bodyParser = require('body-parser');
const config = require('./config.json');
const express = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const headers = {
    'Content-Type': 'application/json'
};

function buildRequestBody(link) {
    return `{
      "url": ${link},
      "features": {
        "categories": {
          "limit": 1
        }
      }
    }`
}

function buildHttpOptions(link) {
    return {
        url: config.url,
        method: 'POST',
        headers: headers,
        body: buildRequestBody(link),
        auth: {
            'user': config.user,
            'pass': config.apikey
        }
    }
}

app.listen(config.port, () => {});


app.route('/api/category').post((req, res) => {
    const websiteLink = JSON.stringify(req.body.websiteLink);

    request(buildHttpOptions(websiteLink), function (err, data, response) {
      if (JSON.parse(response).error === undefined) {
          res.json(JSON.parse(response).categories[0].label);
      } else {
          res.status(400).json(JSON.parse(response));
      }
    });
});
