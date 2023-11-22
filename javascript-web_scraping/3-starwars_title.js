#!/usr/bin/node

const request = require('request');
const starWarsFilms = 'https://swapi-api.hbtn.io/api/films/'.concat(process.argv[2]);

request(starWarsFilms, (error, response, body) => {
  if (error) console.log(error);
  if (response === 200) {
    const filmData = JSON.parse(body); // converts it into a JavaScript object
    console.log(filmData.title);
  }
});
