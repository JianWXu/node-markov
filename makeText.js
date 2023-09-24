const fs = require("fs");
const axios = require("axios");
const process = require("process");

const markov = require("./markov");

async function markovText(input) {
  let res;
  if (process.argv[2] === "file") {
    fs.readFile(input[3], "utf8", function (err, data) {
      if (err) {
        console.log("THIS IS THE ERROR", err);
        process.exit(1);
      }
      let markovMachine = new markov.MarkovMachine(data);
      console.log(markovMachine.makeText());
    });
  } else {
    try {
      res = await axios.get(input[3]);
    } catch (err) {
      console.log("THIS IS THE ERROR", err.code);
      process.exit(1);
    }
    let markovMachine = new markov.MarkovMachine(res.data);
    console.log(markovMachine.makeText());
  }
}

markovText(process.argv);
