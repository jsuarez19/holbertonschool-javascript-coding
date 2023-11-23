#!/usr/bin/node

const request = require('request');

request(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  if (response.statusCode === 200) {
    const data = JSON.parse(body);
    const completedTasksByUser = {};

    data.forEach(element => {
      if (element.completed) {
        if (completedTasksByUser[element.userId]) {
          completedTasksByUser[element.userId]++;
        } else {
          completedTasksByUser[element.userId] = 1;
        }
      }
    });
    console.log(completedTasksByUser); // Prints
  }
});
