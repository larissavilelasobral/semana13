const express = require("express")
const router = express.Router()

const gamesController = require("../controllers/gamesController");

// GET TODOS GAMES 
router.get("/todos", gamesController.getAllGames); 

// GET GAMES POR ID
router.get("/:id", gamesController.getGameById);

// PATCH ALTERAR ELEMENTO ESPECIFICO
router.patch("/:id", gamesController.updateTitle)

// PUT ALTERAR TUDO
router.put("/:id", gamesController.updateGame)

// CRIAR NOVO JOGO
router.post("/games/create", gamesController.createGame)

// DELETAR GAME
router.delete("/:id", gamesController.deleteGame)

module.exports = router;