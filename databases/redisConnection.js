var redis = require('redis');
var client = redis.createClient(); //creates a new client
var promise1 = new Promise((resolve, reject)=>{
    client.on("connect", () => {
        console.log('connected to redis');
        resolve()
    })
    client.on("error",(err)=>{
        console.log('something wrong : '+err)
        reject(err)
    })
})

module.exports = client;