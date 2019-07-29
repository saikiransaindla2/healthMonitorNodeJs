const express = require("express");
var router = express.Router();
var client = require("../databases/dbConnection").clientRedis;

router.post("/", (req, res) => {
  let student = req.body;
  console.log(student);
  let answer = [];
  answer.push("hello");
  (async () => {
    for (let i = 1; i <= student.length; i++) {
      let prom = new Promise(resolve => {
        client.get(student[i - 1].url, (err, resp) => {
          if (resp) {
            client.hmset(
              resp,
              "url",
              student[i - 1].url,
              "crawlTime",
              student[i - 1].crawlTime,
              "waitTime",
              student[i - 1].waitTime,
              "threshold",
              student[i - 1].threshold
            );
            answer.push("Updated the record of " + student[i - 1].url);
            resolve();
          } else {
            //////NEED TO TRY OPTIMIZING IT
            client.keys("urlData*", (err, resp) => {
              let n = resp.length + 1;
              client.hmset(
                "urlData:" + n,
                "url",
                student[i - 1].url,
                "crawlTime",
                student[i - 1].crawlTime,
                "waitTime",
                student[i - 1].waitTime,
                "threshold",
                student[i - 1].threshold
              );
              client.set(student[i - 1].url, "urlData:" + n);
              answer.push("Inserted a new record of " + student[i - 1].url);
              resolve();
            });
          }
        });
      });
      await prom;
    }
    res.send(answer);
  })();
});

module.exports = router;
