const fs = require("fs");
const https = require("https");
const request = require("request");
const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");
const FormData = require("form-data");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function getFileName(url) {
  const match = url.match(/[^\/\.]+\.[^\.]+$/);
  return match[0];
}

function getImage(url) {
  return new Promise(resolve => {
    request({ method: "GET", url, encoding: null }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        resolve(null);
      } else {
        resolve(body);
      }
    });
  });
}

exports.imageClassification = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const form = new FormData();
    const image = await getImage(req.body.image.replace("normal.", "400x400."));
    form.append("id", req.body.id);
    form.append("apikey", functions.config().ai_maker.apikey);
    form.append("file", image, getFileName(req.body.image));
    form.submit(
      "https://aimaker.io/image/classification/api",
      (err, apiResponse) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: true });
          return;
        }

        chunks = [];
        apiResponse
          .on("data", chunk => {
            chunks.push(chunk);
          })
          .on("end", () => {
            const body = Buffer.concat(chunks).toString();
            const labels = JSON.parse(body);
            console.info(labels);
            res.json(labels);
          });
      }
    );
  });
});
