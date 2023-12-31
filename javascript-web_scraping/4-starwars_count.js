#!/usr/bin/node

const request = require('request');
const id = '18';
let count = 0;

request(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  if (response.statusCode === 200) {
    try {
      const filmsData = JSON.parse(body); // converts it into a JavaScript object
      for (const film of filmsData.results) {
        for (const character of film.characters) {
          if (character.includes(id)) {
            count = count + 1;
          }
        }
      }
      console.log(count);
    } catch (parseError) {
      console.error('Error parsing JSON');
    }
  }
});
