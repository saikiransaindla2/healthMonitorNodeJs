var express = require('express');
var router = express.Router();
const client = require('../databases/dbConnection').clientElastic;
/* GET users listing. */
router.get('/', function(req, res, next) {
  (async ()=>{
    const body = await client.search({
        index: 'health_monitor',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        
        body: {
          query: {
            match: { Url: req.query.site }
          },
          //sort :{ CreatedAt : { 'order' : 'asc' } }
        
        }
      })
      //TODO:
      //Need to catch error for no records
        console.log(body.hits.hits)
        res.send(body.hits.hits)
      
  })()
  //res.send(req.query);
});

module.exports = router;
