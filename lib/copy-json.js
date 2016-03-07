'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
const stdout = '/dev/stdout';


let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
let outFile = process.argv[3] ? process.argv[3] : stdout;
let outFileFlag = outFile === stdout ? 'a' : 'w';

let pReadFile = (filename, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, options, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

let pWriteFile = (filename, content, options) =>{
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, options, error => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};

// pReadFile(inFile, {encoding: 'utf8'})

//callback  used for readFile and writeFile
//error handling for callback in readFile and writeFile. Alson for JSON.parse
//during the chain , i need to parse the JSON and also "do something",

// then stringify the object

// lastly log "copied" to terminal
pReadFile(inFile, {encoding: 'utf8'})
.then(JSON.parse) // parse the JSON string from the file into a JS object
.then(pojo => pojo) // do somthing w/ the result of JSON.parse (replace with function)
.then(pojo => JSON.stringify(pojo, null, 2)) // make string out of the pojo
.then(foo => pWriteFile(outFile, foo, {flag: outFileFlag}))
.then(() => console.log('\ncopied'))
.catch(console.error);


//fs.readFile(inFile, { encoding: 'utf8' }, (error, data) => { //signature is a callback
  // let json, pojo;
  // if (error) { // error handling
  //   console.error(error.stack);
  //   return;
  // }
  //
  // // parse the data into JSON
  // try {
  //   pojo = JSON.parse(data);
  // } catch (error) { // error handling. if there's error in Json.parse
  //   console.error(error.stack);
  //   return;
  // }

  // do something with the pojo

  // make a string out of the pojo
  // json = JSON.stringify(pojo, null, 2);


  // save it
  // fs.writeFile(outFile, json, { flag: outFileFlag }, error => {  // is a callback
    // if (error) {  //callback write file error handling
    //   console.error(error.stack);
    //   return;
    // }

//     console.error('\ncopied');
//   });
// });
