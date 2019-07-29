const fs = require("fs");
const isReachable = require("is-reachable");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const client = require('./databases/dbConnection').clientElastic;
const redClient = require('./databases/dbConnection').clientRedis;


function reg(R){
    console.log("RunID:", R);
    const pList=[];
    let promise1 = new Promise(resolve=>{
        redClient.keys('urlData*', (err,student)=>{
            for(i=0;i<student.length;i++)
            {
                pList.push(new Promise(resolve=> {
                    redClient.hgetall(student[i], function(err,result){
                        if(err) {
                            console.log(err)
                            throw err
                        }
                        resolve(result)
                    })
                }))
                    //'url', 'crawlTime', 'waitTime', 'threshold'
            }
            resolve()
        })
    })
    promise1
    .then(()=>{
        Promise.all(pList)
        .then(student => {
            console.log(student);
            //let i=1;
            for (let j = 0; j < student.length; j++) {
            console.log("abc", "student j : ", j, "checking");
        
            (async () => {
                for (let k = 0; k < student[j].threshold; k++) {
                //console.log("student[j]", student[j]);
                // console.log(Number(student[j].crawlTime));
                let obj = {
                    Url: student[j].url,
                    RunId: R,
                    Attempt: k + 1,
                    Health: await isReachable(student[j].url, {
                    timeout: Number(student[j].crawlTime)
                    }),
                    CreatedAt: new Date().toString()
                };
                //console.log(obj)
                    
                client.index({  
                    index: 'health_monitor',
                    body: {
                        Url: obj.Url,
                        RunId: obj.RunId,
                        Attempt: obj.Attempt,
                        Health: obj.Health,
                        CreatedAt: obj.CreatedAt
                    }
                    },function(err,resp,status) {
                        //console.log(resp);
                });
                if (obj.Health == true) {
                    console.log("pass", obj.Url);
                    break;
                } else {
                    if (k == student[j].threshold - 1) {
                    console.log("fail", obj.Url);
                    console.log(obj);
                    break;
                    }
                    await sleep(student[j].waitTime);
                    continue;
                }
                }
            })();
            }
            console.log("hi");
        });
        
    })

}
module.exports.reg = reg;
module.exports.sleep = sleep;

// const pList=[];
// let promise1 = new Promise(resolve=>{
//     redClient.keys('urlData*', (err,student)=>{
//         for(i=0;i<student.length;i++)
//         {
//             pList.push(new Promise(resolve=> {
//                 redClient.hgetall(student[i], function(err,result){
//                     if(err) {
//                         console.log(err)
//                         throw err
//                     }
//                     resolve(result)
//                 })
//             }))
//                 //'url', 'crawlTime', 'waitTime', 'threshold'
//         }
//         resolve()
//     })
// })
// promise1
// .then(()=>{
//     Promise.all(pList)
//     .then(student => {
//         console.log(student);
//         let i=1;
//         for (let j = 0; j < student.length; j++) {
//           console.log("abc", "student j : ", j, "checking");
      
//           (async () => {
//             for (let k = 0; k < student[j].threshold; k++) {
//               //console.log("student[j]", student[j]);
//               // console.log(Number(student[j].crawlTime));
//               let obj = {
//                 Url: student[j].url,
//                 RunId: i,
//                 Attempt: k + 1,
//                 Health: await isReachable(student[j].url, {
//                   timeout: Number(student[j].crawlTime)
//                 }),
//                 CreatedAt: new Date().toString()
//               };
//               //console.log(obj)
                 
//             client.index({  
//                   index: 'health_monitor',
//                   body: {
//                       Url: obj.Url,
//                       RunId: obj.RunId,
//                       Attempt: obj.Attempt,
//                       Health: obj.Health,
//                       CreatedAt: obj.CreatedAt
//                   }
//                 },function(err,resp,status) {
//                     //console.log(resp);
//             });
//             if (obj.Health == true) {
//                 console.log("pass", obj.Url);
//                 break;
//               } else {
//                 if (k == student[j].threshold - 1) {
//                   console.log("fail", obj.Url);
//                   console.log(obj);
//                   break;
//                 }
//                 await sleep(student[j].waitTime);
//                 continue;
//               }
//             }
//           })();
//         }
//         console.log("hi");
//       });
      
// })
