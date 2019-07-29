function msg(str){
    console.log(str);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

module.exports.msg = msg;
module.exports.sleep = sleep;