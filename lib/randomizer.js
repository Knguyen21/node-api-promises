'use strict';
const fs = require('fs');

let inFile = process.argv[2];

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

let splitIntoLines = (content) => {
  return content.split('\n');
};

let removeTrailingNewLine = (content) => {
  content.pop();
  return content;
};

let randomLines = (content) => {
return   content.sort(function(){
 return 0.5 - Math.random();
  });
};

let logLines = (line) => {
      console.log(line);
};

pReadFile(inFile, {encoding: 'utf8'})
.then(splitIntoLines)
.then(removeTrailingNewLine)
.then(randomLines)
.then(lines => lines.forEach(logLines))
.catch(console.error);


// fs.readFile(inFile, { encoding: 'utf8' }, (error, content) => {
//   //first thing is check error
//   if (error){
//     console.error(error);
//   }
//   let lines = content.split('\n');
//   //clean up the array
//   lines.pop();
//
//   let randomLines = lines.sort(function(){
//     return 0.5 - Math.random();
//   });
//
//   randomLines.forEach((line) => {
//     console.log(line);
//   });
// });
