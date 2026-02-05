const fs = require("fs");

const superagent = require("superagent");

superagent
  .get(`http://www.omdbapi.com/?apikey=3e71222c&t=F1`)
  .end((err, res) => {
    if(err) console.log(err.message);
    const movie = res.body;
    console.log(movie);
  });
