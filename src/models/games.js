const mongoose = require("mongoose");

// templete do documento
const gamesSchema = new mongoose.Schema({
  id: { type: String},
  title: { type: String },
  lauchYear: { type: String },
  consoles: { type: Array },
  liked: { type: Boolean },
  stages: { type: Array }
}, {
  versionKey: false // não ter versão de arquivo
});

// gamesSchema.virtual("card").
// get(function () {
//   console.log('virtual')
//   return this.id + "-" + this.title;
// }).
// set((card) => {
//   this.id = card.substr(0, card.indexOf("-")); // ID
//   this.title = card.substr(card.indexOf("-") + 1) // nome do jogo 
// });

const games = mongoose.model("games", gamesSchema);

module.exports = games;
