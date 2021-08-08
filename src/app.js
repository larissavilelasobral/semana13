const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");

// string de conexão mogoose
mongoose.connect("mongodb://localhost:27017/semanaS13", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// conexão com o mongo
let db = mongoose.connection

// Verificar erro e sucesso
db.on("erro", console.log.bind(console,"connection error:"));
db.once("open", () => {
    console.log("conexão feita com sucesso")
});

const app = express();

// rotas
const index = require("./routes/index")
const gamesRoutes = require("./routes/gamesRoutes")

// app.use(cors());

app.use(express.json());

app.use("/", index);
app.use("/games", gamesRoutes);

module.exports = app