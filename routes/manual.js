const express = require("express");
const isReachable = require("is-reachable");
var router = express.Router();

router.get('/',(req, res)=>{
    res.send("Hi this is a get request");
});

router.post('/', (req, res) => {
    let ans = req.body;
      console.log(ans);
      (async () => {
        let answer = [];
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


module.exports = router;
