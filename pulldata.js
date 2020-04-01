// Script to get network node data from covid19.th-stat.com
// Developer: @windygallery
// Date: 1 April 2020 21:50
// $node pulldata > data-2020-04-01.js

const https = require('https');

function cutData(text) {
  let array = text.split("\n");
  for(var i=0;i<array.length;i++) {
    // var data_case = [{"id":220,"rid":"1636-16
    if(/var data_case = \[{/.test(array[i])) {
      return array[i];
    }
  }
}

https.get('https://covid19.th-stat.com/th/network', (resp) => {
  let data  = '';
  let go    = false;

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data  += chunk;
  });
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    // console.log(JSON.parse(data).explanation);
    // console.log(data);
    console.log(cutData(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
