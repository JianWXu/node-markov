/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let obj = new Map();
    for (let i = 0; i < this.words.length; i++) {
      if (obj.has(this.words[i])) {
        obj.get(this.words[i]).push(this.words[i + 1] || null);
      } else {
        obj.set(this.words[i], [this.words[i + 1]] || null);
      }
    }
    this.chains = obj;
  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 8) {
    let allKeys = Array.from(this.chains.keys());
    let randKey = MarkovMachine.choice(allKeys);
    let arr = [];

    while (randKey !== null && arr.length < numWords) {
      arr.push(randKey);
      randKey = MarkovMachine.choice(this.chains.get(randKey));
    }

    return arr.join(" ");
  }
  
}


module.exports = {
  MarkovMachine,
};