const express = require("express");
const isReachable = require("is-reachable");
var router = express.Router();

var client = require("../databases/dbConnection").clientRedis;

router.get('/',(req, res)=>{
    res.send("Hi this is get request");
});



router.post('/', (req, res) => {
  let student = req.body;

  let n = 1;
  client.keys("urlData*", (err, resp) => {
    let k = resp;
    n = k.length;

    for (i = 1; i <= student.length; i++) {
      j = n + i;
      client.hmset(
        "urlData:" + j,
        "url",
        student[i - 1].url,
        "crawlTime",
        student[i - 1].crawlTime,
        "waitTime",
        student[i - 1].waitTime,
        "threshold",
        student[i - 1].threshold
      );
    }
    ///Should I add a promise here too??
    console.log("Everything added");

    const pList = []; ///LIST OF PROMISES
    for (i = n + 1; i <= n + student.length; i++) {
      pList.push(
        new Promise(resolve => {
          client.hgetall("urlData:" + i, function(err, result) {
            if (err) {
              console.log(err);
              throw err;
            }
            resolve(result);
          });
        })
      );
    }

    Promise.all(pList).then(ans => {
      console.log(ans);
      (async () => {
        var answer = [];
        ///Should add one more promise here
        for (i = 0; i < ans.length; i++) {
          answer.push({
            url: ans[i].url,
            health: await isReachable(ans[i].url, {
              timeout: Number(ans[i].crawlTime)
            })
          });
          console.log(i, Number(ans[i].crawlTime));
        }
        console.log(answer);
        res.json(answer); ///////FINAL RESPONSE TO POST REQUEST
      })();
    });
  });

});

module.exports = router;
