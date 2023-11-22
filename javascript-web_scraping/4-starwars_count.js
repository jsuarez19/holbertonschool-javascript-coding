#!/usr/bin/node

const request = require('request');
const starWarsFilmsList = 'https://swapi-api.hbtn.io/api/films/';
const id = 'https://swapi-api.hbtn.io/api/people/18/';
let count = 0;

request(starWarsFilmsList, (error, response, body) => {
  if (error) console.log(error);
  if (response.statusCode === 200) {
    const filmsData = JSON.parse(body); // converts it into a JavaScript object
    for (film of filmsData.results) {
      if (film.characters.includes(id)) {
        count = count + 1;
      }
    }
    console.log(count);
  }
});
