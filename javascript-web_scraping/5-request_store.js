#!/usr/bin/node

const request = require('request');
const fs = require('fs');

request(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode === 200) {
    const data = JSON.parse(body);
    fs.writeFile(process.argv[3], data, 'utf-8', (err) => {
      if (err) console.log(err);
    });
  }
});
