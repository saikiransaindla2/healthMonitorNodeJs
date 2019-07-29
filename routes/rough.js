// const express = require("express");
// var router = express.Router();
// var client = require("../databases/dbConnection").clientRedis;

// router.post('/', (req, res) => {
//     let student = req.body;
//     let answer=[];
//     (async ()=>{
//         for(let i=1;i<=student.length;i++){
            
//             let prom = new Promise(resolve=>{
//                 client.get(student[i-1].url, (err, resp)=>{
//                     resolve(resp);
//                 })
//             })
//             prom.then(resp=>{
//                     if(resp){
//                         client.hmset(
//                             resp,
//                             "url",
//                             student[i - 1].url,
//                             "crawlTime",
//                             student[i - 1].crawlTime,
//                             "waitTime",
//                             student[i - 1].waitTime,
//                             "threshold",
//                             student[i - 1].threshold
//                           );
//                         answer.push("Updated the record of "+student[i-1].url);
//                     }
//                     else{//////NEED TO TRY OPTIMIZING IT
//                         await client.keys("urlData*", (err,resp)=>{
//                             let n= resp.length+1;
//                             client.hmset(
//                                 "urlData:" + n,
//                                 "url",
//                                 student[i - 1].url,
//                                 "crawlTime",
//                                 student[i - 1].crawlTime,
//                                 "waitTime",
//                                 student[i - 1].waitTime,
//                                 "threshold",
//                                 student[i - 1].threshold
//                               );
//                             answer.push("Inserted a new record of "+student[i-1].url);
//                         })
//                     }
//             })
//             // await client.get(student[i-1].url, (err,resp)=>{
//             //     console.log(err, resp);
//                 // (async ()=>{
//                 //     if(resp){
//                 //         client.hmset(
//                 //             resp,
//                 //             "url",
//                 //             student[i - 1].url,
//                 //             "crawlTime",
//                 //             student[i - 1].crawlTime,
//                 //             "waitTime",
//                 //             student[i - 1].waitTime,
//                 //             "threshold",
//                 //             student[i - 1].threshold
//                 //           );
//                 //         answer.push("Updated the record of "+student[i-1].url);
//                 //     }
//                 //     else{//////NEED TO TRY OPTIMIZING IT
//                 //         await client.keys("urlData*", (err,resp)=>{
//                 //             let n= resp.length+1;
//                 //             client.hmset(
//                 //                 "urlData:" + n,
//                 //                 "url",
//                 //                 student[i - 1].url,
//                 //                 "crawlTime",
//                 //                 student[i - 1].crawlTime,
//                 //                 "waitTime",
//                 //                 student[i - 1].waitTime,
//                 //                 "threshold",
//                 //                 student[i - 1].threshold
//                 //               );
//                 //             answer.push("Inserted a new record of "+student[i-1].url);
//                 //         })
//                 //     }
//                 // })()
//                 // if(resp){
//                 //     client.hmset(
//                 //         resp,
//                 //         "url",
//                 //         student[i - 1].url,
//                 //         "crawlTime",
//                 //         student[i - 1].crawlTime,
//                 //         "waitTime",
//                 //         student[i - 1].waitTime,
//                 //         "threshold",
//                 //         student[i - 1].threshold
//                 //       );
//                 //     answer.push("Updated the record of "+student[i-1].url);
//                 // }
//                 // else{//////NEED TO TRY OPTIMIZING IT
//                 //     await client.keys("urlData*", (err,resp)=>{
//                 //         let n= resp.length+1;
//                 //         client.hmset(
//                 //             "urlData:" + n,
//                 //             "url",
//                 //             student[i - 1].url,
//                 //             "crawlTime",
//                 //             student[i - 1].crawlTime,
//                 //             "waitTime",
//                 //             student[i - 1].waitTime,
//                 //             "threshold",
//                 //             student[i - 1].threshold
//                 //           );
//                 //         answer.push("Inserted a new record of "+student[i-1].url);
//                 //     })
//                 // }
//             //})
//             //res.send(answer);

       
                
//         }
//         res.send(answer);
//     })
    


// //     const pList2=[];
// //     for(let i=1;i<=student.length;i++){
// //         pList2.push(
// //             new Promise(resolve =>{
// //                 client.get(student[i-1].url, (err,resp)=>{
// //                         if(resp){
// //                             client.hmset(
// //                                 resp,
// //                                 "url",
// //                                 student[i - 1].url,
// //                                 "crawlTime",
// //                                 student[i - 1].crawlTime,
// //                                 "waitTime",
// //                                 student[i - 1].waitTime,
// //                                 "threshold",
// //                                 student[i - 1].threshold
// //                               );
// //                             resolve("Updated the record of "+student[i-1].url);
// //                         }
// //                         else{
// //                             client.keys("urlData*", (err,resp)=>{
// //                                 let n= resp.length+1;
// //                                 client.hmset(
// //                                     "urlData:" + n,
// //                                     "url",
// //                                     student[i - 1].url,
// //                                     "crawlTime",
// //                                     student[i - 1].crawlTime,
// //                                     "waitTime",
// //                                     student[i - 1].waitTime,
// //                                     "threshold",
// //                                     student[i - 1].threshold
// //                                   );
// //                                 resolve("Inserted a new record of "+student[i-1].url);
// //                             })
// //                         }
// //                 })
// //             })
// //         )
// //     }
// //     Promise.all(pList2)
// //     .then((result)=>{
// //         res.send(result);
// //     })

  
//   });
  
//   module.exports = router;
  