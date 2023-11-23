#!/usr/bin/node

const request = require('request');
const fs = require('fs');

request(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode === 200) {
    // Write the body response to the specified file
    fs.writeFile(process.argv[3], body, 'utf-8', (err) => {
      if (err) console.log(err);
    });
  }
});
