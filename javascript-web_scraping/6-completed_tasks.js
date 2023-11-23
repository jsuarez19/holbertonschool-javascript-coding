#!/usr/bin/node

const request = require('request');
apiUrl = 'https://jsonplaceholder.typicode.com/todos'

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  if (response.statusCode === 200) {
    data = JSON.parse(body);
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
    console.log(completedTasksByUser)
  }
});
