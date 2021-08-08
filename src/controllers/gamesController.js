const games = require("../models/games");

const getAllGames = (req, res) => {
    games.find((err, gamesFound) => {
        if (err) {
            console.log("Erro!");
            res.status(500).send({message: err.message});
        } else {
            // se existir e se tiver valor dentro retorna OK 
            if (gamesFound && gamesFound.length > 0) {
                console.log("games encontrados ALL")
                res.status(200).send(gamesFound)
            } else {
                console.log("Sucesso! porem não tem nada para retornar")
                res.status(204).send();
            }
        }
    })
};

const getGameById = (req, res) => {
    const requestId = req.params.id
    console.log(requestId)
    games.findOne({id:requestId}, function (err, gameFound) {
        console.log("game encontrado ID")
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            if (gameFound) {
                res.status(200).send(gameFound.toJSON({
                    virtuals: true}))
            } else {
                res.status(204).send()
            }
        }
    })
};

// Criar novo game
const createGame = (req, res) => {
    let {title, launchYear, consoles, liked, stages} = req.body;

    let criarGame = {
        "id": Math.random().toString(32).substr(2),
        title,
        launchYear,
        consoles,
        liked,
        stages
    }

    let newGame = new games(criarGame)
    newGame.save(function (err) {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            games.updateOne({$set: {criarGame}}),
            res.status(201).send({
                message: "Game adicionado com sucesso"
            });
        }
    })
};

const deleteGame = (req, res) => {
    const gameId = req.params.id
    games.findOne({id: gameId}, function (err, game){

        if (err) {
            res.status(500).send({message: err.message})

        }else{
            if (game){
                games.deleteOne({id: gameId }, function (err){
                    if (err){
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            message: 'game removido com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            }else {
                res.status(404).send({ message: 'não ha game para ser removido com esse id' })
            }
        }
    })
};

const updateGame = (req, res) => {
    const gameId = req.params.id;
    games.findOne({ id: gameId }, function (err, gameFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (gameFound) {
                games.updateOne({ id: gameId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Registro alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ser atualizado com esse id" });
            }
        }
    })
}

const updateTitle = (req, res) => {
    const gameId = req.params.id;
    let newTitle = req.body.title;
    games.findOne({ id: gameId }, function (err, gameFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (gameFound) {
                games.updateOne({ id: gameId }, { $set: { title: newTitle } }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "title alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ter o title atualizado com esse id" });
            }
        }
    })
}


module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    updateTitle,
    deleteGame
}